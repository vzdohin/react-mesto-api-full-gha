import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Register(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
  })
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onRegistration(formValue.email, formValue.password)
  }
  return (
    <form className='registration__form' noValidate onSubmit={handleSubmit}>
      <h2 className='registration__title'>Регистрация</h2>
      <div className='registration__inputs'>
        <input
          name='email'
          className='registration__input'
          type='email'
          id='email-input'
          placeholder='Email'
          autoComplete= 'email'
          value={formValue.email}
          onChange={handleChange} />
        <input
          name='password'
          className='registration__input'
          type='password'
          id='password-input'
          placeholder='Пароль'
          autoComplete= 'current-password'
          value={formValue.password}
          onChange={handleChange} />
      </div>
      <button className='registration__button' type='submit'>Зарегистрироваться</button>
      <div className='registration__sign-in'>
        <p className='registration__login-text'>Уже зарегистрированы?</p>
        <Link className='registration__login-link' to='/sign-in'>&nbsp;Войти</Link>
      </div>
    </form>
  )



}

export default Register;