import React from "react";
import {Box, Container, Typography} from '@mui/material'
import Table from "./Table";
import ModalMedication from './ModalMedication'

export default function Professionals() {
  return (
    <Container maxWidth="x1">
    <Box sx={{pb: 5, display:'flex', justifyContent:'space-between' }}>
      <Typography
        fontFamily={"Public Sans"}
        fontWeight={700}
        color="#212B36"
        variant="h5"
      >
        Professionals
      </Typography>
      <ModalMedication />
    </Box>
    <Table />
  </Container>
  );
}
