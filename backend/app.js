const express = require('express');
const cors = require('cors');
const session = require('express-session'); // Middleware para manejar sesiones
const db = require('./db'); // Archivo de conexión a MongoDB
const alumnos = require('./routes/alumnos'); // Rutas de alumnos
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de sesión
app.use(session({
    secret: 'tu_secreto_aqui', // Cambia esto por un secreto más seguro
    resave: false,
    saveUninitialized: true,
}));

app.use('/api/alumnos', alumnos); // Prefijo para las rutas de API
app.use('/api/auth', authRoutes); // Prefijo para las rutas de autenticación

app.listen(3000, () => {
    console.log('¡Server UP! en http://localhost:3000');
});
