import { Box, CircularProgress } from "@mui/material";

export default function Loading() {

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <CircularProgress size={60} />
    </Box>
  );
}