import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Badge,
  Box, Menu, MenuItem, Avatar, Tooltip
} from '@mui/material';
import { Pets, ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu  = (e) => setAnchorEl(e.currentTarget);
  const handleClose = ()  => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar>
        <Pets sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 700 }}
          onClick={() => navigate('/')}>
          PetMarket
        </Typography>

        <Button color="inherit" onClick={() => navigate('/')}>Browse Pets</Button>

        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Cart">
              <IconButton color="inherit" onClick={() => navigate('/cart')}>
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title={user.username}>
              <IconButton onClick={handleMenu} size="small">
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {user.username?.[0]?.toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={() => { navigate('/profile');        handleClose(); }}>My Profile</MenuItem>
              <MenuItem onClick={() => { navigate('/requests');       handleClose(); }}>My Requests</MenuItem>
              <MenuItem onClick={() => { navigate('/seller');         handleClose(); }}>Seller Dashboard</MenuItem>
              <MenuItem onClick={() => { navigate('/seller/licenses');handleClose(); }}>Licenses</MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button variant="outlined" color="inherit" onClick={() => navigate('/register')}>Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
