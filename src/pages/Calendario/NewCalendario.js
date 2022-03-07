import React, {useEffect, useState} from "react";
import {
    Redirect,
    Link
} from "react-router-dom";
import moment from "moment";

import TabsComponent from '../../../../girafales-frontend/src/components/TabsComponent';
import HeaderComponent from '../../../../girafales-frontend/src/components/HeaderComponent';
import * as services from '../../../../girafales-frontend/src/services/service';

import './Calendario.css';
import '../../App.css'

const defaultState = {evento:'', data:'', errorMessage:''}

function NewCalendario({onCreateEvent}) {
    const [logged, setLogged] = useState(true);
    const [user, setUser] = useState(null);
    const [form, setForm] = useState(defaultState);
    
    const getUser = () => {
        if(!localStorage.getItem("user")){
            setLogged(false)
        } else {
            var data = JSON.parse(localStorage.getItem("user"))
            setUser(data)
        }
    }
    const newEvent = () => {
        services.newCalendarItem(form).then((res) => {
            setForm(defaultState)
            onCreateEvent()
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
        <section className="form">
            <div className="atividade-form">
                <h2>Novo Evento</h2>
                {/* {errorMessage !== '' && message(errorMessage)} */}
                <form>
                    <div className="input wrapper">
                        <input
                            type="text"
                            name="evento"
                            id="cadastro-evento"
                            value={form.evento}
                            onChange={(e) => setForm({...form, evento:e.target.value})}
                            required
                        />
                        <label htmlFor="cadastro-evento">Título</label>
                    </div>
                    <div  className="input wrapper">
                    <input
                        type="text"
                        name="data"
                        id="cadastro-data"
                        value={form.data}
                        onChange={(e) => setForm({...form, data:e.target.value})}
                        required
                    />
                    <label htmlFor="cadastro-data">Data</label>	
                    </div>                   					
                </form>

                <button className={'primary-button'} 
                        style={{opacity: form.evento == '' || form.data == '' ? 0.5 : 1}}
                        disabled={form.evento == '' || form.data == ''}
                        onClick={() => newEvent()}>
                    Adicionar
                </button>
            </div>
            </section> 
    </>
  );
}

export default NewCalendario;