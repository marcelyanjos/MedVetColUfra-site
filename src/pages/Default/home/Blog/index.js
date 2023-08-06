import React, { useState, useEffect } from "react";
import { Button, Box, Card, Typography, Link } from "@mui/material";
import axios from "axios";
import theme from "../../theme";
import { API, Host } from "../../../../CMS/constant";
export default function Blog() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `${API}/artigos?populate=ilustracao`
      );
      setArticles(response.data.data);
      // console.log("artigos", response.data.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };
  return (
    <Box sx={{ minHeight: "580px", width: "100%" }}>
      <Box sx={{ p: 3, pl: 5, pr: 5 }}>
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
          {articles.slice(0, 4).map((article) => (
            <Card
              component={Link}
              href={`/blog/${article.id}`}
              key={article.id}
              elevation={4}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                textDecoration: "none",
                [theme.breakpoints.down("sm")]: {
                  minWidth: "205px",
                  width: "100%",
                  mb: 2,
                },
                [theme.breakpoints.down("sd")]: {
                  minWidth: "205px",
                  width: "100%",
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
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  height: "260px",
                }}
              >
                {article.attributes.ilustracao &&
                  article.attributes.ilustracao.data && (
                    <img
                      src={`${Host}${article.attributes.ilustracao.data.attributes.url}`}
                      alt="Ilustração"
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        marginBottom: 10,
                      }}
                    />
                  )}
              </Box>
              <Typography
                component={"span"}
                variant={"body2"}
                sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}
              >
                <Typography
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    "&:first-letter": {
                      textTransform: "uppercase",
                    },
                  }}
                >
                  {article.attributes.titulo}
                </Typography>
                <Typography
                  sx={{
                    color: "#494a4a",
                    pt: 1,
                    pb: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 5,
                    webkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    height: "100px",
                    fontSize: 14,
                  }}
                >
                  {article.attributes.descricao}
                </Typography>
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
