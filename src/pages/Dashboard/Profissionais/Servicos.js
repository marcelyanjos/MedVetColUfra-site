import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'
import { Box, Button, Link, Paper, TextField, Typography } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import colors from '../../../styles/colors'
import styles from './style'

export default function Servicos() {
  const navigate = useNavigate()
  const [pageSize, setPageSize] = useState(5)
  // const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState([])
  const [servico, setServico] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicosResponse, profissionaisResponse] = await Promise.all([
          api.get('/api/servicos'),
          api.get('/api/profissionais'),
        ])

        const servicos = servicosResponse.data
        const profissionais = profissionaisResponse.data

        // Function to calculate the count of professionals for each service
        const getCountOfProfessionais = (id_servicos) => {
          return profissionais.filter(
            (profissional) => profissional.id_servicos === id_servicos,
          ).length
        }

        const updatedFormularios = servicos.map((servico) => {
          const { id_servicos } = servico
          return {
            id: id_servicos,
            serviço: servico.tipo_servico,
            'quantidade de profissionais': getCountOfProfessionais(id_servicos),
          }
        })

        setRows(updatedFormularios)
        // setIsLoading(false)
      } catch (error) {
        console.error(error)
        // setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // const details = React.useCallback(
  //   (id) => () => {
  //     console.log(
  //       'details: ',
  //       rows.find((row) => row.id === id),
  //     )
  //   },
  //   [],
  // )

  const edit = React.useCallback(
    (id) => () => {
      console.log('edit: ', id)
      navigate(`/admin/dashboard/animais/new/${id}`)
    },
    [navigate],
  )

  const columns = React.useMemo(
    () => [
      { field: 'id', type: 'number', flex: 0.6 },
      { field: 'serviço', type: 'string', flex: 1 },
      { field: 'quantidade de profissionais', type: 'number', flex: 0.6 },
      {
        field: 'actions',
        type: 'actions',
        width: 90,
        getActions: (params) => [
          <GridActionsCellItem
            key={params.id}
            icon={<InfoIcon />}
            label="Details"
            // onClick={details(params.id)}
          />,
          <GridActionsCellItem
            key={params.id}
            icon={<EditIcon />}
            label="Edit"
            onClick={edit(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [edit],
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // Make an API call to create a new service
      await api.post('/api/servicos', { tipo_servico: servico })

      // Fetch the updated list of services
      const servicosResponse = await api.get('/api/servicos')
      const servicos = servicosResponse.data

      // Fetch the updated list of profissionais
      const profissionaisResponse = await api.get('/api/profissionais')
      const profissionais = profissionaisResponse.data

      // Function to calculate the count of professionals for each service
      const getCountOfProfessionais = (id_servicos) => {
        return profissionais.filter(
          (profissional) => profissional.id_servicos === id_servicos,
        ).length
      }

      const updatedFormularios = servicos.map((servico) => {
        const { id_servicos } = servico
        return {
          id: id_servicos,
          serviço: servico.tipo_servico,
          'quantidade de profissionais': getCountOfProfessionais(id_servicos),
        }
      })

      setRows(updatedFormularios)
      // setIsLoading(false)

      setServico('') // Clear the input field after submission
    } catch (error) {
      console.error('Error creating service:', error)
    }
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
        {/* <GridToolbarFilterButton /> */}
        <GridToolbarExport
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
            fileName: 'customerDataBase',
            pageStyle: '.MuiDataGrid-root .MuiDataGrid-main {flex: 1}',
          }}
        />
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    )
  }

  return (
    <Box>
      <Box sx={styles.index_box}>
        <Typography
          fontFamily={'Public Sans'}
          fontWeight={700}
          color="#212B36"
          variant="h5"
        >
          Serviços
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Button
            sx={styles.modal_button}
            style={{ display: open && 'none' }}
            variant="outlined"
            color="primary"
            component={Link}
            onClick={() => setOpen(true)}
            startIcon={<AddIcon />}
          >
            Adicionar novo serviço
          </Button>
        </Box>
      </Box>
      {open && (
        <Box sx={{ pl: 5, pr: 5, pb: 3 }}>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <TextField
              size="small"
              sx={{ width: '60%', bgcolor: '#ffffff' }}
              required
              label="Novo Serviço"
              name="novo serviço"
              placeholder="Serviço"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <Box>
              <Button
                sx={{
                  mr: 2,
                  bgcolor: colors.green[3],
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: colors.green[5],
                    boxShadow: 'none',
                  },
                }}
                type="submit"
                variant="contained"
              >
                Criar
              </Button>
              <Button
                sx={styles.modal_button}
                onClick={() => setOpen(!open)}
                variant="outlined"
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      )}
      <Box sx={styles.table_box}>
        <Paper sx={styles.table_paper}>
          <DataGrid
            columns={columns}
            rows={rows}
            sx={styles.table_dataGrid}
            // autoHeight
            disableColumnSelector
            disableDensitySelector
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15]}
            slots={{
              toolbar: CustomToolbar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: false,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Paper>
      </Box>
    </Box>
  )
}
