import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { Grid, Box, Paper, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Card1 from "./Modal/Card1";
import styles from "./style";
import { useParams } from "react-router-dom";

export default function ModalUser() {
  const {id} = useParams();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={styles.index_box2}>
      {/* <Grid xs={42} sm={11.5} ls={12} sx={styles.modal_grid}> */}
      <Typography
        sx={{mb:3}}
        fontFamily={"Public Sans"}
        fontWeight={700}
        color="#212B36"
        variant="h5"
      >
        {
          id ? 'Editar ' :'Adicionar '
        }
         Formulario
      </Typography>
      <Box sx={styles.table_box}>
        <Paper sx={styles.modal_paper}>
          <Card1 />
        </Paper>
      </Box>
    </Box>
  );
}
