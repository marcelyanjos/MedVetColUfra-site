import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { decode } from 'base-64'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../services/api'

function CheckAndAdopt(props) {
  const [animal, setAnimal] = useState(null)
  const { id } = useParams() // id do animal
  const [client, setClient] = useState(null)
  const [showTable, setShowTable] = useState(false)
  const [clientInfo, setClientInfo] = useState({
    nome: '',
    data_nasc: '',
    email: '',
    tipo_moradia: '',
    ocupacao: '',
  })

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  useEffect(() => {
    api
      .get(`/api/animals/${id}`)
      .then((animalResponse) => {
        setAnimal(animalResponse.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])

  useEffect(() => {
    if (client && animal) {
      api
        .get(
          `/api/adoption-forms?animal_id=${animal.id_animal}&cliente_id=${client.id_cliente}`,
        )
        .then((response) => {
          const adoptionForms = response.data
          if (adoptionForms.length > 0) {
            setOpenSnackbar(true)
            setSnackbarMessage(
              'O cliente já possui um formulário de adoção para esse animal.',
            )
            setSnackbarSeverity('warning')
          } else {
            setShowTable(true)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [client, animal])

  const handleClientInfoChange = (event) => {
    setClientInfo({
      ...clientInfo,
      [event.target.name]: event.target.value,
    })
  }

  const generateProtocol = () => {
    const randomString = Math.random().toString(36).substring(2, 8)
    return randomString.toUpperCase()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!client) {
      // Criar novo cliente
      const newClient = {
        nome: clientInfo.nome,
        data_nasc: clientInfo.data_nasc,
        email: clientInfo.email,
      }

      api
        .post('/api/clientes', newClient)
        .then((clientResponse) => {
          const adoptionForm = {
            id_cliente: clientResponse.data.id_cliente,
            id_animal: clientInfo.id_animal,
            ocupacao: clientInfo.ocupacao,
            tipo_moradia: clientInfo.tipo_moradia,
            protocolo: generateProtocol(),
            situacao: 'Em andamento',
            data_envio: format(new Date(), 'yyyy-MM-dd'),
            ...clientInfo,
          }
          submitAdoptionForm(adoptionForm)
          setOpenSnackbar(true)
          setSnackbarMessage('Novo cliente adicionado')
          setSnackbarSeverity('success')
        })
        .catch((error) => {
          console.error(error)
          setOpenSnackbar(true)
          setSnackbarMessage('Erro ao cadastrar novo cliente')
          setSnackbarSeverity('warning')
        })
    } else {
      // Cliente existente
      const adoptionForm = {
        id_cliente: client.id_cliente,
        id_animal: clientInfo.id_animal,
        ocupacao: clientInfo.ocupacao,
        tipo_moradia: clientInfo.tipo_moradia,
        protocolo: generateProtocol(),
        situacao: 'Em andamento',
        data_envio: format(new Date(), 'yyyy-MM-dd'),
        ...clientInfo,
      }
      console.log(adoptionForm)
      submitAdoptionForm(adoptionForm)
    }
  }

  const submitAdoptionForm = (adoptionForm) => {
    api
      .post('/api/adoption-forms', adoptionForm)
      .then(() => {
        setOpenSnackbar(true)
        setSnackbarMessage('Formulario enviado com sucesso.')
        setSnackbarSeverity('success')
        setClientInfo({
          nome: '',
          data_nasc: '',
          email: '',
          tipo_moradia: '',
          ocupacao: '',
        })
      })
      .catch((error) => {
        console.error(error)
        setOpenSnackbar(true)
        setSnackbarMessage('Erro ao enviar formulário')
        setSnackbarSeverity('warning')
      })
  }

  const handleSearchClient = (event) => {
    event.preventDefault()
    const dateOfBirth = new Date(clientInfo.data_nasc)
    api
      .get(
        `/api/clientes?nome=${clientInfo.nome.toUpperCase()}&data_nasc=${dateOfBirth.toISOString()}&email=${
          clientInfo.email
        }`,
      )
      .then((clientResponse) => {
        const clients = clientResponse.data
        if (clients.length === 1) {
          setClient(clients[0])
          // console.log("Cliente encontrado:", clients[0]);
        } else {
          setClient(null)
          setShowTable(true)
          // console.log("Cliente não encontrado");
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (animal) {
      setClientInfo((prevClientInfo) => ({
        ...prevClientInfo,
        id_animal: animal.id_animal,
      }))
    }
  }, [animal])

  return (
    <Box
      sx={{
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
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
      <Typography variant="h4">Adotar animal</Typography>
      <Grid item xs={12} sm={6}>
        {animal && (
          <Card sx={{ padding: 2, marginBottom: 2 }}>
            <Grid container sx={{ justifyContent: 'space-between' }}>
              <Grid item>
                <Typography>Nome: {animal.nome}</Typography>
                <Typography>Espécie: {animal.especie}</Typography>
                <Typography>Sexo: {animal.sexo}</Typography>
              </Grid>
              <Grid item sx={{ width: { sm: '25vw' } }}>
                <img
                  src={`data:image/${
                    animal.imagem.endsWith('png')
                      ? 'png'
                      : animal.imagem.endsWith('jpeg')
                      ? 'jpeg'
                      : 'jpg'
                  };base64,${decode(animal.imagem)}`}
                  alt={animal.nome}
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>
          </Card>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Grid item>
          <Typography variant="h5" align="center">
            Informações do Adotante
          </Typography>
          {!showTable && (
            <form onSubmit={handleSearchClient}>
              <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Nome"
                    name="nome"
                    placeholder="Nome Completo"
                    value={clientInfo.nome}
                    onChange={handleClientInfoChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    type="date"
                    label="Data de Nascimento"
                    name="data_nasc"
                    value={clientInfo.data_nasc}
                    onChange={handleClientInfoChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={clientInfo.email}
                    onChange={handleClientInfoChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button type="submit" variant="contained">
                    Buscar Cliente
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Grid>
        <Grid item>
          {showTable && (
            <form onSubmit={handleSubmit}>
              <Card sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {client ? 'Cliente' : 'Novo Cliente'}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="nome"
                      label="Nome"
                      value={clientInfo.nome}
                      onChange={handleClientInfoChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="data_nasc"
                      label="Data de nascimento"
                      type="date"
                      value={clientInfo.data_nasc}
                      onChange={handleClientInfoChange}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="email"
                      label="Email"
                      type="email"
                      value={clientInfo.email}
                      onChange={handleClientInfoChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="ocupacao"
                      label="Ocupação"
                      value={clientInfo.ocupacao}
                      onChange={handleClientInfoChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="tipo_moradia"
                      label="Tipo de moradia"
                      value={clientInfo.tipo_moradia}
                      onChange={handleClientInfoChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Card>
              <Grid container justifyContent="center">
                <Button type="submit" variant="contained" color="primary">
                  Enviar Formulário de Adoção
                </Button>
              </Grid>
            </form>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default CheckAndAdopt
