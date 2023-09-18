import api from './api'

export async function addAdoptionForm(
  clientId,
  animalId,
  protocol,
  homeType,
  job,
  date,
) {
  const body = {
    id_cliente: clientId,
    id_animal: animalId,
    protocolo: protocol,
    situacao: 'Em andamento',
    tipo_moradia: homeType,
    ocupacao: job,
    data_envio: date,
  }

  const response = await api.post('/api/formularios-adocao/', body)

  return response.data
}

export async function editAdoptionForm(
  formId,
  clientId,
  animalId,
  homeType,
  job,
) {
  const body = {
    id_formulario: formId,
    id_cliente: clientId,
    id_animal: animalId,
    situacao: 'Em andamento',
    tipo_moradia: homeType,
    ocupacao: job,
  }

  const response = await api.put('/api/formularios-adocao/', body)

  return response.data
}

export async function checkAdoption(animalId, clientId) {
  const body = {
    id_animal: animalId,
    id_cliente: clientId,
  }

  const response = await api.post(
    '/api/formularios-adocao/verificacliente',
    body,
  )

  return response.data
}
