import { format } from 'date-fns'
import dayjs from 'dayjs'
import api from './api'

export async function fetchAppointmentsTable(setRows) {
  try {
    const response = await api.get('/api/agendamentos')
    const agendamentos = response.data

    const updatedAgendamentos = await Promise.all(
      agendamentos.map(async (agendamento) => {
        const { id_agendamento, id_cliente, id_pet, id_servicos } = agendamento
        const dia = format(new Date(agendamento.dia), 'dd/MM/yyyy')

        const clientResponse = await api.get(`/api/clientes/${id_cliente}`)
        const client = clientResponse.data
        const dt_nasc = format(new Date(client.data_nasc), 'dd/MM/yyyy')

        const petResponse = await api.get(`/api/petCliente/${id_pet}`)
        const pet = petResponse.data[0]
        console.log('pet', pet.nome)

        const serviceResponse = await api.get(`/api/servicos/${id_servicos}`)
        const service = serviceResponse.data

        return {
          id: id_agendamento,
          cliente: client.nome,
          'data de nascimento': dt_nasc,
          'nome do animal': pet.nome,
          'data da consulta': dia,
          horario: agendamento.hora,
          'tipo da consulta': service.tipo_servico,
        }
      }),
    )

    setRows(updatedAgendamentos)
    // setIsLoading(false)
  } catch (error) {
    console.error(error)
    // setIsLoading(false)
  }
}

export async function fetchServices(setServices) {
  try {
    const response = await api.get('/api/servicos')
    setServices(response.data)
  } catch (error) {
    console.error(error)
  }
}

export async function getAvailability(service, day, time) {
  const response = await api.get('/api/disponibilidade', {
    params: {
      id_servicos: service,
      dia: dayjs(day).format('DD-MM-YYYY'),
      hora: time,
    },
  })

  return response.data
}

export async function schedule(service, clientId, petId, day, time, reason) {
  const response = await api.post('/api/agendamentos', {
    id_servicos: service,
    id_cliente: clientId,
    id_pet: petId,
    dia: day,
    hora: time,
    motivo: reason,
    situacao: 'Agendado',
  })

  return response
}

export async function getSchedulesByClientId(clientId) {
  const response = await api.get(`/api/agendamentos/${clientId}`)

  return response.data
}

export async function fetchServiceById(serviceId) {
  const response = await api.get(`/api/servicos/${serviceId}`)

  return response.data
}
