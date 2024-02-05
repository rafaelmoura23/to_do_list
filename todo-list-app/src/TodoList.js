import React, { useState, useEffect } from 'react';
// Importa o React e a função 'useState' do módulo 'react'.
function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [deletedTasks, setDeletedTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTaskDescription, setEditedTaskDescription] = useState('');

    // Carregar as tarefas
    const getTasks = async () => {
        try {
            const response = await fetch('http://localhost:3001/tasks');
            const tasks = await response.json();
            setTasks(tasks);
        } catch (error) {
            console.error('Erro ao obter tarefas:', error);
        }
    };

    useEffect(() => {
        getTasks(); // Chama a função getTasks ao montar o componente
    }, []); // O segundo parâmetro vazio indica que o useEffect deve ser executado apenas uma vez, ao montar o componente


    // Adicionar as Tarefas
    const addTask = async () => {
        if (newTask.trim() !== '') {
            try {
                await fetch('http://localhost:3001/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ description: newTask }),
                });

                const response = await fetch('http://localhost:3001/tasks');
                const tasks = await response.json();

                setTasks(tasks);
                setNewTask('');
            } catch (error) {
                console.error('Erro ao adicionar tarefa:', error);
            }
        }
    };

    // Deletar as tarefas
    const deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:3001/tasks/${id}`, {
                method: 'DELETE',
            });

            const response = await fetch('http://localhost:3001/tasks');
            const tasks = await response.json();

            setTasks(tasks);
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
        }
        const updatedTasks = tasks.filter((task) => task.id !== id);
        const deletedTask = tasks.find((task) => task.id === id);

        setTasks(updatedTasks);
        setDeletedTasks([...deletedTasks, deletedTask]);
    };

    // Atualizar as tarefas
    const updateTasks = async () => {
        try {
            await getTasks();
        } catch (error) {
            console.error('Erro ao atualizar tarefas:', error);
        }
    };

    // Edição das tarefas
    const startEditingTask = (taskId, taskDescription) => {
        setEditingTaskId(taskId);
        setEditedTaskDescription(taskDescription);
    };

    // Atualizando as tarefas
    const saveEditedTask = async (taskId) => {
        try {
            // Chame o backend para salvar a tarefa editada no banco de dados
            await fetch(`http://localhost:3001/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description: editedTaskDescription }),
            });

            // Atualize a lista de tarefas após a edição
            await getTasks();

            // Limpe as variáveis de edição
            setEditingTaskId(null);
            setEditedTaskDescription('');
        } catch (error) {
            console.error('Erro ao salvar a tarefa editada:', error);
        }
    };

    return (
        <div>
            <h1>Lista de Tarefas</h1>

            <input
                type="text"
                placeholder="Digite uma nova tarefa"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />

            <button onClick={addTask}></button>
            <button onClick={updateTasks}>Atualizar Tarefas</button>

            <div>
                <h2>Tarefas Pendentes</h2>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            {editingTaskId === task.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedTaskDescription}
                                        onChange={(e) => setEditedTaskDescription(e.target.value)}
                                    />
                                    <button onClick={() => saveEditedTask(task.id)}>Salvar</button>
                                </>
                            ) : (
                                <>
                                    {task.description}
                                    <button onClick={() => startEditingTask(task.id, task.description)}>Editar</button>
                                    <button onClick={() => deleteTask(task.id)}>Excluir</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Tarefas Excluídas</h2>
                <ul>
                    {deletedTasks.map((deletedTask) => (
                        <li key={deletedTask.id} style={{ textDecoration: 'line-through' }}>
                            {deletedTask.description}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default TodoList;