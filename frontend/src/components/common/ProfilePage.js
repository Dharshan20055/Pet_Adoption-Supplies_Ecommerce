import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, TextField, Button,
  Paper, Alert, CircularProgress, Divider, Avatar
} from '@mui/material';
import { Person, Edit, Lock } from '@mui/icons-material';
import { userAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form,    setForm]    = useState({ email: '', contact: '', location: '' });
  const [pwForm,  setPwForm]  = useState({ currentPassword: '', newPassword: '', confirmNew: '' });
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [alert,   setAlert]   = useState({ msg: '', type: 'success' });

  useEffect(() => {
    userAPI.getProfile().then(r => {
      setProfile(r.data);
      setForm({ email: r.data.email || '', contact: r.data.contact || '', location: r.data.location || '' });
    }).finally(() => setLoading(false));
  }, []);

  const handleSaveInfo = async () => {
    setSaving(true);
    try {
      await userAPI.updateProfile(form);
      setAlert({ msg: 'Profile updated!', type: 'success' });
    } catch (e) {
      setAlert({ msg: e.response?.data?.message || 'Failed to update profile', type: 'error' });
    } finally { setSaving(false); }
  };

  const handleChangePassword = async () => {
    if (pwForm.newPassword !== pwForm.confirmNew) {
      setAlert({ msg: 'New passwords do not match', type: 'error' }); return;
    }
    setSaving(true);
    try {
      await userAPI.updateProfile({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      setAlert({ msg: 'Password changed successfully!', type: 'success' });
      setPwForm({ currentPassword: '', newPassword: '', confirmNew: '' });
    } catch (e) {
      setAlert({ msg: e.response?.data?.message || 'Failed to change password', type: 'error' });
    } finally { setSaving(false); }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>My Profile</Typography>

      {alert.msg && <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert({ msg: '' })}>{alert.msg}</Alert>}

      {/* Avatar card */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3, textAlign: 'center' }}>
        <Avatar sx={{ width: 80, height: 80, mx: 'auto', bgcolor: 'primary.main', fontSize: 36 }}>
          {profile?.username?.[0]?.toUpperCase()}
        </Avatar>
        <Typography variant="h5" fontWeight={700} mt={1}>{profile?.username}</Typography>
        <Typography variant="body2" color="text.secondary">{profile?.email}</Typography>
        {profile?.location && <Typography variant="body2" color="text.secondary">📍 {profile.location}</Typography>}
        <Typography variant="caption" color="text.disabled">
          Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
        </Typography>
      </Paper>

      {/* Edit Info */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Edit color="primary" />
          <Typography variant="h6" fontWeight={600}>Edit Information</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Email" value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))} fullWidth />
          <TextField label="Contact / Phone" value={form.contact}
            onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} fullWidth />
          <TextField label="Location" value={form.location}
            onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
            fullWidth placeholder="City, State" />
          <Button variant="contained" onClick={handleSaveInfo} disabled={saving}>
            {saving ? <CircularProgress size={20} /> : 'Save Changes'}
          </Button>
        </Box>
      </Paper>

      {/* Change Password */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Lock color="primary" />
          <Typography variant="h6" fontWeight={600}>Change Password</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Current Password" type="password" value={pwForm.currentPassword}
            onChange={e => setPwForm(p => ({ ...p, currentPassword: e.target.value }))} fullWidth />
          <TextField label="New Password" type="password" value={pwForm.newPassword}
            onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))} fullWidth />
          <TextField label="Confirm New Password" type="password" value={pwForm.confirmNew}
            onChange={e => setPwForm(p => ({ ...p, confirmNew: e.target.value }))} fullWidth />
          <Button variant="outlined" color="warning" onClick={handleChangePassword} disabled={saving}>
            {saving ? <CircularProgress size={20} /> : 'Change Password'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
