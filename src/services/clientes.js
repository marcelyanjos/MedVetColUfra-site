import { format, parseISO } from 'date-fns'
import api from './api'

export async function checkClient(clientName, birthday, email) {
  const body = {
    nome: clientName,
    data_nasc: birthday,
    email,
  }

  const response = await api.post('/api/clientes', body)

  return response.data
}

export async function addClient(clientName, birthday, email) {
  const body = {
    nome: clientName,
    data_nasc: birthday,
    email,
  }
  const response = await api.post('/api/clientes/addclient', body)

  return response.data
}

export async function updateClient(id, client) {
  const body = {
    id_cliente: id,
    nome: client.nome,
    data_nasc: format(parseISO(client.data_nasc), 'yyyy-MM-dd'),
    email: client.email,
  }

  const response = await api.put('/api/clientes/', body)

  return response.data
}

export async function checkPet(clientId, petName, species, sex) {
  const body = {
    id_cliente: clientId,
    nome: petName,
    especie: species,
    sexo: sex,
  }
  const response = await api.post('/api/petCliente', body)

  return response.data
}

export async function addPet(
  clientId,
  petName,
  petAge,
  species,
  petWeight,
  sex,
) {
  const response = await api.post('/api/petCliente/addpet', {
    id_cliente: clientId,
    nome: petName,
    idade: petAge.replace(/\D/g, ''),
    especie: species,
    peso: petWeight.replace(/\D/g, ''),
    sexo: sex,
  })

  return response.data
}

export async function getClientById(clientId) {
  const response = await api.get(`/api/clientes/${clientId}`)

  return response
}
