import CloseIcon from '@mui/icons-material/Close'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import InfoIcon from '@mui/icons-material/Info'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  PaginationItem,
  Slider,
  TextField,
  Typography,
} from '@mui/material'
import { decode } from 'base-64'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDetailedPetInfo, getPet } from '../../../services/animaisCanil'
import colors from '../../../styles/colors'

function AnimalList() {
  const [animals, setAnimals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [filteredAnimals, setFilteredAnimals] = useState([])
  const [filterOptions, setFilterOptions] = useState({
    species: '',
    minAge: 0,
    maxAge: 20,
    gender: '',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    getPet()
      .then((response) => {
        setAnimals(response)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }, [])

  const handleFilter = () => {
    const { species, minAge, maxAge, gender } = filterOptions

    getDetailedPetInfo(species, minAge, maxAge, gender)
      .then((response) => {
        setFilteredAnimals(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleFilterDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  const animalsToRender = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return filteredAnimals.length > 0
      ? filteredAnimals.slice(indexOfFirstItem, indexOfLastItem)
      : animals.slice(indexOfFirstItem, indexOfLastItem)
  }, [currentPage, filteredAnimals, animals])

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
          <Typography variant="h3">Loading...</Typography>
        </div>
      ) : (
        <Box sx={{ pb: 2 }}>
          <Drawer anchor="right" open={drawerOpen} onClose={handleFilterDrawer}>
            <Box
              sx={{
                width: 300,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Filtros
                </Typography>
                <IconButton
                  sx={{ mt: -3 }}
                  onClick={() => setDrawerOpen(false)}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
              </Box>
              <TextField
                select
                variant="outlined"
                label="Especie"
                size="small"
                value={filterOptions.species}
                onChange={(e) =>
                  setFilterOptions({
                    ...filterOptions,
                    species: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              >
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="cachorro">Cachorro</MenuItem>
                <MenuItem value="gato">Gato</MenuItem>
              </TextField>
              <TextField
                select
                variant="outlined"
                label="Sexo"
                size="small"
                value={filterOptions.gender}
                onChange={(e) =>
                  setFilterOptions({
                    ...filterOptions,
                    gender: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="macho">Macho</MenuItem>
                <MenuItem value="femea">Fêmea</MenuItem>
              </TextField>
              <Box>
                <Typography>Idade</Typography>
                <Slider
                  value={[filterOptions.minAge, filterOptions.maxAge]}
                  onChange={(e, newValue) =>
                    setFilterOptions({
                      ...filterOptions,
                      minAge: newValue[0],
                      maxAge: newValue[1],
                    })
                  }
                  valueLabelDisplay="auto"
                  aria-labelledby="idade-slider"
                  min={0}
                  max={20}
                  step={0.5}
                  sx={{
                    ml: 0.5,
                    width: '96%',
                    display: 'flex',
                    color: colors.green[5],
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: -5,
                  }}
                >
                  <Typography fontSize={14}>{filterOptions.minAge}</Typography>
                  <Typography fontSize={14}>{filterOptions.maxAge}</Typography>
                </div>
              </Box>
              <Button
                variant="contained"
                sx={{
                  bgcolor: colors.green[4],
                  boxShadow: 'none',
                  '&:hover': { bgcolor: colors.green[5], boxShadow: 'none' },
                }}
                onClick={handleFilter}
              >
                Aplicar
              </Button>
            </Box>
          </Drawer>
          <Box>
            <Grid
              // p={2}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ justifyContent: 'space-between' }}
            >
              <Grid
                item
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontWeight: 'bold',
                    color: colors.green[3],
                  }}
                >
                  Quero Adotar
                </Typography>
                <IconButton
                  href="/adocao/info"
                  sx={{
                    color: colors.black[3],
                    '&:hover': { bgcolor: 'transparent' },
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </Grid>
              <Grid
                item
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    boxShadow: 'none',
                    bgcolor: colors.green[3],
                    '&:hover': {
                      bgcolor: colors.green[4],
                      boxShadow: 'none',
                      fontWeight: 'bold',
                    },
                  }}
                  href="adocao/my-adoptions"
                >
                  Meus Formulários
                </Button>
                <IconButton
                  onClick={handleFilterDrawer}
                  sx={{
                    ml: 2,
                    color: colors.green[3],
                    '&:hover': {
                      color: colors.green[4],
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  <FilterAltIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
              {animalsToRender.map((animal) => (
                <Grid item key={animal.id_animal} xs={12} sm={6} md={3.5}>
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={`${animal.id_animal}`}
                  >
                    <Card sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="75%"
                        image={`data:image/jpg;base64,${decode(animal.imagem)}`}
                        alt={animal.nome}
                        style={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography
                          variant="h5"
                          sx={{ textTransform: 'capitalize' }}
                        >
                          {animal.nome}
                        </Typography>
                        <Typography>{animal.idade} anos</Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={Math.ceil(animalsToRender.length / itemsPerPage)}
              page={currentPage}
              defaultPage={1}
              onChange={handlePageChange}
              // color="success"
              sx={{
                '& .Mui-selected': {
                  bgcolor: colors.green[3],
                  '&:hover': {
                    bgcolor: colors.green[4],
                  },
                },
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'center',
              }}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{
                    bgcolor:
                      item.page === currentPage
                        ? colors.green[3]
                        : 'transparent',
                    '&:hover': {
                      bgcolor: colors.green[4],
                    },
                  }}
                />
              )}
            />
          </Box>
        </Box>
      )}
    </div>
  )
}
export default AnimalList
