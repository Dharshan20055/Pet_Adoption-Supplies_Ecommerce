import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { logout } from "../../utils/authUtils";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { label: "Home",     path: "/"         },
    { label: "Pets",     path: "/pets"     },
    { label: "Supplies", path: "/supplies" },
  ];

  return (
    <AppBar position="static" elevation={0} sx={{
      background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 60%, #5DCAA5 100%)",
      borderBottom: "1px solid rgba(255,255,255,0.15)",
    }}>
      <Toolbar sx={{ gap: 1 }}>

        {/* Brand */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Box sx={{
            width: 34, height: 34,
            bgcolor: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.35)",
            borderRadius: 2,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <PetsIcon sx={{ color: "white", fontSize: 18 }} />
          </Box>
          <Typography sx={{
            fontWeight: 700, fontSize: "1.1rem", color: "white",
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.02em",
          }}>
            PetAdopt
          </Typography>
        </Box>

        {/* Nav links (logged in) */}
        {token && navLinks.map((link) => (
          <Button
            key={link.path}
            onClick={() => navigate(link.path)}
            sx={{
              color: location.pathname === link.path
                ? "white"
                : "rgba(255,255,255,0.75)",
              fontWeight: location.pathname === link.path ? 600 : 400,
              fontSize: "0.85rem",
              textTransform: "none",
              bgcolor: location.pathname === link.path
                ? "rgba(255,255,255,0.15)"
                : "transparent",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
              },
            }}
          >
            {link.label}
          </Button>
        ))}

        {!token && (
          <>
            <Button
              onClick={() => navigate("/login")}
              sx={{
                textTransform: "none",
                color: "rgba(255,255,255,0.85)",
                fontSize: "0.85rem",
                "&:hover": { bgcolor: "rgba(255,255,255,0.12)", color: "white" },
              }}>
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
              sx={{
                textTransform: "none",
                fontSize: "0.85rem",
                borderRadius: 2,
                bgcolor: "white",
                color: "#0F6E56",
                fontWeight: 600,
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              }}>
              Register
            </Button>
          </>
        )}

        {token && (
          <>
            <Button
              onClick={() => navigate("/profile")}
              sx={{
                textTransform: "none",
                color: location.pathname === "/profile"
                  ? "white"
                  : "rgba(255,255,255,0.75)",
                fontSize: "0.85rem",
                bgcolor: location.pathname === "/profile"
                  ? "rgba(255,255,255,0.15)"
                  : "transparent",
                borderRadius: 2,
                "&:hover": { bgcolor: "rgba(255,255,255,0.15)", color: "white" },
              }}>
              Profile
            </Button>
            <Button
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                fontSize: "0.85rem",
                borderRadius: 2,
                color: "#0F6E56",
                bgcolor: "white",
                fontWeight: 600,
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              }}>
              Logout
            </Button>
          </>
        )}

      </Toolbar>
    </AppBar>
  );
}