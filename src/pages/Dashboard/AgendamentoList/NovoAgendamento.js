import {
  Alert,
  Box,
  Button,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  fetchServices,
  getAvailability,
  getEditSchedulesByClientId,
  schedule,
} from '../../../services/agendamento'
import {
  addClient,
  addPet,
  checkClient,
  checkPet,
  getClientById,
  getPetClientByPetId,
} from '../../../services/clientes'

const AgendamentoConsulta = () => {
  const [formState, setFormState] = useState({
    servico: '',
    dia: new Date(),
    hora: '',
    nomeCliente: '',
    dataNascimento: '',
    email: '',
    id_animal: '',
    nomeAnimal: '',
    idade: '',
    especie: '',
    peso: '',
    sexo: '',
    motivoConsulta: '',
  })
  console.log(
    '🚀 ~ file: NovoAgendamento.js:49 ~ AgendamentoConsulta ~ formState:',
    formState,
  )

  const [listaServicos, setListaServicos] = useState([])
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([])
  const [horarioSelecionado, setHorarioSelecionado] = useState(false)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  const id = useParams()

  useEffect(() => {
    fetchServices(setListaServicos)
  }, [])

  useEffect(() => {
    const clientId = id.id

    if (clientId) {
      // Caso editar formulario
      getEditSchedulesByClientId(clientId).then((response) => {
        const agendamentoFormData = response[0]
        getClientById(agendamentoFormData.id_cliente).then((clientResponse) => {
          const clientData = clientResponse.data

          setFormState((state) => ({
            ...state,
            nomeCliente: clientData.nome,
            dataNascimento: format(
              new Date(clientData.data_nasc),
              'yyyy-MM-dd',
            ),
            email: clientData.email,
          }))
        })
        setFormState((state) => ({
          ...state,
          ...agendamentoFormData,
          dia: new Date(agendamentoFormData.dia),
        }))

        // Fetch animal data com id_animal
        getPetClientByPetId(agendamentoFormData.id_pet).then(
          (animalResponse) => {
            const animalData = animalResponse[0]

            setFormState((state) => ({
              ...state,
              id_animal: animalData.id_pet,
              nomeAnimal: animalData.nome,
              especie: animalData.especie,
              sexo: animalData.sexo,
              idade: animalData.idade,
              peso: animalData.peso,
            }))
          },
        )
        setFormState((state) => ({
          ...state,
          servico: agendamentoFormData.id_servicos,
          motivoConsulta: agendamentoFormData.motivo,
        }))
      })
    }
  }, [id])

  useEffect(() => {
    const horarios = []
    for (let hour = 8; hour <= 16; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (
          !(hour === 11 && minute === 30) &&
          !(hour === 13 && minute === 30)
        ) {
          const time = `${hour.toString().padStart(2, '0')}:${minute
            .toString()
            .padStart(2, '0')}`
          horarios.push(time)
        }
      }
    }
    setHorariosDisponiveis(horarios)
  }, [])

  const handleServices = (event) => {
    setFormState({
      ...formState,
      servico: event.target.value,
      dia: null,
      hora: '',
    })
  }
  const handleDate = (date) => {
    setFormState((state) => ({ ...state, dia: date }))
    setFormState((state) => ({ ...state, hora: '' }))
  }

  const handleSubmit = async () => {
    if (!formState.dia) {
      setOpenSnackbar(true)
      setSnackbarMessage('Por favor, escolha uma data.')
      setSnackbarSeverity('warning')
      return
    }

    const dataFormatada = format(formState.dia, 'MM-dd-yyyy')
    // Converta a data formatada de volta para um objeto Date
    const dataObj = new Date(dataFormatada)

    if (dataObj.getDay() === 0 || dataObj.getDay() === 6) {
      setOpenSnackbar(true)
      setSnackbarMessage('Por favor, escolha uma data durante a semana.')
      setSnackbarSeverity('warning')
      return
    }

    if (dataObj < new Date()) {
      setOpenSnackbar(true)
      setSnackbarMessage('Por favor escolher uma data futura')
      setSnackbarSeverity('warning')
      return
    }

    const agendamento = await getAvailability(
      formState.servico,
      formState.dia,
      formState.hora,
    )
    const agendamentoExistente = agendamento.disponibilidade !== 'disponivel'

    if (agendamentoExistente) {
      setOpenSnackbar(true)
      setSnackbarMessage(
        'Agendamento indisponivel para o horario. Selecione outra data ou um novo horario',
      )
      setSnackbarSeverity('warning')
      return
    }

    const clienteExistente = await verificarClienteExistente(
      formState.nomeCliente,
      formState.dataNascimento,
      formState.email,
    )

    if (clienteExistente) {
      const id_cliente = clienteExistente.id_cliente
      const petExistente = await verificarPetExistente(
        id_cliente,
        formState.nomeAnimal,
        formState.especie,
        formState.sexo,
      )

      if (petExistente) {
        const id_pet = petExistente.id_pet
        salvarAgendamento(
          formState.servico,
          formState.dia,
          formState.hora,
          id_cliente,
          id_pet,
        )
      } else {
        const id_pet = await cadastrarPetCliente(id_cliente)
        if (!id_pet) {
          setOpenSnackbar(true)
          setSnackbarMessage('Erro ao salvar dados do animal. Tente novamente.')
          setSnackbarSeverity('error')
        }
      }
    } else {
      const id_cliente = await cadastrarCliente()
      if (id_cliente) {
        const id_pet = await cadastrarPetCliente(id_cliente)
        if (id_pet) {
          salvarAgendamento(
            formState.servico,
            formState.dia,
            formState.hora,
            id_cliente,
            id_pet,
          )
        } else {
          setOpenSnackbar(true)
          setSnackbarMessage('Erro ao salvar dados do animal. Tente novamente.')
          setSnackbarSeverity('error')
        }
      } else {
        setOpenSnackbar(true)
        setSnackbarMessage('Erro ao salvar dados do cliente. Tente novamente.')
        setSnackbarSeverity('error')
      }
    }
  }

  useEffect(() => {
    if (!formState.hora) {
      setHorarioSelecionado(false)
    } else {
      setHorarioSelecionado(true)
    }
  }, [formState.hora])

  const verificarClienteExistente = async (
    nomeCliente,
    dataNascimento,
    email,
  ) => {
    try {
      const clientes = await checkClient(nomeCliente, dataNascimento, email)
      return clientes
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const verificarPetExistente = async (id_cliente, nome, especie, sexo) => {
    try {
      const pets = await checkPet(id_cliente, nome, especie, sexo)
      return pets
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const cadastrarCliente = async () => {
    try {
      const response = await addClient(
        formState.nomeCliente,
        formState.dataNascimento,
        formState.email,
      )

      setOpenSnackbar(true)
      setSnackbarMessage('Dados cliente adicionados com sucesso!')
      setSnackbarSeverity('success')
      return response.id_cliente
    } catch (error) {
      setOpenSnackbar(true)
      setSnackbarMessage('Erro ao salvar dados do cliente. Tente novamente.')
      setSnackbarSeverity('error')
      return null
    }
  }

  const cadastrarPetCliente = async (id_cliente) => {
    try {
      const response = await addPet(
        id_cliente,
        formState.nomeAnimal,
        formState.idade,
        formState.especie,
        formState.peso,
        formState.sexo,
      )

      setOpenSnackbar(true)
      setSnackbarMessage('Dados do animal salvo com sucesso!')
      setSnackbarSeverity('success')
      return response.id_pet
    } catch (error) {
      setOpenSnackbar(true)
      setSnackbarMessage('Erro ao salvar dados do animal. Tente novamente.')
      setSnackbarSeverity('error')
      return null
    }
  }

  const salvarAgendamento = async (
    servico,
    data,
    horario,
    id_cliente,
    id_pet,
  ) => {
    try {
      schedule(
        servico,
        id_cliente,
        id_pet,
        data,
        horario,
        formState.motivoConsulta,
      )

      setOpenSnackbar(true)
      setSnackbarMessage('Agendamento salvo com sucesso!')
      setSnackbarSeverity('success')
    } catch (error) {
      console.error(error)
      setOpenSnackbar(true)
      setSnackbarMessage('Erro ao agendar consulta. Tente novamente.')
      setSnackbarSeverity('error')
    }
  }

  const isFormComplete = () => {
    return (
      formState.nomeCliente &&
      formState.dataNascimento &&
      formState.email &&
      formState.nomeAnimal &&
      formState.idade &&
      formState.especie &&
      formState.sexo &&
      formState.servico &&
      formState.dia &&
      formState.hora
    )
  }

  const isHorarioSelecionado = (horario) => {
    return formState.hora === horario && horarioSelecionado
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pt: 3,
        pb: 3,
        pl: 5,
        pr: 5,
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
      <Typography variant="h6">Agendamento de Consulta</Typography>
      <Box sx={{ display: 'flex', mt: 2 }}>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', width: '40%', mr: 1 }}
        >
          <TextField
            select
            required
            size="small"
            label="Serviço"
            name="serviço"
            value={formState.servico}
            onChange={handleServices}
          >
            {listaServicos.map((servico) => (
              <MenuItem key={servico.id_servicos} value={servico.id_servicos}>
                {servico.tipo_servico}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            label="Nome completo"
            name="nomeCliente"
            size="small"
            value={formState.nomeCliente}
            onChange={(e) =>
              setFormState({ ...formState, nomeCliente: e.target.value })
            }
            sx={{ marginTop: 2 }}
          />

          <TextField
            required
            type="date"
            size="small"
            label="Data de Nascimento"
            name="dataNascimento"
            value={formState.dataNascimento}
            onChange={(e) =>
              setFormState({ ...formState, dataNascimento: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginTop: 2 }}
          />

          <TextField
            required
            label="Email"
            name="email"
            size="small"
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            sx={{ marginTop: 2 }}
          />
          <p />

          <Grid spacing={2}>
            <TextField
              required
              fullWidth
              label="Nome do Animal"
              size="small"
              name="nomeAnimal"
              value={formState.nomeAnimal}
              onChange={(e) =>
                setFormState({ ...formState, nomeAnimal: e.target.value })
              }
              sx={{ marginTop: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  fullWidth
                  select
                  label="Espécie"
                  size="small"
                  name="especie"
                  value={formState.especie}
                  onChange={(e) =>
                    setFormState({ ...formState, especie: e.target.value })
                  }
                  sx={{ marginTop: 2 }}
                >
                  <MenuItem value="CANINO">Cachorro</MenuItem>
                  <MenuItem value="FELINO">Gato</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  select
                  fullWidth
                  required
                  label="Sexo"
                  size="small"
                  name="sexo"
                  value={formState.sexo}
                  onChange={(e) =>
                    setFormState({ ...formState, sexo: e.target.value })
                  }
                  sx={{ marginTop: 2 }}
                >
                  <MenuItem value="MACHO">Macho</MenuItem>
                  <MenuItem value="FEMEA">Fêmea</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Idade"
                  size="small"
                  name="idade"
                  value={formState.idade}
                  onChange={(e) =>
                    setFormState({ ...formState, idade: e.target.value })
                  }
                  sx={{ marginTop: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  label="Peso"
                  size="small"
                  name="peso"
                  value={formState.peso}
                  onChange={(e) =>
                    setFormState({ ...formState, peso: e.target.value })
                  }
                  sx={{ marginTop: 2 }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Motivo da Consulta"
              size="small"
              name="motivoConsulta"
              value={formState.motivoConsulta}
              onChange={(e) =>
                setFormState({ ...formState, motivoConsulta: e.target.value })
              }
              multiline
              rows={4}
              sx={{ marginTop: 2 }}
            />
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!isFormComplete()}
            sx={{ marginTop: 2 }}
          >
            Agendar
          </Button>
        </Box>
        {formState.servico && (
          <Box sx={{ width: '60%', ml: 1 }}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ptBR}
            >
              <DateCalendar
                label="Data"
                value={formState.dia}
                onChange={handleDate}
                renderInput={(params) => <TextField {...params} />}
                sx={{ marginTop: 2 }}
              />

              {horariosDisponiveis.map((horario) => (
                <Button
                  variant={
                    isHorarioSelecionado(horario) ? 'contained' : 'outlined'
                  }
                  disabled={!horariosDisponiveis}
                  key={horario}
                  value={horario}
                  onClick={() => {
                    setFormState({ ...formState, hora: horario })
                    setHorarioSelecionado(true)
                  }}
                >
                  {horario}
                </Button>
              ))}
            </LocalizationProvider>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default AgendamentoConsulta
