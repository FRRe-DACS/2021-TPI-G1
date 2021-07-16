import axios from 'axios';

const url = 'https://cli-serv-grupo1.herokuapp.com/api/auth';
// const url = 'http://localhost:4000/api/business';

export const getBusiness = async () => {
	const endpoint = `${url}/`;
	const token = sessionStorage.getItem('token');
	try {
		const { data } = await axios({
			url: endpoint,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	} catch (error) {
		return { success: false, error };
	}
};

export const getBusinessById = async (id) => {
	const endpoint = `${url}/${id}`;
	const token = sessionStorage.getItem('token');
	try {
		const { data } = await axios({
			url: endpoint,
			method: 'POST',
			data: id,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	} catch (error) {
		return { success: false, error };
	}
};
