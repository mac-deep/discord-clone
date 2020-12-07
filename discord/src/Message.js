import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

function Message({ timestamp, user, message }) {
  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message__info">
        <h4>
          <span>{user.displayName}</span>
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <div className="message__content">{message}</div>
      </div>
    </div>
  );
}

export default Message;
