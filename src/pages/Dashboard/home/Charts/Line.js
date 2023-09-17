import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import Chart from 'react-apexcharts'
import colors from '../../../../styles/colors'
import styles from '../style'
import { LINE_DATA } from './data'

const pt = require('apexcharts/dist/locales/pt.json')

export default function App() {
  // const [line, setLine] = useState({
  //   consultas: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   adocoes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // })

  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const labels = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1
    const formattedDate = `${('0' + month).slice(-2)}/01/${year}`
    return formattedDate
  })

  const options = {
    colors: [colors.green[0], colors.green[4]],
    chart: {
      id: 'chart',
      type: 'line',
      fontFamily: 'Public Sans',
      locales: [pt],
      defaultLocale: 'pt',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: -25,
      },
    },
    labels,
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MM/yyyy',
      },
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
        text: 'Contagem',
        align: 'left',
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
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}`
          }
          return y
        },
      },
      borderRadius: 4,
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      backgroundColor: 'rgba(255,255,255,0.3)',
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      offsetY: 5,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      colors: [colors.green[0], colors.green[4]],
      width: 2,
      curve: 'smooth',
    },
  }

  return (
    <Card sx={styles.chart_card}>
      <Typography
        fontFamily={'Public Sans'}
        fontWeight={700}
        sx={{ fontSize: 18, color: '#212B36' }}
      >
        Uso do Site
      </Typography>
      {/* <Typography
        variant="subtitle2"
        fontFamily={"Public Sans"}
        fontWeight={500}
        sx={styles.chart_subtitle2}
      >
        Cadastros na plataforma
      </Typography> */}
      <Box dir="ltr">
        <Chart options={options} series={LINE_DATA} type="line" height={320} />
      </Box>
    </Card>
  )
}
