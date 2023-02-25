import * as React from "react";
import { Card, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import EventIcon from "@mui/icons-material/Event";
import { ReactComponent as StethoscopeIcon } from "../../../assets/stethoscope_icon.svg";
import styles from "./style";
import profile from "./mockup";

export default function Card1() {
  return (
    <div>
      <Card sx={styles.card1}>
        <div>
          <Avatar
            alt={profile.name + profile.surname}
            sx={{ width: 140, height: 140 }}
            src={profile.src}
          />
          <IconButton
            size="small"
            aria-label="upload picture"
            component="label"
            sx={styles.iconButton1}
          >
            <input hidden accept="image/*" type="file" />
            <EditIcon />
          </IconButton>
        </div>

        <div style={styles.div1}>
          <Typography
            color="#212B36"
            fontWeight={400}
            sx={{ fontSize: 20, mb: -1 }}
          >
            {profile.name + " " + profile.surname}
          </Typography>
          <Typography color="#212B36" sx={{ fontSize: 14 }}>
            {" "}
            {profile.username}
          </Typography>
          <Typography color="#212B36" sx={{ fontSize: 14 }}>
            matricula: {profile.matricula}
          </Typography>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "space-between",
              marginLeft: -20,
            }}
          >
            <EventIcon />
            <Typography style={{ marginLeft: 5 }}>
              {profile.birthNumber}
            </Typography>
          </div>

          <div
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "space-between",
              marginLeft: -20,
            }}
          >
            <StethoscopeIcon style={{ height: 24, width: 30 }} />
            <Typography fontSize={20} style={{ marginLeft: 5 }}>
              {profile.job}
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
}
