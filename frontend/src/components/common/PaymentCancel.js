import React from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
        <Cancel sx={{ fontSize: 80, color: 'error.main' }} />
        <Typography variant="h4" fontWeight={700} mt={2}>Payment Cancelled</Typography>
        <Typography color="text.secondary" mt={1} mb={3}>
          Your payment was not completed. You can try again from your requests page.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => navigate('/requests')}>Go to Requests</Button>
          <Button variant="outlined"  onClick={() => navigate('/')}>Browse Pets</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentCancel;
