import React, {useEffect, useState} from "react";
import {
    Redirect,
    Link
} from "react-router-dom";
import moment from "moment";

import TabsComponent from '../../components/TabsComponent';
import HeaderComponent from '../../components/HeaderComponent';
import NewAtividade from './NewAtividade';

import * as services from '../../services/service';

import './Atividade.css';
// import '../../App.css'


function Atividades({history}) {
    const [atividades, setAtividade] = useState([]);
    const [logged, setLogged] = useState(true);
    const [user, setUser] = useState(null);

    
    const getUser = () => {
        if(!localStorage.getItem("user")){
            setLogged(false)
        } else {
            var data = JSON.parse(localStorage.getItem("user"))
            setUser(data)
            getAtividades(data.user)
        }
    }
    const getAtividades = () => {
        services.fetchAtividades().then((res) => {
            setAtividade(res.data)
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
        <NewAtividade onCreateAtividade={() => getAtividades()}/>      
        <section>
            <h2>Atividades</h2>
            <p className="subtitle hora">{moment().format('DD/MM/YY')}</p>
            <div className="task-content">
            {atividades.map((item) => {
                return <div className="atividade">
                    <ul>
                        <li>
                            <span className="serie"><strong>Entrega:</strong> {item.dataParaEntrega}</span>
                        </li>
                        <li>
                            <span className="serie"><strong>PDF:</strong> <a href={item.documentoPDF} target='_blank'>Clique para ver a atividade</a></span>
                        </li>
                        <li>
                            <span className="serie"><strong>Pontos:</strong> {item.pontos}</span>
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

export default Atividades;