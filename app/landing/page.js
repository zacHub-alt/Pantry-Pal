'use client';

require('dotenv').config();
import { useRouter } from 'next/navigation';
import { Box, Button, Container, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GitHub, LinkedIn, Public } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e5e7eb', // Light grey
    },
    background: {
      default: '#000000', // Black background
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#e5e7eb', // Light grey text
    },
  },
});

const LandingPage = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/signin');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Pantry Pal
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="80vh"
          textAlign="center"
        >
          <Typography variant="h3" component="h1" gutterBottom color="textPrimary">
            Welcome to Pantry Pal
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom color="textPrimary">
            Your ultimate pantry management tool.
          </Typography>
          <Typography variant="body1" paragraph color="textPrimary">
            Keep track of your pantry items, avoid food waste, and always know what you have in stock.
            Pantry Pal helps you manage your pantry efficiently, so you never run out of essential items.
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleSignIn} sx={{ mt: 4 }}>
            Sign In
          </Button>
        </Box>
        <Box mt={4} textAlign="center">
          <Typography variant="h4" component="h3" gutterBottom color="textPrimary">
            Features
          </Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="center" textAlign="left">
            <Box m={2} p={2} border={1} borderColor="secondary.main" borderRadius={4} width="300px">
              <Typography variant="h6" color="textPrimary">
                Intuitive Interface
              </Typography>
              <Typography variant="body2" color="textPrimary">
                A user-friendly interface designed to help you manage your pantry effortlessly.
              </Typography>
            </Box>
            <Box m={2} p={2} border={1} borderColor="secondary.main" borderRadius={4} width="300px">
              <Typography variant="h6" color="textPrimary">
                Real-Time Inventory
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Get real-time updates on your pantry items and keep track of stock levels.
              </Typography>
            </Box>
            <Box m={2} p={2} border={1} borderColor="secondary.main" borderRadius={4} width="300px">
              <Typography variant="h6" color="textPrimary">
                Expiry Alerts
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Receive notifications before your items expire to reduce waste.
              </Typography>
            </Box>
            <Box m={2} p={2} border={1} borderColor="secondary.main" borderRadius={4} width="300px">
              <Typography variant="h6" color="textPrimary">
                Easy Categorization
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Organize your items into categories for easy management and access.
              </Typography>
            </Box>
            <Box m={2} p={2} border={1} borderColor="secondary.main" borderRadius={4} width="300px">
              <Typography variant="h6" color="textPrimary">
                Barcode Scanning
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Quickly add items to your pantry by scanning barcodes.
              </Typography>
            </Box>
            <Box m={2} p={2} border={1} borderColor="secondary.main" borderRadius={4} width="300px">
              <Typography variant="h6" color="textPrimary">
                Multi-User Support
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Allow multiple users to manage the pantry, making it perfect for families.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          mt={4}
          mb={4}
        >
          <a href="https://syedtaha.org" target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.secondary.main, textDecoration: 'none', margin: '0 1rem' }}>
            <Public />
          </a>
          <a href="https://github.com/syedtaha22" target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.secondary.main, textDecoration: 'none', margin: '0 1rem' }}>
            <GitHub />
          </a>
          <a href="https://www.linkedin.com/in/syetaha/" target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.secondary.main, textDecoration: 'none', margin: '0 1rem' }}>
            <LinkedIn />
          </a>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LandingPage;
