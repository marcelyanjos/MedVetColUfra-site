import { Typography } from '@mui/material';
import react from 'react'
import { Tooltip, Legend, PieChart, Pie } from 'recharts';
import { dataPie01 } from './data'
import { useStyles } from './style';
export default function PieGraph() {
    const classes = useStyles();
    return (
        <div className={classes.pie}>
            <Typography style={{display:'flex', width:270, justifyContent:'space-between'}}>
                <Typography>Medicamentos Necessários</Typography>
                <Typography>86</Typography>
            </Typography>
            <PieChart width={350} height={250} >
                <Tooltip />
                <Pie data={dataPie01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#8884d8" />
                {/* <Pie data={dataPie02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
                <Legend />
            </PieChart>
        </div>
    )
}