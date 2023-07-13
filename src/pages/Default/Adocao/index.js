import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import AnimalList from './AnimalList';

function IndexAdocao() {
  return (
   <Outlet/> 
  )
}

function MenuAdocao(){
  return (
    <Box sx={{pl:5, pr:5}}>
     <AnimalList />
    </Box>
  )
}

export {IndexAdocao, MenuAdocao}