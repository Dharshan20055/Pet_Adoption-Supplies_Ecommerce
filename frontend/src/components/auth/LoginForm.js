import React, { useState } from 'react';
import {
  Container, Box, TextField, Button, Typography,
  Paper, Alert, CircularProgress, Link
} from '@mui/material';
import { Pets } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate   = useNavigate();
  const [form, setForm]     = useState({ username: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Pets color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h5" fontWeight={700} mt={1}>Welcome Back</Typography>
            <Typography variant="body2" color="text.secondary">Sign in to PetMarket</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField fullWidth label="Username" name="username" margin="normal" required
              value={form.username} onChange={handleChange} autoFocus />
            <TextField fullWidth label="Password" name="password" type="password" margin="normal" required
              value={form.password} onChange={handleChange} />
            <Button type="submit" fullWidth variant="contained" size="large"
              sx={{ mt: 2, mb: 1 }} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </Box>

          <Typography variant="body2" align="center" mt={1}>
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register">Register here</Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginForm;
