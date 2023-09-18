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
import React, { useEffect, useState } from 'react'
import { fetchAppointmentsTable } from '../../../services/agendamento'
import { styles } from './style'

export default function ColumnTypesGrid() {
  const [pageSize, setPageSize] = useState(5)
  // const [isLoading, setIsLoading] = useState(true)
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetchAppointmentsTable(setRows)
  }, [])

  // Detalhes ainda em console
  // const details = React.useCallback(
  //   (id) => () => {
  //     console.log('details: ', rows[id - 1])
  //   },
  //   [],
  // )

  const edit = React.useCallback(
    (id) => () => {
      console.log('edit: ', id)
    },
    [],
  )

  const columns = React.useMemo(
    () => [
      { field: 'id', type: 'number', flex: 0.4 },
      { field: 'cliente', type: 'string', flex: 0.8 },
      { field: 'data de nascimento', type: 'Date', flex: 0.8 },
      { field: 'nome do animal', type: 'string', flex: 0.8 },
      { field: 'data da consulta', type: 'Date', flex: 0.8 },
      { field: 'horario', type: 'time', flex: 0.4 },
      { field: 'tipo da consulta', type: 'string', flex: 0.8 },
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
          Agendamentos
        </Typography>
        <Button
          sx={styles.modal_button}
          variant="outlined"
          color="primary"
          component={Link}
          href={`/admin/dashboard/agendamentos/new`}
          startIcon={<AddIcon />}
        >
          Adicionar novo agendamento
        </Button>
      </Box>

      <Box sx={styles.table_box}>
        <Paper sx={styles.table_paper}>
          <DataGrid
            columns={columns}
            rows={rows}
            sx={styles.table_dataGrid}
            autoHeight
            autoWidth
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
