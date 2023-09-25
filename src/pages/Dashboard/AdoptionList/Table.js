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
import { getAdoptionForms } from '../../../services/adocao'
import { getPetById } from '../../../services/animaisCanil'
import { getClientById } from '../../../services/clientes'
import styles from './style'

export default function ColumnTypesGrid() {
  const navigate = useNavigate()
  const [pageSize, setPageSize] = useState(5)
  // const [isLoading, setIsLoading] = useState(true)
  const [rows, setRows] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adocoes = await getAdoptionForms()
        console.log('🚀 ~ file: Table.js:30 ~ fetchData ~ adocoes:', adocoes)

        const updatedAdocoes = await Promise.all(
          adocoes.map(async (adocao) => {
            const { id_formulario, id_cliente, id_animal } = adocao
            const data_envio = format(new Date(adocao.data_envio), 'dd/MM/yyyy')

            const clientResponse = await getClientById(id_cliente)
            const client = clientResponse.data

            const animal = await getPetById(id_animal)

            return {
              id: id_formulario,
              cliente: client.nome,
              'nome do animal': animal.nome,
              'data de envio': data_envio,
              adotado: adocao.data_adocao !== null,
              'data de adoção': adocao.data_adocao
                ? format(new Date(adocao.data_adocao), 'dd/MM/yyyy')
                : null,
              protocolo: adocao.protocolo,
              situação: adocao.situacao,
            }
          }),
        )

        setRows(updatedAdocoes)
        // setIsLoading(false)
      } catch (error) {
        console.error(error)
        // setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const edit = React.useCallback(
    (id) => () => {
      console.log('edit: ', id)
      navigate(`/admin/dashboard/adocoes/new/${id}`)
    },
    [navigate],
  )

  const columns = React.useMemo(
    () => [
      { field: 'id', type: 'number', flex: 0.4 },
      { field: 'cliente', type: 'string', flex: 0.8 },
      { field: 'nome do animal', type: 'string', flex: 0.8 },
      { field: 'protocolo', type: 'string', flex: 0.6 },
      { field: 'situação', type: 'string', flex: 0.6 },
      { field: 'data de envio', type: 'Date', flex: 0.4 },
      { field: 'adotado', type: 'boolean', flex: 0.4 },
      { field: 'data de adoção', type: 'Date', flex: 0.4 },
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
          Formularios de Adoção
        </Typography>
        <Button
          sx={styles.modal_button}
          variant="outlined"
          color="primary"
          component={Link}
          href={`/admin/dashboard/adocoes/new`}
          startIcon={<AddIcon />}
        >
          Adicionar novo formulario
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
