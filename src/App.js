import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import './App.css';
import AddData from './components/AddData/AddData';
import ListData from './components/ListData/ListData';
import { setPassword } from './redux/slices/passwordManagerSlice';

function App() {
	const dispatch = useDispatch();

	React.useEffect(() => {
		axios.get('https://630f7dc23792563418911561.mockapi.io/password-manager').then((resp) => {
			dispatch(setPassword(resp.data));
		});
	}, []);

	return (
		<div className="App">
			<AddData />
			<ListData />
		</div>
	);
}

export default App;
