import React from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../utils/api';
import useFlashMessage from '../../../hooks/useFlashMessage';
import PetForm from '../../form/PetForm';

import './AddPet.css';

function AppPet() {

  const token = localStorage.getItem('token') || '';
  const { setFlashMessage } = useFlashMessage();
  const history = useHistory();

  const registerPet = async (pet) => {
    let msgType = 'success';

    const formData = new FormData();

    Object.keys(pet)
      .forEach((key) => {
        if (key === 'images') {
          Object.keys(pet).forEach((_, i) => formData.append('images', pet[key][i]))
        } else {
          formData.append(key, pet[key]);
        }
      });

    const data = await api.post('pets/create', formData, {
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

      if (msgType !== 'error') {
        history.push('/pet/mypets');
      }
  };

  return (
    <section>
      <div className='addpet_header'>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      <PetForm
      handleSubmit={registerPet}
        btnText='Cadastrar Pet'
      />
    </section>
  )
}

export default AppPet;