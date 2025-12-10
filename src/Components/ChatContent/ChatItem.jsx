import React, { useState } from "react";
import { animateStyle } from "../../constants";
import Avatar from "../Avatar/Avatar";

function ChatItem(props) {
  // eslint-disable-next-line no-unused-vars
  let [time, setTime] = useState(new Date().getTime());
  const getTime = () => {
    let diff = new Date().getTime() - props.timeStamp.getTime();
    let secs = diff / 1000;
    if (secs < 60) return `${Math.round(secs)} seconds ago`;
    else if (secs < 3600) {
      const mins = Math.round(secs / 60);
      return `${mins} minute${mins > 1 ? "s" : ""} ago`;
    } else {
      const hrs = Math.round(secs / 60 / 60);
      return `${hrs} hours${hrs > 1 ? "s" : ""} ago`;
    }
  };

  setInterval(() => {
    setTime(new Date().getTime());
  }, 1000);

  const getBotName = (type) => {
    switch(type) {
      case "bot1":
        return "Ghost"
      case "bot2":
        return "Transformer"
      case "bot3":
        return "Holly"
      default:
        return "Quentin"
    }
  }

  return (
    <div
      className={`chat__item ${props.type ? props.type : ""} ${animateStyle(
        // "bounce"
        // "wobble"
        // "pulse"
        "rubberBand"
      )} animate__delay-0.5s`}
    >
      <div className="chat__item__content">
        <div className="chat__name">{ getBotName(props.type)}</div>
        <div className="chat__msg">{props.msg}</div>
        <div className="chat__meta">
          <span>{getTime()}</span>
        </div>
      </div>
      <div className="chat-avatar-wrapper">
        <Avatar src={props.type} />
      </div>
    </div>
  );
}

export default ChatItem;
