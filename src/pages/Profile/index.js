import * as React from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Card1 from './Card1';
import Card2 from './Card2';
import Card3 from './Card3';

export default function Profile() {
  return (
    <div style={{ marginBottom: 10 }}>
      <Container maxWidth="x1">
        <Box>
          <Typography
            fontFamily={"Public Sans"}
            fontWeight={700}
            color="#212B36"
            variant="h5"
          >
            Perfil
          </Typography>
          <Grid container spacing={2} mt={0.3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card1 />
            </Grid>
            <Grid item xs={12} sm={6} md={6.5}>
              <Card2 />
            </Grid>
            <Grid item xs={12} sm={6} md={2.5}>
              <Card
                sx={{
                  minHeight: 425,
                  height: "60%",
                  boxShadow: "0px 1px 3px 0px rgba(65,65, 65, 0.15)",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight={600}>Permissões</Typography>
                <Card3 />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
