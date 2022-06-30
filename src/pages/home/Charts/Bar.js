import Chart from "react-apexcharts";
import { Card, Typography, Box } from "@mui/material";
import { BAR_DATA } from "./data";

var pt = require("apexcharts/dist/locales/pt.json")

const options = {
  colors: ["#1a48ad", "#5B8FF9", "#65789B"],
  // states:{
  //   hover:{
  //     filter:{
  //       type: "lighten",
  //       value: 0.05,
  //     }
  //   }
  // },
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
      sx={{
        // minWidth: 275,
        borderRadius: 4,
        boxShadow: "0px 1px 3px 0px rgba(65,65, 65, 0.1)",
        padding: 3,
      }}
    >
      <Typography
        fontFamily={"Public Sans"}
        fontWeight={700}
        sx={{ fontSize: 18, color: "#212B36", mb: 2 }}
      >
        Adoções e Doações
      </Typography>
      <Box dir="ltr">
        <Chart options={options} series={BAR_DATA} type="line" height={364} />
      </Box>
    </Card>
  );
}
