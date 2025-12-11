import React, { useEffect, useRef } from "react";

import { connect } from "react-redux";
import { addMessageToChatFrom } from "../../Actions/Bot/botActions";

import "./chatContent.scss";
import ChatItem from "./ChatItem";
import { getCovidData, getNews } from "../../Services/Bot/botAPI";
import { bots } from "../../constants";

function ChatContent(props) {
  let messagesEndRef = useRef(null);
  let inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Scroll to bottom when chat is updated
  useEffect(() => {
    scrollToBottom();
  }, [props.chat.chatArray]);

  const shouldBotRespond = (msg) => {
    if (msg.match(/hello/gi) || msg.match(/hey/gi) || msg.match(/hi/gi)) {
      greet("bot1");
      return;
    }

    if (msg.match(/covid/gi)) {
      getCovidCaseCounts();
      return;
    }

    if (msg.match(/news/gi)) {
      getNewsData();
      return;
    }

    if (msg.match(/search/gi)) {
      askKeywordToSearch();
      return;
    }

    if (
      props.chat.chatArray.length >= 2 &&
      props.chat.chatArray[props.chat.chatArray.length - 2].msg.match(
        /search/gi
      )
    ) {
      searchKeyword(msg);
      return;
    }
  };

  /**
   * Bots say hi
   */
  const greet = (bot) => {
    props.addMessageToChatFrom(`Hey there! I am ${bots[bot].name}.`, bot);
    props.addMessageToChatFrom(bots[bot].powers, bot);
  };

  /**
   * Gets updated covid data
   */
  const getCovidCaseCounts = async () => {
    const data = await getCovidData();
  
    if (!data) {
      props.addMessageToChatFrom(
        "Sorry, I'm unable to fetch COVID data right now. Please try again later.",
        "bot1"
      );
      return;
    }
  
    const { newCases, newDeaths, totalCases, totalRecovered } = data;
  
    const msg = `
      The world covid report is as follows:<br/><br/>
      🦠 New Cases: <b>${newCases.toLocaleString()}</b><br/>
      💀 New Deaths: <b>${newDeaths.toLocaleString()}</b><br/>
      📈 Total Cases: <b>${totalCases.toLocaleString()}</b><br/>
      💚 Total Recovered: <b>${totalRecovered.toLocaleString()}</b>
        `.trim();
    props.addMessageToChatFrom(msg, "bot1");
  };
  

  const getNewsData = async () => {
    try {
      const news = await getNews();
      const msg = `Here are the latest headlines:<br/><br/>${news}`;
      props.addMessageToChatFrom(msg, "bot1");
    } catch (error) {
      props.addMessageToChatFrom(
        "Unable to fetch news at the moment. Please try again later.",
        "bot1"
      );
    }
  };

  const askKeywordToSearch = () => {
    props.addMessageToChatFrom(
      `Please enter the keyword that you want to search about`,
      "bot2"
    );
  };

  /**
   * @desc 
   * @param {Search query} msg
   */
  const searchKeyword = (msg) => {
    const query = msg.split(" ").join("+");
    const URL = `https://www.google.com/search?q=${query}`;
    props.addMessageToChatFrom(`Sure, here it is!`, "bot2");
    window.open(URL);
  };

  /**
   * @desc 
   * @param {value from inputRef} e
   */
  const sendMessageFromUser = (message = inputRef.current.value) => {
    if (message) {
      props.addMessageToChatFrom(message, "me");
      shouldBotRespond(message);
    }
    inputRef.current.value = "";
  };

  const handleKeyDown = (event) => {
    let val = inputRef.current.value;
    if (event.keyCode === 13 && val !== "") {
      sendMessageFromUser(val);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mainChatWindow">
      <div className="blur"></div>
      <div className="content__body">
        <div className="chat__items">
          {props.chat.chatArray.map((itm) => {
            return (
              <ChatItem
                key={itm.key}
                type={itm.type ? itm.type : "me"}
                msg={itm.msg}
                timeStamp={itm.timeStamp}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <input
            type="text"
            placeholder="Type a message here"
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <button
            className="btnSendMsg"
            id="sendMsgBtn"
            onClick={() => sendMessageFromUser()}
          >
            {/* <i className="fa fa-paper-plane"></i> */}
            <i className="fa fa-location-arrow"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ chat }) => ({
  chat,
});

const mapDispatchToProps = (dispatch) => ({
  addMessageToChatFrom: (msg, type) =>
    dispatch(addMessageToChatFrom(msg, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);
