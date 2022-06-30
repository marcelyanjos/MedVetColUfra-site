import React from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
import ModalUser from './ModalUser';
import Table from './Table';

export default function AdoptionList() {
  return (
      <Container maxWidth="x1">
        <Box sx={{pb: 5, display:'flex', justifyContent:'space-between' }}>
          <Typography
            fontFamily={"Public Sans"}
            fontWeight={700}
            color="#212B36"
            variant="h5"
          >
            Animais do Canil/Gatil
          </Typography>
          <ModalUser />
        </Box>
        <Table />
      </Container>
  );
}
