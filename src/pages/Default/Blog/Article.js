import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Divider, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/artigos/${id}?populate=ilustracao`);
        const articleData = response.data.data.attributes;

        // Obtém a URL correta da ilustração
        const imageUrl = articleData.ilustracao && articleData.ilustracao.data
          ? getArticleImageUrl(articleData.ilustracao.data.attributes)
          : null;

        setArticle({ ...articleData, ilustracao: imageUrl });
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  const getArticleImageUrl = (imageAttributes) => {
    if (imageAttributes && imageAttributes.formats && imageAttributes.formats.thumbnail) {
      const thumbnailUrl = imageAttributes.formats.thumbnail.url;
      const finalImageUrl = thumbnailUrl.replace('/thumbnail_', '/');
      const imageUrl = `http://localhost:1337${finalImageUrl}`;
      return imageUrl;
    }

    return null;
  };

  if (!article) {
    return <div>Carregando...</div>;
  }

  const bodyWithImageUrl = article.body.replace(/\/uploads/g, 'http://localhost:1337/uploads');

  return (
    <Box sx={{pl:5, pr:5}}>
      <Typography variant="h3">{article.titulo}</Typography>
      {article.ilustracao && (
        <img src={article.ilustracao} alt="Ilustração" style={{ width: '100%', marginBottom: 10 }} />
      )}
      <Typography variant="body2" color="text.secondary">
        Data de Publicação: {article.data_pub}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Data de Edição: {article.data_edit}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Autor: {article.autor}
      </Typography>
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: bodyWithImageUrl }} />
    </Box>
  );
};

export default Article;
