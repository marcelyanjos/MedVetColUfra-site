import { Box, Typography, Card, Button } from "@mui/material";
import initialRows from "../../../Dashboard/AdoptionList/mockup_adoption";
import React, { useRef } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ReactComponent as Female } from "../../../../assets/female.svg";
import { ReactComponent as Male } from "../../../../assets/male.svg";
import theme from "../../../../Components/Drawer/theme";
export default function CardCarrousel() {
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <Box sx={{ height: "500px", width: "100%", bgcolor: "#5B8FF9" }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{ flex: 1, color: "#f1f1f1", fontWeight: "bold", fontSize: 26 }}
          >
            Novos Pets
          </Typography>
          <Button onClick={() => scroll(-400)}>
            <KeyboardArrowLeftIcon fontSize="large" sx={{ color: "#f1f1f1" }} />
          </Button>
          <Button onClick={() => scroll(400)}>
            {" "}
            <KeyboardArrowRightIcon
              fontSize="large"
              sx={{ color: "#f1f1f1" }}
            />
          </Button>
        </Box>
        <Box
          ref={ref}
          sx={{
            height: "380px",
            width: "100%",
            display: "flex",
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
            "&::-webkit-scrollbar": { display: "none" },
            overflowX: "scroll",
          }}
        >
          {/* max 6 items */}
          {initialRows.slice(0, 6).map((i, index) => {
            return (
              <Card key={index} sx={{ mr: 1, minWidth: "300px" }}>
                <img
                  src={i.image}
                  style={{ objectFit: "contain", height: "320px" }}
                />
                <Box sx={{ display: "flex", justifyContent:'space-between' }}>
                  <Typography>
                    <Typography
                      sx={{
                        ml: 1,
                        fontWeight: "bold",
                        fontSize: 18,
                        fontFamily: "Open Sans, sans-serif",
                        color: "#494a4a",
                      }}
                    >
                      {i.nome}
                    </Typography>
                    <Typography
                      sx={{
                        ml: 1,
                        fontFamily: "Open Sans, sans-serif",
                        color: "#494a4a",
                      }}
                    >
                      {i.idade} anos
                    </Typography>
                  </Typography>
                  {i.sexo === "femea" ? (
                    <Female style={{ height: "40px", marginTop:5 }} />
                  ) : (
                    <Male style={{ height: "40px", marginTop:5 }} />
                  )}
                </Box>
              </Card>
            );
          })}
          <Button
            sx={{ display: "flex", flexDirection: "column", minWidth: "100px" }}
          >
            <ArrowForwardIcon
              fontSize="large"
              sx={{
                color: "#f1f1f1",
                border: "2px solid #f1f1f1",
                borderRadius: "20px",
                p: 0.5,
                mb: 1,
              }}
            />
            <Typography sx={{ color: "#f1f1f1", textTransform: "none" }}>
              Ver outros animais
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
