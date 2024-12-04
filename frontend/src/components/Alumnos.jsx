import React, { useEffect, useState } from 'react';
import { fetchAlumnos, createAlumno, updateAlumno, deleteAlumno, addTarea, deleteTarea } from '../services/api';

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    correo: '',
    telefono: '',
    fecha: '',
  });
  const [editing, setEditing] = useState(null);
  const [descripcionTarea, setDescripcionTarea] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAlumnos();
  }, []);

  const loadAlumnos = async () => {
    try {
      const response = await fetchAlumnos();
      setAlumnos(response.data);
    } catch (err) {
      setError('Error al cargar los alumnos');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const alumnoData = { ...formData };
    try {
      if (editing) {
        await updateAlumno(editing, alumnoData);
        setEditing(null);
      } else {
        await createAlumno(alumnoData);
      }
      resetForm();
      loadAlumnos();
    } catch (err) {
      setError('Error al guardar el alumno');
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      edad: '',
      correo: '',
      telefono: '',
      fecha: '',
    });
  };

  const handleEdit = (alumno) => {
    setEditing(alumno._id);
    setFormData({ ...alumno });
  };

  const handleDelete = async (id) => {
    try {
      await deleteAlumno(id);
      loadAlumnos();
    } catch (err) {
      setError('Error al eliminar el alumno');
    }
  };

  const handleAddTarea = async (alumnoId) => {
    if (descripcionTarea[alumnoId]) {
      const nuevaTarea = { descripcion: descripcionTarea[alumnoId] };
      try {
        await addTarea(alumnoId, nuevaTarea);
        setDescripcionTarea((prev) => ({ ...prev, [alumnoId]: '' }));
        loadAlumnos();
      } catch (err) {
        setError('Error al añadir la tarea');
      }
    }
  };

  const handleDeleteTarea = async (alumnoId, tareaId) => {
    try {
      await deleteTarea(alumnoId, tareaId);
      loadAlumnos();
    } catch (err) {
      setError('Error al eliminar la tarea');
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Alumnos</h1>
      {error && <div className="error">{error}</div>}
      <div className="flex-container">
        <div className="cuadro">
          <h2>{editing ? 'Actualizar Alumno' : 'Registrar Alumno'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={formData.edad}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo Electrónico"
              value={formData.correo}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="fecha"
              placeholder="Fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              required
            />
            <button type="submit">{editing ? 'Actualizar' : 'Registrar'}</button>
            <button type="button" onClick={resetForm}>Cancelar</button>
          </form>
        </div>

        <div className="cuadro">
          <h2>Lista de Alumnos</h2>
          <ul className="alumno-list">
            {alumnos.map((alumno) => (
              <li key={alumno._id} className="alumno-item">
                <strong>{alumno.nombre}</strong> - {alumno.edad} - {alumno.correo} - {alumno.telefono} - {alumno.fecha}
                <div className="alumno-actions">
                  <button onClick={() => handleEdit(alumno)}>Editar</button>
                  <button onClick={() => handleDelete(alumno._id)}>Eliminar</button>
                </div>
                <div className="tarea-input">
                  <input
                    type="text"
                    placeholder="Descripción de la tarea"
                    value={descripcionTarea[alumno._id] || ''}
                    onChange={(e) => setDescripcionTarea({ ...descripcionTarea, [alumno._id]: e.target.value })}
                  />
                  <button onClick={() => handleAddTarea(alumno._id)}>Añadir Tarea</button>
                </div>
                <ul className="tarea-list">
                  {alumno.tareas && alumno.tareas.map((tarea) => (
                    <li key={tarea._id}>
                      {tarea.descripcion}
                      <button onClick={() => handleDeleteTarea(alumno._id, tarea._id)}>Eliminar Tarea</button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Alumnos;
