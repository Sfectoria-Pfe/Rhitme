import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatBar.css";
import Sender from "./Sender";
import Receiver from "./Receiver";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useRef } from "react";
import { useLayoutEffect, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { hideChat } from "../../State/chatState";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { MdEmojiEmotions } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { fetchMessagesByConversation } from "../../State/MessagesSlice";
import { createMessage } from "../../State/MessagesSlice";
import { io } from "socket.io-client";
import { addMessage } from "../../State/MessagesSlice";

function ChatBar() {
  const [value, setValue] = useState("");
  const conversation = useSelector((state) => state.chat.conversation);
  const textareaRef = useRef(null);
  const messageContainerRef = useRef(null);
  const chat = useSelector((state) => state.chat.chat);
  const messages = useSelector((state) => state.messages.messages);
  const dispatch = useDispatch();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messaget = useSelector((state) => state.conv.messages);
  const status = useSelector((state) => state.conv.status);
  const employeeid = JSON.parse(localStorage.getItem("employee")).employee_id;
  const error = useSelector((state) => state.conv.error);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [conversation]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        if (message.conversation_id === conversation.conversation_id) {
          dispatch(addMessage(message));
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (
      status === "idle" ||
      (status === "succeeded" &&
        messaget[0]?.conversation_id !== conversation?.conversation_id)
    ) {
      dispatch(fetchMessagesByConversation(conversation?.conversation_id));
    }
  }, [dispatch, status, conversation?.conversation_id]);

  useEffect(() => {
    scrollToBottom();
  }, [messaget]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const handleEmojiSelect = (emoji) => {
    setValue((prevMessage) => prevMessage + emoji.native);
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
    <div
      className={` d-flex flex-column z-2 cb-container justify-content-between ${
        chat && messages ? "cb-active" : ""
      }`}
    >
      <div className="cb-receiver-infos d-flex align-items-center px-3 py-2">
        <img
          src={
            conversation?.participants?.find(
              (obj) => obj.employee_id !== employeeid
            ).photo
          }
          className="cb-chat-img"
        />
        <div>
          <div className="cb-receiver-name">
            {conversation?.participants?.find(
              (obj) => obj.employee_id !== employeeid
            ).first_name +
              " " +
              conversation?.participants?.find(
                (obj) => obj.employee_id !== employeeid
              ).last_name}
          </div>
          <div className="cb-receiver-status">
            {conversation?.participants?.find(
              (obj) => obj.employee_id !== employeeid
            ).status === "Active"
              ? "Online"
              : "Offline"}
          </div>
        </div>
        <IoClose
          className="cb-close"
          onClick={() => {
            if (chat) {
              dispatch(hideChat());
            }
          }}
        />
      </div>
      <div className="cb-content ">
        <div className="cb-messages" ref={messageContainerRef}>
          {messaget?.map((item, index) =>
            item.sender?.employee_id === employeeid ? (
              <Sender message={item} key={index} />
            ) : (
              <Receiver message={item} key={index} />
            )
          )}
        </div>
        <div className="cb-send my-2 ">
          <textarea
            ref={textareaRef}
            className="auto-height-textarea"
            value={value}
            onChange={handleChange}
            placeholder="Type your message..."
          />
          <Dropdown autoClose="outside">
            <Dropdown.Toggle as="div" id="dropdown-basic">
              <MdEmojiEmotions
                className="cb-emojies"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="p-0">
              <Dropdown.Item className="emojis p-0">
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme="light"
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <button
            disabled={value === ""}
            onClick={() => {
              const message = {
                conversationId: conversation.conversation_id,
                content: value,
                employeeId: employeeid,
              };
              dispatch(
                createMessage({
                  conversationId: conversation.conversation_id,
                  content: value,
                  employeeId: employeeid,
                })
              );
              socket.emit("sendMessage", message);
              setValue("");
            }}
          >
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
