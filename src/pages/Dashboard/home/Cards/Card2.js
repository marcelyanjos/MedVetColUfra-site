import * as React from "react";
import {Card, Typography } from "@mui/material";

const totalCaesAdotados = 45;
const totalCaespAdocao = 86;
export default function Card2() {
  return (
    <Card
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 4,
        minWidth: 275,
        color: "#04297A",
        backgroundColor: "#D0F2FF",
      }}
      elevation={0}
    >
      <Typography
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: 2,
          marginRight: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          fontFamily={"Public Sans"}
          fontWeight={600}
          sx={{ opacity: 0.72 }}
        >
          Cães Adotados
        </Typography>
        <Typography fontFamily={"Public Sans"} fontWeight={700}>
          {totalCaesAdotados}
        </Typography>
      </Typography>
      <Typography
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: 2,
          marginRight: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          fontFamily={"Public Sans"}
          fontWeight={600}
          sx={{ opacity: 0.72 }}
        >
          Cães para Adoção
        </Typography>
        <Typography fontFamily={"Public Sans"} fontWeight={700}>
          {totalCaespAdocao}
        </Typography>
      </Typography>
    </Card>
  );
}
