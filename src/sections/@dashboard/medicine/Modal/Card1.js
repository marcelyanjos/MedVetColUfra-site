import * as React from 'react';
import { TextField, Grid } from '@mui/material';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import MedicinePostsSort from '../MedicinePostsSort';

const card1 = {
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'space-between',
  //   position: 'absolute',
  //   alignItems: 'center',
  // width: '49.5%',
  height: '100%',
  border: '1px solid #CFD0D7',
  borderRadius: '4px',
  p: 2
};
const SPECIE_OPTIONS = [
  { value: 'gato', label: 'Gato' },
  { value: 'cachorro', label: 'Cachorro' }
];
const SEXO_OPTIONS = [
  { value: 'femea', label: 'Femea' },
  { value: 'macho', label: 'Macho' }
];
const ESPECIAL_OPTIONS = [
  { value: 'sim', label: 'Sim' },
  { value: 'não', label: 'Não' }
];
const data = [
  { value: 'docil', label: 'Dócil' },
  { value: 'carinhoso', label: 'Carinhoso' },
  { value: 'brincalhao', label: 'Brincalhão' },
  { value: 'amavel', label: 'Amável' },
  { value: 'mimoso', label: 'Mimoso' }
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
          <Typography>Especie</Typography>
          <MedicinePostsSort options={SPECIE_OPTIONS} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography>Idade</Typography>
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
          <Typography>Sexo</Typography>
          <MedicinePostsSort options={SEXO_OPTIONS} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography>Especial</Typography>
          <MedicinePostsSort options={ESPECIAL_OPTIONS} />
        </Grid>
      </Grid>
      <Box>
        <Typography>Caracteristicas</Typography>
        <Grid container spacing={1}>
          {data.map((data) => {
            const labelId = data.label;

            return (
              // <ListItem key={data} disablePadding>
              <Grid key={data} item xs={6} sm={6} md={2.4}>
                <ListItemButton role={undefined} onClick={handleToggle(data.value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="end"
                      checked={checked.indexOf(data.value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': data.label }}
                    />
                  </ListItemIcon>
                  <ListItemText id={data.value} primary={data.label} />
                </ListItemButton>
              </Grid>
              // </ListItem>
            );
          })}
        </Grid>
      </Box>
      <Grid container spacing={1}>
        <Typography>Descrição</Typography>
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          multiline
          rows={13}
          sx={{ marginBottom: 2 }}
        />
      </Grid>
    </Grid>
  );
}
