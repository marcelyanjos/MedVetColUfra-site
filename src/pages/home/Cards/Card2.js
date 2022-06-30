import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
        <Typography variant="h4" fontFamily={"Public Sans"} fontWeight={700}>
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
        <Typography variant="h4" fontFamily={"Public Sans"} fontWeight={700}>
          {totalCaespAdocao}
        </Typography>
      </Typography>
    </Card>
  );
}
