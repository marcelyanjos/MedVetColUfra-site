import { Box, Paper, Typography } from '@mui/material'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import Card from './Card'
import styles from './style'

export default function ModalUser() {
  const { id } = useParams()
  // const [open, setOpen] = React.useState(false)
  // const handleOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)

  return (
    <Box sx={styles.index_box2}>
      {/* <Grid xs={42} sm={11.5} ls={12} sx={styles.modal_grid}> */}
      <Typography
        sx={{ mb: 3 }}
        fontFamily={'Public Sans'}
        fontWeight={700}
        color="#212B36"
        variant="h5"
      >
        {id ? 'Editar ' : 'Adicionar '}
        matricula
      </Typography>
      <Box sx={styles.table_box}>
        <Paper sx={styles.modal_paper}>
          <Card />
        </Paper>
      </Box>
      {/* </Grid> */}
    </Box>
  )
}
