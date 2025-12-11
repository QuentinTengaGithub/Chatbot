import React, { useState, useEffect } from "react";
import { animateStyle } from "../../constants";
import Avatar from "../Avatar/Avatar";

function ChatItem(props) {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const getTime = () => {
    let diff = time - props.timeStamp.getTime();
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

  const getBotName = (type) => {
    switch (type) {
      case "bot1":
        return "Ghost";
      case "bot2":
        return "Transformer";
      case "bot3":
        return "Holly";
      default:
        return "Quentin";
    }
  };

  return (
    <div
      className={`chat__item ${props.type ? props.type : ""} ${animateStyle(
        "rubberBand"
      )} animate__delay-0.5s`}
    >
      <div className="chat__item__content">
        <div className="chat__name">{getBotName(props.type)}</div>

        {props.type === "me" ? (
          <div className="chat__msg">{props.msg}</div>
        ) : (
          <div
            className="chat__msg"
            dangerouslySetInnerHTML={{ __html: props.msg }}
          />
        )}

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
