'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Container, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TypingEffect from 'react-typing-effect';

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
            <TypingEffect
              text={['Hi I\'m your Pantrypal']}
              speed={50}
              eraseSpeed={50}
              eraseDelay={2000}
              typingDelay={500}
              cursorRenderer={(cursor) => <Typography variant="h3" color="textPrimary">{cursor}</Typography>}
            />
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
        
        {/* Features Section */}
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            padding: '2rem 0',
            mt: 4, // Margin top to ensure separation from the previous content
            borderTop: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h4" component="h3" gutterBottom color="textPrimary" textAlign="center">
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
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LandingPage;
