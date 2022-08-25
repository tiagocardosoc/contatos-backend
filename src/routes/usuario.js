import { Router } from "express";
import User from "../../models/User";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const usuario = Router();

// Public Route
usuario.post("/registrar-usuario", async (req, res) => {
  const { nome, email, senha, senhaConfirmada } = req.body;

  if (!nome || !email || !senha || !senhaConfirmada) {
    res.status(422).json({
      mensagem: `Dados inválidos. ${nome}, ${email}, ${senha}, ${senhaConfirmada}}`,
    });
  }
  if (senha !== senhaConfirmada) {
    res.status(422).json({
      mensagem: "Senhas não coincidem.",
    });
  }

  //Checar se usuário existe:
  const usuarioExiste = await User.findOne({
    email: email,
  });

  if (usuarioExiste) {
    res.status(422).json({
      mensagem: "Por favor, utilize um outro email.",
    });
  }

  // criar senha
  const salt = await bcrypt.genSalt(12);
  const senhaHash = await bcrypt.hash(senha, salt);

  // criar usuario
  const usuario = new User({
    nome,
    email,
    senha: senhaHash,
  });

  try {
    await usuario.save();

    res.status(201).json({
      mensagem: "Usuario criado com sucesso.",
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro no servidor. Tente novamente.",
    });
  }
});

usuario.post("/login-usuario", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(422).json({
      mensagem: `Dados inválidos. ${email}, ${senha}`,
    });
  }

  // Checar se usuario existe:
  const getUsuario = await User.findOne({ email: email });
  if (!getUsuario) {
    res.status(404).json({
      mensagem: `Usuário não encontrado.`,
    });
    return
  }
  //Checar se senha existe
  const checarSenha = await bcrypt.compare(senha, getUsuario.senha);

  if (!checarSenha) {
    res.status(404).json({
      mensagem: `Senha inválida. ${getUsuario}`,
    });
    return
  }

  try {

    const secret = process.env.SECRET;

    const token = jwt.sign({
        id: getUsuario._id,
    },
    secret
    )

    res.status(200).json({
        mensagem: "Autenticação realizada com sucesso.", 
        token: token
    })


  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro no servidor. Tente novamente.",
    });
  }
});

export default usuario;
