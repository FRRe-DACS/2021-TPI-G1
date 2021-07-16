import styled from 'styled-components';

export const LoginContainer = styled.div`
	width: 100vw;
	display: flex;
	justify-content: center;
`;

export const LoginForm = styled.form`
	width: 100%;
	max-width: 460px;

	h3 {
		font-weight: bold;
	}

	h3.register {
		margin-bottom: 0;
	}

	@media screen and (min-width: 426px) {
		width: 75%;
	}
	@media screen and (min-width: 769px) {
		width: 60%;
	}
	@media screen and (min-width: 1026px) {
		width: ;
	}
`;

export const FormElement = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 15px;
`;

export const FormLabel = styled.label`
	font-size: 14px;
	font-weight: 400;
`;

export const FormInput = styled.input`
	margin-top: 5px;
`;

export const FormButton = styled.button`
	margin: 15px 0;
`;
