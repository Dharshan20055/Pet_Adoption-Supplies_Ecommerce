import { useState, useEffect } from "react";
import { Box, Typography, Button, Stack, Paper, Chip, useMediaQuery, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PetsIcon from "@mui/icons-material/Pets";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import StarIcon from "@mui/icons-material/Star";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useNavigate } from "react-router-dom";

import API from "../../services/api";
import Loading from "../common/Loading";

const profileBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='%231D9E75' fill-opacity='0.10'%3E%3Ccircle cx='60' cy='30' r='12'/%3E%3Crect x='52' y='44' width='16' height='28' rx='4'/%3E%3Crect x='68' y='48' width='30' height='7' rx='3' transform='rotate(-20 68 48)'/%3E%3Crect x='52' y='70' width='8' height='24' rx='3' transform='rotate(10 52 70)'/%3E%3Crect x='62' y='70' width='8' height='24' rx='3' transform='rotate(-10 62 70)'/%3E%3Cellipse cx='130' cy='80' rx='22' ry='13'/%3E%3Ccircle cx='152' cy='68' r='11'/%3E%3Cellipse cx='157' cy='60' rx='5' ry='8' transform='rotate(20 157 60)'/%3E%3Cpath d='M108 75 Q95 55 100 45' stroke='%231D9E75' stroke-opacity='0.05' stroke-width='5' fill='none' stroke-linecap='round'/%3E%3Crect x='118' y='90' width='7' height='16' rx='3'/%3E%3Crect x='130' y='90' width='7' height='16' rx='3'/%3E%3Ccircle cx='100' cy='88' r='8'/%3E%3Cellipse cx='20' cy='150' rx='4' ry='5'/%3E%3Cellipse cx='30' cy='150' rx='4' ry='5'/%3E%3Cellipse cx='14' cy='162' rx='3' ry='4'/%3E%3Cellipse cx='36' cy='162' rx='3' ry='4'/%3E%3Cellipse cx='25' cy='168' rx='9' ry='7'/%3E%3Cellipse cx='160' cy='140' rx='4' ry='5'/%3E%3Cellipse cx='170' cy='140' rx='4' ry='5'/%3E%3Cellipse cx='154' cy='152' rx='3' ry='4'/%3E%3Cellipse cx='176' cy='152' rx='3' ry='4'/%3E%3Cellipse cx='165' cy='158' rx='9' ry='7'/%3E%3C/g%3E%3C/svg%3E")`;

