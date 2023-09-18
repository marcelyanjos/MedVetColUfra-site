import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDestaqueId, populateDestaque } from '../../../services/cms'
import { stylesEditor } from './style'

export default function Article() {
  const [publishedAtDate, setPublishedAtDate] = useState(null)
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(!id)
  const [formData, setFormData] = useState({
    titulo: '',
    imagem: null,
    imagemPreview: null,
    conteudo: null,
    conteudoPreview: null,
    link: '',
    ordem: '',
    publishedAt: '',
  })
  const navigate = useNavigate()

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  useEffect(() => {
    if (id) {
      getDestaqueId(
        setFormData,
        id,
        setIsLoading,
        setPublishedAtDate,
        setOpenSnackbar,
        setSnackbarMessage,
        setSnackbarSeverity,
      )
    } else {
      setIsLoading(false)
    }
  }, [id])

  const handleFormChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Use o hook useDropzone para criar a área de dropzone para a imagem
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*', // Aceita apenas arquivos de imagem
    onDrop: (acceptedFiles) => {
      // Quando o arquivo é solto na área de dropzone
      const file = acceptedFiles[0] // Pega o primeiro arquivo

      if (file) {
        setFormData((prevData) => ({
          ...prevData,
          imagem: file,
        }))

        const reader = new FileReader()
        reader.onload = () => {
          setFormData((prevData) => ({
            ...prevData,
            imagemPreview: reader.result,
          }))
        }
        reader.readAsDataURL(file)
      }
    },
  })

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      if (type === 'imagem' && file.type.startsWith('image/')) {
        setFormData((prevData) => ({
          ...prevData,
          imagem: file,
        }))

        const reader = new FileReader()
        reader.onload = () => {
          setFormData((prevData) => ({
            ...prevData,
            imagemPreview: reader.result,
          }))
        }
        reader.readAsDataURL(file)
      } else if (type === 'conteudo') {
        setFormData((prevData) => ({
          ...prevData,
          conteudo: file,
          conteudoPreview: URL.createObjectURL(file), // Atualiza conteudoPreview
        }))
      } else {
        setOpenSnackbar(true)
        setSnackbarMessage('Tipo de arquivo não suportado.')
        setSnackbarSeverity('warning')
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    await populateDestaque(
      formData,
      setFormData,
      publishedAtDate,
      id,
      navigate,
      setOpenSnackbar,
      setSnackbarMessage,
      setSnackbarSeverity,
    )
  }

  return (
    <div>
      {isLoading ? (
        <div style={stylesEditor.loading}>
          <CircularProgress />
          <Typography variant="h3">Loading...</Typography>
        </div>
      ) : (
        <Box>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <Box sx={{ pb: 5, display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              fontFamily={'Public Sans'}
              fontWeight={700}
              color="#212B36"
              variant="h5"
            >
              {id ? 'Editar' : 'Adicionar'} Seção
            </Typography>
          </Box>
          <Paper sx={{ p: 3, height: '100%' }}>
            <form onSubmit={handleSubmit}>
              <Box
                sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}
              >
                <TextField
                  id="standard-basic"
                  label="Titulo"
                  name="titulo"
                  value={formData.titulo}
                  sx={{ flex: 1 }}
                  onChange={handleFormChange}
                  variant="standard"
                />
              </Box>
              <Box>
                <Typography variant="subtitle1">Imagem:</Typography>
                <div
                  {...getRootProps()} // Adicione as props do getRootProps à div para criar a área de dropzone
                  onDragOver={(e) => e.preventDefault()}
                  style={stylesEditor.dropzone}
                >
                  {formData.imagemPreview ? (
                    <img
                      src={formData.imagemPreview}
                      alt="imagem"
                      style={{ height: '300px', marginBottom: 10 }}
                    />
                  ) : (
                    <Typography>Arraste e solte a imagem aqui</Typography>
                  )}
                </div>
                <input {...getInputProps()} />{' '}
                {/* Adicione as props do getInputProps ao input para lidar com a seleção de arquivos */}
              </Box>
              <Box>
                <Typography>Link</Typography>
                <TextField
                  size="small"
                  name="link"
                  fullWidth
                  maxRows={4}
                  id="standard-basic"
                  value={formData.link}
                  onChange={handleFormChange}
                />
              </Box>
              <Box>
                <Typography>Conteúdo:</Typography>
                <input
                  type="file"
                  name="conteudo"
                  onChange={(e) => handleFileChange(e, 'conteudo')}
                />
                {formData.conteudoPreview && (
                  <div>
                    <Typography>Conteúdo Pré-visualizado:</Typography>
                    <embed
                      src={formData.conteudoPreview}
                      title="Conteúdo Pré-visualizado"
                      style={{ width: '100%', height: '500px' }}
                    />
                  </div>
                )}
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ pt: 1, flex: 1 }}>
                  <Button
                    onClick={() =>
                      setPublishedAtDate((date) => (date ? null : new Date()))
                    }
                    sx={{
                      bgcolor: publishedAtDate ? '#38d472' : '#c1c1c1',
                      mr: 1,
                      color: '#ffffff',
                    }}
                  >
                    {publishedAtDate ? 'Publicar' : 'Rascunho'}
                  </Button>
                </Box>
                <Box sx={{ pt: 1 }}>
                  <Button type="submit" sx={stylesEditor.submit}>
                    Save
                  </Button>
                  <Button
                    component={Link}
                    variant={`outlined`}
                    sx={stylesEditor.link}
                    to=".."
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </Box>
      )}
    </div>
  )
}
