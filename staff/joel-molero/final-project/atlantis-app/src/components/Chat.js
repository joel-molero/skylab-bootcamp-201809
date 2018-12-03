import React, { Component } from 'react'

class Chat extends Component {
    state = { message: '', messages: ['message', 'm2'] }

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

    handleListMessage = event => {
        event.preventDefault()
        return Promise.resolve()
        .then(() => {
            this.props.onListMessage()
        })
        .then(() => {
            console.log(this.props.messages)

            if(this.props.messages){ 

                const messages = []
                this.props.messages.forEach(({message}) => {
                    messages.push(message)
                })
                this.setState({messages})
                }

        })

        
    }



    render() {
        return <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="message" placeholder="Type your message here..." onChange={this.handleMessageChange} />
                    <button type="submit">Send</button> <a href="#" onClick={this.props.onGoBack}>back</a>
                    {this.state.messages.map(message => <div>{message}</div>)}
                    
                </form>
                <button onClick={this.handleListMessage}>Retrieve messages</button>
                </div>
    }
}

export default Chat