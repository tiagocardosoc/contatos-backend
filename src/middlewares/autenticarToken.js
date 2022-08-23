const jwt = require("jsonwebtoken");

export default function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

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