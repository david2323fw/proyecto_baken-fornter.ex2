const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Asegúrate de importar jsonwebtoken

// Registro
module.exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ username, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, 'tu_secreto_aqui', { expiresIn: '1h' }); // Cambia 'tu_secreto_aqui'
        user.token = token;
        await user.save();

        res.status(201).json({ message: 'Usuario creado exitosamente', token });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Login
module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const token = jwt.sign({ id: user._id }, 'tu_secreto_aqui', { expiresIn: '1h' });
        user.token = token;
        await user.save();

        req.session.userId = user._id; // Guarda la sesión
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
