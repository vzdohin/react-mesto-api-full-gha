import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Logo from '../images/logo_white.svg';

function Header(props) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="логотип" />
      {location.pathname === '/sign-up' && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {location.pathname === '/sign-in' && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === '/' && (
        <div className='header__container'>
          <p className='header__email'>{props.email}</p>
          <Link to="/sign-in" className="header__link header__link_grey" onClick={props.onLogout}>
            Выйти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header