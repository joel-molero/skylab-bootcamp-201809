import React from 'react';
import { PropTypes } from 'prop-types';

const Chat = props =>
    <div>
        <h1>HelloGuorld</h1>
        <div id="chat-window">
            <div id="output"></div>
            <div id="feedback"></div>
        </div>
    
        <input id="message" type="text" placeholder="Message" value={ props.messageHandler } onChange={ props.handleMessageChange }/>
        <button id="send" onClick={props.sendChat}>Send</button>
    </div>

Chat.propTypes = {
    messageHandler: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};

export default Chat;