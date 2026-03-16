import React, { useState } from 'react';
import {
  Container, Box, TextField, Button, Typography,
  Paper, Alert, CircularProgress, Link
} from '@mui/material';
import { Pets } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '', email: '', password: '', confirm: '', contact: '', location: ''
  });
  const [error, setError]   = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    setLoading(true); setError('');
    try {
      await register({ username: form.username, email: form.email, password: form.password,
                        contact: form.contact, location: form.location });
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 6, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Pets color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h5" fontWeight={700} mt={1}>Create Account</Typography>
          </Box>

          {error   && <Alert severity="error"   sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField label="Username"  name="username"  required fullWidth
                value={form.username}  onChange={handleChange} />
              <TextField label="Email"     name="email"     type="email" required fullWidth
                value={form.email}     onChange={handleChange} />
              <TextField label="Password"  name="password"  type="password" required fullWidth
                value={form.password}  onChange={handleChange} />
              <TextField label="Confirm Password" name="confirm" type="password" required fullWidth
                value={form.confirm}   onChange={handleChange} />
              <TextField label="Contact"   name="contact"   fullWidth
                value={form.contact}   onChange={handleChange} />
              <TextField label="Location"  name="location"  fullWidth
                value={form.location}  onChange={handleChange}
                placeholder="City, State" />
            </Box>
            <Button type="submit" fullWidth variant="contained" size="large"
              sx={{ mt: 3 }} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>
          </Box>

          <Typography variant="body2" align="center" mt={2}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login">Sign in</Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterForm;
