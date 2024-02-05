const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getTasks, addTask, updateTask, deleteTask } = require('./queries');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Erro ao obter tarefas:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.post('/tasks', async (req, res) => {
    try {
      const { description } = req.body;
      await addTask(description);
      const tasks = await getTasks();  // Após adicionar, obtemos a lista atualizada
      res.json(tasks);  // Retornamos a lista atualizada como resposta
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      res.status(500).send('Erro interno do servidor');
    }
  });

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await updateTask(id, description);
    res.send('Tarefa atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await deleteTask(id);
      const tasks = await getTasks();  // Obtemos a lista atualizada
      res.json(tasks);  // Retornamos a lista atualizada como resposta
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      res.status(500).send('Erro interno do servidor');
    }
  });
  

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
