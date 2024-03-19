import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatBar.css";
import Sender from "./Sender";
import Receiver from "./Receiver";
import pic1 from "./picture1.jpg";
import pic2 from "./picture2.jpg";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useRef } from "react";
import { useLayoutEffect, useEffect } from "react";

function ChatBar() {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="position-absolute d-flex flex-column z-2 cb-container justify-content-between">
      <div className="cb-receiver-infos d-flex align-items-center px-3 py-2">
        <img src={pic2} className="cb-chat-img" />
        <div>
          <div className="cb-receiver-name">Nancy Ajrem</div>
          <div className="cb-receiver-status">Online</div>
        </div>
      </div>
      <div className="cb-content ">
        <div className="cb-messages" ref={messageContainerRef}>
          <Sender />
          <Receiver />
          <Receiver />
          <Receiver />
          <Receiver />
        </div>
        <div className="cb-send my-2 ">
          <textarea
            ref={textareaRef}
            className="auto-height-textarea"
            value={value}
            onChange={handleChange}
            placeholder="Type your message..."
          />
          <button>
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
