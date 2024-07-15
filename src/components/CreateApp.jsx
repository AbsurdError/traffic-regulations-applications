import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateApp({token}) {
  const [name, setName] = useState('');
  const [auto_num, setAuto_num] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState({});
  const navigate = useNavigate()

  function addedApp(event){
    event.preventDefault()
    fetch('http://127.0.0.1:8000/api-copp/application', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({name, auto_num, description})
  })
  .then(data => data.json())
  .then(info => {
    if(info.data){
      navigate('/apps')
    } else {
      setError(info.error.errors)
    }
  })
  }
  return (
    <section className="section">
      <div className="section__wraps">
        <h1 className="setction__title">Овормление заявки</h1>
        <form action="form" className="form__section">
          <label htmlFor="1" className="form__label">
            Имя пострадавшего:
            <p className="error">{error.name?.[0]}</p>
            <input type="text" className={`form__input ${error.name?.[0] ? 'input__error' : ''}`} placeholder='пострадавший' value={name} onChange={event => setName(event.target.value)}/>
          </label>
          <label htmlFor="1" className="form__label">
            Номер автомобиля:
            <p className="error">{error.auto_num?.[0]}</p>
            <input type="text" className={`form__input ${error.auto_num?.[0] ? 'input__error' : ''}`} placeholder='A000AA00' value={auto_num} onChange={event => setAuto_num(event.target.value)}/>
          </label>
          <label htmlFor="1" className="form__label">
            Описание проишествия:
            <p className="error">{error.description?.[0]}</p>
            <textarea type="text" className={`form__input ${error.description?.[0] ? 'input__error' : ''}`} placeholder='...' value={description} onChange={event => setDescription(event.target.value)}/>
          </label>
          <button className="btn" type='button' onClick={addedApp}>Оформить</button>
        </form>
      </div>
    </section>
  )
}
