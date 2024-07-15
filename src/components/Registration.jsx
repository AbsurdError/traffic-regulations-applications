
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
export default function Registration() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [fio, setFio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState({});
  const navigate = useNavigate()

  function registration(event){
    event.preventDefault()
    fetch('http://127.0.0.1:8000/api-copp/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'
      },
      body: JSON.stringify({login, password, fio, email, phone})
  })
  .then(data => data.json())
  .then(info => {
    if(info.data){
      navigate('/login')
    } else {
      setError(info.error.errors)
    }
  })
  }
  return (
    <section className="section">
    <div className="section__wraps">
      <h1 className="setction__title">Регистрация</h1>
      <form action="form" className="form__section">
      <label htmlFor="1" className="form__label">
          Fio:
          <p className="error">{error.fio?.[0]}</p>
          <input type="text" className={`form__input ${error.fio?.[0] ? 'input__error' : ''}`} placeholder='name' value={fio} onChange={event => setFio(event.target.value)}/>
        </label>
        <label htmlFor="1" className="form__label">
          Email:
          <p className="error">{error.email?.[0]}</p>
          <input type="text" className={`form__input ${error.email?.[0] ? 'input__error' : ''}`} placeholder='email@mail.ru' value={email} onChange={event => setEmail(event.target.value)}/>
        </label>
        <label htmlFor="1" className="form__label">
          Phone:
          <p className="error">{error.phone?.[0]}</p>
          <input type="text" className={`form__input ${error.phone?.[0] ? 'input__error' : ''}`} placeholder='8 000 000 00 00' value={phone} onChange={event => setPhone(event.target.value)}/>
        </label>
        <label htmlFor="1" className="form__label">
          Login:
          <p className="error">{error.login?.[0]}</p>
          <input type="text" className={`form__input ${error.login?.[0] ? 'input__error' : ''}`} placeholder='login' value={login} onChange={event => setLogin(event.target.value)}/>
        </label>
        <label htmlFor="2" className="form__label">
          Password:
          <p className="error">{error.password?.[0]}</p>
          <input type="password" className={`form__input ${error.password?.[0] ? 'input__error' : ''}`} placeholder='********' value={password} onChange={event => setPassword(event.target.value)}/>
        </label>
        <button className="btn" type='button' onClick={registration}>Зарегистрироваться</button>
      </form>
    </div>
  </section>
  )
}