function InfoBox({ icon, label, value }) {
  return (
    <Box sx={{ bgcolor: "#f9fef9", border: "0.5px solid #d4f0e4", borderRadius: 2.5, p: 1.5 }}>
      <Typography variant="caption" color="text.secondary"
        sx={{ textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500,
          display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
        {icon} {label}
      </Typography>
      {value
        ? <Typography variant="body2" fontWeight={500}>{value}</Typography>
        : <Typography variant="body2" color="text.secondary" fontStyle="italic">Not set</Typography>
      }
    </Box>
  );
}

function EditField({ label, icon, name, value, onChange }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <Typography variant="caption" color="text.secondary"
        sx={{ fontWeight: 500, display: "flex", alignItems: "center", gap: 0.5 }}>
        {icon} {label}
      </Typography>
      <input
        name={name}
        value={value}
        onChange={onChange}
        style={{
          padding: "9px 12px", border: "1px solid #e0e0e0", borderRadius: "8px",
          fontSize: "14px", fontFamily: "inherit", outline: "none", width: "100%",
        }}
        onFocus={e => { e.target.style.borderColor = "#1D9E75"; e.target.style.boxShadow = "0 0 0 3px rgba(29,158,117,0.12)"; }}
        onBlur={e  => { e.target.style.borderColor = "#e0e0e0"; e.target.style.boxShadow = "none"; }}
      />
    </Box>
  );
}

export default function Profile() {
  const [user, setUser]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [form, setForm]           = useState({ location: "", contact: "" });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        });
        setUser(res.data);
        setForm({ location: res.data.location || "", contact: res.data.contact || "" });
      } catch (err) {
        console.error(err);
        alert(err.response?.data || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const res = await API.put("/auth/me", form, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Update failed");
    }
  };

  const handleCancel = () => {
    setForm({ location: user.location || "", contact: user.contact || "" });
    setIsEditing(false);
  };

  if (loading) return <Loading />;
  if (!user)   return <Typography>No user data available</Typography>;

  const initials = user.username?.slice(0, 2).toUpperCase() || "?";

  return (
    <Box sx={{
      minHeight: "100vh",
      backgroundImage: profileBg,
      backgroundRepeat: "repeat",
      backgroundSize: "200px 200px",
      backgroundColor: "#ffffff",
    }}>
      <Box sx={{ maxWidth: 520, mx: "auto", pt: { xs: 3, sm: 6 }, px: 2, pb: 6 }}>
        <Paper variant="outlined" sx={{
          borderRadius: 3, overflow: "hidden",
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(6px)",
        }}>

          {/* Banner */}
          <Box sx={{
            height: { xs: 80, sm: 100 },
            background: "linear-gradient(135deg, #0F6E56, #1D9E75, #5DCAA5)",
            position: "relative",
          }}>
            <Box sx={{
              position: "absolute", bottom: { xs: -24, sm: -32 }, left: { xs: 16, sm: 28 },
              width: { xs: 52, sm: 64 }, height: { xs: 52, sm: 64 }, borderRadius: "50%",
              bgcolor: "#085041", border: "3px solid white",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Typography sx={{
                color: "#9FE1CB", fontWeight: 600,
                fontSize: { xs: "1rem", sm: "1.3rem" },
              }}>
                {initials}
              </Typography>
            </Box>

            {!isEditing && (
              <Button
                size="small"
                startIcon={<EditIcon sx={{ fontSize: "13px !important" }} />}
                onClick={() => setIsEditing(true)}
                sx={{
                  position: "absolute", bottom: { xs: -14, sm: -18 }, right: { xs: 12, sm: 20 },
                  bgcolor: "white", color: "success.main",
                  border: "0.5px solid", borderColor: "divider",
                  textTransform: "none", fontSize: "12px", borderRadius: 2,
                  "&:hover": { bgcolor: "#f0faf6" },
                  px: 1.5, py: 0.5,
                }}>
                Edit profile
              </Button>
            )}
          </Box>

          {/* Content */}
          <Box sx={{ px: { xs: 2, sm: 3.5 }, pt: { xs: 4.5, sm: 5.5 }, pb: 3 }}>

            <Typography variant="h6" fontWeight={700}
              fontFamily="'Playfair Display', serif" mb={0.5}>
              {user.username}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mb={2}
              sx={{ flexWrap: "wrap", gap: 0.5 }}>
              <Chip
                icon={<EmailIcon sx={{ fontSize: "13px !important" }} />}
                label={user.email}
                size="small" variant="outlined"
                sx={{ fontSize: { xs: 11, sm: 12 }, height: 24,
                  borderColor: "#9FE1CB", bgcolor: "#f0faf6", color: "#0F6E56" }}
              />
              <Chip
                label={user.role || "USER"}
                size="small"
                sx={{ fontSize: 11, height: 22, bgcolor: "#f5f5f5", color: "#888" }}
              />
            </Stack>

            {/* Stats row */}
            <Stack direction="row" sx={{
              borderTop: "0.5px solid", borderBottom: "0.5px solid",
              borderColor: "divider", py: 1.5, mb: 2.5,
            }}>
              {[
                { icon: <PetsIcon sx={{ fontSize: 16, color: "success.main" }} />, val: "0", label: "Pets adopted" },
                { icon: <Inventory2Icon sx={{ fontSize: 16, color: "success.main" }} />, val: "0", label: "Supplies listed" },
                { icon: <LocationOnIcon sx={{ fontSize: 16, color: "success.main" }} />, val: user.location || "—", label: "Location" },
              ].map((s) => (
                <Box key={s.label} sx={{ flex: 1, textAlign: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 0.3 }}>{s.icon}</Box>
                  <Typography variant="body2" fontWeight={600} color="success.main"
                    sx={{ fontSize: { xs: 11, sm: 14 } }}>
                    {s.val}
                  </Typography>
                  <Typography variant="caption" color="text.secondary"
                    sx={{ fontSize: { xs: 10, sm: 12 } }}>
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* Subscription Section */}
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 2.5,
                borderRadius: 3,
                bgcolor: user.subscribed ? "rgba(29, 158, 117, 0.05)" : "rgba(0, 0, 0, 0.02)",
                borderColor: user.subscribed ? "#1D9E75" : "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: user.subscribed ? "#1D9E75" : "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {user.subscribed ? <StarIcon /> : <VerifiedUserIcon />}
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={700} color={user.subscribed ? "#0F6E56" : "text.primary"}>
                    {user.subscribed ? "Premium Member" : "Free Plan"}
                  </Typography>
                  {user.subscribed && user.subscriptionExpiresAt && (
                    <Typography variant="caption" color="text.secondary">
                      Valid until: {new Date(user.subscriptionExpiresAt).toLocaleDateString()}
                    </Typography>
                  )}
                  {!user.subscribed && (
                    <Typography variant="caption" color="text.secondary">
                      Upgrade for just ₹51/month
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>

            {/* View mode */}

            {!isEditing && (
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} mb={2.5}>
                <Box sx={{ flex: 1 }}>
                  <InfoBox icon={<LocationOnIcon sx={{ fontSize: 13 }} />}
                    label="Location" value={user.location} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InfoBox icon={<PhoneIcon sx={{ fontSize: 13 }} />}
                    label="Contact" value={user.contact} />
                </Box>
              </Stack>
            )}

            {/* Edit mode */}
            {isEditing && (
              <>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} mb={2}>
                  <Box sx={{ flex: 1 }}>
                    <EditField label="Location" icon={<LocationOnIcon sx={{ fontSize: 13 }} />}
                      name="location" value={form.location} onChange={handleChange} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <EditField label="Contact" icon={<PhoneIcon sx={{ fontSize: 13 }} />}
                      name="contact" value={form.contact} onChange={handleChange} />
                  </Box>
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "center" }}>
                  <Button variant="contained" color="success" size="small"
                    fullWidth={isMobile}
                    onClick={handleUpdate}
                    sx={{ textTransform: "none", borderRadius: 2 }}>
                    Update profile
                  </Button>
                  <Button variant="outlined" size="small" color="inherit"
                    fullWidth={isMobile}
                    onClick={handleCancel}
                    sx={{ textTransform: "none", borderRadius: 2,
                      borderColor: "divider", color: "text.secondary" }}>
                    Cancel
                  </Button>
                  {!isMobile && (
                    <Typography variant="caption" color="text.secondary">
                      Only location and contact can be edited.
                    </Typography>
                  )}
                </Stack>
                {isMobile && (
                  <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                    Only location and contact can be edited.
                  </Typography>
                )}
              </>
            )}

            {!isEditing && (
              <Typography variant="caption" color="text.secondary" display="block" mt={1.5}>
                Member since {new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </Typography>
            )}

          </Box>
        </Paper>
      </Box>
    </Box>
  );
}