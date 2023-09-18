import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import AnimalList from './AnimalList'

function IndexAdocao() {
  return <Outlet />
}

function MenuAdocao() {
  return (
    <Box sx={{ pl: 5, pr: 5, pt: 3, pb: 3 }}>
      <AnimalList />
    </Box>
  )
}

export { IndexAdocao, MenuAdocao }
