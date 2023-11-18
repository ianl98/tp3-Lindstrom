
import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import './TaskForm.css';

const TaskForm = ({ addTask }) => {

  // Navigate para redireccionar a la pantalla de inicio al agregar
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      newTask: '',
      description: '',
    },
    // Crea la nueva tarea 
    onSubmit: (values) => {
        const newTask = {
          id: new Date().getTime(),
          text: values.newTask,
          description: values.description,
          completed: false,
        };

        addTask(newTask);
        navigate('/');
    },
    // Validaciones usando Yup
    validationSchema: (Yup.object({
        newTask: Yup.string().required('El nombre de la tarea es obligatorio'),
        description: Yup.string().required('La descripción de la tarea es obligatoria'),
      }))
  });

  return (
    <div className="task-form-container">
      <h2>Agregar Nueva Tarea</h2>
      <form className="task-form" onSubmit={formik.handleSubmit}>
        <label htmlFor="newTask">Nombre de la tarea:</label>
        <input
          type="text"
          id="newTask"
          name="newTask"
          onChange={formik.handleChange}
          value={formik.values.newTask}
        />
        {formik.errors.newTask && formik.touched.newTask ? <span>{formik.errors.newTask}</span> : null}
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.errors.description && formik.touched.description ? <span>{formik.errors.description}</span> : null}
        <button type="submit">Agregar Tarea</button>
        <Link to="/">
            <button>Volver</button>
        </Link>
      </form>
    </div>
  );
};

export default TaskForm;