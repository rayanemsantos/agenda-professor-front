import React, { useState } from "react";
import './Login.css';
import '../../App.css'
import * as services from '../../services/service';

function Login({history}) {
	const [form, setForm] = useState({email:'', password:'', valid:true, errorMessage:''});
	const [errorMessage, setErroMessage] = useState('');

	const checkEmail = () => {
		services.login(form.email, form.password).then((res) => {
			localStorage.setItem('user',  JSON.stringify(res.data))
			history.push('/');
		}).catch((err) => {
			// console.log(err)
			setErroMessage('Email ou senha inválido.')
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
							<h2>Login</h2>
							<p>Faça login ou cadastre-se colocando seu email.</p>
						</div>
						{errorMessage !== '' && message(errorMessage)}
						<form>
							<div  className="input wrapper">
								<input
									type="email"
									name="email"
									id="cadastro-email"
									value={form.email}
									onChange={(e) => setForm({...form, email:e.target.value})}
									required
								/>
								<label htmlFor="cadastro-email">email</label>
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
							<label htmlFor="cadastro-email">password</label>	
							</div>					
						</form>

						<button className={'primary-button'} style={{opacity: form.email == '' && form.password == '' ? 0.5 : 1}} disabled={form.email == '' && form.password == ''} onClick={() => checkEmail()}>
							login
						</button>
					</div>
					<span className="no-account">Não tem conta?</span>
					<button id="google-btn" className="primary-button" type="submit" onClick={() => history.push('/cadastro')}>
						Cadastrar
					</button>
				</section>
			</main>    
	);
}

export default Login;
