import { Box, Typography, Button, Paper, Stack, Chip, Grid, Divider } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Pets available",  value: "142", sub: "+12 this week"  },
  { label: "Adoptions",       value: "38",  sub: "this month"     },
  { label: "Supplies listed", value: "210", sub: "from 60 donors" },
];

const quickLinks = [
  { icon: <PetsIcon />,       title: "Adopt a pet", desc: "Find dogs, cats & more", path: "/pets",     color: "#E1F5EE" },
  { icon: <Inventory2Icon />, title: "Supplies",    desc: "Browse or donate items", path: "/supplies", color: "#FAEEDA" },
  { icon: <PersonIcon />,     title: "My profile",  desc: "Edit your details",      path: "/profile",  color: "#EEEDFE" },
  { icon: <LocationOnIcon />, title: "Shelters",    desc: "Locations near you",     path: "/shelters", color: "#E6F1FB" },
];

const pawPatternBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%231D9E75' fill-opacity='0.08'%3E%3Cellipse cx='30' cy='20' rx='5' ry='6'/%3E%3Cellipse cx='50' cy='20' rx='5' ry='6'/%3E%3Cellipse cx='20' cy='32' rx='4' ry='5'/%3E%3Cellipse cx='60' cy='32' rx='4' ry='5'/%3E%3Cellipse cx='40' cy='48' rx='12' ry='10'/%3E%3C/g%3E%3C/svg%3E")`;

