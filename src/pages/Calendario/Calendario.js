import React, {useEffect, useState} from "react";
import {
    Redirect,
    Link
} from "react-router-dom";
import moment from "moment";

import TabsComponent from '../../components/TabsComponent';
import HeaderComponent from '../../components/HeaderComponent';
import NewCalendario from './NewCalendario';

import * as services from '../../services/service';


function Calendario({history}) {
    const [events, setEvents] = useState([]);
    const [logged, setLogged] = useState(true);
    const [user, setUser] = useState(null);

    
    const getUser = () => {
        if(!localStorage.getItem("user")){
            setLogged(false)
        } else {
            var data = JSON.parse(localStorage.getItem("user"))
            setUser(data)
            getEvents()
        }
    }
    const getEvents = () => {
        services.fetchEvents().then((res) => {
            setEvents(res.data)
        }).catch((err) => console.log(err))
    }
    useEffect(() => {
        getUser()
    }, []);

  if (!logged) {
    return <Redirect to="/login" />;
  }
  return (
      user &&
      <>
        <HeaderComponent user={user} history={history} handleClick={(page) => history.push(page)}/>
        <main>
        <NewCalendario onCreateEvent={() => getEvents()}/>
        <section>
            <h2>Calendário</h2>
            <p className="subtitle hora">{moment().format('DD/MM/YY')}</p>
            <div className="task-content">
            {events.map((item) => {
                return <div className="atividade">
                    <ul>
                        <li>
                            <span className="serie">{item.evento}</span>
                        </li>
                        <li>
                            <span className="serie">{item.data}</span>
                        </li>                                                                
                    </ul>
                </div>                        
            })}         
            </div>                 
        </section>        
        </main>
    </>
  );
}

export default Calendario;