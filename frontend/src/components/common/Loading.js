import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
  40% { transform: translateY(-10px); opacity: 1; }
`;

export default function Loading() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center"
      justifyContent="center" height="80vh" gap={2}>
      <Box display="flex" gap={1} alignItems="flex-end">
        {[0, 0.2, 0.4, 0.6].map((delay, i) => (
          <Box key={i} sx={{
            width: 10, height: 10, borderRadius: "50%", bgcolor: "success.main",
            animation: `${bounce} 1.2s ease-in-out ${delay}s infinite`,
          }} />
        ))}
      </Box>
      <Typography variant="body2" color="text.secondary">
        Finding your companions...
      </Typography>
    </Box>
  );
}