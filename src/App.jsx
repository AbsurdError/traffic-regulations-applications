import './assets/css/style.css'
import './App.css';
import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Apps from './components/Apps';
import CreateApp from './components/CreateApp';
import Registration from './components/Registration';
import Login from './components/Login';
import Admin from './components/Admin';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [token, setToken] = useState('');
  return (
    <>
     <Header isAdmin={isAdmin} isAuth={isAuth} token={token} setIsAdmin={setIsAdmin} setIsAuth={setIsAuth} setToken={setToken}/>
     <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/apps' element={<Apps token={token}/>}/>
      <Route path='/create' element={<CreateApp token={token}/>}/>
      <Route path='/reg' element={<Registration/>}/>
      <Route path='/login' element={<Login setIsAdmin={setIsAdmin} setIsAuth={setIsAuth} setToken={setToken}/>}/>
      <Route path='/admin' element={<Admin token={token}/>}/>
     </Routes>
     <Footer/>
    </>
  );
}

export default App;
