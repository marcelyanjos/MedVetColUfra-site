// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.chart.blue[3],
  backgroundColor: theme.palette.chart.blue[0]
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const totalGatospAdocao = 86;
const totalGatosAdotados = 45;
export default function AppGatos() {
  return (
    <RootStyle>
      {/* <IconWrapperStyle>
        <Iconify icon="ant-design:windows-filled" width={24} height={24} />
      </IconWrapperStyle> */}
      <Typography
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 2,
          marginRight: 2
        }}
      >
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          Gatos Adotados
        </Typography>
        <Typography variant="h3">{fShortenNumber(totalGatosAdotados)}</Typography>
      </Typography>
      <Typography
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 2,
          marginRight: 2
        }}
      >
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          Gatos para Adoção
        </Typography>
        <Typography variant="h3">{fShortenNumber(totalGatospAdocao)}</Typography>
      </Typography>
    </RootStyle>
  );
}
