import React from "react";
import Proptypes from "prop-types";

//set up roomlist for a public chat
const RoomList = props => {
  const { rooms, currentRoom, connectToRoom, currentUser } = props;

  const roomList = rooms.map(room => {
    const roomIcon = !room.isPrivate ? "🌐" : "🔒";
    const isRoomActive = room.id === currentRoom.id ? "active" : "";
    return (
      <li
        className={isRoomActive}
        key={room.id}
        onClick={() => connectToRoom(room.id)}
      >
        <span>{roomIcon}</span>
        {room.customData && room.customData.isDirectMessage ? (
          <span>
            {room.customData.userIds.filter(id => id !== currentUser.id)[0]}
          </span>
        ) : (
          <span>{room.name}</span>
        )}
      </li>
    );
  });

  return (
    <div>
      <ul>{roomList}</ul>
    </div>
  );
};

RoomList.propTypes = {
  rooms: Proptypes.array.isRequired,
  currentRoom: Proptypes.object.isRequired,
  connectToRoom: Proptypes.func.isRequired,
  currentUser: Proptypes.object.isRequired
};

export default RoomList;
