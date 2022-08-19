const mongoose = require('mongoose')

const User = mongoose.model('User', {
    nome: String,
    email: String,
    senha: String
});

module.exports = User