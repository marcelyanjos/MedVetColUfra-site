import { Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import colors from '../../../../styles/colors'
import api from '../../../../services/api'

// const totalGatospAdocao = 86
const totalGatosAdotados = 45
export default function Card1() {
  const [gatospAdocao, setGatosAdocao] = useState(0)
  useEffect(() => {
    async function fetchData() {
      try {
        const gatosResponse = await api.get('/api/chart', {
          params: { especie: 'felino', adotado: 'false' },
        })
        const gatosIds = gatosResponse.data
        console.log('aqui', gatosResponse.data.length)
        setGatosAdocao(gatosIds.length)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <Card
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 4,
        minWidth: 275,
        color: '#EBEDFB',
        backgroundColor: colors.green[7],
      }}
      elevation={0}
    >
      <Typography
        component={'span'}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 2,
          marginRight: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          fontFamily={'Public Sans'}
          fontWeight={600}
          sx={{ opacity: 0.72 }}
        >
          Gatos Adotados
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Public Sans',
            fontSize: '30px',
            fontWeight: 'bold',
          }}
        >
          {totalGatosAdotados}
        </Typography>
      </Typography>
      <Typography
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 2,
          marginRight: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          fontFamily={'Public Sans'}
          fontWeight={600}
          sx={{ opacity: 0.72 }}
        >
          Gatos para Adoção
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Public Sans',
            fontSize: '30px',
            fontWeight: 'bold',
          }}
        >
          {gatospAdocao}
        </Typography>
      </Typography>
    </Card>
  )
}
