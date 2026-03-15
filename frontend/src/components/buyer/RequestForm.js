import React, { useState } from "react";
import { createRequest } from "../../services/requestService";
import { TextField, Button, Typography } from "@mui/material";

function RequestForm() {

  const [formData, setFormData] = useState({
    buyerId: "",
    petId: "",
    description: "",
    type: "ADOPTION"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createRequest(formData).then(() => {
      alert("Request submitted successfully");
    });
  };

  return (
    <div style={{ padding: 20 }}>

      <Typography variant="h4">Submit Request</Typography>

      <form onSubmit={handleSubmit}>

        <TextField
          label="Buyer ID"
          name="buyerId"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Pet ID"
          name="petId"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
        >
          Submit Request
        </Button>

      </form>

    </div>
  );
}

export default RequestForm;