import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import React, { useState } from 'react'
import { useAuthContext } from '../../../CMS/Context/AuthContext'
import { setToken } from '../../../CMS/Helpers'
import { API } from '../../../CMS/constant'
import { ReactComponent as Logo2 } from '../../../assets/Logos/Group28.svg'
import { ReactComponent as Logo } from '../../../assets/Logos/Group31.svg'
import { ReactComponent as Logo3 } from '../../../assets/Logos/ISPA.svg'
import colors from '../../../styles/colors'
import theme from '../../theme'
import styles from './styles'

export default function SignIn() {
  const { setUser } = useAuthContext()
  // const [isLoginSuccessful, setIsLoginSuccessful] = useState(false)
  const [error, setError] = useState('')
  const [values, setValues] = React.useState({
    nome: '',
    sobrenome: '',
    email: '',
    user: '',
    password: '',
    matricula: '',
    showPassword: false,
  })
  const onFinish = async () => {
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      }
      const response = await fetch(`${API}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      })

      const data = await response.json()
      if (data?.error) {
        setError('Email ou senha incorretos')
        throw data?.error
      } else {
        // set the token
        setToken(data.jwt)

        // set the user
        setUser(data.user)

        // setIsLoginSuccessful(true)
        window.location.href = '/admin/login'
      }
    } catch (error) {
      console.error(error)
      setError('Email ou senha incorretos')
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleFormSubmit = (event) => {
    event.preventDefault('') // Impede o envio do formulário e a atualização da URL
    onFinish() // Chama a função de finalização do formulário personalizada
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Box style={styles.root}>
      <Grid
        container
        spacing={4}
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Grid item style={styles.flex2}>
          <Box
            sx={{
              [theme.breakpoints.up('md')]: { width: '80%' },
              [theme.breakpoints.down('md')]: { width: '50%' },
            }}
          >
            <Logo style={{ height: '100%', width: '100%' }} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              [theme.breakpoints.up('md')]: { width: '100%' },
              [theme.breakpoints.down('md')]: { width: '80%' },
            }}
          >
            <Logo2 style={{ padding: '10px', height: '100%', width: '100%' }} />
            <Logo3 style={{ padding: '10px', height: '100%', width: '100%' }} />
          </Box>
        </Grid>
        <Grid item>
          <Paper style={styles.paper}>
            <div style={styles.card}>
              <Typography
                variant="h5"
                sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold' }}
              >
                Cadastro
              </Typography>
              <FormControl
                component="form"
                onSubmit={handleFormSubmit} // Usa a função de tratamento personalizada
                autoComplete="off"
                sx={{ mt: 2 }}
              >
                <TextField
                  label="Matricula"
                  id="matricula"
                  name="matricula"
                  type="text"
                  size="small"
                  placeholder="Matricula"
                  required
                  value={values.matricula}
                  onChange={handleChange('matricula')}
                  sx={{ mb: 1.5, bgcolor: '#fff' }}
                />
                <TextField
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  size="small"
                  placeholder="Email address"
                  required
                  value={values.email}
                  onChange={handleChange('email')}
                  sx={{ mb: 1.5, bgcolor: '#fff' }}
                />
                <TextField
                  label="Nome"
                  id="nome"
                  name="nome"
                  type="text"
                  size="small"
                  placeholder="Nome"
                  required
                  value={values.nome}
                  onChange={handleChange('nome')}
                  sx={{ mb: 1.5, bgcolor: '#fff' }}
                />
                <TextField
                  label="Sobrenome"
                  id="sobrenome"
                  name="sobrenome"
                  type="text"
                  size="small"
                  placeholder="Sobrenome"
                  required
                  value={values.sobrenome}
                  onChange={handleChange('sobrenome')}
                  sx={{ mb: 1.5, bgcolor: '#fff' }}
                />
                <TextField
                  label="Senha"
                  id="password"
                  size="small"
                  name="password"
                  type={values.showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  value={values.password}
                  onChange={handleChange('password')}
                  sx={{ bgcolor: '#fff' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {values.nome && values.sobrenome ? (
                  <Typography>{values.user}</Typography>
                ) : null}
                {error && (
                  <Typography sx={{ color: 'red', mt: 1 }}>{error}</Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                  disabled={!values.email || !values.password}
                >
                  Login
                </Button>
              </FormControl>
              <Divider sx={{ mt: 2 }} />
              <Typography sx={{ fontSize: 12, mt: 1, textAlign: 'center' }}>
                Possui conta?{' '}
                <Link
                  href="/admin/login"
                  sx={{ color: colors.green[7], textDecoration: 'none' }}
                >
                  Entrar
                </Link>
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
