const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/db_alumnos'; // URL de conexión a MongoDB

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error al conectar MongoDB'));
db.once('open', function callback() {
    console.log("¡Conectado a MongoDB!");
});

module.exports = db;
