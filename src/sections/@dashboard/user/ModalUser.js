import * as React from 'react';
import { TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Iconify from '../../../components/Iconify';
import UserPostsSort from './UserPostsSort';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '85%',
  height: '90%',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 3
};
const box = {
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  width: '100%',
  height: '95%',
  //   border: '1px solid #CFD0D7',
  p: 6
};
const card1 = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  //   position: 'absolute',
  //   alignItems: 'center',
  width: '46%',
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

export default function ModalUser() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <div>
      <Button
        sx={{ color: '#62B6E4', border: '1.5px solid' }}
        variant="outlined"
        color="secondary"
        onClick={handleOpen}
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        New User
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h4" gutterBottom>
              Adicionar animal
            </Typography>
            <Box sx={box}>
              <Box sx={card1}>
                <Box>
                  <Typography>Nome</Typography>
                  <TextField fullWidth size="small" autoComplete="username" type="text" />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ width: '50%' }}>
                    <Typography>Especie</Typography>
                    <UserPostsSort options={SPECIE_OPTIONS} />
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <Typography>Idade</Typography>
                    <TextField
                      sx={{
                        width: '95%'
                      }}
                      size="small"
                      autoComplete="username"
                      type="text"
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ width: '50%' }}>
                    <Typography>Sexo</Typography>
                    <UserPostsSort options={SEXO_OPTIONS} />
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <Typography>Especial</Typography>
                    <UserPostsSort options={ESPECIAL_OPTIONS} />
                  </Box>
                </Box>
                <Box>
                  <Typography>Especial</Typography>
                  <List
                    sx={{
                      width: '60%',
                      display: 'flex',
                      bgcolor: 'background.paper'
                    }}
                  >
                    {data.map((data) => {
                      const labelId = data.label;

                      return (
                        <ListItem key={data} disablePadding>
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
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
                <Box>
                  <Typography>Nome</Typography>
                  <TextField fullWidth size="medium" autoComplete="username" type="text" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
