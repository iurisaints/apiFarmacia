const express = require('express')
const server = express()
const dados = require('./data/dados.json')
const fs = require('fs')
const cors = require('cors')

// controllers
const clientesRouter = require('./controllerClientes')
const medicamentosRouter = require('./controllerMedicamentos')
const fornecedoresRouter = require('./controllerFornecedores')
const vendasRouter = require('./controllerVendas')

// função para utilizar o servidor
server.use(express.json())
server.use(cors())

server.use('/apiFarmacia', clientesRouter.server)
server.use('/apiFarmacia', medicamentosRouter.server)
server.use('/apiFarmacia', fornecedoresRouter.server)
server.use('/apiFarmacia', vendasRouter.server)

// mensagem no terminal para indicar o funcionamento
server.listen(3000, () =>{
    console.log(`O servidor está funcionando! :D`);
})
