import React, { Component } from 'react'
import logo from './logo2.png'
import './App.css'
import MoviesList from './MoviesList'
import MovieDetail from './MovieDetail'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link
} from 'react-router-dom'


const App = () => (
	<Router>
		<div className="App">
			<header className="App-header">
				<Link to='/' >
					<img src={logo} className="App-logo" alt="logo" />
				</Link>

			</header>
			<Switch>
				<Route exact path='/' component={MoviesList} />
				/* :param */
				<Route path='/:id' component={MovieDetail} />
			</Switch>
		</div>
	</Router>
)


export default App
