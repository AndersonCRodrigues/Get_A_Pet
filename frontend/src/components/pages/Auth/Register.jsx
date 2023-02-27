import Input from '../../form/Input'
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import '../../form/Form.css';

import { Context } from '../../../context/UserContext';

function Register() {

  const {register} = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { target: {
      name,
      phone,
      email,
      password,
      confirmpassword
    }} = e;

    const user = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
      confirmpassword: confirmpassword.value,
    };

    register(user);
  };

  return (
    <section className='form_container'>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text='Nome'
          type='text'
          name='name'
          placeholder='Digite seu nome'
        />
        <Input
          text='Telefone'
          type='text'
          name='phone'
          placeholder='Digite seu telefone'
        />
        <Input
          text='E-mail'
          type='email'
          name='email'
          placeholder='Digite seu e-mail'
        />
        <Input
          text='Senha'
          type='password'
          name='password'
          placeholder='Digite sua senha'
        />
        <Input
          text='Confirmação de Senha'
          type='password'
          name='confirmpassword'
          placeholder='Confirme sua senha'
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to='/login'>Clique aqui.</Link>
      </p>
    </section>
  )
}

export default Register