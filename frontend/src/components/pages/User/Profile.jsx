import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'

import Input from '../../form/Input';
import api from '../../../utils/api';

import './Profile.css';
import '../../form/Form.css';
import useFlashMessage from '../../../hooks/useFlashMessage';
import RoundedImage from '../../layouts/RoundedImage';
import { baseUrl } from '../../../utils/baseUrl';

function Profile() {

  const [user, setUser] = useState({});
  const [preview, setPreview] = useState('');
  const token = localStorage.getItem('token') || '';
  const history = useHistory();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {

    api.get('/users/checkuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      }
    }).then((response) => setUser(response.data));

  }, [token]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({...user, [name]: value});
  };

  const onFileChange = ({ target }) => {
    const { name, files } = target;
    setPreview(files[0]);
    setUser({...user, [name]: files[0]});
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let msgType = 'success';

    const { target: {
      password,
      confirmpassword
    }} = e;

    const formData = new FormData();

    Object.keys(user)
      .forEach((key) => formData.append(key, user[key]));

    formData.append('password', password.value);
    formData.append('confirmpassword', confirmpassword.value);

    const data = await api.patch(`/users/edit/${user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => response.data)
      .catch((error) => {
        msgType = 'error';
        return error.response.data;
      });

      setFlashMessage(data.message, msgType);
      history.push('/');
  };

  return (
    <section>
      <div className='profile_header'>
        <h1>Perfil</h1>
        {(user.image || preview) && (
          <RoundedImage
            src={
              preview
              ? URL.createObjectURL(preview)
              : `${baseUrl}${user.image}.png`
            }
            alt={user.name}
          />
        )}
      </div>
      <form className='form_container' onSubmit={handleSubmit}>
        <Input
          text='Imagem'
          type='file'
          name='image'
          handleChange={onFileChange}
        />
        <Input
          text='Nome'
          type='text'
          name='name'
          placeholder='Digite seu nome'
          value={user.name || ''}
          handleChange={handleChange}
        />
        <Input
          text='Telefone'
          type='text'
          name='phone'
          placeholder='Digite seu telefone'
          value={user.phone || ''}
          handleChange={handleChange}
        />
        <Input
          text='E-mail'
          type='email'
          name='email'
          placeholder='Digite seu e-mail'
          value={user.email || ''}
          handleChange={handleChange}
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
        <input type="submit" value="Editar" />
      </form>
    </section>
  )
}

export default Profile