import React, {useState} from 'react';
import '../App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from '../pages/Login/Login';

function HeaderComponent({history, user}) {
  const [navOpen, setNavOpen] = useState(false);

  const signout = () => {
    localStorage.removeItem("user")
    history.push('/login');
  }
  return (
        <header>
        <h1>
            Canal do <strong>Professor</strong>
        </h1>
        <div class="menu-button" onClick={() => setNavOpen(true)}>
          <i class="fa fa-bars"></i>
        </div>  
        {
          navOpen && <nav>
            <div className="menu-close" onClick={() => setNavOpen(false)}>
              <i className="fa fa-times"></i>
            </div>
            <ul id="menu-items">
              <li>
                <h3>{user.nomeCompleto}</h3>
                <h5>{user.formacao}</h5>
              </li>
              <li>
                <Link to="/">
                  <i className="fa fa-tasks fa-fw"></i>
                  Turmas</Link>
              </li>     
              <li>
                <Link to="/">
                  <i className="fa fa-pencil fa-fw"></i>
                  Atividades</Link>
              </li>  
              <li>
                <Link to="/">
                  <i className="fa fa-calendar fa-fw"></i>
                  Calendário</Link>
              </li>                                           
              <li onClick={() => signout()}>
                  <i className="fa fa-sign-out fa-fw"></i>
                  Sair
              </li>              
            </ul>
          </nav>          
        }      
        </header>     
  );
}

export default HeaderComponent;