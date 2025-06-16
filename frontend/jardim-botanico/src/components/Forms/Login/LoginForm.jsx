import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../../components/Inputs/TextInput/TextInput';
import Button from '../../../components/Button/Button';
import './style.css'
function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
       },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (res.ok) {
      sessionStorage.setItem('token', data.token);
      navigate('/'); 
    } else {
      alert('Login falhou: ' + data.error);
    }
  };

  return (
    <form onSubmit={handleLogin} className='form-login'>
      <h2>Login</h2>
      <TextInput type="email" label='E-mail' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextInput type="password" label='Senha' placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
      <Button type="submit">Entrar</Button>
    </form>
  );
}

export default LoginForm;
