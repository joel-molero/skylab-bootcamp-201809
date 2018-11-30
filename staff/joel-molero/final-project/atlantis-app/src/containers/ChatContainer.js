// import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
// import Chat from '../components/Chat';
// import io from 'socket.io-client';

// class ChatContainer extends Component {
//     constructor(props) {
//         super(props);
        
//         this.state = { handleMessage: '' }
//         this.handleMessageChange = this.handleMessageChange.bind(this);
//         this.socket = io.connect('http://127.0.0.1:5060');   // Without THIS boom
//     }

//     handleChange(e) {
//         this.setState({ handleMessage: e.target.value });
//     }

//     componentDidMount(){
//         // Make connection
//         const socket = this.socket;
//         console.log('props', this.props)

//         // Query DOM (acuerdate no react)
//         var message = document.getElementById('message'),  
//             handle = document.getElementById('handle'),
//             // btn = document.getElementById('send'),
//             output = document.getElementById('output'),
//             feedback = document.getElementById('feedback');

//         // Emit event
        
        

//         // message.addEventListener('keypress', function(){  
//         //     socket.emit('typing', handle.value);
//         // })

//         // Listen for events
//         socket.on('chat', ({ username, message }) => {  
//             feedback.innerHTML = '';
//             output.innerHTML += '<p><strong>' + 'pakito' + ': </strong>' + message + '</p>';
//         });

//         // socket.on('typing', function(data){  
//         //     feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
//         // });
//     }

//     sendChat(e) {
//         e.preventDefault();
//         this.socket.emit('chat', {
//             message: message.value,
//             //handle: handle.value
//         });
//         message.value = "";
//     }

//     sendMessage(e) {  // PASAR CHAT ENTERO A REACT
//             }

//     render(){
//         return (
//             <Chat
//                 sendChat = {this.sendChat}
//                 username = {this.username}
//                 messageHandler = {this.messageHandler}
//                 handleMessageChange = {this.handleMessageChange}
//                 handleUsernameChange = {this.handleUsernameChange}
//             />
//         )
//     }
// }


// ChatContainer.PropTypes = {
//     socket: PropTypes.object.isRequired
// }

// export default ChatContainer;