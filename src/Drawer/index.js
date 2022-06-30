import React, {useState} from "react";
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
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Outlet } from "react-router-dom";
import AccountMenu from "./MenuIcon/AccountMenu";
import routes from "./routes";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    backgroundColor: "#F9FAFB",
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {routes.map((item) => (
          <List>
            <ListItem key={item.nome} disablePadding>
              <ListItemButton to={item.link}>
                <ListItemIcon sx={{stroke:'#212B36'}}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.nome} />
              </ListItemButton>
            </ListItem>
          </List>
        ))}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
