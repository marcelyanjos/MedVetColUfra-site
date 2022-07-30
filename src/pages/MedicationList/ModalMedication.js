import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Card1 from './Modal/Card1';
import Card2 from './Modal/Card2';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'auto',
  width: '85%',
  minHeight: 600,
  height: '90%',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 3,
  '&::-webkit-scrollbar': {
    width: 10,
    border: '1px outset'
  },
  '&::-webkit-scrollbar-track': {
    // boxShadow: 'inset 0 0 5px grey',
    borderRadius: 10
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(179, 232, 255, 0.5)',
    borderRadius: 10
  }
};
const box = {
  // display: 'flex',
  // position: 'absolute',
  // alignItems: 'center',
  // width: '100%',
  justifyContent: 'space-between',
  //   border: '1px solid #CFD0D7',
  p: 1
};

export default function ModalUser() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        sx={{ color: '#62B6E4', border: '1.5px solid' }}
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        startIcon={<AddIcon />}
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
          <Grid xs={42} sm={11.5} ls={12} sx={style}>
            <Typography variant="h4">
              Adicionar medicamento
            </Typography>
            <Grid sx={box} container>
              <Card1 />
              <Card2 />
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}
