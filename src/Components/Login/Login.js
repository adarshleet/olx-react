import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [error,setError] = useState('')

	const navigate = useNavigate()

	const handleLogin = async(event) => {
		event.preventDefault()
		try {
			const auth = getAuth();
			await signInWithEmailAndPassword(auth, email, password)
			navigate('/')
		} catch (error) {
			const errorMessage = error.message;
			setError(errorMessage)
			console.log(errorMessage)
		}
	}

	return (
		<div>
			<div className="loginParentDiv">
				<img width="200px" height="200px" src={Logo} alt='OLX'></img>
				<form onSubmit={handleLogin}>
					<label htmlFor="fname">Email</label>
					<br />
					<input className="input" type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
					<br />
					<label htmlFor="lname">Password</label>
					<br />
					<input className="input" type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
					<br />
					<br />
					{error && <p>Invalid Email Or Password</p>}
					<button>Login</button>
				</form>
				<a href='/signup'>Signup</a>
			</div>
		</div>
	);
}

export default Login;
