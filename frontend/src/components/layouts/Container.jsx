import React from 'react'
import './Container.css';

function Container({ children }) {
  return (
    <main className='container'>
      {children}
    </main>
  )
}

export default Container