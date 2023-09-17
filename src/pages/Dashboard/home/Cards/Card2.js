import { Card, Typography } from '@mui/material'
import * as React from 'react'
import colors from '../../../../styles/colors'

const totalCaesAdotados = 45
const totalCaespAdocao = 86
export default function Card2() {
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
          {totalCaespAdocao}
        </Typography>
      </Typography>
    </Card>
  )
}
