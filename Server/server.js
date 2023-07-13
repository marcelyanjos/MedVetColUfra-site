const express = require('express');
const cors = require('cors');
const animalsRouter = require('./routes/animals');
const adoptionRouter = require('./routes/adoptionform');
const agendamentoRouter = require('./routes/agendamento');
const clientsRouter = require('./routes/clients');
const disponibilidadeRouter = require('./routes/horarioAgendamento');
const profissionaisDisponiveisRouter = require('./routes/profissionaisDisponiveis');
const servicosRouter = require('./routes/servico');
const petClienteRouter = require('./routes/petClient')
const petsRouter = require('./routes/petClientes')

const app = express();

// Habilita o uso do CORS
app.use(cors());

app.use(express.json());

app.use('/api/animals', animalsRouter);
app.use('/api/adoption-forms', adoptionRouter);
app.use('/api/agendamentos', agendamentoRouter);
app.use('/api/clientes', clientsRouter);
app.use('/api/disponibilidade', disponibilidadeRouter);
app.use('/api/disponibilidade-profissionais', profissionaisDisponiveisRouter);
app.use('/api/servicos', servicosRouter);
app.use('/api/petsCliente', petsRouter);
app.use('/api/petCliente', petClienteRouter);

app.listen(5000, () => console.log('Servidor iniciado na porta 5000.'));
