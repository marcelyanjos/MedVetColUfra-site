import React from "react";
import { Button, Box, Card, Typography } from "@mui/material";
import theme from "../../theme";
import data from "../../../../mockup/blog";
export default function Blog() {
  return (
    <Box sx={{ minHeight: "580px", width: "100%" }}>
      <Box sx={{ p: 3, pl: 4, pr: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
          <Typography sx={{ fontSize: 26, fontWeight: "bold" }}>
            Blog
          </Typography>
          <Button href="/blog">Ver mais</Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {data.map((i, index) => {
            return (
              <Card
                key={index}
                elevation={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  [theme.breakpoints.down("sm")]: { minWidth: "205px",width:'100%', mb: 2 },
                  [theme.breakpoints.down("sd")]: {
                    minWidth: "205px",
                    width:'100%',
                    mb: 2,
                  },
                  [theme.breakpoints.up("sd")]: {
                    minWidth: "205px",
                    width: "48%",
                    mb: 2,
                  },
                  [theme.breakpoints.up("lg")]: {
                    minWidth: "220px",
                    width: "24%",
                  },
                }}
              >
                <Box
                  sx={{
                    display:'flex', justifyContent:'center',
                      width: "100%",
                      height: "260px",
                  }}
                >
                  <img
                    src={i.image}
                    style={{width:"100%", objectFit: "cover" }}
                  />
                </Box>
                <Typography sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}>
                  <Typography
                    sx={{
                      color: "#5B8FF9",
                      fontWeight: "bold",
                      fontSize: 12,
                    }}
                  >
                    {i.categoria.join(", ")}
                  </Typography>
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      "&:first-letter": {
                        textTransform: "uppercase",
                      },
                    }}
                  >
                    {i.titulo}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#494a4a",
                      pt: 1,
                      pb: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 5,
                      "-webkit-box-orient": "vertical",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      height: "100px",
                      fontSize: 14,
                    }}
                  >
                    {i.descricao}
                  </Typography>
                </Typography>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
