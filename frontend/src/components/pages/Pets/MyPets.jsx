import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './Dashboard.css';
import useFlashMessage from '../../../hooks/useFlashMessage';
import api from '../../../utils/api';
import RoundedImage from '../../layouts/RoundedImage';
import { baseUrl } from '../../../utils/baseUrl';

function MyPets() {

  const [pets, setPets] = useState([]);
  const token = (localStorage.getItem('token') || '');
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {

    api.get('pets/mypets', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }).then((response) => setPets(response.data.pets))

  }, [token]);

  const removePet = async (id) => {
    let msgType = 'success';

    const data = await api.delete(`/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }).then((response) => {
      const updatedPets = pets.filter((pet) => pet._id !== id);
      setPets(updatedPets);
      return response.data
    })
      .catch((err) => {
        msgType = 'error';
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  };

  const conlcudeAdoption = async (id) => {
    let msgType = 'success';

    const data = await api.patch(`/pets/conclude/${id}`, '', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }).then((response) => response.data)
      .catch((err) => {
        msgType = 'error';
        return err.response.data;
      });

      setFlashMessage(data.message, msgType);
  };

  return (
    <section>
      <div className='petslist_header'>
        <h1>Meus Pets</h1>
        <Link to='/pet/add'>Cadastrar pets</Link>
      </div>
      <div className='petslist_container'>
        {pets.length > 0
        && pets.map((pet) => (
        <div key={pet._id} className='petlist_row'>
          <RoundedImage
             src={`${baseUrl}${pet.images[0]}.png`}
             alt={pet.name}
             width='px75'
          />
          <span className='bold'>{pet.name}</span>
          <div className="actions">
            {pet.available
            ? (
              <>
              {pet.adopter && <button
                className='conclude_btn'
                onClick={() => conlcudeAdoption(pet._id)}>
                  Concluir Adoção
                </button>}
              <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
              <button onClick={() => removePet(pet._id)}>Excluir Pet</button>
              </>
            )
            : <p>Pet já adotado</p>
            }
          </div>
        </div>))
        }
        {!pets.length && <p>Não há Pets cadastrados</p>}
      </div>
    </section>
  )
}

export default MyPets