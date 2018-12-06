import React, {Component} from 'react'

class Login extends Component {
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

        this.props.onLogin(username, password)
    }

    render() {
        return <div className="auth-wrapper">
                    <h1>Login</h1>
                    <form className="auth-form" onSubmit={this.handleSubmit}>
                        <input type="text" className="login-username" placeholder="Username" onChange={this.handleUsernameChange} />
                        <input type="password" className="login-password" placeholder="Password" onChange={this.handlePasswordChange} />
                        {/* <button type="submit">Login</button> <a href="/#/">back</a> */}
                        <button type="submit" className="auth-button">Login</button> <a href="#" className="go-back" onClick={this.props.onGoBack}>Back</a>
                    </form>
                </div>
    }
}

export default Login