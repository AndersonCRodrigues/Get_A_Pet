import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import useFlashMessage from '../../../hooks/useFlashMessage';
import api from '../../../utils/api';

import './PetDetails.css';

function PetDetails() {

  const [pet, setPet] = useState({});
  const { id } = useParams();
  const token = (localStorage.getItem('token') || '');
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api.get(`pets/${id}`)
      . then((response) => setPet(response.data.pet));
  }, [id]);

  const schedule = async () => {
    let msgType = 'success'

    const data = await api
      .patch(`pets/schedule/${pet._id}`,'', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  };

  return (
   <section className='pet_details_container'>
    {pet.name
    && (
      <>
      <div className='petdetails_header'>
        <h1>Conhecendo o Pet: {pet.name}</h1>
        <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
      </div>
      <div className='pet_images'>
        {pet.images.map((image, index) => (
          <img
            src={`${process.env.REACT_APP_URL}${image}.png`}
            alt={pet.name}
            key={pet.name+index}
            />
        ))}
      </div>
      <p>
        <span className='bold'>Peso:</span>{pet.weight}kg
      </p>
      <p>
        <span className='bold'>Anos:</span>{pet.age} ano(s)
      </p>
      {token ? (
        <button onClick={schedule}>Solicitar uma visita</button>
      ) : (
        <p>Você precisa <Link to='/register'>criar uma conta</Link> para solicitar uma Visita!</p>
      )}
      </>
      )
    }
   </section>
  )
}

export default PetDetails