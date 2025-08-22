import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link as RouterLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ClientFootprintPage } from './pages/ClientFootprintPage';
import { AdminPanel } from './pages/AdminPanel';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Container, Box, Button, Stack } from '@mui/material';
import './App.css';

const App: React.FC = () => {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
      background: { default: '#f5f6fa' }
    }
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Pharmaceutical Visualization System
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button component={RouterLink} to="/client/regeneron" color="inherit">Regeneron</Button>
                <Button component={RouterLink} to="/client/pfizer" color="inherit">Pfizer</Button>
                <Button component={RouterLink} to="/client/novartis" color="inherit">Novartis</Button>
                <Button component={RouterLink} to="/client/roche" color="inherit">Roche</Button>
                <Button component={RouterLink} to="/client/gsk" color="inherit">GSK</Button>
                <Button component={RouterLink} to="/admin" color="inherit">Admin</Button>
              </Stack>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg" sx={{ py: 3 }}>
            <Routes>
              <Route path="/client/:clientId" element={<ClientFootprintPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/" element={<Navigate to="/client/regeneron" replace />} />
            </Routes>
          </Container>
          <Box component="footer" sx={{ py: 2, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="caption">© {new Date().getFullYear()} Pharma Viz</Typography>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
