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
import { decode } from 'base-64'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPet } from '../../../services/animaisCanil'
import styles from './style'

export default function ColumnTypesGrid() {
  const navigate = useNavigate()
  const [pageSize, setPageSize] = useState(5)
  // const [isLoading, setIsLoading] = useState(true)
  const [rows, setRows] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animais = await getPet()

        const updatedFormularios = animais.map((animal) => ({
          id: animal.id_animal,
          avatar: animal.imagem,
          nome: animal.nome,
          especie: animal.especie,
          sexo: animal.sexo,
          idade: animal.idade,
          vacinado: animal.vacinado,
          castrado: animal.castrado,
          adotado: animal.adotado,
        }))

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
      {
        field: 'avatar',
        headerName: 'Avatar',
        renderCell: (params) => (
          <img
            src={`data:image/jpg;base64,${decode(params.row.avatar)}`}
            alt="Avatar"
            style={{
              borderRadius: '30px',
              objectFit: 'cover',
              width: '50px',
              height: '50px',
            }}
          />
        ),
      },
      { field: 'nome', type: 'string', flex: 1 },
      { field: 'especie', type: 'string', flex: 0.6 },
      { field: 'sexo', type: 'string', flex: 0.6 },
      { field: 'idade', type: 'number', flex: 0.6 },
      { field: 'vacinado', type: 'boolean', flex: 0.6 },
      { field: 'castrado', type: 'boolean', flex: 0.6 },
      { field: 'adotado', type: 'boolean', flex: 0.6 },
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

  const sortModel = [
    {
      field: 'id',
      sort: 'asc',
    },
  ]

  return (
    <Box>
      <Box sx={styles.index_box}>
        <Typography
          fontFamily={'Public Sans'}
          fontWeight={700}
          color="#212B36"
          variant="h5"
        >
          Animais do Canil/Gatil
        </Typography>
        <Button
          sx={styles.modal_button}
          variant="outlined"
          color="primary"
          component={Link}
          href={`/admin/dashboard/animais/new`}
          startIcon={<AddIcon />}
        >
          Adicionar novo animal
        </Button>
      </Box>

      <Box sx={styles.table_box}>
        <Paper sx={styles.table_paper}>
          <DataGrid
            columns={columns}
            rows={rows}
            sx={styles.table_dataGrid}
            sortModel={sortModel}
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
