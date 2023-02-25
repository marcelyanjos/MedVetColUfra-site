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
import styles from './style';

export default function ModalUser() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        sx={styles.modal_button}
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
          <Grid xs={42} sm={11.5} ls={12} sx={styles.modal_grid}>
            <Typography variant="h4">
              Adicionar animal
            </Typography>
            <Grid sx={styles.modal_box} container>
              <Card1 />
              <Card2 />
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}
