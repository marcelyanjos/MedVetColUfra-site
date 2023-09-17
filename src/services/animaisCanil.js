import api from './api'

export async function getPetById(id) {
  const response = await api.get(`/api/animals/${id}`)

  return response.data
}
