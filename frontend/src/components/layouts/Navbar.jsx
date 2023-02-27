import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/img/logo.png';

import { Context } from '../../context/UserContext';

function Navbar() {

  const { authenticade, logout } = useContext(Context);

  return (
    <nav className='navbar'>
      <div><img src={Logo} alt="get a Pet" /></div>
      <h2>Get a Pet</h2>
      <ul>
        <li>
          <Link to='/'>Adotar</Link>
        </li>
        {authenticade ? (
          <>
            <li>
              <Link to='/pet/mypets'>Meus Pets</Link>
            </li>
            <li>
              <Link to='/pet/myadoptions'>Minhas Adoções</Link>
            </li>
            <li>
              <Link to='/user/profile'>Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        )
        : (
          <>
            <li>
              <Link to='/login'>Entrar</Link>
            </li>
            <li>
                <Link to='/register'>Cadastrar</Link>
            </li>
          </>
        )}

      </ul>
    </nav>
  )
}

export default Navbar