const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tareaSchema = new Schema({
    descripcion: String,
    completada: { type: Boolean, default: false }
}, { versionKey: false });

const alumnoSchema = new Schema({
    nombre: String,
    edad: Number,
    correo: String, // Campo de correo
    telefono: String, // Campo de teléfono
    fecha: Date, // Campo de fecha
    tareas: [tareaSchema] // Arreglo de tareas
}, { versionKey: false });

module.exports = mongoose.model('Alumno', alumnoSchema);
