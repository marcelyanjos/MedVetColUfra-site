import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from '../../../components/Iconify';
import Card1 from './Modal/Card1';
import Card2 from './Modal/Card2';

const card2 = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  //   position: 'absolute',
  //   alignItems: 'center',
  width: '49.5%',
  height: '100%',
  border: '1px solid #CFD0D7',
  borderRadius: '4px',
  p: 2
};
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
  justifyContent: 'space-between',
  //   border: '1px solid #CFD0D7',
  p: 6
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
              <Card1 />
              <Card2 />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
