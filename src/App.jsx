
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import TaskForm from './components/TaskForm/taskForm';
import TaskList from './components/TaskList/taskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Actualiza el localStorage cuando las tareas cambian
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Carga las tareas desde el localStorage al montar el componente
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Añade una nueva tarea
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Cambia el estado de una tarea a completado o no completado
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Elimina una tarea
  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <Router>
      <div className="App">
        <h1>To-Do List App</h1>
        <Routes>
          <Route path="/add" element={<TaskForm addTask={addTask} />} />

          <Route path="/" element={<TaskList tasks={tasks} toggleTask={toggleTask} removeTask={removeTask} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;