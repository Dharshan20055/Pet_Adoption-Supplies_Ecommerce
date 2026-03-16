import React from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import { ErrorOutline, Refresh, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SubscribeCancel = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper
        variant="outlined"
        sx={{
          p: 5,
          textAlign: "center",
          borderRadius: 4,
          borderColor: "#FFB300",
          bgcolor: "rgba(255, 248, 225, 0.4)",
        }}
      >
        <ErrorOutline sx={{ fontSize: 80, color: "#FFB300", mb: 2 }} />
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "#664D03",
            mb: 2,
          }}
        >
          Payment Cancelled
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          It looks like you cancelled the payment or there was an issue processing it.
          Don't worry, no charges were made.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Refresh />}
              onClick={() => navigate("/subscribe")}
              sx={{
                borderRadius: 2,
                py: 1.5,
                bgcolor: "#0F6E56",
                "&:hover": { bgcolor: "#1D9E75" },
              }}
            >
              Try Again
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Home />}
              onClick={() => navigate("/")}
              sx={{
                borderRadius: 2,
                py: 1.5,
                borderColor: "#0F6E56",
                color: "#0F6E56",
                "&:hover": { borderColor: "#1D9E75", color: "#1D9E75" },
              }}
            >
              Go Home
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SubscribeCancel;
