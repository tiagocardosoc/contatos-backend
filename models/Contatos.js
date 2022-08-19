const mongoose = require('mongoose')

const Contatos = mongoose.model('Contatos', {
    nome: String,
    sobrenome: String,
    data_nascimento: String,
    telefone: Number,
    endereco: String,
    email: String
});

module.exports = Contatos