import { Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import colors from '../../../../styles/colors'
import api from '../../../../services/api'

const totalCaesAdotados = 45
// const totalCaespAdocao = 86
export default function Card2() {
  const [caespAdocao, setCaesAdocao] = useState(0)
  useEffect(() => {
    async function fetchData() {
      try {
        const caesResponse = await api.get('/api/chart', {
          params: { especie: 'CANINO', adotado: 'false' },
        })
        const caesIds = caesResponse.data
        console.log('aqui cao', caesResponse.data.length)
        setCaesAdocao(caesIds.length)
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
        color: colors.green[10],
        backgroundColor: colors.green[0],
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
          Cães Adotados
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Public Sans',
            fontSize: '30px',
            fontWeight: 'bold',
          }}
        >
          {totalCaesAdotados}
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
          Cães para Adoção
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Public Sans',
            fontSize: '30px',
            fontWeight: 'bold',
          }}
        >
          {caespAdocao}
        </Typography>
      </Typography>
    </Card>
  )
}
