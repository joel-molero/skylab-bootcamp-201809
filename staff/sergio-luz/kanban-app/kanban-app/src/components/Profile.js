import React, { Component } from 'react'
import logic from '../logic'
import Error from './Error'


class Profile extends Component {
    state = {
        name: null,
        surname: null,
        username: null,
        newPassword: null,
        repeatPassword: null,
        password: null,
        error: ""
    }

    handleNameChange = event => {
        const name = event.target.value

        this.setState({ name })
    }

    handleSurnmeChange = event => {
        const surname = event.target.value

        this.setState({ surname })
    }

    handleUsernameChange = event => {
        const username = event.target.value

        this.setState({ username })
    }

    handleNewPasswordChange = event => {
        const newPassword = event.target.value

        this.setState({ newPassword })
    }

    handleRepeatPassword = event => {
        const repeatPassword = event.target.value

        this.setState({ repeatPassword })
    }

    handlePassword = event => {
        const password = event.target.value

        this.setState({ password })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { name, surname, username, newPassword, repeatPassword, password } = this.state

        logic.modifyProfile(name, surname, username, newPassword, repeatPassword, password)
            .then(() => {
                this.setState({ error: "" })
                // this.props.history.push('/postits')
            })
            .catch(err => {
                this.setState({ error: err.message })
            })
    }

    render() {
        const { error } = this.state

        return <div className='profile__body'>
            <h1>Profile <i className="fas fa-sticky-note"></i></h1>
            <form onSubmit={this.handleSubmit} className='profile__options'>
                <label className='input--white' >Name:</label>
                <input className='input--white'  type="text" name="name" placeholder="name" onChange={this.handleNameChange}></input>

                <label className='input--white' >Surname:</label>
                <input className='input--white'  type="text" name="surname" placeholder="surname" onChange={this.handleSurnmeChange}></input>

                <label className='input--white' >Username:</label>
                <input className='input--white'  type="text" name="username" placeholder="username" onChange={this.handleUsernameChange}></input>

                <label className='input--white' >New Password:</label>
                <input className='input--white'  type="password" name="newPassword" placeholder="new password" onChange={this.handleNewPasswordChange}></input>

                <label className='input--white' >Repeat new Password:</label>
                <input className='input--white'  type="password" name="repeatPassword" placeholder="repeat new password" onChange={this.handleRepeatPassword}></input>

                <label className='input--white' >Password (required to save changes):</label>
                <input className='input--white'  type="password" name="password" placeholder="password" onChange={this.handlePassword}></input>

                <button className='button button--green' type="submit">Save changes</button>
            </form>

            <a href="#" onClick={this.props.onGoBack}>back</a>

            {error && <Error message={error} />}


        </div>
    }
}

export default Profile
