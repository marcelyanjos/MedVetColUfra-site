import React from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
import ModalUser from './ModalUser';
import Table from './Table';
import styles from './style';
import { Link, Outlet } from "react-router-dom";

export default function AdoptionList() {
  return (
    <div>
    <Container maxWidth="x1">
      <Outlet />
    </Container>
  </div>
  );
}
