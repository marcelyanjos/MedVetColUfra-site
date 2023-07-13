import * as React from 'react';
import { TextField, Grid, Typography } from '@mui/material';
import UserPostsSort from '../UserPostsSort';

const card1 = {
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'space-between',
  //   position: 'absolute',
  //   alignItems: 'center',
  // width: '49.5%',
  // maxHeight:480,
  // height: '100%',
  border: '1px solid #CFD0D7',
  borderRadius: '4px',
  p: 1
};
const CATEGORY_OPTIONS = [
  { value: 'Antibiotico', label: 'Antibiotico' },
  { value: 'Antiinflamatorio', label: 'Antiinflamatorio' },
  { value: 'Antifungos', label: 'Antifungos' },
  { value: 'Antipulga', label: 'Antipulga' },
  { value: 'Antiseptico', label: 'Antiseptico' },
  { value: 'Vitamina', label: 'Vitamina' },
  { value: 'Outros', label: 'Outros' }
];

export default function Card1() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    // <Box sx={card1}>
    <Grid xs={42} sm={5.95} ls={12} sx={card1} container>
      <Grid item xs={12} sm={6} lg={12}>
        {/* <Box> */}
        <Typography>Nome</Typography>
        <TextField fullWidth size="small" autoComplete="username" type="text" />
        {/* </Box> */}
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={6}>
          <Typography>Categoria</Typography>
          <UserPostsSort options={CATEGORY_OPTIONS} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography>Genérico</Typography>
          <TextField
            sx={{
              width: '100%'
            }}
            size="small"
            autoComplete="username"
            type="text"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={6}>
          <Typography>Preço minimo de mercado</Typography>
          <TextField
            sx={{
              width: '100%'
            }}
            size="small"
            type="text"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography>Preço máximo</Typography>
          <TextField
            sx={{
              width: '100%'
            }}
            size="small"
            type="text"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={6}>
          <Typography>Quantidade em estoque</Typography>
          <TextField
            sx={{
              width: '100%'
            }}
            size="small"
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography>Quantidade minima suficiente</Typography>
          <TextField
            sx={{
              width: '100%'
            }}
            size="small"
            type="number"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={12}>
        <Typography>Descrição</Typography>
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          multiline
          rows={4}
          sx={{ marginBottom: 1 }}
        />
      </Grid>
    </Grid>
  );
}
