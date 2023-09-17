import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'
import { Box, Link, Paper, Typography } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchBlogAdm } from '../../../services/cms'
import styles from './style'

export default function ColumnTypesGrid() {
  const navigate = useNavigate()
  const [pageSize, setPageSize] = useState(5)
  const [rows, setRows] = useState([])
  // const [articles, setArticles] = useState([])
  // const isAuthenticated = !!getToken()

  // console.log(isAuthenticated)

  useEffect(() => {
    fetchBlogAdm(setRows)
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
      navigate(`/admin/dashboard/artigos/new/${id}`)
    },
    [navigate],
  )

  const columns = React.useMemo(
    () => [
      { field: 'id', type: 'number', flex: 0.6 },
      {
        field: 'ilustracao',
        headerName: 'Ilustração',
        renderCell: (params) => (
          <img
            src={params.row.ilustracao}
            alt="Ilustração"
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
      { field: 'data criação', type: 'Date', flex: 0.6 },
      { field: 'autor', type: 'string', flex: 0.6 },
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
      <Box sx={styles.index_box}>
        <Typography
          fontFamily={'Public Sans'}
          fontWeight={700}
          color="#212B36"
          variant="h5"
        >
          Artigos
        </Typography>
        <Link
          style={styles.modal_button}
          // variant="outlined"
          // color="primary"
          // startIcon={<AddIcon />}
          href="/admin/dashboard/artigos/new"
        >
          New Article
        </Link>
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
    </div>
  )
}
