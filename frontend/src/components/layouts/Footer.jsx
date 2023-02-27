import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='footer'>
      <p>
        Desenvolvido por<span className='bold'> <Link to='https://www.linkedin.com/in/anderson-costa-rodrigues/'>Anderson Rodrigues</Link></span>
        <span className='bold'>{' - '}Get a Pet</span> &copy; 2023
      </p>
    </footer>
  )
}

export default Footer