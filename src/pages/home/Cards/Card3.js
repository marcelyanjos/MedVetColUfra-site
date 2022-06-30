import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const totalMedicamentosEstoque = 237;
const totalDoacoes = 45;
export default function Card3() {
  return (
    <Card
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 4,
        minWidth: 275,
        color: "#65789B",
        backgroundColor: "#B3CAFF",
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
          Medicamentos em estoque
        </Typography>
        <Typography variant="h4" fontFamily={"Public Sans"} fontWeight={700}>
          {totalMedicamentosEstoque}
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
          Doações
        </Typography>
        <Typography variant="h4" fontFamily={"Public Sans"} fontWeight={700}>
          {totalDoacoes}
        </Typography>
      </Typography>
    </Card>
  );
}
