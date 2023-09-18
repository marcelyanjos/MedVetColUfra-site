import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import { decode } from 'base-64'
import { format } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import api from '../../../services/api'
import colors from '../../../styles/colors'
import theme from '../../theme'
export default function FormAdoptionInfo() {
  const [form, setForm] = useState({
    moradia: '',
    ocupacao: '',
    protocolo: '',
    data_envio: '',
    situacao: '',
  })
  const [client, setClient] = useState({
    nome: '',
    data_nasc: '',
    email: '',
  })

  const [animal, setAnimal] = useState({
    id_animal: '',
    nome: '',
    especie: '',
    sexo: '',
    idade: '',
    peso: '',
    imagem: '',
  })

  const printRef = useRef()
  const { id } = useParams()
  useEffect(() => {
    api.get(`/api/formularios-adocao/formulario/${id}`).then((response) => {
      const adoptionFormData = response.data

      api
        .get(`/api/clientes/${adoptionFormData.id_cliente}`)
        .then((clientResponse) => {
          const clientData = clientResponse.data
          setClient({
            nome: clientData.nome,
            data_nasc: format(new Date(clientData.data_nasc), 'dd-MM-yyyy'),
            email: clientData.email,
          })
          setForm({
            moradia: adoptionFormData.tipo_moradia,
            ocupacao: adoptionFormData.ocupacao,
            protocolo: adoptionFormData.protocolo,
            situacao: adoptionFormData.situacao,
            data_envio: format(
              new Date(adoptionFormData.data_envio),
              'dd/MM/yyyy',
            ),
          })
        })

      // Fetch animal data using id_animal
      api
        .get(`/api/animals/${adoptionFormData.id_animal}`)
        .then((animalResponse) => {
          const animalData = animalResponse.data
          setAnimal({
            id_animal: animalData.id,
            nome: animalData.nome,
            especie: animalData.especie,
            sexo: animalData.sexo,
            idade: animalData.idade,
            peso: animalData.peso,
            imagem: animalData.imagem,
          })
        })
    })
  }, [id])

  const handlePrint = useReactToPrint({
    content: () => printRef.current, // Passa a referência do componente de impressão
  })

  return (
    <Box>
      <Box sx={{ pl: 5, pr: 5, pt: 4, pb: 4 }} ref={printRef}>
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
              mb: 3,
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
              Meu Formulario
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item key={animal.id_animal} xs={12} sm={12} md={12}>
            <Card sx={{ height: '100%', p: 2 }}>
              <Typography
                sx={{
                  flex: 1,
                  color: colors.black[4],
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: '600',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                SOBRE O ANIMAL
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('sd')]: {
                    flexDirection: 'column',
                  },
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', display: 'flex' }}
                  >
                    Nome: <Typography>{animal.nome}</Typography>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', display: 'flex' }}
                  >
                    Especie: <Typography>{animal.especie}</Typography>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', display: 'flex' }}
                  >
                    Sexo: <Typography>{animal.sexo}</Typography>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', display: 'flex' }}
                  >
                    Idade: <Typography>{animal.idade} anos</Typography>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', display: 'flex' }}
                  >
                    Peso: <Typography>{animal.peso} kg</Typography>
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  image={`data:image/jpg;base64,${decode(animal.imagem)}`}
                  alt={animal.nome}
                  sx={{ objectFit: 'contain', pr: 2, maxWidth: '450px' }}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item key={client.id_animal} xs={12} sm={12} md={12}>
            <Card sx={{ height: '100%', p: 2 }}>
              <Typography
                sx={{
                  flex: 1,
                  color: colors.black[4],
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: '600',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                SEUS DADOS
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('sd')]: {
                    flexDirection: 'column',
                  },
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', display: 'flex' }}
                  >
                    Nome Completo: <Typography>{client.nome}</Typography>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', display: 'flex' }}
                  >
                    Data de nascimento:{' '}
                    <Typography>{client.data_nasc}</Typography>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', display: 'flex' }}
                  >
                    Email: <Typography>{client.email}</Typography>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', display: 'flex' }}
                  >
                    Tipo de Moradia: <Typography>{form.moradia}</Typography>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', display: 'flex' }}
                  >
                    Ocupação: <Typography>{form.ocupacao}</Typography>
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item key={client.id_form} xs={12} sm={12} md={12}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'bold', display: 'flex' }}
            >
              Data de envio: <Typography>{form.data_envio}</Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'bold', display: 'flex' }}
            >
              Protocolo: <Typography>{form.protocolo}</Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'bold', display: 'flex' }}
            >
              Situação: <Typography>{form.situacao}</Typography>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Button sx={{ ml: 5, mb: 4 }} variant="contained" onClick={handlePrint}>
        Imprimir PDF
      </Button>
    </Box>
  )
}
