import React, { Component } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import Home from './containers/HomePage'
import Chat from './components/Chat'
import Room from './containers/RoomPage'
import Landing from './components/Landing'
import logic from './logic'
import { Route, withRouter, Redirect } from 'react-router-dom'




logic.url = process.env.REACT_APP_API_URL

class App extends Component {
    state = { error: null }


    componentDidMount() {

        this.refreshMessages()
    }

    refreshMessages() {
        logic.listMessages()
            .then(res => this.setState({ error: null, messages: res }))
            .catch(err => this.setState({ error: err.message }))
    }

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
                .then(() => this.props.history.push('/home'))
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

    handleAddMessage = message => {
        try {
            logic.addMessage(message)
                .then(() => logic.listMessages())
                .then(messages => this.setState({ error: null, messages }))
                .catch(({ message }) => this.setState({ error: message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    render() {
        const { error } = this.state

        return <div>
            <Route exact path="/" render={() => !logic.loggedIn ? <Landing onRegisterClick={this.handleRegisterClick} onLoginClick={this.handleLoginClick} /> : <Redirect to="/home" />} />
            <Route path="/register" render={() => !logic.loggedIn ? <Register onRegister={this.handleRegister} onGoBack={this.handleGoBack} /> : <Redirect to="/home" />} />
            <Route path="/login" render={() => !logic.loggedIn ? <Login onLogin={this.handleLogin} onGoBack={this.handleGoBack} /> : <Redirect to="/home" />} />

            <Route path="/home" render={() => logic.loggedIn ? <div>
                <section className="logout-section"><button className="logout-button" onClick={this.handleLogoutClick}>Logout</button></section>
                <Home />
            </div> : <Redirect to="/" />} />

            <Route path="/chat" render={() => <Chat onAddMessage={this.handleAddMessage} messages={this.state.messages} />} />
            <Route path="/r/:room" component={Room} />

        </div>
    }
}

export default withRouter(App)
