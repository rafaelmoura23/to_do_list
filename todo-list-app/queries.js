const pool = require('./db');

const getTasks = async () => {
  const result = await pool.query('SELECT * FROM tasks');
  return result.rows;
};

const addTask = async (task) => {
  await pool.query('INSERT INTO tasks (description) VALUES ($1)', [task]);
};

const updateTask = async (id, task) => {
  await pool.query('UPDATE tasks SET description = $1 WHERE id = $2', [task, id]);
};

const deleteTask = async (id) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  };

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};
