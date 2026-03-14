import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { logout } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <AppBar position="static">

      <Toolbar>

        <Typography sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          Pet Adoption Marketplace
        </Typography>

        {!token && (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>

            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        )}

        {token && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}

      </Toolbar>

    </AppBar>
  );
}