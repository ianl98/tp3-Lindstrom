import React from 'react';
import { Link } from 'react-router-dom';
import './TaskList.css';

// Si no hay tareas muestra el mensaje de "No hay tareas"
// Al marcar una tarea como completada cambia el fondo a verde
const TaskList = ({ tasks, toggleTask, removeTask }) => {
  return (
    <div className="task-list-container">
      <h2>Lista de Tareas</h2>
      {tasks.length === 0 ? (
        <div>
          <p>No hay tareas</p>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-details">
                <div className="task-info">
                  <strong>Nombre:</strong> {task.text}
                  <p>
                    <strong>Descripción:</strong> {task.description}
                  </p>
                  <label>
                    <strong>¿Completado?</strong>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                  </label>
                </div>
              </div>
              <button className="remove-button" onClick={() => removeTask(task.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
        <Link to="/add">
            <button className="add-task-button">Agregar Tarea</button>
        </Link>
    </div>
  );
};

export default TaskList;
