import axios from 'axios';
const baseURL = 'https://cli-serv-grupo1.herokuapp.com';

const axiosInstance = axios.create({
	baseURL,
	headers: {
		Authorization: `Bearer `,
	},
});

class HttpClient {
	instance() {}
}

export default axiosInstance;
