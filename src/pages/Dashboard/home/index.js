import React from "react";
import { Box, Grid, Container, Typography } from '@mui/material';
import {Link} from 'react-router-dom'
import Card1 from './Cards/Card1';
import Card2 from './Cards/Card2';
import Card3 from './Cards/Card3';
import Bar from './Charts/Bar';
import Pie from './Charts/Pie';
import Line from './Charts/Line';
export default function Home() {
  return (
    <div style={{marginBottom:10}}>
       <Container maxWidth="x1">
        <Box sx={{ pb: 5 }}>
          <Typography fontFamily={'Public Sans'} fontWeight={700} color='#212B36' variant="h5">Olá, "nome"</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card1 />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card2 />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card3 />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Bar />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Pie />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Line />
          </Grid>
        </Grid>
      </Container>
      {/* <nav>
        <Link to="/"> Home </Link>
        <Link to="/animais"> Animais </Link>
        <Link to="/medicamentos"> Medicamentos </Link>
      </nav> */}
    </div>
  );
}
