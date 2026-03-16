import React from 'react';
import {
  Container, Typography, Box, List, ListItem, ListItemText,
  ListItemAvatar, Avatar, IconButton, Button, Divider,
  Paper, Chip, Alert
} from '@mui/material';
import { Delete, ShoppingCartCheckout, Pets } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, checkout } = useCart();
  const navigate = useNavigate();
  const [msg, setMsg] = React.useState('');

  const safeItems = Array.isArray(cartItems) ? cartItems : [];

  const total = safeItems.reduce((sum, item) => {
    const price = item.pet?.price || 0;
    return sum + parseFloat(price);
  }, 0);

  const handleCheckout = async () => {
    try {
      await checkout();
      setMsg('Checkout successful! Submit individual requests for each pet.');
      setTimeout(() => navigate('/requests'), 2000);
    } catch (e) {
      setMsg(e.response?.data?.message || 'Checkout failed');
    }
  };

  if (safeItems.length === 0) return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <Pets sx={{ fontSize: 80, color: 'text.disabled' }} />
      <Typography variant="h5" mt={2} color="text.secondary">Your cart is empty</Typography>
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate('/')}>Browse Pets</Button>
    </Container>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>Your Cart</Typography>

      {msg && <Alert severity="info" sx={{ mb: 2 }}>{msg}</Alert>}

      <Paper elevation={2} sx={{ borderRadius: 3 }}>
        <List>
          {safeItems.map((item, idx) => (
            <React.Fragment key={item.cartId}>
              {idx > 0 && <Divider />}
              <ListItem secondaryAction={
                <IconButton edge="end" color="error" onClick={() => removeFromCart(item.cartId)}>
                  <Delete />
                </IconButton>
              }>
                <ListItemAvatar>
                  <Avatar src={item.pet?.imageUrl} variant="rounded">
                    <Pets />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography fontWeight={600}>{item.pet?.breed}</Typography>}
                  secondary={
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                      <Chip size="small"
                        label={item.pet?.type === 'ADOPTION' ? 'Free Adoption' : `$${item.pet?.price}`}
                        color={item.pet?.type === 'ADOPTION' ? 'success' : 'secondary'} />
                      {item.pet?.location && <Chip size="small" label={item.pet.location} variant="outlined" />}
                    </Box>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>

        <Divider />
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">{safeItems.length} item(s)</Typography>
            {total > 0 && <Typography variant="h6" fontWeight={700}>Estimated: ${total.toFixed(2)}</Typography>}
          </Box>
          <Button variant="contained" size="large" startIcon={<ShoppingCartCheckout />}
            onClick={handleCheckout}>Checkout</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CartPage;