import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes';
import Header from './components/header';

const App = () => {
	return (
		<Router className='App'>
			<Header />
			<AppRoutes />
		</Router>
	);
};

export default App;
