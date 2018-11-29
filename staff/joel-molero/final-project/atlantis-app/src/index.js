import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './containers/HomePage'
import Room from './containers/RoomPage'
import NotFound from './components/NotFound'
import styles from './app.css'
import Chat from './containers/ChatContainer'
import App from './App.js'



ReactDOM.render(<Provider store={store}><HashRouter><App /></HashRouter></Provider>, document.getElementById('root'));


// render(
// 	<Provider store={store}>
// 		<HashRouter>
// 			<Switch>
// 				<Route exact path="/" component={Home} />
// 				<Route path="/chat" component={Chat} />
// 				<Route path="/r/:room" component={Room} />
// 				<Route path="*" component={NotFound} />
// 			</Switch>
// 		</HashRouter>
// 	</Provider>,
// 	document.getElementById('app')
	
// );
