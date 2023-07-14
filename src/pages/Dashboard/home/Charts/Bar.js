import Chart from "react-apexcharts";
import { Card, Typography, Box } from "@mui/material";
import { BAR_DATA } from "./data";
import styles from '../style';
import colors from "../../../../colors";

var pt = require("apexcharts/dist/locales/pt.json")

const options = {
  colors: [colors.green[7], colors.green[5], colors.green[2]],
  states:{
    hover:{
      filter:{
        type: "lighten",
        value: 0.01,
      }
    }
  },
  chart: {
    id: "basic-bar",
    fontFamily: "Public Sans",
    locales: [pt],
    defaultLocale: 'pt',
    toolbar: {
      show: true,
      offsetX: 0,
      offsetY: -41,
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
    axisBorder: { show: false },
    axisTicks: { show: false },
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
      text: "Adoções",
      align: "left",
    },
  },
  grid: {
    strokeDashArray: 3,
  },
  // forecastDataPoints: {
  //   count: 0,
  //   fillOpacity: 0.5,
  //   // strokeWidth: undefined,
  //   dashArray: 4,
  // },
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
  plotOptions: {
    bar: {
      columnWidth: "40%",
      borderRadius: 4,
      rangeBarOverlap: true,
      rangeBarGroupRows: false,
    },
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
    offsetY: 0,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    colors: ["transparent"],
    width: 2,
  },
};

export default function App() {
  return (
    <Card
      sx={styles.chart_card}
    >
      <Typography
        fontFamily={"Open Sans, sans-serif"}
        fontWeight={700}
        sx={styles.chart_barTypography}
      >
        Adoções
      </Typography>
      <Box dir="ltr">
        <Chart options={options} series={BAR_DATA} type="line" height={364} />
      </Box>
    </Card>
  );
}
