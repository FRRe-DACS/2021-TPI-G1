import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../api/auth';
import {
	LoginContainer,
	LoginForm,
	FormButton,
	FormElement,
	FormInput,
	FormLabel,
} from './styles';
import CustomError from '../../components/custom-error';

const Login = () => {
	const history = useHistory();
	const [user, setUser] = useState({ email: '', password: '' });
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (token) {
			history.push('/');
		}
	}, []);

	const onLogin = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		const data = await login(user);
		setIsLoading(false);
		if (!data.success) {
			return setError(true);
		}
		const { token, role } = data;
		if (role === 'admin' || role === 'secretaria') {
			sessionStorage.setItem('token', token);
			history.push('/');
		} else {
			setError(true);
		}
	};

	const onInputChange = ({ target = {} }) => {
		const key = target.name;
		const value = target.value;
		setUser({ ...user, [key]: value });
	};

	return (
		<LoginContainer>
			<LoginForm onSubmit={onLogin}>
				<h3>Ingresa a tu cuenta</h3>
				<FormElement>
					<FormLabel>Correo Electrónico</FormLabel>
					<FormInput
						name='email'
						type='email'
						onChange={onInputChange}></FormInput>
				</FormElement>
				<FormElement>
					<FormLabel>Contraseña</FormLabel>
					<FormInput
						name='password'
						type='password'
						required
						onChange={onInputChange}></FormInput>
				</FormElement>
				<FormButton type='submit'>Ingresar</FormButton>
				{error && (
					<CustomError message='Ocurrio un error. Por favor intentalo nuevamente.' />
				)}
				{isLoading && 'Cargando...'}
				<h3 className='register'>¿No tenés cuenta?</h3>
				<FormButton onClick={() => history.push('/register')}>
					Registrarse
				</FormButton>
			</LoginForm>
		</LoginContainer>
	);
};

export default Login;
