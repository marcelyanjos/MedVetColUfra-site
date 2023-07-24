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
import { ReactComponent as LogoIcon } from "../../assets/Logos/Logo.svg";
import theme from "../theme";
import styles from "./styles";
import Footer from "../Footer";
import colors from "../../colors";
// import routes from '../../App'

// const drawerWidth = 240;
const navItems = [
  { titulo: "HOVET", route: "/hovet" },
  { titulo: "Canil/Gatil", route: "/canil" },
  { titulo: "Consultas", route: "" },
  { titulo: "Quero Adotar", route: "/adocao" },
  { titulo: "Blog", route: "/blog" },
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
        <Button onClick={handleDrawerToggle}>
          <CloseIcon sx={styles.menuIcon} fontSize="large" />
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
          <LogoIcon style={{ height: "128px" }} />
        </Link>
        <List sx={{ mt: -1, mb: -1 }}>
          {navItems.map((item) => (
            <ListItem key={item.titulo} disablePadding>
              <ListItemButton
                href={item.route}
                sx={{
                  color: colors.green[10],
                  "&:hover": {
                    color: colors.green[7],
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
                    fontWeight: "400",
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
            href="https://web.facebook.com/canilgatildaufra/?locale=pt_BR&_rdc=1&_rdr"
          >
            <FacebookIcon width="32px" height="32px" />
          </IconButton>
          <IconButton
            sx={styles.medias}
            aria-label="instagram"
            href="https://www.instagram.com/medvetcoletivoufra/"
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
          <Box component="div" sx={styles.titleLogo}>
            <Link href="/" sx={styles.appbarLogo} noWrap>
              <LogoIcon style={{ height: "48px" }} />
            </Link>
            <Typography
              sx={{
                [theme.breakpoints.down("sd")]: { display: "none" },
                ml: 1.5,
                fontFamily: "Roboto Mono",
                fontWeight: "bold",
                fontSize: "1.6vw",
              }}
            >
              Medicina Veterinária do Coletivo da Ufra
            </Typography>
          </Box>
          <IconButton
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={styles.menuIcon}
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
                // mr: "-3%",
              },
            }}
          >
            <Button href="/hovet" sx={styles.button}>
              HOVET
            </Button>
            <Button sx={styles.button} href="/canil">
              Canil/Gatil
            </Button>
            <Button sx={styles.button}>Consultas</Button>
            <Button sx={styles.button} href="/adocao">
              Quero Adotar
            </Button>
            <Button sx={styles.button} href="/blog">
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
            display: { xs: "block" },
            [theme.breakpoints.up("lg")]: { display: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "100%",
              "&.hide": {
                display: "none",
              },
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        sx={{
          pt: 7.5,
          width: "100%",
          height: "100%",
          overflow: mobileOpen ? "hidden" : "auto",
        }}
      >
        {/* <Toolbar /> */}
        <Box>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

// DrawerAppBar.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default DrawerAppBar;
