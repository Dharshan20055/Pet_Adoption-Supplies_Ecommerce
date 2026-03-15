import React, { useEffect, useState } from "react";
import { getBuyerRequests } from "../../services/requestService";
import { Card, CardContent, Typography } from "@mui/material";

const buyerId = "11111111-1111-1111-1111-111111111111";

function RequestStatus() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getBuyerRequests(buyerId).then((res) => {
      setRequests(res.data);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>

      <Typography variant="h4">My Requests</Typography>

      {requests.map((req) => (
        <Card key={req.requestId} style={{ marginTop: 20 }}>
          <CardContent>

            <Typography>Pet ID: {req.petId}</Typography>
            <Typography>Status: {req.status}</Typography>
            <Typography>Type: {req.type}</Typography>

          </CardContent>
        </Card>
      ))}

    </div>
  );
}

export default RequestStatus;