import React from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
        <CheckCircle sx={{ fontSize: 80, color: 'success.main' }} />
        <Typography variant="h4" fontWeight={700} mt={2}>Payment Successful!</Typography>
        <Typography color="text.secondary" mt={1} mb={3}>
          Your payment has been processed. The seller will be notified.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => navigate('/requests')}>View My Requests</Button>
          <Button variant="outlined"  onClick={() => navigate('/')}>Browse More Pets</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
