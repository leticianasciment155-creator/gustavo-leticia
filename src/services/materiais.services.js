import pool from "../database/conexao.js";

class MateriaisService {

  async listar() {
    const resultado = await pool.query(
      "SELECT * FROM materiais ORDER BY id"
    );

    return resultado.rows;
  }

  async buscarPorId(id) {
    const resultado = await pool.query(
      "SELECT * FROM materiais WHERE id = $1",
      [id]
    );

    return resultado.rows[0];
  }

  async cadastrar(nome, categoria, preco, quantidade, disponivel) {
    const resultado = await pool.query(
      `INSERT INTO materiais
      (nome, categoria, preco, quantidade, disponivel)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [nome, categoria, preco, quantidade, disponivel]
    );

    return resultado.rows[0];
  }

  async alterarDisponibilidade(id, disponivel) {
    const resultado = await pool.query(
      `UPDATE materiais
       SET disponivel = $1
       WHERE id = $2
       RETURNING *`,
      [disponivel, id]
    );

    return resultado.rows[0];
  }
}

const materiaisService = new MateriaisService();

export default materiaisService;