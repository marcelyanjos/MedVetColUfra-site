import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { ReactComponent as FacebookIcon } from "../../assets/facebook.svg";
import theme from "./theme";
import styles from "./styles";
import Footer from "../Footer";
// import routes from '../../App'

// const drawerWidth = 240;
const navItems = [
  { titulo: "Institucional", route: "institucional" },
  { titulo: "Quero Adotar", route: "" },
  { titulo: "Quero Doar", route: "" },
  { titulo: "Eventos", route: "" },
  { titulo: "Blog", route: "blog" },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Menu Lateral
  const drawer = (
    <Box sx={styles.drawerBody}>
      <div style={styles.close}>
        <Button
          style={{
            color: "#102582",
            backgroundColor: "transparent",
          }}
          onClick={handleDrawerToggle}
        >
          <CloseIcon fontSize="large" />
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="/" sx={styles.drawerLogo} noWrap>
          PetUfra
        </Link>
        <List sx={{ mt: -1, mb: -1 }}>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                href={item.route}
                sx={{
                  color: "#102582",
                  "&&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ListItemText
                  primary={item.titulo}
                  primaryTypographyProps={{
                    fontSize: "18px",
                    textAlign: "center",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <div style={{ display: "flex", paddingTop: 10 }}>
          <IconButton
            sx={styles.medias}
            aria-label="facebook"
            href="https://pt-br.facebook.com/diomakethechange/"
          >
            <FacebookIcon width="32px" height="32px" />
          </IconButton>
          <IconButton
            sx={styles.medias}
            aria-label="instagram"
            href="https://www.instagram.com/dio_makethechange/"
          >
            <InstagramIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box theme={theme} sx={{ display: "flex" }}>
      <AppBar position="absolute" component="nav" style={styles.appbar}>
        <Toolbar sx={styles.toolbar}>
          <Box
            component="div"
            style={{ flexGrow: 0.8, display: "flex", alignItems: "flex-start" }}
          >
            <Link href="/" sx={styles.appbarLogo} noWrap>
              Pet Ufra
            </Link>
          </Box>
          <IconButton
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              color: "#102582",
              mr: { sm: "-5%" },
              [theme.breakpoints.up("lg")]: {
                display: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              [theme.breakpoints.down("lg")]: {
                display: "none",
              },
              [theme.breakpoints.up("lg")]: {
                display: "flex",
                mr: "-3%",
              },
            }}
          >
            <Button href="institucional" sx={styles.button}>
              Institucional
            </Button>
            <Button sx={styles.button}>Quero Adotar</Button>
            <Button sx={styles.button}>Quero Doar</Button>
            <Button sx={styles.button}>Eventos</Button>
            <Button sx={styles.button} href="blog">
              Blog
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sx: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "100%",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box sx={{ pt: 7.5, width: "100%", height: "100%" }}>
        {/* <Toolbar /> */}
        <Box sx={{ width: "100%", height: "100%" }}>
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
