import * as React from "react";
import {Card, Typography} from "@mui/material";

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
        <Typography fontFamily={"Public Sans"} fontWeight={700}>
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
          Outras Doações
        </Typography>
        <Typography fontFamily={"Public Sans"} fontWeight={700}>
          {totalDoacoes}
        </Typography>
      </Typography>
    </Card>
  );
}
