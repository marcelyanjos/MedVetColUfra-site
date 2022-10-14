import * as React from "react";
import { Grid, Tooltip } from "@mui/material";
import { ReactComponent as ArticleBadge } from "../../assets/Badge/articleBadge_icon.svg";
import { ReactComponent as DonationBadge } from "../../assets/Badge/donationBadge_icon.svg";
import { ReactComponent as FormBadge } from "../../assets/Badge/formBadge_icon.svg";
import { ReactComponent as MedicationBadge } from "../../assets/Badge/medicationBadge_icon.svg";
import { ReactComponent as PetBadge } from "../../assets/Badge/petBadge_icon.svg";
import { ReactComponent as UserBadge } from "../../assets/Badge/userBadge_icon.svg";
import styles from './style'

export default function Card3() {
  return (
    <div style={{ height: "100%" }}>
      <Grid container spacing={0} sx={{ mt: 0, height: "100%" }}>
        <Grid
          item
          xs={6}
          md={6}
          sx={styles.grid3}
        >
          <Tooltip title="editar artigos">
            <ArticleBadge style={{ width: 86, height: 86 }} />
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sx={styles.grid3}

        >
          <Tooltip title="adicionar novas doações">
            <DonationBadge style={{ width: 86, height: 86 }} />
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sx={styles.grid3}

        >
          <Tooltip title="editar informações de animais">
            <PetBadge style={{ width: 86, height: 86 }} />
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sx={styles.grid3}

        >
          <Tooltip title="editar usuários">
            <UserBadge style={{ width: 86, height: 86 }} />
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sx={styles.grid3}

        >
          <Tooltip title="ver/editar formularios de adoção">
            <FormBadge style={{ width: 86, height: 86 }} />
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sx={styles.grid3}

        >
          <Tooltip title="adicionar medicamentos">
            <MedicationBadge style={{ width: 86, height: 86 }} />
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}
