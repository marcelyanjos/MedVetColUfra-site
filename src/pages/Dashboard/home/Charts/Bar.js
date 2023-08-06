import Chart from "react-apexcharts";
import { Card, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../../../api";
import styles from "../style";
import colors from "../../../../colors";

var pt = require("apexcharts/dist/locales/pt.json");

export default function App() {
  const [bar, setBar] = useState({
    caes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    gatos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    pedidos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const caesResponse = await api.get("/api/chart", {
          params: { especie: "canino", adotado: "true" },
        });
        const caesIds = caesResponse.data.map((item) => item.id_animal);

        const gatosResponse = await api.get("/api/chart", {
          params: { especie: "felino", adotado: "true" },
        });
        const gatosIds = gatosResponse.data.map((item) => item.id_animal);

        const adocoesResponse = await api.get("/api/adocao");
        const adocoesData = adocoesResponse.data;

        const caesAdotados = countAnimaisAdotadosPorMes(caesIds, adocoesData);
        const gatosAdotados = countAnimaisAdotadosPorMes(gatosIds, adocoesData);
        const pedidosAdocao = await countPedidosAdocaoPorMes();

        setBar({
          caes: caesAdotados,
          gatos: gatosAdotados,
          pedidos: pedidosAdocao,
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  function countAnimaisAdotadosPorMes(ids, adocoes) {
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    adocoes.forEach((adocao) => {
      const { id_animal, data_adocao } = adocao;
      if (ids.includes(id_animal) && data_adocao) {
        const date = new Date(data_adocao);
        const month = date.getMonth();
        data[month]++;
      }
    });

    return data;
  }

  async function countPedidosAdocaoPorMes() {
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    try {
      const response = await api.get("/api/adoption-forms");
      const forms = response.data;

      forms.forEach((form) => {
        const { data_envio } = form;
        const date = new Date(data_envio);
        const month = date.getMonth();
        data[month]++;
      });
    } catch (error) {
      console.error(error);
    }

    return data;
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const labels = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const formattedDate = `${("0" + month).slice(-2)}/01/${year}`;
    return formattedDate;
  });
  

  const options = {
    colors: [colors.green[7], colors.green[5], colors.green[2]],
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.01,
        },
      },
    },
    chart: {
      id: "basic-bar",
      fontFamily: "Public Sans",
      locales: [pt],
      defaultLocale: "pt",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: -41,
      },
    },
    series: [
      {
        name: "Cães Adotados",
        type: "column",
        data: bar.caes,
      },
      {
        name: "Gatos Adotados",
        type: "column",
        data: bar.gatos,
      },
      {
        name: "Pedidos de Adoção",
        type: "column",
        data: bar.pedidos,
      },
    ],
    labels: labels,
    xaxis: {
      type: "datetime",
      labels: {
        format: "dd/MM/yyyy",
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
      WebkitBackdropFilter: "blur(6px)",
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

  return (
    <Card sx={styles.chart_card}>
      <Typography
        fontFamily={"Open Sans, sans-serif"}
        fontWeight={700}
        sx={styles.chart_barTypography}
      >
        Adoções
      </Typography>
      <Box dir="ltr">
        <Chart options={options} series={options.series} type="line" height={364} />
      </Box>
    </Card>
  );
}
