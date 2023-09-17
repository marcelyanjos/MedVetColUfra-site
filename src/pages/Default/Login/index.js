import AccountCircle from '@mui/icons-material/AccountCircle'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Typography,
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../../assets/Logo.svg'
import styles from './styles'

export default function SignIn() {
  const [values, setValues] = React.useState({
    email: '',
    user: '',
    password: '',
    showPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
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
    <div style={styles.root}>
      <Paper style={styles.paper}>
        <div style={styles.card}>
          <Typography
            sx={{ fontSize: 26, fontWeight: 'bold', fontFamily: 'Public Sans' }}
          >
            Login
          </Typography>
          <Grid xs={42} sm={12} ls={12}>
            <Grid item xs={12} sm={12} lg={12} sx={{ mt: 2 }}>
              {/* <Box> */}

              <FormControl
                variant="outlined"
                sx={{ width: '100%', bgcolor: '#fafafa' }}
              >
                <InputLabel htmlFor="outlined-adornment-mail">
                  email ou usuario
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-mail"
                  inputProps={{
                    style: {
                      height: 15,
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  }
                  label="email ou usuário"
                />
              </FormControl>
              {/* </Box> */}
            </Grid>
            <Grid item xs={12} sm={12} lg={12} sx={{ mt: 2 }}>
              <FormControl
                sx={{ width: '100%', bgcolor: '#fafafa' }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  inputProps={{
                    style: {
                      height: 15,
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
          </Grid>
          <div>
            <Typography sx={{ textAlign: 'end', fontSize: 14 }}>
              Esqueci minha senha
            </Typography>
          </div>
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Link to="/admin/app" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#7ac8de', fontWeight: 'bold' }}
              >
                Entrar
              </Button>
            </Link>
          </div>

          <Divider sx={{ mt: 2 }} />
          <Typography sx={{ fontSize: 12, mt: 1, textAlign: 'center' }}>
            Não possui conta?{' '}
            <Link to="/admin/signup" style={{ textDecoration: 'none' }}>
              Crie sua conta
            </Link>
          </Typography>
        </div>
      </Paper>
      <div style={styles.flex2}>
        <Typography
          sx={{ fontSize: 36, fontWeight: 'bold', fontFamily: 'Public Sans' }}
        >
          PetUFRA
        </Typography>
        <Logo style={{ height: '20%', width: '80%' }} />
      </div>
    </div>
  )
}
