import { useState } from "react";
import {
  AppBar, Toolbar, Button, Typography, Box,
  IconButton, Drawer, List, ListItem, ListItemButton,
  ListItemText, Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import { logout } from "../../utils/authUtils";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDrawerOpen(false);
  };

  const navLinks = [
    { label: "Home",     path: "/"         },
    { label: "Pets",     path: "/pets"     },
    { label: "Supplies", path: "/supplies" },
  ];

  const handleNav = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
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
            }}>
              PetAdopt
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
            {token && navLinks.map((link) => (
              <Button key={link.path} onClick={() => navigate(link.path)} sx={{
                color: location.pathname === link.path ? "white" : "rgba(255,255,255,0.75)",
                fontWeight: location.pathname === link.path ? 600 : 400,
                fontSize: "0.85rem", textTransform: "none",
                bgcolor: location.pathname === link.path ? "rgba(255,255,255,0.15)" : "transparent",
                borderRadius: 2,
                "&:hover": { bgcolor: "rgba(255,255,255,0.15)", color: "white" },
              }}>
                {link.label}
              </Button>
            ))}

            {!token && (
              <>
                <Button onClick={() => navigate("/login")} sx={{
                  textTransform: "none", color: "rgba(255,255,255,0.85)", fontSize: "0.85rem",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.12)", color: "white" },
                }}>
                  Login
                </Button>
                <Button onClick={() => navigate("/register")} sx={{
                  textTransform: "none", fontSize: "0.85rem", borderRadius: 2,
                  bgcolor: "white", color: "#0F6E56", fontWeight: 600,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                }}>
                  Register
                </Button>
              </>
            )}

            {token && (
              <>
                <Button onClick={() => navigate("/profile")} sx={{
                  textTransform: "none",
                  color: location.pathname === "/profile" ? "white" : "rgba(255,255,255,0.75)",
                  fontSize: "0.85rem",
                  bgcolor: location.pathname === "/profile" ? "rgba(255,255,255,0.15)" : "transparent",
                  borderRadius: 2,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.15)", color: "white" },
                }}>
                  Profile
                </Button>
                <Button onClick={handleLogout} sx={{
                  textTransform: "none", fontSize: "0.85rem", borderRadius: 2,
                  color: "#0F6E56", bgcolor: "white", fontWeight: 600,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                }}>
                  Logout
                </Button>
              </>
            )}
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240, pt: 2 }}>

          {/* Brand in drawer */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, mb: 2 }}>
            <Box sx={{
              width: 30, height: 30, bgcolor: "success.main", borderRadius: 1.5,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <PetsIcon sx={{ color: "white", fontSize: 16 }} />
            </Box>
            <Typography fontWeight={700} fontFamily="'Playfair Display', serif">
              PetAdopt
            </Typography>
          </Box>

          <Divider />

          <List>
            {token && navLinks.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton
                  onClick={() => handleNav(link.path)}
                  selected={location.pathname === link.path}
                  sx={{
                    "&.Mui-selected": { bgcolor: "#f0faf6", color: "success.main" },
                    "&.Mui-selected:hover": { bgcolor: "#e6f7f0" },
                  }}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}

            {token && (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNav("/profile")}
                  selected={location.pathname === "/profile"}
                  sx={{
                    "&.Mui-selected": { bgcolor: "#f0faf6", color: "success.main" },
                  }}
                >
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
            )}
          </List>

          <Divider />

          <Box sx={{ px: 2, pt: 2 }}>
            {!token && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button fullWidth variant="outlined" color="success"
                  onClick={() => handleNav("/login")}
                  sx={{ textTransform: "none", borderRadius: 2 }}>
                  Login
                </Button>
                <Button fullWidth variant="contained" color="success"
                  onClick={() => handleNav("/register")}
                  sx={{ textTransform: "none", borderRadius: 2 }}>
                  Register
                </Button>
              </Box>
            )}
            {token && (
              <Button fullWidth variant="contained" color="success"
                onClick={handleLogout}
                sx={{ textTransform: "none", borderRadius: 2 }}>
                Logout
              </Button>
            )}
          </Box>

        </Box>
      </Drawer>
    </>
  );
}