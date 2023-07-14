//Menu Lateral e Topo de pagina do admin
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../CMS/Context/AuthContext";
import AccountMenu from "./AccountMenu";
import profile from "../../mockup/profile";
import { ReactComponent as LogoIcon } from "../../assets/Logos/Logo.svg";
import styles from "./styles";
import routes from "./routes";
import colors from "../../colors";

//Component Body
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    backgroundColor: "#F9FAFB",
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(4),
    // paddingBottom: theme.spacing(4),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

//Menu Lateral
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={styles.appbar} elevation={0} position="fixed" open={open}>
        {/* Corpo da barra de principal */}
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuRoundedIcon fontSize='large'/>
          </IconButton>
          <LogoIcon style={{ height: "48px" }} />
          <Typography
              sx={{
                [theme.breakpoints.down("sd")]: { display: "none" },
                ml: 1.5,
                fontFamily: "Roboto Mono",
                fontSize: "1.6vw",
              }}
            >
              Medicina Veterinária do Coletivo da Ufra
            </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <AccountMenu />
        </Toolbar>
        {/* Fim da barra principal */}
      </AppBar>
      <Drawer
        sx={styles.drawer}
        // variant="persistent"
        anchor="left"
        open={open}
      >
        {/* Corpo do Menu Lateral */}
        <DrawerHeader>
          <Typography sx={styles.drawerLogoName}>Pet Ufra</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <div style={styles.menuDrawer}>
          <Avatar
            alt={user?.username}
            sx={{ width: 200, height: 200 }}
            src={profile.src}
          />
          <Typography sx={{ color: "#74C1EB", fontSize: 28 }}>
            {user?.name}
          </Typography>
          <Typography sx={{ color: "#74C1EB" }}>{profile.username}</Typography>
        </div>
        <Divider />

        {/* Lista de menus paginas */}
        {routes.map((item) => (
          <List sx={{ padding: 0, ml: 2 }}>
            <ListItem key={item.nome} disablePadding>
              <ListItemButton
                to={item.link}
                style={{
                  height: 45,
                  marginTop: 5,
                  backgroundColor:
                    "/admin/dashboard/" + item.link === window.location.pathname
                      ? "rgba(179, 232, 255, 0.6)"
                      : "white",
                  marginLeft:
                    "/admin/dashboard/" + item.link === window.location.pathname
                      ? 0
                      : 20,
                  borderRadius: 4,
                }}
              >
                <ListItemIcon
                  sx={{
                    stroke: "#74c1eb",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: "#74c1eb",
                  }}
                  primary={item.nome}
                  primaryTypographyProps={{ fontSize: "100%" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        ))}
        {/* Fim do menu lateral */}
      </Drawer>

      {/* Body */}
      <Main open={open}>
        <DrawerHeader />
        {/* Outlet necessário para abrir as paginas junto do menu (integrador) */}
        <Outlet />
      </Main>
    </Box>
  );
}
