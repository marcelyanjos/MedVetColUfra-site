import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { decode } from 'base-64'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  addAdoptionForm,
  editAdoptionForm,
  getAdoptionFormByFormId,
} from '../../../../services/adocao'
import { getPet, getPetById } from '../../../../services/animaisCanil'
import {
  addClient,
  getClientById,
  updateClient,
} from '../../../../services/clientes'
import colors from '../../../../styles/colors'
import styles from '../style'

const card1 = {
  border: '1px solid #CFD0D7',
  maxHeight: '95%',
  borderRadius: '4px',
  p: 1,
}

export default function Card1() {
  const [client, setClient] = useState({
    nome: '',
    data_nasc: '',
    email: '',
    moradia: '',
    ocupacao: '',
  })

  const [animal, setAnimal] = useState({
    id_animal: '',
    nome: '',
    especie: '',
    sexo: '',
    idade: '',
    peso: '',
    imagem: '',
  })

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [animalsList, setAnimalsList] = useState([])

  const { id } = useParams()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getPet()
        setAnimalsList(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (id) {
      // Caso editar formulario
      getAdoptionFormByFormId(id).then((adoptionFormData) => {
        // Fetch client data com id_cliente
        getClientById(adoptionFormData.id_cliente).then((clientResponse) => {
          const clientData = clientResponse.data
          setClient({
            nome: clientData.nome,
            data_nasc: format(new Date(clientData.data_nasc), 'yyyy-MM-dd'),
            email: clientData.email,
            moradia: adoptionFormData.tipo_moradia,
            ocupacao: adoptionFormData.ocupacao,
          })
        })

        // Fetch animal data com id_animal
        getPetById(adoptionFormData.id_animal).then((animalData) => {
          setAnimal({
            id_animal: animalData.id_animal,
            nome: animalData.nome,
            especie: animalData.especie,
            sexo: animalData.sexo,
            idade: animalData.idade,
            peso: animalData.peso,
            imagem: animalData.imagem,
          })
        })
      })
    }
  }, [id])

  // Caso selecionado um animal do formulario
  const handleChange = (event) => {
    const { name, value } = event.target

    if (animalsList.length > 0) {
      const selectedValue = parseInt(value)

      const selectedAnimal = animalsList.find(
        (animalOption) => animalOption.id_animal === selectedValue,
      )

      if (selectedAnimal) {
        setAnimal((prevAnimal) => ({
          ...prevAnimal,
          [name]: selectedValue,
          id_animal: selectedAnimal.id_animal,
          nome: selectedAnimal.nome,
          especie: selectedAnimal.especie,
          sexo: selectedAnimal.sexo,
          idade: selectedAnimal.idade,
          peso: selectedAnimal.peso,
          imagem: selectedAnimal.imagem,
        }))
      }
    }
  }

  const handleClientChange = (event) => {
    const { name, value } = event.target
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }))
  }

  const generateProtocol = () => {
    const randomString = Math.random().toString(36).substring(2, 8)
    return randomString.toUpperCase()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      if (id) {
        // Fetch adoption form data by ID
        const adoptionFormData = await getAdoptionFormByFormId(id)
        // Check if the client exists
        const clientResponse = await getClientById(adoptionFormData.id_cliente)

        if (clientResponse.status === 404) {
          // Client does not exist, create a new one
          const newClientResponse = await addClient(
            client.nome,
            client.data_nasc,
            client.email,
          )

          // Update the adoption form with the newly created client ID
          await editAdoptionForm(
            id,
            newClientResponse.id_cliente,
            animal.id_animal,
            client.moradia,
            client.ocupacao,
          )
        } else {
          // Update existing client data
          await updateClient(adoptionFormData.id_cliente, client)

          // Update existing adoption form data
          await editAdoptionForm(
            id,
            adoptionFormData.id_cliente,
            animal.id_animal,
            client.moradia,
            client.ocupacao,
          )
          setOpenSnackbar(true)
          setSnackbarMessage('Dados atualizados com sucesso!')
          setSnackbarSeverity('success')
        }
      } else {
        // Submit client data to the client API endpoint
        const clientResponse = await addClient(
          client.nome,
          client.data_nasc,
          client.email,
        )

        const createdClientId = clientResponse.id_cliente
        const currentDate = format(new Date(), 'yyyy-MM-dd')
        // Submit adoption form data to the formularios-adocao API endpoint
        await addAdoptionForm(
          createdClientId,
          animal.id_animal,
          generateProtocol(),
          client.moradia,
          client.ocupacao,
          currentDate,
        )
      }

      setOpenSnackbar(true)
      setSnackbarMessage('Dados enviados com sucesso!')
      setSnackbarSeverity('success')
      setClient({
        nome: '',
        data_nasc: '',
        email: '',
        moradia: '',
        ocupacao: '',
      })
      setAnimal({
        id_animal: '',
        nome: '',
        especie: '',
        sexo: '',
        idade: '',
        peso: '',
        imagem: '',
      })
    } catch (error) {
      console.error(error)
    }
  }

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
        <Grid xs={12} sm={6} ls={12} sx={card1} item>
          <Typography variant="h4">Adotante</Typography>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              fullWidth
              required
              size="small"
              label="Nome"
              type="text"
              name="nome"
              variant="outlined"
              value={client.nome}
              onChange={handleClientChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              fullWidth
              required
              size="small"
              label="Data de nascimento"
              type="date"
              name="data_nasc"
              value={client.data_nasc}
              onChange={handleClientChange}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              sx={{
                width: '100%',
              }}
              size="small"
              type="text"
              name="email"
              label="Email"
              margin="normal"
              value={client.email}
              onChange={handleClientChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              sx={{
                width: '100%',
              }}
              size="small"
              type="text"
              name="moradia"
              label="Moradia"
              margin="normal"
              value={client.moradia}
              onChange={handleClientChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              sx={{
                width: '100%',
              }}
              size="small"
              type="text"
              name="ocupacao"
              label="Ocupação"
              margin="normal"
              value={client.ocupacao}
              onChange={handleClientChange}
            />
          </Grid>
        </Grid>
        <Grid xs={12} sm={6} ls={12} sx={card1} item>
          <Typography variant="h4">Animal Adotado</Typography>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              select
              sx={{
                width: '100%',
              }}
              size="small"
              name="id_animal"
              label="Animal"
              margin="normal"
              value={animal.id_animal ?? ''}
              onChange={handleChange}
            >
              {animalsList.map((animalOption) => (
                <MenuItem
                  key={animalOption.id_animal}
                  value={animalOption.id_animal}
                >
                  {animalOption.nome} - {animalOption.especie}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            {/* Display the selected animal's details */}
            <Typography>Nome: {animal.nome}</Typography>
            <Typography>Especie: {animal.especie}</Typography>
            <Typography>Sexo: {animal.sexo}</Typography>
            <Typography>Idade: {animal.idade} anos</Typography>
            <Typography>Peso: {animal.peso}kg</Typography>
            {animal.imagem && (
              <img
                style={{ width: '100%', objectFit: 'contain' }}
                src={`data:image/jpeg;base64,${decode(animal.imagem)}`}
                alt="Animal"
              />
            )}
          </Grid>
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
            href="/admin/dashboard/adocoes"
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
