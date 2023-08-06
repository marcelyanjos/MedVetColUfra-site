import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./style";
import Table from "./Table";
import { Link, Outlet } from "react-router-dom";

export default function Article() {
  return (
    <div>
      <Container maxWidth="x1">
        <Outlet />
      </Container>
    </div>
  );
}
