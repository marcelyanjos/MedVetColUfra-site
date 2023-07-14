import * as React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { getToken, removeToken } from "../../CMS/Helpers";
import { useAuthContext } from "../../CMS/Context/AuthContext";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isAuthenticated = !!getToken();
  const { user } = useAuthContext();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Remover o token e fazer outras ações de logout necessárias
    removeToken();
    // Atualizar a página
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar alt={user?.username} sx={{ width: 32, height: 32 }}>{user?.username}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "& .css-98g8xu-MuiSvgIcon-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="perfil" style={{ textDecoration: "none", color: "black" }}>
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
        </Link>
        <MenuItem>
          <HomeRoundedIcon fontSize="large" color="disabled" /> Home
        </MenuItem>
        <Divider />
        <Button onClick={handleLogout} style={{ textDecoration: "none", color: "black" }}>
          <MenuItem>
            <ExitToAppIcon fontSize="large" color="disabled" />
            Logout
          </MenuItem>
        </Button>
      </Menu>
    </React.Fragment>
  );
}
