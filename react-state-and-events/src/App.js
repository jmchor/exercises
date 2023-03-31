// App.js

import './App.css';
import { useState } from 'react';
import Counter from './components/Counter';

function App() {
	const [theme, setTheme] = useState('light');

	const toggleTheme = (e) => {
		setTheme(e.target.value);
	};

	return (
		<div className={'App ' + theme}>
			<h1>React - state and events</h1>

			<Counter />

			<select onChange={toggleTheme}>
				<option value='light'> Light </option>
				<option value='dark'> Dark </option>
			</select>
		</div>
	);
}

export default App;
