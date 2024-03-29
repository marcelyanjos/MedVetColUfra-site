// Menu Lateral e Topo de pagina do admin
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import {
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import MuiAppBar from '@mui/material/AppBar'
import { styled, useTheme } from '@mui/material/styles'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuthContext } from '../../CMS/Context/AuthContext'
import { ReactComponent as LogoIcon } from '../../assets/Logos/Logo.svg'
import profile from '../../mockup/profile'
import colors from '../../styles/colors'
import AccountMenu from './AccountMenu'
import routes from './routes'
import styles from './styles'

// Component Body
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    backgroundColor: '#F9FAFB',
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(4),
    // paddingBottom: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  }),
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}))

// Menu Lateral
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function PersistentDrawerLeft() {
  const theme = useTheme()
  const { user } = useAuthContext()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  // console.log("url", window.location.pathname);

  return (
    <Box sx={{ display: 'flex' }}>
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
            <MenuRoundedIcon fontSize="large" />
          </IconButton>
          <LogoIcon style={{ height: '48px' }} />
          <Typography
            sx={{
              [theme.breakpoints.down('sd')]: { display: 'none' },
              ml: 1.5,
              fontFamily: 'Roboto Mono',
              fontSize: '1.6vw',
            }}
          >
            VetHub UFRA
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
          <Typography sx={styles.drawerLogoName}>
            MedVet Coletivo Ufra
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
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
          <Typography sx={{ fontSize: 28 }}>{user?.name}</Typography>
          <Typography>{user?.username}</Typography>
        </div>
        <Divider />

        {/* Lista de menus paginas */}
        {routes.map((item) => (
          <List key={item.nome} sx={{ padding: 0, ml: 2 }}>
            {item.sections ? (
              <Accordion
                defaultExpanded={item.sections.some(
                  (section) => section.link === window.location.pathname,
                )}
                sx={{
                  elevation: 0,
                  boxShadow: 'none',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    height: '50px',
                    borderRadius: 1,
                    '&.Mui-expanded': {
                      minHeight: '50px',
                      maxHeight: '50px',
                    },
                    marginLeft: item.sections.some(
                      (section) => section.link === window.location.pathname,
                    )
                      ? 0
                      : 2,
                    backgroundColor: item.sections.some(
                      (section) => section.link === window.location.pathname,
                    )
                      ? colors.green[0]
                      : 'white',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      '&.MuiListItemIcon-root': {
                        fill:
                          item.link === window.location.pathname
                            ? colors.green[7]
                            : colors.green[4],
                        stroke:
                          item.link === window.location.pathname
                            ? colors.green[7]
                            : colors.green[4],
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color: colors.green[7],
                    }}
                    primary={item.nome}
                    primaryTypographyProps={{ fontSize: '100%' }}
                  />
                </AccordionSummary>
                <AccordionDetails sx={{ mt: -2, pb: 0 }}>
                  <List>
                    {item.sections.map((section) => (
                      <ListItem key={section.nome} disablePadding>
                        <ListItemButton
                          to={section.link}
                          style={{
                            height: 45,
                            // marginTop: 5,
                            fill:
                              section.link === window.location.pathname
                                ? colors.green[7]
                                : colors.green[4],
                            stroke:
                              section.link === window.location.pathname
                                ? colors.green[7]
                                : colors.green[4],
                            backgroundColor:
                              section.link === window.location.pathname &&
                              colors.green[0],
                            marginLeft:
                              section.link === window.location.pathname
                                ? 0
                                : 20,
                            marginRight: -16,
                            borderRadius: 4,
                          }}
                        >
                          <ListItemText
                            sx={{
                              color: colors.green[7],
                            }}
                            primary={section.nome}
                            primaryTypographyProps={{ fontSize: '100%' }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ) : (
              <ListItem key={item.nome} disablePadding>
                <ListItemButton
                  to={item.link}
                  style={{
                    height: 45,
                    marginTop: 5,
                    fill:
                      item.link === window.location.pathname
                        ? colors.green[7]
                        : colors.green[4],
                    stroke:
                      item.link === window.location.pathname
                        ? colors.green[7]
                        : colors.green[4],
                    backgroundColor:
                      item.link === window.location.pathname
                        ? colors.green[0]
                        : 'white',
                    marginLeft: item.link === window.location.pathname ? 0 : 20,
                    borderRadius: 4,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      '&.MuiListItemIcon-root': {
                        color:
                          item.link === window.location.pathname
                            ? colors.green[7]
                            : colors.green[4],
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color: colors.green[7],
                    }}
                    primary={item.nome}
                    primaryTypographyProps={{ fontSize: '100%' }}
                  />
                </ListItemButton>
              </ListItem>
            )}
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
  )
}
