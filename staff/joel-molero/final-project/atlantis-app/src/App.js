import React, { Component } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import Home from './containers/HomePage'
import Chat from './containers/ChatContainer'
import Room from './containers/RoomPage'
import Landing from './components/Landing'
import logic from './logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

logic.url = 'http://127.0.0.1:5060/api'

class App extends Component {
    state = { error: null }

    handleRegisterClick = () => this.props.history.push('/register')

    handleLoginClick = () => this.props.history.push('/login')

    handleRegister = (username, password) => {
        try {
            logic.registerUser(username, password)
                .then(() => {
                    this.setState({ error: null }, () => this.props.history.push('/login'))
                })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleLogin = (username, password) => {
        try {
            logic.login(username, password)
                .then(() =>  this.props.history.push('/home'))
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleLogoutClick = () => {
        logic.logout()

        this.props.history.push('/')
    }

    handleGoBack = () => this.props.history.push('/')

    render() {
        const { error } = this.state

        return <div>
            <Route exact path="/" render={() => !logic.loggedIn ? <Landing onRegisterClick={this.handleRegisterClick} onLoginClick={this.handleLoginClick} /> : <Redirect to="/home" />} />
            <Route path="/register" render={() => !logic.loggedIn ? <Register onRegister={this.handleRegister} onGoBack={this.handleGoBack} /> : <Redirect to="/home" />} />
            <Route path="/login" render={() => !logic.loggedIn ? <Login onLogin={this.handleLogin} onGoBack={this.handleGoBack} /> : <Redirect to="/home" />} />
            
            <Route path="/home" render={() => logic.loggedIn ? <div>
                <section><button onClick={this.handleLogoutClick}>Logout</button></section>
                <Home />
            </div> : <Redirect to="/" />} />
            
			<Route path="/chat" render={() => logic.loggedIn ? <Chat /> : <Login />} />
			<Route path="/r/:room" render={() => logic.loggedIn ? <Room /> : <Login />} />
			
        </div>
    }
}

export default withRouter(App)
