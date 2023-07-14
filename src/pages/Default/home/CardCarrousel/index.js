import React, { useRef, useState, useEffect } from "react";
import { Box,Link, Typography, Card, Button, CardMedia } from "@mui/material";
import initialRows from "../../../../mockup/adoption";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ReactComponent as Female } from "../../../../assets/female.svg";
import { ReactComponent as Male } from "../../../../assets/male.svg";
import { decode } from "base-64";
import theme from "../../../../Components/Drawer/theme";
import colors from "../../../../colors";
import api from "../../../../api";
export default function CardCarrousel() {
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    api
      .get("/api/animals")
      .then((response) => {
        setAnimals(response.data);
        console.log("data: ", response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <Box sx={{ height: "480px", width: "100%", bgcolor: colors.green[2] }}>
      <Box sx={{ p: 2, pl: 4, pr: 4 }}>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              flex: 1,
              color: colors.black[0],
              fontWeight: "bold",
              fontSize: 26,
            }}
          >
            Novos Pets
          </Typography>
          <Button onClick={() => scroll(-400)}>
            <KeyboardArrowLeftIcon
              fontSize="large"
              sx={{ color: colors.black[0] }}
            />
          </Button>
          <Button onClick={() => scroll(400)}>
            {" "}
            <KeyboardArrowRightIcon
              fontSize="large"
              sx={{ color: colors.black[0] }}
            />
          </Button>
        </Box>
        <Box
          ref={ref}
          sx={{
            scrollBehavior: "smooth",
            minheight: "390px",
            pt: 1,
            width: "100%",
            display: "flex",
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
            "&::-webkit-scrollbar": { display: "none" },
            overflowX: "scroll",
          }}
        >
          {/* max 6 items */}
          {animals.slice(0, 6).map((animal) => {
            return (
              <Link sx={{textDecoration:'none'}} href={`/adocao/${animal.id_animal}`}>
              <Card
                key={animal.id_animal}
                elevation={4}
                sx={{
                  mr: 1,
                  height: "380px",
                  minWidth: "300px",
                  "&:hover": { top:-1 },
                }}
              >
                <CardMedia
                  component="img"
                  image={`data:image/jpg;base64,${decode(animal.imagem)}`}
                  alt={animal.nome}
                  style={{ width: "320px",height:'82%',objectFit: "cover" }}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography component={"span"} variant={"body2"}>
                    <Typography
                      sx={{
                        ml: 1,
                        fontWeight: "bold",
                        fontSize: 18,
                        fontFamily: "Open Sans, sans-serif",
                        color: "#494a4a",
                      }}
                    >
                      {animal.nome}
                    </Typography>
                    <Typography
                      sx={{
                        ml: 1,
                        fontFamily: "Open Sans, sans-serif",
                        color: "#494a4a",
                      }}
                    >
                      {animal.idade} anos
                    </Typography>
                  </Typography>
                  {animal.sexo === "femea" ? (
                    <Female style={{ height: "40px", marginTop: 5 }} />
                  ) : (
                    <Male style={{ height: "40px", marginTop: 5 }} />
                  )}
                </Box>
              </Card>
              </Link>
            );
          })}
          <Button
            sx={{ display: "flex", flexDirection: "column", minWidth: "100px" }}
          >
            <ArrowForwardIcon
              fontSize="large"
              sx={{
                color: colors.black[0],
                border: "2px solid #f1f1f1",
                borderRadius: "20px",
                p: 0.5,
                mb: 1,
              }}
            />
            <Typography sx={{ color: colors.black[0], textTransform: "none" }}>
              Ver outros animais
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
