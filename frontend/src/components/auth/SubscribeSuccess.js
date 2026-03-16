import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Fade,
} from "@mui/material";
import { CheckCircleOutline, Home } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../services/api";

const SubscribeSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifySubscription = async () => {
      try {
        const response = await API.get(`/subscription/verify-session?session_id=${sessionId}`);
        setStatus(response.data);
      } catch (err) {
        console.error("Error verifying subscription:", err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      verifySubscription();
    } else {
      navigate("/");
    }
  }, [sessionId, navigate]);

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress color="success" sx={{ mb: 2 }} />
        <Typography variant="h6" sx={{ fontFamily: "'Playfair Display', serif" }}>
          Confirming your subscription...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Fade in={true} timeout={800}>
        <Paper
          variant="outlined"
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 4,
            borderColor: "#1D9E75",
            bgcolor: "rgba(29, 158, 117, 0.02)",
          }}
        >
          <CheckCircleOutline sx={{ fontSize: 80, color: "#1D9E75", mb: 2 }} />
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "#0F6E56",
              mb: 2,
            }}
          >
            🎉 Welcome to Premium!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Successfully subscribed! You now have full access to all premium features
            of the PetAdopt platform.
          </Typography>

          {status && (
            <Box mb={4} p={2} sx={{ bgcolor: "#F0F9F6", borderRadius: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Subscription valid until:
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#0F6E56" }}>
                {new Date(status.subscriptionExpiresAt).toLocaleDateString()}
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<Home />}
            onClick={() => navigate("/")}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              bgcolor: "#0F6E56",
              "&:hover": { bgcolor: "#1D9E75" },
            }}
          >
            Go to Home
          </Button>
        </Paper>
      </Fade>
    </Container>
  );
};

export default SubscribeSuccess;
