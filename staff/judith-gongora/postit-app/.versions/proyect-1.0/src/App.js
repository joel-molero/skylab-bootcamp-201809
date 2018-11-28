import React, { Component } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import AddPost from './components/AddPost'
import Home from './components/Home'
import Error from './components/Error'
import Landing from './components/Landing'
import logic from './logic'
import { Route, withRouter, Redirect } from 'react-router-dom'


class App extends Component {
    state = { error: null, post : false, profile: false }

    handleRegisterClick = () => this.props.history.push('/register')

    handleLoginClick = () => this.props.history.push('/login')

    handleRegister = (name, surname, username, password) => {
        try {
            logic.registerUser(name, surname, username, password)
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
                .then(() =>  {
                    this.setState({error : null}, () => this.props.history.push('/home'))
                } )
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handlePost = () =>{
        debugger
        this.props.history.push('/addpost')
        this.setState({post: true})
    }

    handleAddPost = (url, text) =>{
        logic.createPost(url, text)
    }

    handleLogoutClick = () => {
        logic.logout()

        this.props.history.push('/')
    }

    handleGoBack = () => this.props.history.push('/')
    handleGoBack2 = () => {
        this.props.history.push('/home')
        this.setState({post : false, profile: false})
    }

    render() {
        const { error, post, profile } = this.state

        return <div>
            <Route exact path="/" render={() => !logic.loggedIn ? <Landing onRegisterClick={this.handleRegisterClick} onLoginClick={this.handleLoginClick} /> : <Redirect to="/home" />} />
            <Route path="/register" render={() => !logic.loggedIn ? <Register onRegister={this.handleRegister} onGoBack={this.handleGoBack} /> : <Redirect to="/home" />} />
            <Route path="/login" render={() => !logic.loggedIn ? <Login onLogin={this.handleLogin} onGoBack={this.handleGoBack} /> : <Redirect to="/home" />} />
            {error && <Error message={error} />}
            {logic.loggedIn && <section><button onClick={this.handleLogoutClick}>Logout</button></section>}
            <Route path="/home" render={() => logic.loggedIn && !post && !profile ? <Home onPost={this.handlePost} onProfile={this.handleProfile} onGoBack={this.handleGoBack}/> : <Redirect to="/" />} />
            <Route path="/addpost" render={() => logic.loggedIn && post && !profile ? <AddPost onPost={this.handleAddPost} onGoBack={this.handleGoBack2}/> : <Redirect to="/home" />} />
            <Route path="/profile" render={() =>!logic.loggedIn && profile && !post? <Profile onGoBack={this.handleGoBack2}/> : <Redirect to="/home" />} />
        </div>
    }
}

export default withRouter(App)
