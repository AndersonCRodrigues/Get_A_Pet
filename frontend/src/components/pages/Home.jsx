import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import api from '../../utils/api';

function Home() {

  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get('/pets')
      .then((response) => setPets(response.data.pets));
  }, []);

  return (
    <section>
      <div className='pet_home_header'>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>
      <div className='pet_container'>
        {pets.length
          && pets.map((pet, i) => (
            <div key={pet.name+i} className='pet_card'>
              <div
                className='pet_card_image'
                style={{backgroundImage: `url(${process.env.REACT_APP_URL}${pet.images[0]}.png)`}}
              ></div>
              <h3>{pet.name}</h3>
              <p>
                <span className='bold'>Peso:</span> {pet.weight}kg
              </p>
              {pet.available ? (
                <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className='adopted_text'>Adotado</p>
              )}
            </div>
          ))
        }
        {!pets.length && <p>Não há pets cadastrados ou disponíveis para adoção no momento!</p>}
      </div>
    </section>
  )
}

export default Home