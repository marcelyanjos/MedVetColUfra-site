const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const animalsRouter = require('./routes/animals');
const adoptionFormsRouter = require('./routes/adoptionform');
const agendamentoRouter = require('./routes/agendamento');
const clientsRouter = require('./routes/clients');
const disponibilidadeRouter = require('./routes/horarioAgendamento');
const profissionaisDisponiveisRouter = require('./routes/profissionaisDisponiveis');
const servicosRouter = require('./routes/servico');
const petClienteRouter = require('./routes/petClient')
const petsRouter = require('./routes/petClientes')
const chartRouter = require('./routes/charts')
const adocaoRouter = require('./routes/adocoes')

const app = express();

// Habilita o uso do CORS
app.use(cors());

// Configura o Body Parser para interpretar corretamente os dados enviados no corpo das requisições
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.json());

app.use('/api/animals', animalsRouter);
app.use('/api/adoption-forms', adoptionFormsRouter);
app.use('/api/agendamentos', agendamentoRouter);
app.use('/api/clientes', clientsRouter);
app.use('/api/disponibilidade', disponibilidadeRouter);
app.use('/api/disponibilidade-profissionais', profissionaisDisponiveisRouter);
app.use('/api/servicos', servicosRouter);
app.use('/api/petsCliente', petsRouter);
app.use('/api/petCliente', petClienteRouter);
app.use('/api/chart', chartRouter);
app.use('/api/adocao', adocaoRouter);

const address = '192.168.79.73'; // Endereço IP da sua máquina
const port = 5000;

app.listen(port,address, () =>  console.log(`Servidor iniciado em ${address}:${port}`));
