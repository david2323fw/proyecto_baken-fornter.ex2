const Alumno = require('../model/Alumno');

// Mostrar
module.exports.mostrar = (req, res) => {
    Alumno.find({}, (error, alumnos) => {
        if (error) return res.status(500).json({ message: 'Error mostrando los alumnos' });
        res.json(alumnos);
    });
};

// Crear
module.exports.crear = (req, res) => {
    const alumno = new Alumno(req.body);
    alumno.save((error) => {
        if (error) return res.status(500).json({ message: 'Error al crear el Alumno' });
        res.status(201).json(alumno);
    });
};

// Editar
module.exports.editar = (req, res) => {
    Alumno.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, alumno) => {
        if (error) return res.status(500).json({ message: 'Error actualizando el Alumno' });
        res.json(alumno);
    });
};

// Borrar
module.exports.borrar = (req, res) => {
    Alumno.findByIdAndRemove(req.params.id, (error) => {
        if (error) return res.status(500).json({ message: 'Error eliminando el Alumno' });
        res.status(204).send();
    });
};

// Agregar tarea
module.exports.agregarTarea = (req, res) => {
    const id = req.params.id;
    const nuevaTarea = { descripcion: req.body.descripcion };

    Alumno.findByIdAndUpdate(id, { $push: { tareas: nuevaTarea } }, { new: true }, (error, alumno) => {
        if (error) return res.status(500).json({ message: 'Error al agregar la tarea' });
        res.json(alumno);
    });
};

// Borrar tarea
module.exports.borrarTarea = (req, res) => {
    const id = req.params.id;
    const tareaId = req.params.tareaId;

    Alumno.findByIdAndUpdate(id, { $pull: { tareas: { _id: tareaId } } }, { new: true }, (error) => {
        if (error) return res.status(500).json({ message: 'Error al borrar la tarea' });
        res.status(204).send(); // Redirige después de borrar
    });
};
