import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  Divider,
} from "@mui/material";
import { CheckCircle, Star, Cancel } from "@mui/icons-material";
import API from "../../services/api";

const Subscribe = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const response = await API.get("/subscription/status");
      setStatus(response.data);
    } catch (err) {
      console.error("Error fetching status:", err);
      setError("Failed to fetch subscription status");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.post("/subscription/create-checkout");
      if (response.data && response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        setError("Could not generate checkout session");
      }
    } catch (err) {
      console.error("Error creating checkout:", err);
      setError("Failed to initiate checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const premiumFeatures = [
    "Unlimited pet listings",
    "Contact sellers directly",
    "Priority support",
    "Early access to new pets",
    "Manage supplies",
    "Access all shelters",
  ];

  const freeFeatures = [
    "Browse pet listings",
    "Limited contact attempts",
    "Standard support",
  ];

  if (loading && !status) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            mb: 2,
            color: "#0F6E56",
          }}
        >
          {status?.subscribed ? "Manage Your Subscription" : "Choose Your Plan"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {status?.subscribed
            ? "Thank you for being a premium member! Manage your plan details below."
            : "Unlock the full potential of PetAdopt with our premium features."}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: 3 }}>
          {error}
        </Alert>
      )}

      {status?.subscribed ? (
        <Box display="flex" justifyContent="center">
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              borderRadius: 3,
              maxWidth: 500,
              width: "100%",
              borderColor: "#1D9E75",
              textAlign: "center",
              bgcolor: "rgba(93, 202, 165, 0.05)",
            }}
          >
            <Star sx={{ fontSize: 60, color: "#1D9E75", mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#0F6E56" }}>
              Premium Membership Active
            </Typography>
            <Chip label="✓ Premium" color="success" sx={{ mb: 3 }} />
            <Divider sx={{ mb: 3 }} />
            <Box mb={3} textAlign="left">
              <Typography variant="body2" color="text.secondary">
                Valid until:
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {new Date(status.subscriptionExpiresAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Paper>
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {/* FREE PLAN */}
          <Grid item xs={12} md={5}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                borderColor: "#e0e0e0",
                bgcolor: "#f9f9f9",
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Free
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  ₹0
                  <Typography component="span" variant="body1" color="text.secondary">
                    /month
                  </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Standard access to platform
                </Typography>
                <List>
                  {freeFeatures.map((feature, idx) => (
                    <ListItem key={idx} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircle sx={{ color: "#bdbdbd" }} />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <Box p={4} pt={0}>
                <Button
                  variant="outlined"
                  fullWidth
                  disabled
                  sx={{ borderRadius: 2, py: 1.5 }}
                >
                  Current Plan
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* PREMIUM PLAN */}
          <Grid item xs={12} md={5}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                borderColor: "#1D9E75",
                boxShadow: "0 10px 30px rgba(15, 110, 86, 0.1)",
                position: "relative",
              }}
            >
              <Chip
                label="RECOMMENDED"
                color="success"
                size="small"
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  fontWeight: 700,
                  fontSize: "0.65rem",
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#0F6E56" }}>
                  Premium
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "#0F6E56" }}>
                  ₹51
                  <Typography component="span" variant="body1" color="text.secondary">
                    /month
                  </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Full access with premium perks
                </Typography>
                <List>
                  {premiumFeatures.map((feature, idx) => (
                    <ListItem key={idx} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircle sx={{ color: "#1D9E75" }} />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <Box p={4} pt={0}>
                <Button
                  variant={status?.subscribed ? "outlined" : "contained"}
                  fullWidth
                  color="success"
                  onClick={handleSubscribe}
                  disabled={loading || status?.subscribed}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    bgcolor: status?.subscribed ? "transparent" : "#0F6E56",
                    color: status?.subscribed ? "#1D9E75" : "white",
                    borderColor: status?.subscribed ? "#1D9E75" : "transparent",
                    "&:hover": {
                      bgcolor: status?.subscribed ? "rgba(29, 158, 117, 0.08)" : "#1D9E75",
                      borderColor: status?.subscribed ? "#1D9E75" : "transparent",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : status?.subscribed ? (
                    "Current Plan"
                  ) : (
                    "Subscribe Now"
                  )}
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Subscribe;
