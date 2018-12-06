import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store';
import { HashRouter } from 'react-router-dom';
import styles from './app.css'
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
