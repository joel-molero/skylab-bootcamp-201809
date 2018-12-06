import React, { Component } from 'react'

class Chat extends Component {
    state = { message: '', messages: [] }

    componentWillReceiveProps(props){
        this.setState({ messages: props.messages })
    }
    
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
        return <div className="chat-wrapper">
            <form className="chat-form" onSubmit={this.handleSubmitMessage}>
                {this.state.messages.map(message => <div>{message.message}</div>)}
                <div className="input-send-chat">
                    <input className="input-chat" type="message" placeholder="Type your message here..." onChange={this.handleMessageChange} />
                    <button className="send-chat" type="submit">Send</button>
                </div>
                <a href="#" onClick={this.props.onGoBack}>Back</a>
            </form>
        </div>
    }
}

export default Chat