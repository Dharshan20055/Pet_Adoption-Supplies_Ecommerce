import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, TextField, Button,
  Paper, Alert, List, ListItem, ListItemText, Divider,
  Chip, CircularProgress, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import { Add, VerifiedUser, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { licenseAPI } from '../../services/api';

const LicenseManager = () => {
  const navigate = useNavigate();
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [open, setOpen]         = useState(false);
  const [form, setForm]         = useState({ licenseNumber: '', issuedDate: '', expiryDate: '' });
  const [alert, setAlert]       = useState({ msg: '', type: 'success' });
  const [saving, setSaving]     = useState(false);

  const fetchLicenses = () => {
    licenseAPI.getMyLicenses()
      .then(r => setLicenses(r.data))
      .catch(() => setAlert({ msg: 'Failed to load licenses', type: 'error' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchLicenses(); }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAdd = async () => {
    setSaving(true);
    try {
      await licenseAPI.addLicense(form);
      setAlert({ msg: 'License added successfully!', type: 'success' });
      setOpen(false);
      setForm({ licenseNumber: '', issuedDate: '', expiryDate: '' });
      fetchLicenses();
    } catch (e) {
      setAlert({ msg: e.response?.data?.message || 'Failed to add license', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const isExpired = (expiryDate) => new Date(expiryDate) < new Date();

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/seller')} sx={{ mb: 2 }}>Back to Dashboard</Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>License Manager</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
          Add License
        </Button>
      </Box>

      {alert.msg && <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert({ msg: '' })}>{alert.msg}</Alert>}

      <Paper elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
        <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', gap: 1 }}>
          <VerifiedUser color="primary" />
          <Typography variant="subtitle1" fontWeight={600}>
            Licenses are required to sell pets commercially. Adoption listings do not need a license.
          </Typography>
        </Box>
        <Divider />

        {licenses.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary" mb={2}>No licenses registered yet.</Typography>
            <Button variant="outlined" startIcon={<Add />} onClick={() => setOpen(true)}>
              Add Your First License
            </Button>
          </Box>
        ) : (
          <List disablePadding>
            {licenses.map((lic, idx) => {
              const expired = isExpired(lic.expiryDate);
              return (
                <React.Fragment key={lic.licenseId}>
                  {idx > 0 && <Divider />}
                  <ListItem sx={{ px: 3, py: 2 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography fontWeight={600}>{lic.licenseNumber}</Typography>
                          <Chip size="small" label={expired ? 'Expired' : 'Valid'}
                            color={expired ? 'error' : 'success'} />
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          Issued: {lic.issuedDate} &bull; Expires: {lic.expiryDate}
                        </Typography>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>
        )}
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New License</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField label="License Number *" name="licenseNumber"
              value={form.licenseNumber} onChange={handleChange} fullWidth required />
            <TextField label="Issue Date *" name="issuedDate" type="date"
              value={form.issuedDate} onChange={handleChange} fullWidth required
              InputLabelProps={{ shrink: true }} />
            <TextField label="Expiry Date *" name="expiryDate" type="date"
              value={form.expiryDate} onChange={handleChange} fullWidth required
              InputLabelProps={{ shrink: true }} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={saving}>
            {saving ? <CircularProgress size={20} /> : 'Add License'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LicenseManager;
