import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'
import { Box, Button, Link, Paper, Typography } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import styles from './style'

export default function ColumnTypesGrid() {
  const navigate = useNavigate()
  const [pageSize, setPageSize] = useState(5)
  // const [isLoading, setIsLoading] = useState(true)
  const [rows, setRows] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/profissionais')
        const animais = response.data
        console.log(animais)

        const updatedFormularios = await Promise.all(
          animais.map(async (profissional) => {
            const { matricula, id_servicos } = profissional
            const dia = format(new Date(profissional.data_nasc), 'dd/MM/yyyy')
            if (id_servicos == null) {
              return {
                id: matricula,
                nome: profissional.nome,
                'data de nascimento': dia,
                profissão: profissional.profissao,
                serviço: null,
              }
            }
            if (id_servicos) {
              const servicoResponse = await api.get(
                `/api/servicos/${id_servicos}`,
              )
              const servico = servicoResponse.data[0]

              return {
                id: matricula,
                nome: profissional.nome,
                'data de nascimento': dia,
                profissão: profissional.profissao,
                serviço: servico.tipo_servico,
              }
            }
          }),
        )

        setRows(updatedFormularios)
        console.log(updatedFormularios)
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
      navigate(`/admin/dashboard/profissionais/new/${id}`)
    },
    [navigate],
  )

  const columns = React.useMemo(
    () => [
      { field: 'id', type: 'number', flex: 0.6 },
      { field: 'nome', type: 'string', flex: 1 },
      { field: 'data de nascimento', type: 'Date', flex: 0.6 },
      { field: 'profissão', type: 'string', flex: 0.6 },
      { field: 'serviço', type: 'string', flex: 0.6 },
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
          Profissionais
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Button
            sx={styles.modal_button}
            variant="outlined"
            color="primary"
            component={Link}
            href={`/admin/dashboard/profissionais/new`}
            startIcon={<AddIcon />}
          >
            Adicionar nova matricula
          </Button>
        </Box>
      </Box>

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
