import React from 'react'


import './Header.css'

export const Header = ({ children }) => {
  return (
      <div className="header">
          <div className="header__container">
              <div className='header__wrapper'>{children}</div>
          </div>
      </div>
  )
}
