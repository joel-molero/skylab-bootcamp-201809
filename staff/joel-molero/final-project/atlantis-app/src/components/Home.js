import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = props =>
  <div className="home">
    <div>
      <h1 itemProp="headline">Atlantis Video Room App</h1>
      <p>Please enter a room name.</p>
      <div className="input-w-buttons">
        <input type="text" name="room" value={ props.roomId } onChange={props.handleChange} pattern="^\w+$" maxLength="10" required autoFocus title="Room name should only contain letters or numbers."/>
        <div className="home-buttons">
          <Link className="primary-button" to={ '/r/' + props.roomId }>Join</Link>
          <Link className="primary-button" to={ '/r/' + props.defaultRoomId }>Random</Link>
        </div>
      </div>
      <div className="recently-used-rooms">
        { props.rooms.length !== 0 && <div className="used-rooms">Recently used rooms:</div> }
        { props.rooms.map(room => <Link key={room} className="recent-room" to={ '/r/' + room }>{ room }</Link>) }
      </div>
    </div>
  </div>

Home.propTypes = {
  handleChange: PropTypes.func.isRequired,
  defaultRoomId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  rooms: PropTypes.array.isRequired
};

const mapStateToProps = store => ({rooms: store.rooms});

export default connect(mapStateToProps)(Home);