// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const totalCaesAdotados = 45;
const totalCaespAdocao = 86;
export default function AppCaes() {
  return (
    <RootStyle>
      {/* <IconWrapperStyle>
        <Iconify icon="ant-design:apple-filled" width={24} height={24} />
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
          Cães Adotados
        </Typography>
        <Typography variant="h3">{fShortenNumber(totalCaesAdotados)}</Typography>
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
          Cães para Adoção
        </Typography>
        <Typography variant="h3">{fShortenNumber(totalCaespAdocao)}</Typography>
      </Typography>
    </RootStyle>
  );
}
