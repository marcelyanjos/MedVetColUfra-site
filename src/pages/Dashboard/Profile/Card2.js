import * as React from "react";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import styles from "./style";

export default function Card2() {
  const [newPassword, setNewPassword] = React.useState(true);
  const [updateInfo, setUpdateInfo] = React.useState(true);
  const [name, setName] = React.useState("Jane");
  const [password, setPassword] = React.useState("password");
  const [checkPassword, setCheckPassword] = React.useState("password");
  const [surname, setSurname] = React.useState("Doe");
  const [user, setUser] = React.useState("jane.doe");
  const [email, setEmail] = React.useState("jane.doe@mail.com");
  const [job, setJob] = React.useState("Médica Veterinaria");
  const [value, setValue] = React.useState(new Date("2022-01-01T21:11:54"));

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleDateChange = (newValue) => {
    setValue(newValue);
  };
  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };
  const handleUserChange = (event) => {
    setUser(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleJobChange = (event) => {
    setJob(event.target.value);
  };
  const handleNewPassword = () => {
    if (newPassword == true) {
      setNewPassword(false);
    } else setNewPassword(true);
  };
  const handleUpdateInfo = () => {
    if (updateInfo== true) {
      setUpdateInfo(false);
    } else setUpdateInfo(true);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleCheckPasswordChange = (event) => {
    setCheckPassword(event.target.value);
  };

  return (
    <div>
      <Card sx={styles.card2}>
        <div style={styles.div2}>
          <Typography fontWeight={600}>Informações</Typography>
          <Box sx={{display:'flex'}}>
          <Button
            onClick={handleUpdateInfo}
            variant="contained"
            sx={{
              display:updateInfo?'none':'flex',
              mr:1,
              height: 30,
              bgcolor: "#abd7eb",
              ':hover':{bgcolor:'#99c8de'},
              fontWeight: "bold",
            }}
          >
            Salvar
          </Button>
          <Button
            onClick={handleUpdateInfo}
            variant="contained"
            sx={{
              height: 30,
              bgcolor: updateInfo?"#1976d2":'#fe163c',
              fontWeight: "bold",
              ':hover':{
                bgcolor:updateInfo?'#0d67bf':'#e8092e'
              }
            }}
          >
            {updateInfo ?'Editar' : 'Cancelar'}
          </Button>
          </Box>
        </div>

        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid item xs={12} md={6}>
            <FormControl
              variant="outlined"
              disabled={updateInfo}
              fullWidth
              sx={{ bgcolor: updateInfo ? "#fcfcfc":'#fff' }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Nome
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                label="Nome"
                value={name}
                onChange={handleChange}
                inputProps={{
                  style: {
                    height: 10,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            // sm={6}
            md={6}
          >
            <FormControl
              fullWidth
              variant="outlined"
              disabled={updateInfo}
              sx={{ bgcolor: updateInfo ? "#fcfcfc":'#fff' }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Sobrenome
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                label="Sobrenome"
                value={surname}
                onChange={handleSurnameChange}
                inputProps={{
                  style: {
                    height: 10,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
              disabled={updateInfo} 
                label="Data de Nascimento"
                inputFormat="dd/MM/yyyy"
                value={value}
                onChange={handleDateChange}
                renderInput={(params) => <TextField sx={{".css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root":{height:'43px', bgcolor: updateInfo ? "#fcfcfc":'#fff' }}} {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={8}>
            <FormControl
              variant="outlined"
              fullWidth
              disabled={true}
              sx={{ bgcolor:"#fcfcfc" }}
            >
              <InputLabel htmlFor="outlined-adornment-user">Usuário</InputLabel>
              <OutlinedInput
                id="outlined-adornment-user"
                label="Usuario"
                value={user}
                onChange={handleUserChange}
                inputProps={{
                  style: {
                    height: 10,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl
              variant="outlined"
              fullWidth
              disabled={updateInfo}
              sx={{ bgcolor: updateInfo ? "#fcfcfc":'#fff' }}
            >
              <InputLabel htmlFor="outlined-adornment-email">
                Emprego
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-job"
                label="Emprego"
                value={job}
                onChange={handleJobChange}
                inputProps={{
                  style: {
                    height: 10,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl
              variant="outlined"
              fullWidth
              sx={{ bgcolor: "#fcfcfc" }}
            >
              <InputLabel htmlFor="outlined-adornment-email">E-mail</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                label="E-mail"
                value={email}
                onChange={handleEmailChange}
                inputProps={{
                  style: {
                    height: 10,
                  },
                }}
                disabled
              />
            </FormControl>
          </Grid>
        </Grid>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Typography sx={{flex:1}} fontWeight={600}>Senha</Typography>
          <Box sx={{display:'flex'}}>
          <Button
            onClick={handleNewPassword}
            variant="contained"
            sx={{
              display:newPassword?'none':'flex',
              mr:1,
              height: 30,
              bgcolor: "#abd7eb",
              ':hover':{bgcolor:'#99c8de'},
              fontWeight: "bold",
            }}
          >
            Salvar
          </Button>
          <Button
            onClick={handleNewPassword}
            variant="contained"
            sx={{
              height: 30,
              bgcolor: newPassword?"#1976d2":'#fe163c',
              fontWeight: "bold",
              ':hover':{
                bgcolor:newPassword?'#0d67bf':'#e8092e'
              }
            }}
          >
            {newPassword ?'Editar' : 'Cancelar'}
          </Button>
          </Box>
        </div>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid item xs={12} md={6}>
            <FormControl
              variant="outlined"
              fullWidth
              sx={{ bgcolor: "#fcfcfc" }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Senha
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                label="Senha"
                type="password"
                value={password}
                disabled={newPassword}
                onChange={handlePasswordChange}
                inputProps={{
                  style: {
                    height: 10,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            // sm={6}
            md={6}
          >
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ bgcolor: "#fcfcfc" }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Confirmar senha
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                label="Confirmar senha"
                value={checkPassword}
                disabled={newPassword}
                type="password"
                onChange={handleCheckPasswordChange}
                inputProps={{
                  style: {
                    height: 10,
                  },
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
