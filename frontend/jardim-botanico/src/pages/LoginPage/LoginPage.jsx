import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/Inputs/TextInput/TextInput';
import Button from '../../components/Button/Button';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      navigate('/'); // redireciona após login
    } else {
      alert('Login falhou: ' + data.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <TextInput type="email" label='E-mail' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextInput type="password" label='Senha' placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit">Entrar</Button>
    </form>
  );
}

export default LoginPage;
