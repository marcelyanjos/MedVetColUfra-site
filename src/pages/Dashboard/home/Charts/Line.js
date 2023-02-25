import Chart from "react-apexcharts";
import { Card, Typography, Box } from "@mui/material";
import { LINE_DATA } from "./data";
import styles from '../style';

var pt = require("apexcharts/dist/locales/pt.json")

const options = {
    colors: ["#B3CAFF", "#5B8FF9"],
    chart: {
      id: "chart",
      type: "line",
      fontFamily: "Public Sans",
      locales: [pt],
      defaultLocale: 'pt',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: -62,
      },
    },
    labels: [
      "01/01/2003",
      "02/01/2003",
      "03/01/2003",
      "04/01/2003",
      "05/01/2003",
      "06/01/2003",
      "07/01/2003",
      "08/01/2003",
      "09/01/2003",
      "10/01/2003",
      "11/01/2003",
    ],
    xaxis: {
      type: "datetime",
      labels: {
        format: 'MM/yyyy',
      },
      title: {
        text: "Meses",
        align: "center",
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      title: {
        text: "Usuários",
        align: "left",
      },
    },
    grid: {
      strokeDashArray: 3,
    },
    tooltip: {
      shared: true,
      intersect: false,
      followCursor: true,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)}`;
          }
          return y;
        },
      },
      borderRadius: 4,
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: 'blur(6px)',
      backgroundColor: "rgba(255,255,255,0.3)",
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      offsetY: 5,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      colors: ["#B3CAFF", "#5B8FF9"],
      width:2,
      curve: 'smooth',
    },
};

export default function App() {
  return (
    <Card
      sx={styles.chart_card}
    >
      <Typography
        fontFamily={"Public Sans"}
        fontWeight={700}
        sx={{ fontSize: 18, color: "#212B36"}}
      >
        Cadastros
      </Typography>
      <Typography
        variant="subtitle2"
        fontFamily={"Public Sans"}
        fontWeight={500}
        sx={styles.chart_subtitle2}
      >
        Cadastros na plataforma
      </Typography>
      <Box dir="ltr">
        <Chart options={options} series={LINE_DATA} type="line" height={320} />
      </Box>
    </Card>
  );
}
