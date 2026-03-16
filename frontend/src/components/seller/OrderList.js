import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, Chip, Paper, List, ListItem,
  ListItemText, Divider, Button, CircularProgress, Alert
} from '@mui/material';
import { CheckCircle, Chat, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ORDER_COLORS = { PROCESSING: 'warning', COMPLETED: 'success', CANCELLED: 'error' };
const PAY_COLORS   = { PENDING: 'default', PAID: 'success', FAILED: 'error', REFUNDED: 'info' };

const OrderList = () => {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert,   setAlert]   = useState({ msg: '', type: 'success' });

  useEffect(() => {
    if (user) {
      orderAPI.getSellerOrders(user.id)
        .then(r => setOrders(r.data))
        .catch(() => setAlert({ msg: 'Failed to load orders', type: 'error' }))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleComplete = async (orderId) => {
    try {
      await orderAPI.completeOrder(orderId);
      setAlert({ msg: 'Order marked as completed!', type: 'success' });
      orderAPI.getSellerOrders(user.id).then(r => setOrders(r.data));
    } catch (e) {
      setAlert({ msg: e.response?.data?.message || 'Failed to update order', type: 'error' });
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/seller')} sx={{ mb: 2 }}>Back to Dashboard</Button>
      <Typography variant="h4" fontWeight={700} mb={3}>My Orders</Typography>

      {alert.msg && <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert({ msg: '' })}>{alert.msg}</Alert>}

      {orders.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <Typography color="text.secondary">No orders yet. Approve buyer requests to create orders.</Typography>
        </Paper>
      ) : (
        <Paper elevation={2} sx={{ borderRadius: 3 }}>
          <List disablePadding>
            {orders.map((order, idx) => (
              <React.Fragment key={order.orderId}>
                {idx > 0 && <Divider />}
                <ListItem alignItems="flex-start" sx={{ px: 3, py: 2 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography fontWeight={600}>
                          Order #{order.orderId} — {order.request?.pet?.breed}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Chip size="small" label={order.status} color={ORDER_COLORS[order.status] || 'default'} />
                          <Chip size="small" label={`Payment: ${order.paymentStatus}`}
                            color={PAY_COLORS[order.paymentStatus] || 'default'} variant="outlined" />
                        </Box>
                      </Box>
                    }
                    secondary={
                      <Box mt={1}>
                        <Typography variant="body2" color="text.secondary">
                          Buyer: {order.request?.buyer?.username} &bull;
                          Type: {order.request?.pet?.type} &bull;
                          {order.request?.pet?.price ? ` Price: $${order.request.pet.price}` : ' Free Adoption'}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          Created: {new Date(order.createdAt).toLocaleString()}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          {order.status === 'PROCESSING' && (
                            <Button size="small" variant="contained" color="success"
                              startIcon={<CheckCircle />} onClick={() => handleComplete(order.orderId)}>
                              Mark Complete
                            </Button>
                          )}
                          <Button size="small" variant="outlined" startIcon={<Chat />}
                            onClick={() => navigate(`/chat/${order.request?.requestId}`)}>
                            Open Chat
                          </Button>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default OrderList;
