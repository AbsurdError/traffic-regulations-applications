import React from 'react'
import logo from '../assets/img/car1.png'
import { Link } from 'react-router-dom'
export default function Header({isAdmin, isAuth, token, setIsAdmin, setIsAuth, setToken}) {
    function logout(){
        fetch('http://127.0.0.1:8000/api-copp/logout', {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
            }
        })
        setIsAdmin(false)
        setIsAuth(false)
        setToken('')
    }
  return (
    <header className='header'>
        <div className="header__wrap">
            <div className="header__logotip">
                <Link className="header__logo" to='/'>
                    <img src={logo} alt="logo" className="logo" />
                </Link>
                <h1 className="header__title">Нарушениям.Нет</h1>
            </div>
            <nav className="header__menu">
                <ul className="menu__items">
                    {isAuth ? <>
                        {isAdmin ? <>
                            <Link className="header__item" to='/admin'>Панель администратора</Link>
                            <Link className="header__item" to='/' onClick={logout}>Выход из системы</Link>
                        </>:<>
                            <Link className="header__item" to='/apps'>Мои заявки</Link>
                            <Link className="header__item" to='/create'>Создание заявки</Link>
                            <Link className="header__item" to='/' onClick={logout}>Выход из системы</Link>
                        </>}
                    </>:<>
                        <Link className="header__item" to='/'>Каталог заявок</Link>
                        <Link className="header__item" to='/reg'>Регистрация</Link>
                        <Link className="header__item" to='/login'>Вход в систему</Link>
                    </>}
                </ul>
            </nav>
        </div>
    </header>
  )
}
