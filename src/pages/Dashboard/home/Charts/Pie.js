import Chart from 'react-apexcharts'
import { Card, Typography, Box } from '@mui/material'
import { CHART_DATA } from './data'

const reducer = (accumulator, curr) => accumulator + curr

const pt = require('apexcharts/dist/locales/pt.json')

const options = {
  colors: ['#B3CAFF', '#649DFF', '#1a48ad'],
  // states:{
  //   hover:{
  //     filter:{
  //       type: "lighten",
  //       value: 0.05,
  //     }
  //   }
  // },
  chart: {
    id: 'basic-bar',
    fontFamily: 'Public Sans',
    type: 'pie',
    locales: [pt],
    defaultLocale: 'pt',
    offsetY: -5,
    toolbar: {
      show: true,
      offsetX: 0,
      offsetY: -76,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
    },
  },
  labels: ['Estoque', 'Falta', 'Doações'],
  xaxis: {
    type: 'datetime',
    labels: {
      format: 'MM/yyyy',
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
    title: {
      text: 'Meses',
      align: 'center',
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    title: {
      text: 'Adoções',
      align: 'left',
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
  //   plotOptions: {
  //     bar: {
  //       columnWidth: "40%",
  //       borderRadius: 4,
  //       rangeBarOverlap: true,
  //       rangeBarGroupRows: false,
  //     },
  //   },
  legend: {
    show: true,
    // floating: true,
    height: 72,
    position: 'bottom',
    top: `300px !important`,
    horizontalAlign: 'center',
    // customLegendItems:{
    borderTop: 'solid 1px #919EAB',
    // }
  },
  // percentual
  dataLabels: {
    enabled: true,
  },
  stroke: {
    colors: ['transparent'],
    width: 2,
  },
}

export default function App() {
  return (
    <Card
      sx={{
        // minWidth: 275,
        borderRadius: 4,
        boxShadow: '0px 1px 3px 0px rgba(65,65, 65, 0.1)',
        padding: 3,
      }}
    >
      <Typography
        fontFamily={'Public Sans'}
        fontWeight={700}
        sx={{ fontSize: 18, color: '#212B36' }}
      >
        Agendamento Mensal
      </Typography>
      <Typography
        fontFamily={'Public Sans'}
        fontWeight={500}
        sx={{ fontSize: 24, color: '#87919c', mb: 2 }}
      >
        {CHART_DATA.reduce(reducer)}
      </Typography>
      <Box dir="ltr">
        <Chart options={options} series={CHART_DATA} type="pie" height={354} />
      </Box>
    </Card>
  )
}
