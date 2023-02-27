import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import '../../form/Form.css';

import { Context } from '../../../context/UserContext';
import Input from '../../form/Input';

function Login() {

  const { login } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { target: {
      email,
      password,
    }} = e;

    const user = {
      email: email.value,
      password: password.value,

    };

    login(user);
  };

  return (
    <section className='form_container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            text='E-mail'
            type='email'
            name='email'
            placeholder='Digite o seu e-mail'
          />
           <Input
            text='Senha'
            type='password'
            name='password'
            placeholder='Digite a sua senha'
          />
          <input type="submit" value="Entrar" />
        </form>
        <p>
          Não tem conta? <Link to='/register'>Clique aqui.</Link>
        </p>
    </section>
  )
}

export default Login