import React, { useEffect, useState } from 'react';

import './Dashboard.css';
import api from '../../../utils/api';
import RoundedImage from '../../layouts/RoundedImage';

function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const token = (localStorage.getItem('token') || '');

  useEffect(() => {

    const fetch = async () => {
      await api.get('pets/myadoptions', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        }
      }).then((response) => setPets(response.data.pets));
    };

    fetch();
  }, [token]);

  return (
    <section>
      <div className='petlist_header'>
        <h1>Minhas Adoções</h1>
      </div>
      <div className='petlist_container'>
        {!pets.length && <p>Ainda não há adoções de Pets</p>}
        { pets.length > 0
          && pets.map((pet) => (
            <div key={pet._id} className='petlist_row'>
              <RoundedImage
                src={`${process.env.REACT_APP_URL}${pet.images[0]}.png`}
                alt={pet.name}
                width='px75'
              />
              <span className='bold'>{pet.name}</span>
              <div className='contacts'>
                <p>
                  <span className='bold'>Ligue para:</span> {pet.user.phone}
                </p>
                <p>
                  <span className='bold'>fale com:</span> {pet.user.name}
                </p>
              </div>
              <div className="actions">
                {pet.available ? (
                  <p>Adoção em Processo</p>
                ) : (
                  <p>Parabéns por concluir a Adoção!</p>
                )}
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default MyAdoptions