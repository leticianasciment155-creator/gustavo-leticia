import express from "express";
import materialRouter from "./routes/materiais.routes.js";

const app = express();

app.use(express.json());
app.use("/materiais", materialRouter);

app.get("/", (req, res) => {
  res.json({ mensagem: "API funcionando!" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});