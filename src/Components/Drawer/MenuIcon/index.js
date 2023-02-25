//Menu Lateral e Topo de pagina
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Outlet } from "react-router-dom";
import AccountMenu from "./MenuIcon/AccountMenu";
import profile from "../pages/Dashboard/Profile/mockup";
import routes from "./routes";

const drawerWidth = 320;

//Estilo do Body
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
    // marginLeft: `-${drawerWidth}px`,
    // ...(open && {
    //   transition: theme.transitions.create("margin", {
    //     easing: theme.transitions.easing.easeOut,
    //     duration: theme.transitions.duration.enteringScreen,
    //   }),
    //   marginLeft: 0,
    // }),
  })
);

//Estilo do topo
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // ...(open && {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginLeft: `${drawerWidth}px`,
  //   transition: theme.transitions.create(["margin", "width"], {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // }),
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
  const [open, setOpen] = React.useState(false);
  const [isPage, setIsPage] = React.useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: "rgba(179, 232, 255, 0.6)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
        elevation={0}
        position="fixed"
        open={open}
      >
        {/* Corpo da barra de principal */}
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ color: "#212b36", mr: 2 }}
          >
            <MenuRoundedIcon sx={{ fontSize: 25 }} />
          </IconButton>
          <Typography
            sx={{
              color: "#212B36",
              fontSize: 35,
              fontFamily: "Public Sans",
              fontWeight: "500",
            }}
            noWrap
            component="div"
          >
            Pet Ufra
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <AccountMenu />
        </Toolbar>
        {/* Fim da barra principal */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            // backgroundColor:"#cfeffd",
            boxSizing: "border-box",
          },
        }}
        // variant="persistent"
        anchor="left"
        open={open}
      >
        {/* Corpo do Menu Lateral */}
        <DrawerHeader>
          <Typography
            sx={{
              color: "#74C1EB",
              fontSize: 30,
              fontFamily: "Public Sans",
              fontWeight: "500",
              width:'85%',
              // display:'flex',
              alignItems:'start'
            }}
          >
            Pet Ufra
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
         
          <Avatar
            alt={profile.name + profile.surname}
            sx={{ width: 200, height: 200 }}
            src={profile.src}
          />
          <Typography sx={{color:"#74C1EB", fontSize:28}}>{profile.name+' '+profile.surname}</Typography>
          <Typography sx={{color:"#74C1EB"}}>{profile.username}</Typography>
        </div>
        <Divider />

          {/* Lista de menus paginas */}
        {routes.map((item) => (
          <List sx={{ padding: 0, ml: 2 }}>
            <ListItem key={item.nome} disablePadding>
              <ListItemButton
                to={item.link}
                style={{
                  height:45,
                  marginTop:5,
                  backgroundColor:
                    "/admin/dashboard/" + item.link == window.location.pathname
                      ? "rgba(179, 232, 255, 0.6)"
                      : "white",
                  marginLeft: "/admin/dashboard/" + item.link == window.location.pathname
                  ? 0
                  : 20,
                  borderRadius: 4,
                }}
              >
                <ListItemIcon
                  sx={{
                    stroke:'#74c1eb',
                      // "/dashboard/" + item.link == window.location.pathname
                      //   ? "#7bace8"
                      //   : "#666666",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color:'#74c1eb'
                      // "/dashboard/" + item.link == window.location.pathname
                      //   ? "#7bace8"
                      //   : "#666666",
                  }}
                  primary={item.nome}
                  primaryTypographyProps={{ fontSize: '100%' }}
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
