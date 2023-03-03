import React from "react";
import { Box } from "@mui/material";
import Slider from "../../../Components/Carousel";
import Info from "./Info";
import CardCarrousel from "./CardCarrousel";
import Blog from "./Blog";

export default function home() {
  return (
    <Box style={{ minHeight: "250px", display:'flex', flexDirection:'column', alignItems:'center' }}>
      <Slider />
      <Info />
      <CardCarrousel />
      <Blog />
    </Box>
  );
}
