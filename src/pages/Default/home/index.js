import React from "react";
import { Box } from "@mui/material";
import Example from "./Destaque";
import Info from "./Info";
import CardCarrousel from "./CardCarrousel";
import Blog from "./Blog";

export default function home() {
  return (
    <Box style={{ minHeight: "250px", display:'flex', flexDirection:'column', alignItems:'center' }}>
      <Example />
      <Info />
      <CardCarrousel />
      <Blog />
    </Box>
  );
}
