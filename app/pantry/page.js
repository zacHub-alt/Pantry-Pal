'use client';

import { handleExportCSV } from '../../utils/cvs/exportData';
import { handleExportPDF } from '../../utils/pdf/exportData';
import {ImageUploaderWithRecognition} from '../components/ImageUploaderWithRecognition';
import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Card, CardHeader, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, createTheme, ThemeProvider, Menu, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AddShoppingCart, Edit, Delete, Logout, AccountCircle } from '@mui/icons-material';
import { collection, getDocs, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { firestore, auth } from '../../utils/firebase';
import { useRouter } from 'next/navigation';
import { Analytics } from "@vercel/analytics/react";
import withAuth from '../protectedRoute';

// Define custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e5e7eb', // Light grey
    },
    error: {
      main: '#dc2626',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          transition: 'background-color 0.3s, color 0.3s',
          '&:hover': {
            backgroundColor: '#333333',
            color: '#ffffff',
          },
          '&:active': {
            backgroundColor: '#555555',
            color: '#ffffff',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
  },
});

const Header = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  position: 'relative',
  width: '100%',
  padding: 10,
}));

const HeaderContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: '1rem', // Smaller text
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem', // Smaller text on small screens
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
}));

const Page = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemExpiration, setNewItemExpiration] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
  const [userEmail, setUserEmail] = useState(''); // State to hold user email
  const [userUid, setUserUid] = useState(''); // State to hold user UID
  const router = useRouter(); // Initialize router

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterExpiration, setFilterExpiration] = useState('');
  const [filterQuantity, setFilterQuantity] = useState('');

  useEffect(() => {
    // Fetch the current user's email and UID
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setUserUid(user.uid);
      } else {
        setUserEmail('');
        setUserUid('');
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const updatePantry = async () => {
    if (userUid) {
      const snapshot = collection(firestore, `pantry-items-${userUid}`);
      const docs = await getDocs(snapshot);
      const pantryList = [];
      docs.forEach((doc) => {
        pantryList.push({ id: doc.id, ...doc.data() });
      });
      setPantryItems(pantryList);
    }
  };

  useEffect(() => {
    if (userUid) {
      updatePantry();
    }
  }, [userUid]);

  const addItem = async (name, quantity, expiration) => {
    if (userUid) {
      const docRef = doc(firestore, `pantry-items-${userUid}`, name);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity: existingQuantity } = docSnap.data();
        await setDoc(docRef, { quantity: existingQuantity + Number(quantity), expiration }, { merge: true });
      } else {
        await setDoc(docRef, { name, quantity: Number(quantity) || 1, expiration });
      }
      await updatePantry();
      setNewItemName('');
      setNewItemQuantity('');
      setNewItemExpiration('');
    }
  };

  const deleteItem = async (id) => {
    if (userUid) {
      await deleteDoc(doc(firestore, `pantry-items-${userUid}`, id));
      await updatePantry();
    }
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setNewItemName(item.name);
    setNewItemQuantity(item.quantity);
    setNewItemExpiration(item.expiration);
  };

  const editItem = async (id, name, quantity, expiration) => {
    if (userUid) {
      const docRef = doc(firestore, `pantry-items-${userUid}`, id);
      await setDoc(docRef, { name, quantity: Number(quantity) || 1, expiration }, { merge: true });
      await updatePantry();
      setEditingItem(null);
      setNewItemName('');
      setNewItemQuantity('');
      setNewItemExpiration('');
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/'); // Redirect to the landing page after signing out
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredItems = pantryItems.filter(item => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || item.category === filterCategory;
    const matchesExpiration = filterExpiration === '' || item.expiration === filterExpiration;
    const matchesQuantity = filterQuantity === '' || item.quantity >= filterQuantity;
    return matchesSearchTerm && matchesCategory && matchesExpiration && matchesQuantity;
  });

  return (
    
    <ThemeProvider theme={theme}> 
      <Header>
        <HeaderContent maxWidth="2000">
          <a href="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
            <AddShoppingCart fontSize="medium" />
            <HeaderText variant="h6" component="span">Pantry Pal</HeaderText>
          </a>
          <IconButton
            onClick={handleMenuOpen}
            sx={{ marginLeft: 'auto' }}
            color="inherit"
          >
            <AccountCircle fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>
              <Typography variant="body2">{userEmail}</Typography>
            </MenuItem>
            <MenuItem onClick={handleSignOut}>
              <Logout fontSize="small" />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>Sign Out</Typography>
            </MenuItem>
          </Menu>
        </HeaderContent>
      </Header>

      <Container maxWidth="lg" sx={{ marginTop: 4, paddingBottom: 8 }}>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          <Card sx={{ flex: 1 }}>
            <CardHeader title={editingItem ? "Edit Pantry Item" : "Add Pantry Item"} />
            <CardContent>
              <TextField
                label="Item Name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Quantity"
                type="number"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Expiration Date"
                type="date"
                value={newItemExpiration}
                onChange={(e) => setNewItemExpiration(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Box display="flex" justifyContent="flex-end" marginTop={2}>
                {editingItem ? (
                  <>
                    <Button onClick={() => setEditingItem(null)} color="secondary">Cancel</Button>
                    <Button onClick={() => editItem(editingItem.id, newItemName, newItemQuantity, newItemExpiration)} color="primary" variant="contained" sx={{ marginLeft: 2 }}>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => addItem(newItemName, newItemQuantity, newItemExpiration)} color="primary" variant="contained">
                    Add Item
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardHeader title="Filter Items" />
            <CardContent>
              <TextField
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="fruits">Fruits</MenuItem>
                  <MenuItem value="vegetables">Vegetables</MenuItem>
                  <MenuItem value="grains">Grains</MenuItem>
                  <MenuItem value="dairy">Dairy</MenuItem>
                  <MenuItem value="meat">Meat</MenuItem>
                  <MenuItem value="spices">Spices</MenuItem>
                  <MenuItem value="beverages">Beverages</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Minimum Quantity"
                  type="number"
                  value={filterQuantity}
                  onChange={(e) => setFilterQuantity(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Expiration Date"
                  type="date"
                  value={filterExpiration}
                  onChange={(e) => setFilterExpiration(e.target.value)}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </CardContent>
          </Card>
        </Box>

        <TableContainer component={Card} sx={{ marginTop: 4 }}>
          <CardHeader title="Pantry Inventory" /> <Box marginTop={4} display="flex" justifyContent="space-between" alignItems="center">
  <Typography variant="h6" component="div">Pantry Inventory</Typography>
  <Box>
    <Button variant="contained" color="primary" onClick={() => handleExportCSV(pantryItems)} sx={{ marginRight: 2 }}>
      Export CSV
    </Button>
    <Button variant="contained" color="primary" onClick={() => handleExportPDF(pantryItems)}>
      Export PDF
    </Button>
  </Box>
</Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Expiration Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.expiration}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => startEditing(item)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteItem(item.id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Footer>
        <Typography variant="body2">Pantry Pal &copy; 2024. All rights reserved.</Typography>
      </Footer>
      <Analytics />
    </ThemeProvider>
  );
};

export default withAuth(Page);
