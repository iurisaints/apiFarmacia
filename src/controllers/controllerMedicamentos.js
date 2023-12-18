const express = require('express')
const server = express()
const dadosMedicamentos = require('./data/dadosMedicamentos.json')  // Assumindo que você tenha um arquivo dadosMedicamentos.json
const fs = require('fs')

server.use(express.json())

server.post('/medicamentos', (req, res) => {
    const novoMedicamento = req.body

    if (!novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preco || !novoMedicamento.quantidade) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dadosMedicamentos.Medicamento.push(novoMedicamento)
        salvarDados(dadosMedicamentos)
        return res.status(201).json({ mensagem: "Novo medicamento cadastrado com sucesso!" })
    }
})

server.get('/medicamentos', (req, res) => {
    return res.json(dadosMedicamentos.Medicamento)
})

server.put('/medicamentos/:id', (req, res) => {
    const medicamentoId = parseInt(req.params.id)
    const atualizaMedicamento = req.body

    const idMedicamento = dadosMedicamentos.Medicamento.findIndex(m => m.id === medicamentoId)

    if (idMedicamento === -1) {
        return res.status(404).json({ mensagem: "Medicamento não encontrado :/" })
    } else {
        dadosMedicamentos.Medicamento[idMedicamento].nome = atualizaMedicamento.nome || dadosMedicamentos.Medicamento[idMedicamento].nome
        dadosMedicamentos.Medicamento[idMedicamento].fabricante = atualizaMedicamento.fabricante || dadosMedicamentos.Medicamento[idMedicamento].fabricante
        dadosMedicamentos.Medicamento[idMedicamento].preco = atualizaMedicamento.preco || dadosMedicamentos.Medicamento[idMedicamento].preco
        dadosMedicamentos.Medicamento[idMedicamento].quantidade = atualizaMedicamento.quantidade || dadosMedicamentos.Medicamento[idMedicamento].quantidade

        salvarDados(dadosMedicamentos)

        return res.json({ mensagem: "Medicamento atualizado com sucesso!" })
    }
})

server.delete("/medicamentos/:id", (req, res) => {
    const medicamentoId = parseInt(req.params.id)

    dadosMedicamentos.Medicamento = dadosMedicamentos.Medicamento.filter(m => m.id !== medicamentoId)

    salvarDados(dadosMedicamentos)

    return res.status(200).json({ mensagem: "Medicamento excluído com sucesso" })
})

function salvarDados() {
    fs.writeFileSync(__dirname + '/data/dadosMedicamentos.json', JSON.stringify(dadosMedicamentos, null, 2))
}

module.exports = { server, salvarDados }
