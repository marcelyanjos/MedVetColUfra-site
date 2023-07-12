import React from "react";
import { Card, Typography, Link, IconButton } from "@mui/material";
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
          <Card sx={styles.bodyLeft}>
            <Typography
              sx={styles.title}
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
          <Card sx={styles.bodyLeft}>
            <Typography
               sx={styles.title}
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
          <Logo style={{ height: "150px" }} />
          <Card sx={styles.bodyRight}>
            <IconButton
              sx={styles.medias}
              aria-label="facebook"
              href="https://web.facebook.com/canilgatildaufra/?locale=pt_BR&_rdc=1&_rdr"
            >
              <FacebookIcon width="16px" height="16px" />
            </IconButton>
            <IconButton
              sx={styles.medias}
              aria-label="instagram"
              href="https://www.instagram.com/dio_makethechange/"
            >
              <InstagramIcon width="16px" height="16px" />
            </IconButton>
          </Card>
        </Card>
      </Card>
    </Card>
  );
}
