import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Card,
  IconButton,
  InputBase,
  Link,
  MenuItem,
  Pagination,
  Paper,
  Popper,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Host } from '../../../CMS/constant'
import { fetchArticles } from '../../../services/cms'
import colors from '../../../styles/colors'
import styles from './styles'

export default function Blog() {
  const [articles, setArticles] = useState([])
  const [filteredList, setFilteredList] = React.useState(articles)
  // const [value, setValue] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  useEffect(() => {
    fetchArticles(setArticles)
  }, [])

  const handleChange = (event, value) => {
    setPage(value)
  }

  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }
  // concat arrays categoria from array blog
  const merge = [].concat.apply(
    [],
    articles.map((i) => i.categoria),
  )
  // remove duplicated items from categoria
  const unique = [...new Set(merge)]

  useEffect(() => {
    const changeTableData = () => {
      const x = articles.filter(
        (_, idx) => idx >= 5 * (page - 1) && idx <= 5 * (page - 1) + 4,
      )

      setFilteredList(x)
    }
    changeTableData()
  }, [page, articles])

  const filterBySearch = (event) => {
    // Input
    const query = event.target.value
    // array complete
    let updatedList = [...articles]
    // search
    updatedList = updatedList.filter((item) => {
      console.log(updatedList)
      return (
        item.attributes.titulo.toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
    })
    setFilteredList(updatedList)
  }

  // não funciona
  const filterByCategory = (event) => {
    // setValue(event.target.value)
    // console.log('setValue', setValue)
    // let updatedList = [...articles]
    // updatedList = updatedList.filter((item) => {
    //   return item.categoria.indexOf(setValue) !== -1
    // })
    // setFilteredList(updatedList)
  }

  useEffect(() => {
    setFilteredList(articles)
  }, [articles])

  return (
    <Box onClick={handleClose} sx={styles.body}>
      <Box sx={styles.content}>
        <Box sx={styles.filters}>
          <Typography sx={styles.title}>Blog</Typography>
          <Box component="form" sx={styles.searchBar}>
            <InputBase
              onChange={filterBySearch}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Pesquisar"
              inputProps={{ 'aria-label': 'Pesquisar' }}
            />
            <SearchIcon
              sx={{ p: '10px', color: '#a1a1a1' }}
              aria-label="search"
            />
          </Box>
          <IconButton
            type="button"
            ref={anchorRef}
            aria-label="filter"
            onClick={handleToggle}
            sx={styles.iconFilter}
          >
            <FilterAltIcon />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            // transition
            disablePortal
          >
            <Paper>
              {unique.map((i, index) => {
                return (
                  <MenuItem key={index} onClick={() => filterByCategory(i)}>
                    {i}
                  </MenuItem>
                )
              })}
            </Paper>
          </Popper>
        </Box>
        <Box sx={styles.cardsBody}>
          {filteredList.map((i, index) => {
            console.log('filtro', i.attributes.titulo)
            return (
              <Card key={i.id} elevation={4} sx={styles.card}>
                <Box sx={{ height: '250px' }}>
                  {i.attributes.ilustracao && i.attributes.ilustracao.data && (
                    <img
                      src={`${Host}${i.attributes.ilustracao.data.attributes.url}`}
                      alt="Ilustração"
                      style={{
                        height: '250px',
                        width: '100%',
                        objectFit: 'cover',
                        marginBottom: 10,
                      }}
                    />
                  )}
                </Box>
                <Typography
                  component={'span'}
                  variant={'body2'}
                  sx={{
                    p: 2,
                    height: 'auto',
                  }}
                >
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography
                      sx={{
                        color: '#5B8FF9',
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}
                    >
                      {i.attributes.categoria}
                    </Typography>
                    <Typography
                      sx={{
                        color: '#5B8FF9',
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}
                    >
                      {i.attributes.dataPublicacao}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 20,
                      lineHeight: 1.25,
                      mt: 1,
                      minHeight: '68px',
                      '&:first-letter': {
                        textTransform: 'uppercase',
                      },
                    }}
                  >
                    {i.attributes.titulo}
                  </Typography>
                  <Button
                    component={Link}
                    href={`/blog/${i.id}`}
                    sx={{
                      mt: 1,
                      fontSize: 12,
                      bgcolor: colors.green[3],
                      color: '#ffffff',
                      fontWeight: 'bold',
                      '&:hover': {
                        bgcolor: colors.green[4],
                      },
                    }}
                  >
                    Leia mais
                  </Button>
                </Typography>
              </Card>
            )
          })}
        </Box>
      </Box>
      <Pagination
        sx={{ mt: -4, mb: 2 }}
        // numero de paginas
        count={page.length}
        page={page}
        onChange={handleChange}
      />
    </Box>
  )
}
