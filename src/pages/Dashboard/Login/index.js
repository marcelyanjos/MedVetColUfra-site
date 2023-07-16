import React, { useState, useEffect } from "react";
import {
  Button,
  Link,
  Typography,
  Box,
  Card,
  Paper,
  CircularProgress,
  InputAdornment,
  Grid,
  Divider,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ReactComponent as Logo } from "../../../assets/Logos/Group31.svg";
import { ReactComponent as Logo2 } from "../../../assets/Logos/Group28.svg";
import { ReactComponent as Logo3 } from "../../../assets/Logos/ISPA.svg";
import styles from "./styles";
import theme from '../../theme';
import { useAuthContext } from "../../../CMS/Context/AuthContext";
import { API } from "../../../CMS/constant";
import { setToken } from "../../../CMS/Helpers";
import colors from "../../../colors";

export default function SignIn() {
  const { setUser } = useAuthContext();
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = React.useState({
    email: "",
    user: "",
    password: "",
    showPassword: false,
  });
  const onFinish = async () => {
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        setError("Email ou senha incorretos");
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        console.log("Welcome back", data.user.username); // Exibe as informações do usuário
        setIsLoginSuccessful(true);
        window.location.href = "/admin/dashboard";
      }
    } catch (error) {
      console.error(error);
      setError("Email ou senha incorretos");
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault(""); // Impede o envio do formulário e a atualização da URL
    onFinish(); // Chama a função de finalização do formulário personalizada
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
    <Box style={styles.root}>
      <Grid container spacing={4} sx={{width:'100%', justifyContent:'center', alignItems:'center', flexWrap: "wrap-reverse",}}>
        <Grid item>
          <Paper style={styles.paper}>
            <div style={styles.card}>
              <Typography
                variant="h5"
                sx={{ fontFamily: "Open Sans, sans-serif", fontWeight: "bold" }}
              >
                Login
              </Typography>
              <FormControl
                component="form"
                onSubmit={handleFormSubmit} // Usa a função de tratamento personalizada
                autoComplete="off"
                sx={{ mt: 2 }}
              >
                <TextField
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  size="small"
                  placeholder="Email address"
                  required
                  value={values.email}
                  onChange={handleChange("email")}
                  sx={{ mb: 1, bgcolor: "#fff" }}
                />

                <TextField
                  label="Password"
                  id="password"
                  size="small"
                  name="password"
                  type={values.showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={values.password}
                  onChange={handleChange("password")}
                  sx={{ mt: 1, bgcolor: "#fff" }}
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
                {error && (
                  <Typography sx={{ color: "red", mt: 1 }}>{error}</Typography>
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
              <div>
                <Typography sx={{ textAlign: "end", fontSize: 14 }}>
                  Esqueci minha senha
                </Typography>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              ></div>

              <Divider sx={{ mt: 2 }} />
              <Typography sx={{ fontSize: 12, mt: 1, textAlign: "center" }}>
                Não possui conta?{" "}
                <Link
                  href="/admin/signup"
                  sx={{ color: colors.green[7], textDecoration: "none" }}
                >
                  Crie sua conta
                </Link>
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item style={styles.flex2}>
          <Box sx={{ [theme.breakpoints.up('md')]:{width: '80%'}, [theme.breakpoints.down('md')]:{width:'50%'}}} >
          <Logo style={{height:'100%', width:'100%'}}/>
          </Box>
          <Box sx={{ display: "flex",[theme.breakpoints.up('md')]:{ width: '100%'}, [theme.breakpoints.down('md')]:{width:'80%'} }}>
            <Logo2
              style={{ padding: "10px",height:'100%', width:'100%' }}
            />
            <Logo3
              style={{ padding: "10px", height:'100%', width:'100%' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
