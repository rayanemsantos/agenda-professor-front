import React, { useState } from "react";
import '../Login/Login.css';
import '../../App.css'
import * as services from '../../services/service';

function Cadastro({history}) {
	const [form, setForm] = useState({
        nomeCompleto:'',
        email:'', 
        password:'', 
        formacao: '',
        dataNascimento:'',
        valid:true,
        errorMessage:''});
	const [errorMessage, setErroMessage] = useState('');

	const checkEmail = () => {
		services.signup(form).then((res) => {
			history.push('/login');
		}).catch((err) => {
			setErroMessage('Ops! Houve um problema ao realizar cadastro.')
		})
	}
	const message = (message) => {
		return <div className="message">
			<i className="fa fa-warning fa-fw"></i>
			<p>{message}</p>
			<i className="fa fa-close fa-fw" onClick={() => setErroMessage('')}></i>
		</div>
	}
	return (
			<main>
				<section className="form">
					<div className="login">
						<div className="text wrapper">
							<h2>Cadastro</h2>
							<p>Realize o seu cadastro e aguarde aprovação.</p>
						</div>
						{errorMessage !== '' && message(errorMessage)}
						<form>
                            <div  className="input wrapper">
								<input
									type="text"
									name="nomeCompleto"
									id="cadastro-nomeCompleto"
									value={form.nomeCompleto}
									onChange={(e) => setForm({...form, nomeCompleto:e.target.value})}
									required
								/>
								<label htmlFor="cadastro-nomeCompleto">Nome completo</label>
							</div>                            
							<div  className="input wrapper">
								<input
									type="email"
									name="email"
									id="cadastro-email"
									value={form.email}
									onChange={(e) => setForm({...form, email:e.target.value})}
									required
								/>
								<label htmlFor="cadastro-email">Email</label>
							</div>
							<div  className="input wrapper">
                                <input
                                    type="password"
                                    name="password"
                                    id="cadastro-password"
                                    value={form.password}
                                    onChange={(e) => setForm({...form, password:e.target.value})}
                                    required
                                />
                                <label htmlFor="cadastro-email">Senha</label>	
							</div>	
							<div  className="input wrapper">
                                <input
                                    type="text"
                                    name="formacao"
                                    id="cadastro-formacao"
                                    value={form.formacao}
                                    onChange={(e) => setForm({...form, formacao:e.target.value})}
                                    required
                                />
                                <label htmlFor="cadastro-formacao">Formação acadêmica</label>	
							</div>
							<div  className="input wrapper">
                                <input
                                    type="text"
                                    name="dataNascimento"
                                    id="cadastro-dataNascimento"
                                    value={form.dataNascimento}
                                    onChange={(e) => setForm({...form, dataNascimento:e.target.value})}
                                    required
                                />
                                <label htmlFor="cadastro-dataNascimento">Data nascimento</label>	
							</div>                            	                                                       				
						</form>

						<button className={'primary-button'} style={{opacity: form.email == '' && form.password == '' ? 0.5 : 1}} disabled={form.email == '' && form.password == ''} onClick={() => checkEmail()}>
							cadastrar
						</button>
					</div>
				</section>
			</main>    
	);
}

export default Cadastro;
