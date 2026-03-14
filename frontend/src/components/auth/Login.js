import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import API from "../../services/api";
import { saveToken } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", form);

      saveToken(res.data.token);

      navigate("/");

    } catch (err) {

      console.error(err);
      alert(err.response?.data?.message || "Login failed");

    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4">Login</Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            fullWidth
            label="Username or Email"
            name="usernameOrEmail"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            margin="normal"
            onChange={handleChange}
          />

          <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
            Login
          </Button>

        </form>
      </Box>
    </Container>
  );
}