import React, { Component } from 'react'

class Register extends Component {
    state = { username: '', password: '' }

    handleUsernameChange = event => {
        const username = event.target.value

        this.setState({ username })
    }

    handlePasswordChange = event => {
        const password = event.target.value

        this.setState({ password })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { username, password } = this.state

        this.props.onRegister(username, password)
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Username" onChange={this.handleUsernameChange} />
            <input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
            <button type="submit">Register</button> <a href="#" onClick={this.props.onGoBack}>back</a>
        </form>
    }
}

export default Register