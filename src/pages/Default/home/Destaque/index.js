import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import { API, Host } from "../../../../CMS/constant";
import axios from "axios";
import Carousel from "react-material-ui-carousel";

export default function Destaque() {
  const [currentItem, setCurrentItem] = useState(0); // Inicializado em 0
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `${API}/destaques?populate=imagem,conteudo`
      );
      setArticles(response.data.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleImageClick = (link, conteudo) => {
    if (conteudo && conteudo.data && conteudo.data.attributes.url) {
      window.open(`${Host}${conteudo.data.attributes.url}`, "_blank"); // Abre o conteúdo (PDF, CSV, etc.) em uma nova aba
    } else if (link) {
      window.open(link, "_blank"); // Abre o link em uma nova aba
    }
  };

  return (
    <Box sx={{ width: "95%" }}>
      <Carousel
        timeout={0}
        animation
        autoPlay
        index={currentItem}
        navButtonsAlwaysVisible
        next={(next, active) => setCurrentItem(next)}
        prev={(prev, active) => setCurrentItem(prev)}
        indicators
        height={"60vh"}
      >
        {articles.map((article, i) => (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            key={i}
          >
            {article.attributes.imagem && article.attributes.imagem.data && (
              <img
                src={`${Host}${article.attributes.imagem.data.attributes.url}`}
                alt="Ilustração"
                style={{
                  height: "100%",
                  objectFit: "contain",
                  cursor: "pointer", // Adiciona um cursor de mão ao passar o mouse
                }}
                onClick={() =>
                  handleImageClick(
                    article.attributes.link,
                    article.attributes.conteudo
                  )
                } // Chama a função de clique com link e conteúdo
              />
            )}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
