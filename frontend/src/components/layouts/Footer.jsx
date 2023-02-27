import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='footer'>
      <p>
        Desenvolvido por<span className='bold'> <a href="https://www.linkedin.com/in/anderson-costa-rodrigues/" target='_blank' rel="noreferrer">Anderson Rodrigues</a></span>
        <span className='bold'>{' - '}Get a Pet</span> &copy; 2023
      </p>
    </footer>
  )
}

export default Footer