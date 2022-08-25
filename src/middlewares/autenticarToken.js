const jwt = require("jsonwebtoken");

export default function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[0];

    'localStorage:'
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmU5ODU4NmIwNTc0N2Q3ZGZjZjFjMiIsImlhdCI6MTY2MTMwMTg0M30.a60CIyxlUP6e6hHV-9dJsq6SvffTWvQw7vSpumAIjBE' 
    'enviado pro back:' 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmU5ODU4NmIwNTc0N2Q3ZGZjZjFjMiIsImlhdCI6MTY2MTMwMDY5M30.r7tkpTvO4lZpZqiFuFQM1ZMV3A7gtWC5gAl2V4hQLP8'

    if (!token) {
        return res.status(401).json({
            mensagem: 'Acesso negado.'
        })
    }

    try { 
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next()

    } catch(erro) {
        return res.status(400).json({
            mensagem: "Token inválido."
        })
    }

}