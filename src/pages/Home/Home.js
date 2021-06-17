import React, {useEffect, useState} from "react";
import './Home.css';
import '../../App.css'
import TabsComponent from '../../components/TabsComponent';
import HeaderComponent from '../../components/HeaderComponent';
import * as services from '../../services/service';
import {
    Redirect
} from "react-router-dom";
import moment from "moment";

function Home({history}) {
    const [turmas, setTurmas] = useState([]);
    const [logged, setLogged] = useState(true);
    const [user, setUser] = useState(null);

    
    const getUser = () => {
        if(!localStorage.getItem("user")){
            setLogged(false)
        } else {
            var data = JSON.parse(localStorage.getItem("user"))
            setUser(data)
            getTurmas(data.user)
        }
    }
    const getTurmas = (user) => {
        services.fetchTurmas(user).then((res) => {
            setTurmas(res.data)
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
        <HeaderComponent user={user} history={history}/>
        <main>
        <section className="content-header">
            <h2>Bem vindo, {user.nomeCompleto}</h2>
            <p className="subtitle hora">{moment().format('DD/MM/YY')}</p>
        </section>
        <section className="listas-turmas">
            <h3>Turmas</h3>
            <div>
                <section className="turno-manha">
                    <h4>Manhã</h4>
                    <ul>
                    {turmas.filter((item) => item.turno == 'Manhã').map((item) => {
                         return <li className="turma">
                            <a href="dashboard.html">
                                <ul>
                                    <li>
                                        <span className="serie">{item.serie}</span>
                                    </li>
                                    <li><span className="colegio">{item.escolaName}</span></li>
                                </ul>
                            </a>
                        </li>                        
                    })}                    
                    </ul>
                    {!turmas.filter((item) => item.turno == 'Manhã').length && <span className="colegio">Sem turmas no momento</span>}
                </section>
                <section className="turno tarde">
                    <h4>Tarde</h4>
                    <ul>
                        {turmas.filter((item) => item.turno == 'Tarde').map((item) => {
                            return <li className="turma">
                                <a href="dashboard.html">
                                    <ul>
                                        <li>
                                            <span className="serie">{item.serie}</span>
                                        </li>
                                        <li><span className="colegio">{item.escolaName}</span></li>
                                    </ul>
                                </a>
                            </li>                        
                        })}                          
                    </ul>
                    {!turmas.filter((item) => item.turno == 'Tarde').length && <span className="colegio">Sem turmas no momento</span>}
                </section>
            </div>
        </section>
        </main>
        {/* <TabsComponent/> */}
    </>
  );
}

export default Home;