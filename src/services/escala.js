import { format } from 'date-fns'
import api from './api'

export async function getEscala(
  setIsProfessionalsEmpty,
  setRows,
  setServicoTipos,
) {
  try {
    const response = await api.get('/api/escala')
    const escalas = response.data

    const updatedFormularios = await Promise.all(
      escalas.map(async (escala) => {
        const { id_escala, matricula } = escala
        const dia = format(new Date(escala.dia), 'dd/MM/yyyy')
        const profissionalResponse = await api.get(
          `/api/profissionais/${matricula}`,
        )
        const profissional = profissionalResponse.data[0]

        if (!profissional) {
          setIsProfessionalsEmpty(true)
          return null
        }

        const servicoResponse = await api.get(
          `/api/servicos/${profissional.id_servicos}`,
        )
        const servico = servicoResponse.data[0]
        console.log('serviço', servico)

        return {
          id: id_escala,
          nome: profissional.nome,
          dia,
          servico: servico.tipo_servico,
        }
      }),
    )

    setRows(updatedFormularios)
    console.log('rows', updatedFormularios)

    // Fetch all service types
    const serviceTypesResponse = await api.get('/api/servicos')
    setServicoTipos(serviceTypesResponse.data)
  } catch (error) {
    console.error(error)
  }
}
