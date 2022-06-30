import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const totalGatospAdocao = 86;
const totalGatosAdotados = 45;
export default function Card1() {
  return (
    <Card
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 4,
        minWidth: 275,
        color: "#EBEDFB",
        backgroundColor: "#5B8FF9",
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
          Gatos Adotados
        </Typography>
        <Typography variant="h4" fontFamily={"Public Sans"} fontWeight={700}>
          {totalGatosAdotados}
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
          Gatos para Adoção
        </Typography>
        <Typography variant="h4" fontFamily={"Public Sans"} fontWeight={700}>
          {totalGatospAdocao}
        </Typography>
      </Typography>
    </Card>
  );
}
