const mongoose = require('mongoose')

const Contatos = mongoose.model('Contatos', {
    nome: String,
    sobrenome: String,
    data_nascimento: String,
    telefone: String,
    endereco: String,
    email: String
});

module.exports = Contatos 