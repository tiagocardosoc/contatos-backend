import { Router } from "express";
import Contatos from "../../models/Contatos";
import autenticarToken from "../middlewares/autenticarToken";

const contatos = Router();

// ROTAS PRIVADAS PROTEGIDAS PELO MIDDLEWARE

contatos.get("/listar-contatos", autenticarToken, async (req, res) => {
  try {
    const contatos = await Contatos.find();

    if (contatos) {
      res.status(200).json({
        mensagem: 'Dados trazidos com sucesso.',
        contatos: contatos
      });
    }
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro no servidor. Tente novamente.",
    });
  }
});

contatos.get("/listar-unico-contato/:id", autenticarToken, async (req, res) => {
  const id = req.params.id;

  try {

    const contato = await Contatos.findOne({ _id: id });

    if (!contato) {
      res.status(400).json({
        mensagem: "Usuário não encontrado.",
      });
      return;
    }

    res.status(200).json(contato);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro no servidor. Tente mais tarde.",
    });
  }
});

contatos.post("/cadastrar-contato", autenticarToken, async (req, res) => {
  const { nome, sobrenome, telefone, dataNascimento, endereco, email } =
    req.body;

  if (
    !nome ||
    !sobrenome ||
    !telefone ||
    !dataNascimento ||
    !endereco ||
    !email
  ) {
    return res.status(422).json({
      mensagem: `Dados inválidos. ${nome}, ${sobrenome}, ${telefone}, ${dataNascimento}, ${endereco}, ${email} `,
    });
  }

  const novoContato = {
    nome,
    sobrenome,
    telefone,
    dataNascimento,
    endereco,
    email,
  };

  const usuarioExiste = await Contatos.findOne({
    telefone: telefone,
  }); 

  if (usuarioExiste) {
    return res.status(422).json({
      mensagem: "Usuário já existe.",
    });
  }

  try {
    await Contatos.create(novoContato);

    res.status(200).json({
      mensagem: "O contato foi criado com sucesso.",
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro no servidor. Tente novamente!",
    });
  }
});

contatos.put("/editar-contato/:id", autenticarToken, async (req, res) => {
  const id = req.params.id;
  const { nome, sobrenome, telefone, dataNascimento, endereco, email } =
    req.body;

  const contato = {
    nome,
    sobrenome,
    telefone,
    dataNascimento,
    endereco,
    email,
  };

  try {
    const edicaoContato = await Contatos.updateOne({ _id: id }, contato);

    if (edicaoContato.matchedCount === 0) {
      res.status(422).json({
        mensagem: "Usuário não encontrado.",
      });
    }

    res.status(200).json(contato);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro no servidor. Tente novamente.",
    });
  }
});

contatos.delete("/deletar-contato/:id", autenticarToken, async (req, res) => {
  const id = req.params.id;

  const usuarioExiste = await Contatos.findOne({
    _id: id,
  });

  if (!usuarioExiste) {
    res.status(422).json({
      mensagem: "Usuário não foi encontrado.",
    });
    return;
  }

  try {
    
    await Contatos.deleteOne({_id: id});

    res.status(200).json({
        mensagem: "Usuário removido com sucesso."
    })

  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro no servidor. Tente novamente.",
    });
  }
});

export default contatos;
