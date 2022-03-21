import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, ResponsiveContainer } from 'recharts';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BarGraph from './Components/bar';
import PieGraph from './Components/pie';
import { dataLine } from './Components/data'
import { useStyles } from './styles'

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div style={{ width: '95.5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box className={classes.box}>
            <Card variant="none" style={{ backgroundColor: '#E4F2FA' }}>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between', height: 40 }}>
                <Typography sx={{ fontSize: 20, color: '#5677B6', fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                  Cães para adoção
                </Typography><Typography sx={{ fontSize: 20, color: '#5677B6', fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                  86
                </Typography>
              </CardContent>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 20, color: '#383838', fontWeight: 'bold' }} component="div">
                  Cães adotados
                </Typography>
                <Typography sx={{ fontSize: 20, color: '#383838', fontWeight: 'bold' }} component="div">
                  45
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box className={classes.box}>
            <Card variant="none" style={{ backgroundColor: '#B0CBF4' }}>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between', height: 40 }}>
                <Typography sx={{ fontSize: 20, color: '#294B8E', fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                  Gatos para adoção
                </Typography>
                <Typography sx={{ fontSize: 20, color: '#294B8E', fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                  86
                </Typography>
              </CardContent>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 20, color: '#383838', fontWeight: 'bold' }} component="div">
                  Gatos adotados
                </Typography>
                <Typography sx={{ fontSize: 20, color: '#383838', fontWeight: 'bold' }} component="div">
                  45
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box className={classes.box}>
            <Card variant="none" style={{ backgroundColor: '#8AB4F2' }}>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between', height: 40 }}>
                <Typography sx={{ fontSize: 20, color: '#383838', fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                  Medicamentos em estoque
                </Typography><Typography sx={{ fontSize: 20, color: '#383838', fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                  237
                </Typography>
              </CardContent>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 20, color: '#383838', fontWeight: 'bold' }} component="div">
                  Doações
                </Typography>
                <Typography sx={{ fontSize: 20, color: '#383838', fontWeight: 'bold' }} component="div">
                  28
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </div>
      </div>


      <BarGraph />
      <div className={classes.container2}>
        <PieGraph />
        <div className={classes.linechart}>
          <Typography>Usuários cadastrados</Typography>
          <ResponsiveContainer>
            <LineChart data={dataLine}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={classes.linechart}>
          <Typography>Gatos Adortados</Typography>
          <ResponsiveContainer>
            <LineChart data={dataLine}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}