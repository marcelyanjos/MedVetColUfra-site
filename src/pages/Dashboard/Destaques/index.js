import React from 'react'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function AdoptionList() {
  return (
    <div>
      <Container maxWidth="x1">
        <Outlet />
      </Container>
    </div>
  )
}
