import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', { username, password });
      setMessage('Registro exitoso. Puedes iniciar sesión ahora.');
      setUsername('');
      setPassword('');
    } catch (error) {
      setMessage('Error al registrar el usuario: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
      {message && (
        <p>
          <Link to="/">¿Ya tienes una cuenta? Inicia sesión aquí</Link>
        </p>
      )}
    </div>
  );
};

export default Register;
