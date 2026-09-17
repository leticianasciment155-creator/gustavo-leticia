import express from "express";
import materiaisService from "../services/materiais.services.js";

const router = express.Router();

// LISTAR TODOS
router.get("/", async (req, res) => {
  try {
    const materiais = await materiaisService.listar();

    return res.status(200).json(materiais);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: "Erro interno do servidor"
    });
  }
});

// BUSCAR POR ID
router.get("/:id", async (req, res) => {
  try {
    const material = await materiaisService.buscarPorId(req.params.id);

    if (!material) {
      return res.status(404).json({
        erro: "Material não encontrado"
      });
    }

    return res.status(200).json(material);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: "Erro interno do servidor"
    });
  }
});

// CADASTRAR MATERIAL
router.post("/", async (req, res) => {
  try {
    const {
      nome,
      categoria,
      preco,
      quantidade,
      disponivel
    } = req.body;

    if (!nome || !categoria || preco == null || quantidade == null) {
      return res.status(400).json({
        erro: "Preencha todos os campos obrigatórios"
      });
    }

    const material = await materiaisService.cadastrar(
      nome,
      categoria,
      preco,
      quantidade,
      disponivel ?? true
    );

    return res.status(201).json(material);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: "Erro ao cadastrar material"
    });
  }
});

export default router;