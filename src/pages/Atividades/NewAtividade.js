import React, {useEffect, useState} from "react";
import {
    Redirect,
    Link
} from "react-router-dom";
import moment from "moment";

import * as services from '../../services/service';

import './Atividade.css';
import '../../App.css'

const defaultState = {documentoPDF:'', dataParaEntrega:'', pontos:'', errorMessage:''}

function NewAtividade({onCreateAtividade}) {
    const [atividades, setAtividade] = useState([]);
    const [logged, setLogged] = useState(true);
    const [user, setUser] = useState(null);
    const [form, setForm] = useState(defaultState);
    
    const getUser = () => {
        if(!localStorage.getItem("user")){
            setLogged(false)
        } else {
            var data = JSON.parse(localStorage.getItem("user"))
            setUser(data)
            getAtividades(data.user)
        }
    }
    const getAtividades = (user) => {
        services.fetchAtividades().then((res) => {
            setAtividade(res.data)
        }).catch((err) => console.log(err))
    }
    const newAtividade = () => {
        services.newAtividade(form).then((res) => {
            setForm(defaultState)
            onCreateAtividade()
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
                <h2>Nova atividade</h2>
                {/* {errorMessage !== '' && message(errorMessage)} */}
                <form>
                    <div className="input wrapper">
                        <input
                            type="text"
                            name="documentoPDF"
                            id="cadastro-documentoPDF"
                            value={form.documentoPDF}
                            onChange={(e) => setForm({...form, documentoPDF:e.target.value})}
                            required
                        />
                        <label htmlFor="cadastro-documentoPDF">Url da atividade</label>
                    </div>
                    <div  className="input wrapper">
                    <input
                        type="text"
                        name="dataParaEntrega"
                        id="cadastro-dataParaEntrega"
                        value={form.dataParaEntrega}
                        onChange={(e) => setForm({...form, dataParaEntrega:e.target.value})}
                        required
                    />
                    <label htmlFor="cadastro-dataParaEntrega">Data de entrega</label>	
                    </div>
                    <div  className="input wrapper">
                    <input
                        type="text"
                        name="pontos"
                        id="cadastro-pontos"
                        value={form.pontos}
                        onChange={(e) => setForm({...form, pontos:e.target.value})}
                        required
                    />
                    <label htmlFor="cadastro-pontos">Pontos</label>	
                    </div>                    					
                </form>

                <button className={'primary-button'} 
                        style={{opacity: form.documentoPDF == '' || form.dataParaEntrega == '' || form.pontos == '' ? 0.5 : 1}}
                        disabled={form.documentoPDF == '' || form.dataParaEntrega == '' || form.pontos == ''}
                        onClick={() => newAtividade()}>
                    Adicionar
                </button>
            </div>
            </section> 
    </>
  );
}

export default NewAtividade;