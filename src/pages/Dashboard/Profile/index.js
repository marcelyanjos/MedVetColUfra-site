import { Box, Container, Grid, Typography } from '@mui/material'
import * as React from 'react'
import Card1 from './Card1'
import Card2 from './Card2'
export default function Profile() {
  return (
    <div style={{ marginBottom: 10 }}>
      <Container maxWidth="x1">
        <Box>
          <Typography
            fontFamily={'Public Sans'}
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
            {/* <Grid item xs={12} sm={6} md={2.5}>
              <Card
                sx={styles.card3}
              >
                <Typography fontWeight={600}>Permissões</Typography>
                <Card3 />
              </Card>
            </Grid> */}
          </Grid>
        </Box>
      </Container>
    </div>
  )
}
