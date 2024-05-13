import React from "react";
import "./ChatBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import { deleteMessage } from "../../State/MessagesSlice";
import { useDispatch } from "react-redux";

function Sender({ message }) {
  const dispatch = useDispatch();
  return (
    <div className="sender-container d-flex align-items-start justify-content-end ">
      <div className="align-self-center">
        <Dropdown>
          <Dropdown.Toggle as="div" id="dropdown-basic">
            <div className="message-dots">...</div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <div
                className="message-edit"
                onClick={() => dispatch(deleteMessage(message.message_id))}
              >
                Delete
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="sen-message">{message?.content}</div>
      <img src={message?.sender?.photo} className="mes-pic" />
    </div>
  );
}

export default Sender;
