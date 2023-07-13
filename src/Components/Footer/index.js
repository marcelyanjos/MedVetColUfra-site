import React from "react";
import { Card, Box, Typography, Link, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ReactComponent as Logo1 } from "../../assets/Logos/Group28.svg";
import { ReactComponent as Logo2 } from "../../assets/Logos/Group29.svg";
import { ReactComponent as Logo3 } from "../../assets/Logos/Group31.svg";
import { ReactComponent as FacebookIcon } from "../../assets/facebook.svg";
import theme from "../Drawer/theme";
import styles from "./styles";
export default function Footer() {
  return (
    <Card sx={styles.body} theme={theme}>
      <Card sx={styles.card}>
        <Card sx={styles.left}>
          <Card sx={styles.bodyLeft}>
            <Typography sx={styles.title}>Institucional</Typography>
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
            <Typography sx={styles.title}>Informações</Typography>
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
          <Box sx={{ display: "flex" }}>
            <Logo1 style={{ padding: "0 10px 0 10px", height: "150px" }} />
            <Logo2 style={{ padding: "0 10px 0 10px", height: "150px" }} />
            <Logo3 style={{ padding: "0 10px 0 10px", height: "150px" }} />
          </Box>
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
