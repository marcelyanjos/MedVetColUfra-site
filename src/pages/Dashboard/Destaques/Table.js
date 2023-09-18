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
import { useNavigate } from 'react-router-dom'
// import { getToken } from '../../../CMS/Helpers'
import { fetchDestaque } from '../../../services/cms'
import { stylesTable } from './style'

export default function ColumnTypesGrid() {
  const navigate = useNavigate()
  const [pageSize, setPageSize] = useState(5)
  // const [isLoading, setIsLoading] = useState(true)
  const [rows, setRows] = useState([])
  // const [articles, setArticles] = useState([])
  // const isAuthenticated = !!getToken()

  // console.log(isAuthenticated)

  useEffect(() => {
    fetchDestaque(setRows)
  }, [])

  const details = React.useCallback(
    (id) => () => {
      // console.log("details: ", rows.find((row) => row.id === id));
      console.log('id', id)
    },
    [],
  )

  const edit = React.useCallback(
    (id) => () => {
      console.log('id', id)
      navigate(`/admin/dashboard/destaque/new/${id}`)
    },
    [navigate],
  )

  const columns = React.useMemo(
    () => [
      { field: 'id', type: 'number', flex: 0.6 },
      {
        field: 'imagem',
        headerName: 'imagem',
        renderCell: (params) => (
          <img
            src={params.row.imagem}
            alt="Imagem"
            style={{
              borderRadius: '30px',
              objectFit: 'cover',
              width: '50px',
              height: '50px',
            }}
          />
        ),
      },
      { field: 'titulo', type: 'string', flex: 1 },
      { field: 'ordem', type: 'string', flex: 0.2 },
      { field: 'data criação', type: 'Date', flex: 0.6 },
      { field: 'publicado', type: 'boolean', flex: 0.6 },
      {
        field: 'actions',
        type: 'actions',
        width: 90,
        getActions: (params) => [
          <GridActionsCellItem
            key={params.id}
            icon={<InfoIcon />}
            label="Details"
            onClick={details(params.id)}
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
    [details, edit],
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
    <div>
      <Box sx={stylesTable.index_box}>
        <Typography
          fontFamily={'Public Sans'}
          fontWeight={700}
          color="#212B36"
          variant="h5"
        >
          Destaques
        </Typography>
        <Button
          style={stylesTable.modal_button}
          component={Link}
          // color="primary"
          // startIcon={<AddIcon />}
          href="/admin/dashboard/destaque/new"
        >
          Novo Destaque
        </Button>
      </Box>
      <Box sx={stylesTable.table_box}>
        <Paper sx={stylesTable.table_paper}>
          <DataGrid
            columns={columns}
            rows={rows}
            sx={stylesTable.table_dataGrid}
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
    </div>
  )
}
