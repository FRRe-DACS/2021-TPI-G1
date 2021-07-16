import axios from 'axios';

const url = 'https://cli-serv-grupo1.herokuapp.com/api/auth';
// const url = 'http://localhost:4000/api/auth';

export const login = async (user) => {
	const endpoint = `${url}/login`;
	try {
		const { data } = await axios({
			url: endpoint,
			method: 'POST',
			data: user,
		});
		return data;
	} catch (error) {
		return { success: false, error };
	}
};

export const register = async (user) => {
	const endpoint = `${url}/register`;
	try {
		const { data } = await axios({
			url: endpoint,
			method: 'POST',
			data: user,
		});
		console.log('hola data', data);
		return data;
	} catch (error) {
		return { success: false, error };
	}
};
