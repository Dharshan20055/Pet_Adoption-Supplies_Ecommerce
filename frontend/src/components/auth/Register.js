import { useState } from "react";
import {
  Box, TextField, Button, Typography, Container, Paper, Divider, Alert,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "", email: "", password: "", contact: "", location: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: 2 } };

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #f0faf6 0%, #e6f7f0 100%)",
      px: 2, py: 4,
    }}>
      <Container maxWidth="sm" disableGutters>
        <Paper variant="outlined" sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>

          <Box textAlign="center" mb={3}>
            <Box sx={{
              width: 52, height: 52, bgcolor: "#E1F5EE", borderRadius: 3,
              display: "flex", alignItems: "center", justifyContent: "center",
              mx: "auto", mb: 1.5,
            }}>
              <PetsIcon sx={{ color: "success.main", fontSize: 26 }} />
            </Box>
            <Typography variant="h5" fontWeight={700}
              sx={{ fontFamily: "'Playfair Display', serif" }}>
              Create account
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Join the pet adoption community
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>

            <Divider sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={500}
                sx={{ textTransform: "uppercase", letterSpacing: 1 }}>
                Account
              </Typography>
            </Divider>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5, mb: 1.5 }}>
              <TextField fullWidth size="small" label="Username" name="username"
                value={form.username} onChange={handleChange} sx={fieldSx} />
              <TextField fullWidth size="small" label="Email" name="email"
                value={form.email} onChange={handleChange} sx={fieldSx} />
            </Box>

            <TextField fullWidth size="small" type="password" label="Password"
              name="password" value={form.password} onChange={handleChange}
              sx={fieldSx}
              helperText="Min 8 chars, must include uppercase, lowercase, number & special character (@$!%*?&)"
            />

            <Divider sx={{ mt: 2.5, mb: 2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={500}
                sx={{ textTransform: "uppercase", letterSpacing: 1 }}>
                Details
              </Typography>
            </Divider>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5 }}>
              <TextField fullWidth size="small" label="Contact" name="contact"
                value={form.contact} onChange={handleChange} sx={fieldSx} />
              <TextField fullWidth size="small" label="Location" name="location"
                value={form.location} onChange={handleChange} sx={fieldSx} />
            </Box>

            <Button fullWidth type="submit" variant="contained" color="success"
              sx={{ mt: 3, py: 1.1, borderRadius: 2, textTransform: "none", fontSize: "0.95rem" }}>
              Create account
            </Button>

          </form>

          <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
            Already have an account?{" "}
            <Box component="span"
              sx={{ color: "success.main", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/login")}>
              Sign in
            </Box>
          </Typography>

        </Paper>
      </Container>
    </Box>
  );
}