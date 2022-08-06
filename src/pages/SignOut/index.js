import * as React from "react";
import {
  Button,
  Typography,
  Box,
  Card,
  Paper,
  Grid,
  Divider,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from '@mui/icons-material/Email';
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import {ReactComponent as MatriculaIcon} from '../../assets/MatriculaIcon.svg'

export default function SignIn() {
  const [values, setValues] = React.useState({
    matricula: "",
    email:"",
    user:"",
    password: "",
    confirmPassword:"",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        minWidth: 300,
        minHeight: "100vh",
        // flexDirection: "row",
        width: "100%",
        height: "100%",
        backgroundColor: "#cfeffd",
      }}
    >
      <div
        style={{
          minWidth: 100,
          minHeight: 20,
          //   width: "45%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{ fontSize: 36, fontWeight: "bold", fontFamily: "Public Sans" }}
        >
          PetUFRA
        </Typography>
        <Logo style={{ height: "20%", width: "80%" }} />
      </div>
      <Paper
        style={{
          borderRadius: 16,
          boxShadow: "0px 2px 10px 4px rgba(0,0,0,0.1)",
          backgroundColor: "rgba(255,255,255,0.4)",
          width: "30%",
          flex:0.6,
          minWidth: 320,
          minHeight: "60vh",
          mb: 1,
          height: "90%",
          display: "flex",
          //   flexWrap:'wrap-reverse',
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            minHeight: "55vh",
            height: "100%",
            width: "100%",
            padding:20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ fontSize: 26, fontWeight: "bold", fontFamily: "Public Sans" }}
          >
            Cadastre-se
          </Typography>
          <Grid xs={42} sm={12} ls={12}>
          <Grid item xs={12} sm={12} lg={12} sx={{ mt: 2 }}>
              {/* <Box> */}

              <FormControl
                variant="outlined"
                sx={{ width: "100%", bgcolor: "#faf2fc" }}
              >
                <InputLabel htmlFor="outlined-adornment-user">
                  Matricula
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-user"
                  inputProps={{
                    style: {
                      height: 15,
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <MatriculaIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* </Box> */}
            </Grid>
            <Grid item xs={12} sm={12} lg={12} sx={{ mt: 2 }}>
              {/* <Box> */}

              <FormControl
                variant="outlined"
                sx={{ width: "100%", bgcolor: "#faf2fc" }}
              >
                <InputLabel htmlFor="outlined-adornment-user">
                  email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-user"
                  inputProps={{
                    style: {
                      height: 15,
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* </Box> */}
            </Grid>
            <Grid item xs={12} sm={12} lg={12} sx={{ mt: 2 }}>
              {/* <Box> */}

              <FormControl
                variant="outlined"
                sx={{ width: "100%", bgcolor: "#faf2fc" }}
              >
                <InputLabel htmlFor="outlined-adornment-user">
                  Usuário
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-user"
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
                />
              </FormControl>
              {/* </Box> */}
            </Grid>
            <Grid item xs={12} sm={12} lg={12} sx={{ mt: 2 }}>
              <FormControl
                sx={{ width: "100%", bgcolor: "#faf2fc" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
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
            <Grid item xs={12} sm={12} lg={12} sx={{ mt: 2 }}>
              <FormControl
                sx={{ width: "100%", bgcolor: "#faf2fc" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirmar Senha
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange("password")}
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
                  label="Confirmar Senha"
                />
              </FormControl>
            </Grid>
          </Grid>
          <div
            style={{ width: "100%", display: "flex",marginTop:10, justifyContent: "center" }}
          >
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#7ac8de", fontWeight: "bold" }}
              >
                Cadastrar
              </Button>
            </Link>
          </div>

          <Divider sx={{ mt: 1 }} />
          <Typography sx={{ fontSize: 12, mt: 1, textAlign: "center" }}>
            Possui conta?<Link to="/signin" style={{textDecoration:'none', fontWeight:"bold",color:"#58adc4"}}>Entrar</Link> 
          </Typography>
        </div>
      </Paper>
    </div>
  );
}
