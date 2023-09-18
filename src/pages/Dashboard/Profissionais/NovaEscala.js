import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ptBR } from 'date-fns/locale'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useParams } from 'react-router-dom'
import api from '../../../services/api'
import './DatePicker.css'
import styles from './style'

const card1 = {
  border: '1px solid #CFD0D7',
  // maxHeight: '95%',
  borderRadius: '4px',
  p: 1,
}

export default function NovaEscala() {
  const { id } = useParams()
  // const [dia, setDia] = useState(null)
  // const [openSnackbar, setOpenSnackbar] = useState(false)
  // const [snackbarMessage, setSnackbarMessage] = useState('')
  // const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  const [profissional, setProfissional] = useState({
    matricula: '',
    dia: '',
  })

  useEffect(() => {
    // Se existe o id, carrega as informações do profissional para editar
    if (id) {
      api.get(`/api/escala/${id}`).then((response) => {
        const escalaData = response.data
        setProfissional({
          matricula: escalaData.matricula,
          dia: escalaData.dia,
        })
      })
    }
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setProfissional((prevProfissional) => ({
      ...prevProfissional,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      if (id) {
        // Edita os dados do profissional existente
        await api.put(`/api/escala/${id}`, {
          ...profissional,
        })
      } else {
        // Envia os dados do profissional para o servidor
        const { startDate, endDate } = dateRange[0]

        // Cria um array de datas entre startDate e endDate
        const datesArray = []
        let currentDate = dayjs(startDate)
        while (currentDate.isBefore(endDate + 1)) {
          datesArray.push(currentDate.format('YYYY-MM-DD'))
          currentDate = currentDate.add(1, 'day')
        }

        // Faz um loop para enviar dados para cada data no intervalo
        for (const date of datesArray) {
          await api.post('/api/escala', {
            ...profissional,
            dia: date,
          })
        }

        // Limpa os dados do profissional
        setProfissional({
          matricula: '',
          dia: '',
        })
      }
    } catch (error) {
      console.error(error)
      // Trate erros adequadamente
    }
  }

  return (
    <Box sx={styles.index_box2}>
      <Typography
        sx={{ mb: 3 }}
        fontFamily={'Public Sans'}
        fontWeight={700}
        color="#212B36"
        variant="h5"
      >
        Nova Escala
      </Typography>
      <Box sx={styles.table_box}>
        <Paper sx={styles.modal_paper}>
          <Box sx={{ height: '100%', minHeight: '360px', p: 2 }}>
            <Grid sx={styles.modal_box} container>
              <Grid xs={12} sm={6} ls={12} sx={card1}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      sx={{ width: '100%' }}
                      size="small"
                      autoComplete="username"
                      type="string"
                      name="matricula"
                      label="Matrícula"
                      margin="normal"
                      value={profissional.matricula}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={12} sm={6} ls={12} sx={card1}>
                {/* <DateCalendar
                    label="Data"
                    value={dia}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ marginTop: 2, bgcolor: '#ffff' }}
                  /> */}
                <DateRangePicker
                  inputRanges={[]}
                  staticRanges={[]}
                  locale={ptBR}
                  onChange={(item) => setDateRange([item.selection])}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  preventSnapRefocus={true}
                  editableDateInputs={false}
                  months={1}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Button variant="contained" onClick={handleSubmit}>
                Enviar
              </Button>
              <Button
                variant="contained"
                component={Link}
                href="/admin/dashboard/profissionais/escala"
                color="secondary"
              >
                Cancelar
              </Button>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
