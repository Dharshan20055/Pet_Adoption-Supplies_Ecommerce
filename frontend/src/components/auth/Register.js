import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    location: ""
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

      await API.post("/auth/register", form);

      alert("Registration successful");

      navigate("/login");

    } catch (err) {

      alert(err.response?.data?.message || "Registration failed");

    }
  };

  return (

    <Container maxWidth="sm">

      <Box mt={5}>

        <Typography variant="h4">Register</Typography>

        <form onSubmit={handleSubmit}>

          <TextField fullWidth label="Username" name="username" margin="normal" onChange={handleChange}/>
          <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange}/>
          <TextField fullWidth type="password" label="Password" name="password" margin="normal" onChange={handleChange}/>
          <TextField fullWidth label="Contact" name="contact" margin="normal" onChange={handleChange}/>
          <TextField fullWidth label="Location" name="location" margin="normal" onChange={handleChange}/>

          <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
            Register
          </Button>

        </form>

      </Box>

    </Container>
  );
}