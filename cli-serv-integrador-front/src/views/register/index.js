import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../../api/auth';
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
	const [user, setUser] = useState({ email: '', password: '', name: '' });
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (token) {
			history.push('/');
		}
	}, []);

	const onRegister = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		const data = await register(user);
		setIsLoading(false);
		if (!data.success) {
			return setError(true);
		}
		const { token } = data;
		sessionStorage.setItem('token', token);
		history.push('/');
	};

	const onInputChange = ({ target = {} }) => {
		const key = target.name;
		const value = target.value;
		setUser({ ...user, [key]: value });
	};

	return (
		<LoginContainer>
			<LoginForm onSubmit={onRegister}>
				<h3>Registrate</h3>
				<FormElement>
					<FormLabel>Nombre Empresa</FormLabel>
					<FormInput
						name='businessName'
						type='text'
						onChange={onInputChange}></FormInput>
				</FormElement>
				<FormElement>
					<FormLabel>CUIT</FormLabel>
					<FormInput
						name='cuit'
						type='text'
						onChange={onInputChange}></FormInput>
				</FormElement>
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
				<FormButton type='submit'>Crear Cuenta</FormButton>
				{error && (
					<CustomError message='Ocurrio un error. Por favor intentalo nuevamente.' />
				)}
				{isLoading && 'Cargando...'}
				<FormButton onClick={() => history.push('/login')}>Volver</FormButton>
			</LoginForm>
		</LoginContainer>
	);
};

export default Login;
