import React, { Component } from 'react'

class Chat extends Component {
    state = { message: '', messages: [] }

    handleMessageChange = event => {
        const message = event.target.value

        this.setState({ message })
    }

    handleSubmitMessage = event => {
        event.preventDefault()

        const messages = this.state.messages.slice(0)

        const message = this.state.message

        this.props.onAddMessage(message)

        messages.push(message)

        this.setState({ messages })
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmitMessage}>
                <input type="message" placeholder="Type your message here..." onChange={this.handleMessageChange} />
                <button type="submit">Send</button> <a href="#" onClick={this.props.onGoBack}>back</a>
                {this.state.messages.map(message => <div>{message}</div>)}
            </form>
        </div>
    }
}

export default Chat