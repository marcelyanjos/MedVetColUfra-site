import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Grid, Modal, Fade, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Card1 from './Modal/Card1';
import Card2 from './Modal/Card2';
import styles from './style';

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
          <Grid xs={42} sm={11.5} ls={12} sx={styles.modal}>
            <Typography>
              Adicionar medicamento
            </Typography>
            <Grid sx={styles.modalBox} container>
              <Card1 />
              <Card2 />
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}
