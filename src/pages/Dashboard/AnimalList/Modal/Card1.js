import DeleteIcon from '@mui/icons-material/Delete'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { decode } from 'base-64'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../../services/api'
import colors from '../../../../styles/colors'
import styles from '../style'

const card1 = {
  border: '1px solid #CFD0D7',
  maxHeight: '95%',
  borderRadius: '4px',
  p: 1,
}
const card2 = {
  border: '1px solid #CFD0D7',
  maxHeight: '95%',
  borderRadius: '4px',
  p: 1,
}
export default function Card1() {
  const navigate = useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [newImage, setNewImage] = useState(true)

  const { id } = useParams()

  const [animal, setAnimal] = useState({
    nome: '',
    especie: '',
    sexo: '',
    idade: '',
    peso: '',
    adotado: false,
    imagem: '',
  })

  useEffect(() => {
    // Se existe o id, carrega as informações do animal para editar
    if (id) {
      api.get(`/api/animals/${id}`).then((response) => {
        const animalData = response.data
        setNewImage(false)
        setAnimal({
          nome: animalData.nome,
          especie: animalData.especie,
          sexo: animalData.sexo,
          idade: animalData.idade,
          peso: animalData.peso,
          adotado: animalData.adotado,
          imagem: animalData.imagem,
        })
      })
    } else {
      // Se não, reseta estado
      setAnimal({
        nome: '',
        especie: '',
        sexo: '',
        idade: '',
        peso: '',
        adotado: false,
        imagem: '',
      })
    }
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'imagem') {
      setNewImage(true)
    }
    setAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      // Check if there is a new image and convert it to base64
      let base64
      if (newImage && animal.imagem) {
        base64 = await convertImageToBase64(animal.imagem)
      }

      if (id) {
        // Se atualiza os dados do animal
        const updateData = {
          ...animal,
          imagem: base64 || decode(animal.imagem), // Use the existing image if there is no new image
        }

        await api.put(`/api/animals/${id}`, updateData)
        setOpenSnackbar(true)
        setSnackbarMessage('Dados atualizados com sucesso!')
        setSnackbarSeverity('success')
        navigate('..', 3000)
      } else {
        // Se adiciona novo animal
        await api.post('/api/animals', {
          ...animal,
          newImage: !!base64, // se imagem for nova
          imagem: base64 || undefined,
        })
        setOpenSnackbar(true)
        setSnackbarMessage('Dados atualizados com sucesso!')
        setSnackbarSeverity('success')
        // Limpa os dados do animal
        setAnimal({
          nome: '',
          especie: '',
          sexo: '',
          idade: '',
          peso: '',
          adotado: '',
          imagem: '',
        })
      }
    } catch (error) {
      console.error(error)
      setOpenSnackbar(true)
      setSnackbarMessage('Erro ao enviar dados. Tente novamente.')
      setSnackbarSeverity('error')
    }
  }

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result.split(',')[1])
      reader.onerror = (error) => reject(error)
    })
  }

  // Drag and drop functionality
  const onDrop = useCallback(
    (acceptedFiles) => {
      setAnimal({ ...animal, imagem: acceptedFiles[0] })
      setNewImage(true)
    },
    [animal],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Box sx={{ height: '100%', minHeight: '360px', p: 2 }}>
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
      <Grid sx={styles.modal_box} container>
        <Grid xs={12} sm={6} ls={12} sx={card1}>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              fullWidth
              required
              size="small"
              autoComplete="username"
              label="Nome"
              type="text"
              name="nome"
              variant="outlined"
              value={animal.nome}
              onChange={handleChange}
            />
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                select
                required
                size="small"
                label="Espécie"
                name="especie"
                value={animal.especie}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="CANINO">Cachorro</MenuItem>
                <MenuItem value="FELINO">Gato</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                autoComplete="username"
                type="text"
                name="idade"
                label="idade"
                margin="normal"
                value={animal.idade}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                select
                required
                size="small"
                label="Sexo"
                name="sexo"
                value={animal.sexo}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="MACHO">Macho</MenuItem>
                <MenuItem value="FEMEA">Fêmea</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                name="peso"
                label="peso"
                margin="normal"
                value={animal.peso}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} sm={6} ls={12} sx={card2} container>
          <div
            {...getRootProps()}
            style={{
              height: '98%',
              width: '95%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              border: '1px dashed #CFD0D7',
              borderRadius: '4px',
              padding: '16px',
              backgroundColor: isDragActive ? '#F4F5F7' : 'transparent',
            }}
          >
            <input {...getInputProps()} />
            {animal.imagem ? (
              <img
                src={
                  newImage
                    ? URL.createObjectURL(animal.imagem)
                    : `data:image/jpeg;base64,${decode(animal.imagem)}`
                }
                alt="Animal"
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <InsertDriveFileOutlinedIcon fontSize="large" />
                <Typography variant="body1">
                  Arraste e solte a imagem aqui ou clique para fazer o upload
                </Typography>
              </div>
            )}
            {animal.imagem && (
              <>
                {newImage ? (
                  <Typography variant="body1">{animal.imagem.name}</Typography>
                ) : (
                  <Typography variant="body1">{animal.nome}</Typography>
                )}
                <IconButton
                  aria-label="delete"
                  onClick={() => setAnimal({ ...animal, imagem: '' })}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ bgcolor: colors.green[7] }}
          >
            Enviar
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            component={Link}
            href="/admin/dashboard/animais"
            sx={{ color: colors.green[4], borderColor: colors.green[4] }}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
      {/* </Box> */}
    </Box>
  )
}
