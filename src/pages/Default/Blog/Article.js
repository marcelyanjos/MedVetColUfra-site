import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Host } from '../../../CMS/constant'
import { fetchArticleId } from '../../../services/cms'

const Article = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  // const navigate = useNavigate()

  useEffect(() => {
    fetchArticleId(setArticle, id, getArticleImageUrl)
  }, [id])

  const getArticleImageUrl = (imageAttributes) => {
    if (
      imageAttributes &&
      imageAttributes.formats &&
      imageAttributes.formats.thumbnail
    ) {
      const thumbnailUrl = imageAttributes.formats.thumbnail.url
      const finalImageUrl = thumbnailUrl.replace('/thumbnail_', '/')
      const imageUrl = `${Host}${finalImageUrl}`
      return imageUrl
    }

    return null
  }

  if (!article) {
    return <div>Carregando...</div>
  }

  return (
    <Box sx={{ pl: 5, pr: 5, pt: 8, pb: 4 }}>
      <Typography variant="h3">{article.titulo}</Typography>
      {article.ilustracao && (
        <img
          src={article.ilustracao}
          alt="Ilustração"
          style={{
            width: '100%',
            maxHeight: '380px',
            objectFit: 'cover',
            marginBottom: 10,
          }}
        />
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
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
    </Box>
  )
}

export default Article
