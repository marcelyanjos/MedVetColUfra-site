import react from 'react'
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart, ResponsiveContainer } from 'recharts';
import {dataBar} from './data'
import { useStyles } from './style';
export default function BarGraph(){
    const classes = useStyles();
    return(
        <div className={classes.bar}>
        <p style={{fontWeight:'bold'}}> Demanda Anual </p>
        <ResponsiveContainer><BarChart data={dataBar}>
          <CartesianGrid horizontal vertical={false} verticalPoints={0} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Cães adotados" fill="#8AB4F2" />
          <Bar dataKey="Gatos adotados" fill="#82ca9d" />
          <Bar dataKey="Medicamentos doados" fill="#62B6E4" />
        </BarChart>
        </ResponsiveContainer>
      </div>
    )
}