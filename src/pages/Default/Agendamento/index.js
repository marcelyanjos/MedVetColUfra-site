import { Link, Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import colors from "../../../colors";

function IndexAgendamento() {
  return <Outlet />;
}

function MenuAgendamento() {
  return (
    <Box sx={{ pl: 5, pr: 5, pt: 3, pb: 3, minHeight: "42vh" }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Open Sans, sans-serif",
          fontWeight: "bold",
          color: colors.green[3],
        }}
      >
        Consultas
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>
          Essa ferramenta da plataforma serve para agilizar o processo de
          agendamento de consultas e cirurgias.
        </Typography>
        <Typography>
          Após o processo de agendamento, aguardar um prazo de até 24h para
          confirmação do agendamento e verificação dos valores.
        </Typography>
        <Typography>
          O cancelamento de consultas e cirurgias deve ser feito em um prazo de
          no minimo 24h.
        </Typography>
        <Typography>
          O pagamento das consultas será feito através de transferencias via pix
          ou durante a consulta.
        </Typography>
      </Box>
      <Box sx={{ flex: 1, mt:2 }}>
        <Button sx={{mr:3}} variant="outlined" component={Link} href="/agendamento/new">
          Agendar nova consulta
        </Button>
        <Button
          variant="contained"
          component={Link}
          href="/agendamento/meus-agendamentos"
        >
          Verificar meus agendamentos
        </Button>
      </Box>
    </Box>
  );
}

export { IndexAgendamento, MenuAgendamento };
