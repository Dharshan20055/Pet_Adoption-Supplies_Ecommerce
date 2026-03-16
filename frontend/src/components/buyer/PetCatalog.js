import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Box, TextField, Select, MenuItem,
  FormControl, InputLabel, Typography, CircularProgress,
  Chip, InputAdornment, Button
} from '@mui/material';
import { Search, FilterList, Refresh } from '@mui/icons-material';
import { petAPI } from '../../services/api';
import PetCard from './PetCard';

const CATEGORIES = ['', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Other'];

const PetCatalog = () => {
  const [pets, setPets]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', breed: '', location: '', type: '' });

  const fetchPets = async () => {
    setLoading(true);
    try {
      const active = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
      const res = Object.keys(active).length
        ? await petAPI.filterPets(active)
        : await petAPI.getAllPets();
      setPets(res.data);
    } catch { setPets([]); } finally { setLoading(false); }
  };

  useEffect(() => { fetchPets(); }, []);

  const handleFilterChange = (e) =>
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleReset = () => {
    setFilters({ category: '', breed: '', location: '', type: '' });
    petAPI.getAllPets().then(r => setPets(r.data)).catch(() => {});
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={1}>Find Your Pet</Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Browse pets available for adoption and sale
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3,
                 p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
        <TextField size="small" label="Breed" name="breed"
          value={filters.breed} onChange={handleFilterChange}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small"/></InputAdornment> }}
          sx={{ minWidth: 160 }} />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Category</InputLabel>
          <Select name="category" value={filters.category} onChange={handleFilterChange} label="Category">
            {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c || 'All Categories'}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel>Type</InputLabel>
          <Select name="type" value={filters.type} onChange={handleFilterChange} label="Type">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="ADOPTION">Adoption</MenuItem>
            <MenuItem value="SALE">For Sale</MenuItem>
          </Select>
        </FormControl>
        <TextField size="small" label="Location" name="location"
          value={filters.location} onChange={handleFilterChange} sx={{ minWidth: 160 }} />
        <Button variant="contained" startIcon={<FilterList />} onClick={fetchPets}>Apply</Button>
        <Button variant="outlined"  startIcon={<Refresh />}    onClick={handleReset}>Reset</Button>
      </Box>

      {/* Active filter chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        {Object.entries(filters).filter(([,v])=>v).map(([k,v]) => (
          <Chip key={k} label={`${k}: ${v}`} size="small" color="primary" variant="outlined"
            onDelete={() => setFilters(p => ({...p, [k]: ''}))} />
        ))}
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={48} />
        </Box>
      ) : pets.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">No pets found matching your filters.</Typography>
          <Button sx={{ mt: 2 }} onClick={handleReset}>Clear Filters</Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {pets.map(pet => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pet.petId}>
              <PetCard pet={pet} onCartUpdate={fetchPets} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default PetCatalog;
