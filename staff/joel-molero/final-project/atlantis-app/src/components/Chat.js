import React, { Component } from 'react'

class Chat extends Component {
    state = { message: '', messages: [] }

    handleMessageChange = event => {
        const message = event.target.value

        this.setState({ message })
    }

    handleSubmit = event => {
        event.preventDefault()

        const messages = this.state.messages

        const message = this.state.message

        this.props.onAddMessage(message)
        
        messages.push(message)

        this.setState({messages})
    }

    handleListMessage = () => {
        
        

        


    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <input type="message" placeholder="Type your message here..." onChange={this.handleMessageChange} />
            <button type="submit">Send</button> <a href="#" onClick={this.props.onGoBack}>back</a>
            <button onClick={this.handleListMessage}>Retrieve messages</button>
            {this.state.messages.map(message => <div>{message}</div>)}
        </form>
    }
}

export default Chat