function Footer({ navigate }) {
  return (
    <Box sx={{
      borderTop: "1px solid",
      borderColor: "divider",
      background: "linear-gradient(180deg, #f0faf6 0%, #e6f7f0 100%)",
    }}>
      <Box sx={{ maxWidth: 1100, mx: "auto", px: { xs: 3, sm: 6 }, py: { xs: 4, sm: 6 } }}>

        {/* Top row */}
        <Grid container spacing={{ xs: 3, sm: 6 }} sx={{ mb: { xs: 3, sm: 5 } }}>

          {/* Brand */}
          <Grid item xs={12} sm={4}>
            <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
              <Box sx={{
                width: 32, height: 32, bgcolor: "success.main", borderRadius: 2,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <PetsIcon sx={{ color: "white", fontSize: 18 }} />
              </Box>
              <Typography fontWeight={700} fontSize="1.1rem"
                sx={{ fontFamily: "'Playfair Display', serif", color: "#0F6E56" }}>
                PetAdopt
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" lineHeight={1.8}
              sx={{ maxWidth: { xs: "100%", sm: 280 } }}>
              Connecting pets with loving families. Every animal deserves a forever home.
            </Typography>
            <Stack direction="row" spacing={1} mt={2}>
              {["🐾", "🐶", "🐱"].map((e, i) => (
                <Box key={i} sx={{
                  width: 32, height: 32, borderRadius: 1.5,
                  bgcolor: "white", border: "0.5px solid #9FE1CB",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: 14,
                }}>
                  {e}
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Quick links */}
          <Grid item xs={6} sm={2}>
            <Typography variant="caption" fontWeight={700} color="#0F6E56"
              sx={{ textTransform: "uppercase", letterSpacing: 1.2, display: "block", mb: 2 }}>
              Quick links
            </Typography>
            {[
              { label: "Browse pets", path: "/pets"     },
              { label: "Supplies",    path: "/supplies" },
              { label: "Shelters",    path: "/shelters" },
              { label: "My profile",  path: "/profile"  },
            ].map((l) => (
              <Typography key={l.label} variant="body2" color="text.secondary"
                onClick={() => navigate(l.path)}
                sx={{ cursor: "pointer", mb: 1,
                  "&:hover": { color: "success.main" }, transition: "color 0.2s" }}>
                {l.label}
              </Typography>
            ))}
          </Grid>

          {/* About */}
          <Grid item xs={6} sm={2}>
            <Typography variant="caption" fontWeight={700} color="#0F6E56"
              sx={{ textTransform: "uppercase", letterSpacing: 1.2, display: "block", mb: 2 }}>
              About
            </Typography>
            {["How it works", "Adoption tips", "Contact us", "Privacy policy"].map((l) => (
              <Typography key={l} variant="body2" color="text.secondary"
                sx={{ cursor: "pointer", mb: 1,
                  "&:hover": { color: "success.main" }, transition: "color 0.2s" }}>
                {l}
              </Typography>
            ))}
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={4}>
            <Typography variant="caption" fontWeight={700} color="#0F6E56"
              sx={{ textTransform: "uppercase", letterSpacing: 1.2, display: "block", mb: 2 }}>
              Stay updated
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1.5}>
              Get weekly updates on new pets and adoption stories.
            </Typography>
            <Stack direction="row" spacing={1}>
              <input
                placeholder="your@email.com"
                style={{
                  flex: 1, padding: "8px 12px", border: "1px solid #9FE1CB",
                  borderRadius: "8px", fontSize: "13px", outline: "none",
                  fontFamily: "inherit", background: "white", minWidth: 0,
                }}
              />
              <Button variant="contained" color="success" size="small"
                sx={{ textTransform: "none", borderRadius: 2, px: 2, whiteSpace: "nowrap" }}>
                Subscribe
              </Button>
            </Stack>
          </Grid>

        </Grid>

        <Divider sx={{ borderColor: "#9FE1CB", mb: 3 }} />

        {/* Bottom row */}
        <Stack direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between" alignItems="center"
          spacing={{ xs: 1.5, sm: 1 }}>
          <Typography variant="caption" color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            Made with <FavoriteIcon sx={{ fontSize: 12, color: "error.main" }} /> for pets · © {new Date().getFullYear()} PetAdopt
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="caption" color="text.secondary"
              sx={{ cursor: "pointer", "&:hover": { color: "success.main" } }}>
              Terms
            </Typography>
            <Typography variant="caption" color="text.secondary"
              sx={{ cursor: "pointer", "&:hover": { color: "success.main" } }}>
              Privacy
            </Typography>
            <Box sx={{
              width: 28, height: 28, borderRadius: 1.5,
              border: "0.5px solid #9FE1CB", bgcolor: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
              <GitHubIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            </Box>
          </Stack>
        </Stack>

      </Box>
    </Box>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{
      minHeight: "100vh",
      backgroundImage: pawPatternBg,
      backgroundRepeat: "repeat",
      backgroundSize: "120px 120px",
      backgroundColor: "#ffffff",
    }}>
      <Box sx={{
        maxWidth: 700, mx: "auto",
        px: { xs: 2, sm: 3 },
        pt: { xs: 4, sm: 7 },
        pb: 6,
        textAlign: "center",
      }}>

        {/* Hero */}
        <Chip label="Welcome back" color="success" size="small" sx={{ mb: 2.5 }} />

        <Typography
          fontWeight={700} gutterBottom
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
          }}>
          Find your perfect{" "}
          <Box component="span" sx={{ color: "success.main" }}>
            furry companion
          </Box>
        </Typography>

        <Typography variant="body1" color="text.secondary"
          sx={{ mb: 4, maxWidth: 480, mx: "auto", lineHeight: 1.8,
            fontSize: { xs: "0.9rem", sm: "1rem" } }}>
          Browse pets looking for a forever home, manage your supplies,
          and connect with fellow adopters in your area.
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }}
          spacing={2} justifyContent="center" sx={{ mb: 6 }}>
          <Button variant="contained" color="success"
            size="large"
            onClick={() => navigate("/pets")}
            fullWidth={false}
            sx={{ textTransform: "none", borderRadius: 2, px: 3,
              width: { xs: "100%", sm: "auto" } }}>
            Browse pets
          </Button>
          <Button variant="outlined"
            size="large"
            onClick={() => navigate("/profile")}
            sx={{ textTransform: "none", borderRadius: 2, px: 3,
              width: { xs: "100%", sm: "auto" } }}>
            My profile
          </Button>
        </Stack>

        {/* Stats */}
        <Grid container spacing={2} sx={{ mb: 6 }} justifyContent="center">
          {stats.map((s) => (
            <Grid item xs={12} sm={4} key={s.label}>
              <Paper variant="outlined" sx={{
                p: 2.5, borderRadius: 3,
                backdropFilter: "blur(4px)",
                backgroundColor: "rgba(255,255,255,0.85)",
              }}>
                <Typography variant="body2" color="text.secondary">{s.label}</Typography>
                <Typography variant="h4" fontWeight={600} sx={{ my: 0.5 }}>{s.value}</Typography>
                <Typography variant="caption" color="success.main" fontWeight={500}>{s.sub}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Quick Links */}
        <Typography variant="overline" color="text.secondary" display="block" sx={{ mb: 1.5 }}>
          Quick actions
        </Typography>

        <Grid container spacing={2} sx={{ mb: 5 }}>
          {quickLinks.map((link) => (
            <Grid item xs={6} sm={3} key={link.title}>
              <Paper variant="outlined" onClick={() => navigate(link.path)} sx={{
                p: { xs: 1.5, sm: 2 }, borderRadius: 3, cursor: "pointer", textAlign: "center",
                backgroundColor: "rgba(255,255,255,0.85)",
                "&:hover": { boxShadow: 3, transform: "translateY(-2px)", transition: "all 0.2s" },
              }}>
                <Box sx={{
                  width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 }, borderRadius: 2,
                  background: link.color, display: "flex",
                  alignItems: "center", justifyContent: "center", mx: "auto", mb: 1,
                }}>
                  {link.icon}
                </Box>
                <Typography variant="body2" fontWeight={500}
                  sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                  {link.title}
                </Typography>
                <Typography variant="caption" color="text.secondary"
                  sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                  {link.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Tip */}
        <Paper sx={{
          p: { xs: 2, sm: 2.5 }, borderRadius: 3, textAlign: "left",
          bgcolor: "rgba(230, 248, 241, 0.9)",
          border: "1px solid", borderColor: "#9FE1CB",
        }}>
          <Typography variant="caption" color="success.dark" fontWeight={600}
            display="block" sx={{ mb: 0.5 }}>
            🐾 Tip of the day
          </Typography>
          <Typography variant="body2" color="success.dark"
            sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
            Newly adopted pets need 2–3 weeks to decompress. Give them a quiet
            space and let them explore at their own pace.
          </Typography>
        </Paper>

      </Box>

      {/* Footer */}
      <Footer navigate={navigate} />

    </Box>
  );
}