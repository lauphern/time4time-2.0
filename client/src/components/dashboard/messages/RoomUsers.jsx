import React from 'react';
import Proptypes from 'prop-types';

const RoomUsers = props => {
  const { roomUsers, sendDM, currentUser } = props;
  const users = roomUsers.map(user => {
    return (
      <li key={user.id}>
        <div>
          <span className={`presence ${user.presence.state}`} />
          <span>{user.name}</span>
        </div>
        {currentUser.id !== user.id ? (
          <button
            onClick={() => sendDM(user.id)}
            title={`Send ${user.name} a direct message`}
          >
            +
          </button>
        ) : null}
      </li>
    );
  });

  return (
    <div>
      <ul>{users}</ul>
    </div>
  );
};

RoomUsers.propTypes = {
  roomUsers: Proptypes.array.isRequired,
  sendDM: Proptypes.func.isRequired,
  currentUser: Proptypes.object.isRequired,
};

export default RoomUsers;