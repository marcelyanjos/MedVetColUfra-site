import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { format } from 'date-fns'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'

function CheckClient(props) {
  // const navigate = useNavigate()
  const [clientInfo, setClientInfo] = useState({
    nome: '',
    data_nasc: '',
    email: '',
  })

  const [showTable, setShowTable] = useState(false)
  const [agendamentos, setAgendamentos] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleClientInfoChange = (event) => {
    setClientInfo({
      ...clientInfo,
      [event.target.name]: event.target.value,
    })
  }

  const handleSearchClient = (event) => {
    event.preventDefault()
    const dateOfBirth = new Date(clientInfo.data_nasc)
    api
      .get(
        `/api/clientes?nome=${
          clientInfo.nome
        }&data_nasc=${dateOfBirth.toISOString()}&email=${clientInfo.email}`,
      )
      .then((clientResponse) => {
        const clients = clientResponse.data
        console.log('resposta de busca', clients)

        if (clients.length === 1) {
          const id_cliente = clients[0].id_cliente
          console.log('id cliente', id_cliente)
          loadAgendamentos(id_cliente)
          setShowTable(true)
        } else if (clients.length === 0) {
          alert('Cliente não encontrado')
          setAgendamentos([])
          setShowTable(false)
        } else {
          alert(
            'Mais de um cliente encontrado com os mesmos dados. Verifique a base de dados.',
          )
          setAgendamentos([])
          setShowTable(true)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const handleClearSearch = () => {
    setClientInfo({
      nome: '',
      data_nasc: '',
      email: '',
    })
    setShowTable(false)
    setAgendamentos([])
  }

  const loadAgendamentos = (id_cliente) => {
    setIsLoading(true)
    console.log('id em tabela', id_cliente)
    api
      .get(`/api/agendamentos/${id_cliente}`)
      .then(async (response) => {
        const agendamentosData = response.data
        const agendamentos = await Promise.all(
          agendamentosData.map(async (agendamento) => {
            const { id_agendamento, id_pet, id_servicos } = agendamento
            const dia = format(new Date(agendamento.dia), 'dd/MM/yyyy')

            const petResponse = await api.get(`/api/petCliente/${id_pet}`)
            const pet = petResponse.data[0]

            const serviceResponse = await api.get(
              `/api/servicos/${id_servicos}`,
            )
            const service = serviceResponse.data[0]

            return {
              id: id_agendamento,
              cliente: clientInfo.nome,
              'data de nascimento': clientInfo.data_nasc,
              'nome do animal': pet.nome,
              'tipo de consulta': service.tipo_servico,
              'data da consulta': dia,
              horario: agendamento.hora,
            }
          }),
        )

        setAgendamentos(agendamentos)
        console.log(agendamentos)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }

  const columns = [
    { field: 'id', type: 'number', flex: 0.4 },
    { field: 'cliente', type: 'string', flex: 0.8 },
    { field: 'data de nascimento', type: 'Date', flex: 0.8 },
    { field: 'nome do animal', type: 'string', flex: 0.8 },
    { field: 'data da consulta', type: 'Date', flex: 0.8 },
    { field: 'horario', type: 'time', flex: 0.4 },
    { field: 'tipo de consulta', type: 'string', flex: 0.8 },
    {
      field: 'actions',
      type: 'actions',
      width: 90,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<InfoIcon />}
          label="Details"
          onClick={details(params.id)}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<EditIcon />}
          label="Edit"
          onClick={edit(params.id)}
          showInMenu
        />,
      ],
    },
  ]

  const details = (id) => () => {
    console.log('details: ', agendamentos[id - 1])
  }

  const edit = (id) => () => {
    console.log('edit: ', id)
  }

  return (
    <Container
      minHeight={'100%'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          mt: 4,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Grid item>
          <Typography variant="h5" align="center">
            Consultar meus agendamentos
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
        <Grid item sx={{ mt: 2 }}>
          {isLoading ? (
            <Typography variant="body1" align="center">
              Carregando agendamentos...
            </Typography>
          ) : (
            showTable && (
              <>
                <Paper>
                  <DataGrid
                    columns={columns}
                    rows={agendamentos}
                    autoHeight
                    pageSize={5}
                  />
                </Paper>
                <Button
                  variant="contained"
                  onClick={handleClearSearch}
                  sx={{ mt: 2 }}
                >
                  Voltar
                </Button>
              </>
            )
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default CheckClient
