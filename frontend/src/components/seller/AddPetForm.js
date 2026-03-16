import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, TextField, Button,
  Paper, Alert, CircularProgress, MenuItem, Select,
  FormControl, InputLabel, FormHelperText, Divider
} from '@mui/material';
import { Pets, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { petAPI, licenseAPI } from '../../services/api';

const CATEGORIES = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Hamster', 'Reptile', 'Other'];

const AddPetForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    breed: '', age: '', description: '', category: '',
    type: 'ADOPTION', price: '', licenseId: '', location: '', imageUrl: ''
  });
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error,   setError]     = useState('');
  const [success, setSuccess]   = useState('');

  useEffect(() => {
    licenseAPI.getMyLicenses().then(r => setLicenses(r.data)).catch(() => {});
  }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      const payload = {
        ...form,
        age: form.age ? parseInt(form.age) : null,
        price: form.price ? parseFloat(form.price) : null,
        licenseId: form.licenseId ? parseInt(form.licenseId) : null,
      };
      await petAPI.addPet(payload);
      setSuccess('Pet listed successfully!');
      setTimeout(() => navigate('/seller'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add pet listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/seller')} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Pets color="primary" sx={{ fontSize: 36 }} />
          <Typography variant="h5" fontWeight={700}>Add New Pet Listing</Typography>
        </Box>

        {error   && <Alert severity="error"   sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>Basic Information</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
            <TextField label="Breed *" name="breed" value={form.breed} onChange={handleChange} required fullWidth />
            <TextField label="Age (years)" name="age" type="number" value={form.age}
              onChange={handleChange} fullWidth inputProps={{ min: 0, max: 50 }} />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select name="category" value={form.category} onChange={handleChange} label="Category">
                {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField label="Location" name="location" value={form.location}
              onChange={handleChange} fullWidth placeholder="City, State" />
          </Box>
          <TextField label="Description" name="description" value={form.description}
            onChange={handleChange} fullWidth multiline rows={3} sx={{ mb: 2 }} />
          <TextField label="Image URL" name="imageUrl" value={form.imageUrl}
            onChange={handleChange} fullWidth sx={{ mb: 3 }} placeholder="https://..." />

          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle1" fontWeight={600} mb={1}>Listing Type</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type *</InputLabel>
            <Select name="type" value={form.type} onChange={handleChange} label="Type *" required>
              <MenuItem value="ADOPTION">Adoption (Free)</MenuItem>
              <MenuItem value="SALE">For Sale (Requires License)</MenuItem>
            </Select>
            <FormHelperText>
              {form.type === 'SALE' ? 'A valid license is required for selling pets' : 'No license needed for free adoption'}
            </FormHelperText>
          </FormControl>

          {form.type === 'SALE' && (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
              <TextField label="Price (USD) *" name="price" type="number" value={form.price}
                onChange={handleChange} required inputProps={{ min: 0, step: '0.01' }} />
              <FormControl fullWidth>
                <InputLabel>License *</InputLabel>
                <Select name="licenseId" value={form.licenseId} onChange={handleChange} label="License *" required>
                  {licenses.length === 0
                    ? <MenuItem disabled value="">No licenses — add one first</MenuItem>
                    : licenses.map(l => (
                        <MenuItem key={l.licenseId} value={l.licenseId}>
                          {l.licenseNumber} (exp: {l.expiryDate})
                        </MenuItem>
                      ))}
                </Select>
                {licenses.length === 0 && (
                  <FormHelperText error>
                    You need to add a license before listing a pet for sale.
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
          )}

          <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ mt: 1 }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Publish Listing'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddPetForm;
