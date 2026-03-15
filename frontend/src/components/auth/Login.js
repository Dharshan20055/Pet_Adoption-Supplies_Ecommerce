import { useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper, Alert } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import API from "../../services/api";
import { saveToken } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      saveToken(res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #f0faf6 0%, #e6f7f0 100%)",
      px: 2,
    }}>
      <Container maxWidth="xs" disableGutters>
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
              fontFamily="'Playfair Display', serif">
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Sign in to your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Username or Email" name="usernameOrEmail"
              margin="normal" value={form.usernameOrEmail} onChange={handleChange}
              size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />

            <TextField fullWidth type="password" label="Password" name="password"
              margin="normal" value={form.password} onChange={handleChange}
              size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />

            <Button fullWidth type="submit" variant="contained" color="success"
              sx={{ mt: 2.5, py: 1.1, borderRadius: 2, textTransform: "none", fontSize: "0.95rem" }}>
              Sign in
            </Button>
          </form>

          <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
            Don't have an account?{" "}
            <Box component="span"
              sx={{ color: "success.main", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/register")}>
              Register
            </Box>
          </Typography>

        </Paper>
      </Container>
    </Box>
  );
}