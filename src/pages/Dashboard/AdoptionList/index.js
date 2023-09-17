import React from 'react'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function Destaques() {
  return (
    <div>
      <Container maxWidth="x1">
        <Outlet />
      </Container>
    </div>
  )
}
