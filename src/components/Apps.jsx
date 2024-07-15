import React, {useState, useEffect} from 'react'

export default function Apps({token}) {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api-copp/applications', {
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
      }
  })
    .then(data => data.json())
    .then(info => setApps(info.data))
  }, [])
  function deleteApp(id){
    fetch(`http://127.0.0.1:8000/api-copp/application/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
      }
    })
    setApps(apps.filter(app => app.id !== id))
  }

  const printApps = apps.map(app => {
    return(
      <div className="card__app" key={app.id}>
        <div className="section__card">
          <p className="card__title">Пострадавший</p>
          <p className="cart__content">{app.name}</p>
        </div>
        <div className="section__card">
          <p className="card__title">Номер автомобиля</p>
          <p className="cart__content">{app.auto_num}</p>
        </div>
        <div className="section__cards">
          <p className="card__title">Описание проишествия</p>
          <p className="cart__desc">{app.description}</p>
        </div>
        <p className="card__status">{app.status}</p>
        <button className="btn cn" onClick={() => deleteApp(app.id)}>Удалить</button>
      </div>
    )
  })
  return (
    <section className="section">
    <div className="section__wrap">
      <h1 className="setction__title">Мои заявки</h1>
      <div className="apps">
        {printApps}
      </div>
    </div>
  </section>
  )
}
