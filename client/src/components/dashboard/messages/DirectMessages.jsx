import React, { Component } from "react";
import {
  handleInput,
  connectToChatkit,
  connectToRoom,
  sendMessage,
  sendDM
} from "../../../utils/chatMethods";
import RoomList from "./RoomList";
import ChatSession from "./ChatSession";
import RoomUsers from "./RoomUsers";
import { getUser } from "../../../utils/authMethods";

//this component is for render and send private messages between time4time user's
class DirectMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userId: '',
      // showLogin: true,
      isLoading: false,
      currentUser: null,
      currentRoom: null,
      rooms: [],
      roomUsers: [],
      roomName: null,
      messages: [],
      newMessage: ""
    };
    this.handleInput = handleInput.bind(this);
    this.connectToChatkit = connectToChatkit.bind(this);
    this.connectToRoom = connectToRoom.bind(this);
    this.sendMessage = sendMessage.bind(this);
    this.sendDM = sendDM.bind(this);
  }

  componentDidMount() {
    this.connectToChatkit(getUser().username);
  }

  render() {
    const {
      // userId,
      // showLogin,
      rooms,
      currentRoom,
      currentUser,
      messages,
      newMessage,
      roomUsers,
      roomName
    } = this.state;
    return (
      <div>
        <aside>
          {currentUser ? (
            <div>
              <span>{currentUser.name}</span>
              <span>{`@${currentUser.id}`}</span>
            </div>
          ) : null}
          {currentRoom ? (
            <RoomList
              rooms={rooms}
              currentRoom={currentRoom}
              connectToRoom={this.connectToRoom}
              currentUser={currentUser}
            />
          ) : null}
        </aside>
        <section>
          <header>{currentRoom ? <h3>{roomName}</h3> : null}</header>
          <ul>
            <ChatSession messages={messages} />
          </ul>
          <footer>
            <form onSubmit={this.sendMessage}>
              <input
                type="text"
                value={newMessage}
                name="newMessage"
                placeholder="Type your message and hit ENTER to send"
                onChange={this.handleInput}
              />
            </form>
          </footer>
        </section>
        <aside>
          {currentRoom ? (
            <RoomUsers
              currentUser={currentUser}
              sendDM={this.sendDM}
              roomUsers={roomUsers}
            />
          ) : null}
        </aside>
        {/* {showLogin ? (
              <Dialog
                userId={userId}
                handleInput={this.handleInput}
                connectToChatkit={this.connectToChatkit}
              />
            ) : null} */}
      </div>
    );
  }
}

export default DirectMessages;
