import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
export default function Login({setIsAdmin, setIsAuth, setToken}) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const navigate = useNavigate()

  function log_in(event){
    event.preventDefault()
    fetch('http://127.0.0.1:8000/api-copp/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'
      },
      body: JSON.stringify({login, password})
  })
  .then(data => data.json())
  .then(info => {
    if(info.data){
      setIsAdmin(info.data.isAdmin)
      setIsAuth(true)
      setToken(info.data.user_token)
      if(info.data.isAdmin){
        navigate('/admin')
      } else {
        navigate('/apps')
      }
    } else {
      setError(info.error.errors)
    }
  })
  }
  return (
    <section className="section">
      <div className="section__wraps">
        <h1 className="setction__title">Вход в систему</h1>
        <form action="form" className="form__section">
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
          <button className="btn" type='button' onClick={log_in}>Войти</button>
        </form>
      </div>
    </section>
  )
}
