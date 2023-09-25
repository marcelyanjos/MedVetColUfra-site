import api from './api'

export async function getPetById(id) {
  const response = await api.get(`/api/animals/${id}`)

  return response.data
}

export async function getPet() {
  const response = await api.post('/api/animals')
  return response.data
}

export async function getDetailedPetInfo(species, minAge, maxAge, gender) {
  const body = {
    species,
    minAge,
    maxAge,
    gender,
  }

  const response = await api.post('/api/animals/', body)

  return response.data
}

export async function updateAnimal(body) {
  const response = await api.put('/api/animals/update_animal', body)

  return response.data
}

export async function addAnimal(body) {
  const response = await api.put('/api/animals/add_animal', body)

  return response.data
}
