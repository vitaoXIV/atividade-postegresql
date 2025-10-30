const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const itemsRoutes = require('./routes/itemsRoutes');

const app = express();

//Middleware para logs de requisação
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

//Middleware para parsear JSON
app.use(express.json());

//Middleware para CORS

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//Rotas
app.use('/api', itemsRoutes);
app.get('/', (req, res) => {
    res.send('API esta funcionando!');
});

//Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: err.message
    });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, '0,0,0,0', () => {
    const address = server.address();
    console.log(`Server is runnig on port ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`Network: http://${require('os'). hostname()}:${PORT}`);
    console.log('Press CTRL+C to quit');
});

//Tratamento de erros não capturados
server.on('error', (err) => {
    if (err.syscall !== 'listen') {
        throw err;
    }
    switch (err.code) {
        case 'EACCES':
            console.error(`Port ${PORT} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${PORT} is already in use`);
            process.exit(1);
            break;
        default:
            throw err;        
    }
});