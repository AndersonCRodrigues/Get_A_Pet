import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import useFlashMessage from '../../../hooks/useFlashMessage';
import api from '../../../utils/api';

import './AddPet.css';
import '../../form/Form.css';
import PetForm from '../../form/PetForm';

function EditPet() {

  const [pet, setPet] = useState({});
  const token = (localStorage.getItem('token') || '');
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const history = useHistory();

  useEffect(() => {

    api.get(`pets/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }).then((response) => setPet(response.data.pet))

  }, [id, token]);

  const updatePet = async (petUpdate) => {
    let msgType = 'success';
    console.log(petUpdate);

    const formData = new FormData();

    Object.keys(petUpdate)
      .forEach((key) => {
        if (key === 'images') {
          Object.keys(petUpdate).forEach((_, i) => formData.append('images', petUpdate[key][i]))
        } else {
          formData.append(key, petUpdate[key]);
        }
      });

    const data = await api.patch(`pets/${pet._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => response.data)
      .catch((err) => {
        msgType = 'error';
        return err.response.data;
      })

      setFlashMessage(data.message, msgType);
      history.push('/pet/mypets');
  };

  return (
    <section>
      <div className="addpet_header">
        <h1>Editando o Pet: {pet.name}</h1>
        <p>Depois da edição, os dados serão atualizados no sistema</p>
      </div>
      {pet.name
      && (
        <PetForm
          handleSubmit={updatePet}
          btnText='Atualizar'
          petData={pet}
        />
      )}
    </section>
  )
}

export default EditPet