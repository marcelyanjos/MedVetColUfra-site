import React from "react";
import {
  Paper,
  Card,
  Typography,
  Link,
  Button,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as FacebookIcon } from "../../assets/facebook.svg";
import theme from "../Drawer/theme";
import styles from "./styles";
export default function Footer() {
  return (
    <Card sx={styles.body} theme={theme}>
      <Card sx={styles.card}>
        <Card sx={styles.left}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              boxShadow: "none",
              bgcolor: "transparent",
              [theme.breakpoints.up("lg")]: {
                margin: "1rem 2rem",
              },
              [theme.breakpoints.down("lg")]: {
                display: "flex",
                alignItems: "center",
                margin: "1rem 0px",
              },
            }}
          >
            <Typography
              sx={{
                color: "#102582",
                fontSize: "1.2em",
                fontWeight: "bold",
                margin: "0.6em 0px",
              }}
            >
              Institucional
            </Typography>
            <Link underline="hover" sx={styles.link}>
              Sobre o Canil
            </Link>
            <Link underline="hover" sx={styles.link}>
              Horário de Funcionamento
            </Link>
            <Link underline="hover" sx={styles.link}>
              Outros Serviços
            </Link>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              boxShadow: "none",
              bgcolor: "transparent",
              [theme.breakpoints.up("lg")]: {
                margin: "1rem 2rem",
              },
              [theme.breakpoints.down("lg")]: {
                display: "flex",
                alignItems: "center",
                margin: "1rem 0px",
              },
            }}
          >
            <Typography
              sx={{
                color: "#102582",
                fontSize: "1.2em",
                fontWeight: "bold",
                margin: "0.6em 0px",
              }}
            >
              Informações
            </Typography>
            <Link underline="hover" sx={styles.link}>
              Quero Adotar
            </Link>
            <Link underline="hover" sx={styles.link}>
              Quero Doar
            </Link>
            <Link underline="hover" sx={styles.link}>
              Eventos
            </Link>
            <Link underline="hover" sx={styles.link}>
              Blog
            </Link>
          </Card>
        </Card>
        <Card sx={styles.right}>
        <Logo style={{ height:'150px'}}/>
        <Card
          sx={{
            boxShadow: "none",
            bgcolor: "transparent",
            padding: 0,
            display: "flex",
          }}
        >
              <IconButton
                sx={styles.medias}
                aria-label="facebook"
                href="https://pt-br.facebook.com/diomakethechange/"
              >
                <FacebookIcon width='16px' height='16px'/>
              </IconButton>
          <IconButton
            sx={styles.medias}
            aria-label="instagram"
            href="https://www.instagram.com/dio_makethechange/"
          >
            <InstagramIcon width='16px' height='16px'/>
          </IconButton>
        </Card>
      </Card>
      </Card>
    </Card>
  );
}
