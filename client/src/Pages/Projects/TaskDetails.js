import React, { useEffect, useRef, useLayoutEffect } from "react";
import "./Projects.css";
import { useSelector, useDispatch } from "react-redux";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { IoSend } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { hideTaskDetailsWindow } from "../../State/WindowsStates";
import EmployeeChange from "../EmployeeInfos/EmployeeInfosPages/EmployeeChange";
import { MdOutlineChangeCircle } from "react-icons/md";
import Accordion from "react-bootstrap/Accordion";
import { MdOutlineCancel } from "react-icons/md";

function TaskDetails() {
  const task = useSelector((state) => state.windows.taskDetails.task);
  const employees = useSelector((state) => state.employees.employees);
  const [updatedTask, setUpdatedTask] = useState();
  const project = useSelector((state) => state.projects.selectedProject);
  const [listColor, setListColor] = useState("");
  const [newComment, setNewComment] = useState("");
  const textareaRef = useRef(null);
  const detailsWindow = useSelector(
    (state) => state.windows.taskDetails.status
  );

  const dispatch = useDispatch();
  const [editName, setEditName] = useState(false);
  const [save, setSave] = useState(false);
  const [changeAssignee, setChangeAssignee] = useState(false);
  const [addSubtask, setAddSubtask] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");

  const onCancel = () => {
    setSave(false);
    setUpdatedTask(task);
    setEditName(false);
  };

  useEffect(() => {
    if (task) {
      setUpdatedTask(task);
    }
  }, [task]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  const assignee = employees.find(
    (employee) => employee.user_id === updatedTask?.employee_id
  );
  useEffect(() => {
    if (updatedTask?.employee_done) {
      setListColor("#3ac93a65");
    } else if (updatedTask?.status === "todo") {
      setListColor("#3a78c978");
    } else if (updatedTask?.status === "in progress") {
      setListColor("#fff5399a");
    } else {
      setListColor("#5555554a");
    }
  });

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newComment]);

  useEffect(() => {
    if (!detailsWindow) {
      setSave(false);
      setEditName(false);
    }
  }, [detailsWindow]);

  const addComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        commentator_id: "2",
        comment: newComment.trim(),
        date: new Date().toISOString(),
      };
      setUpdatedTask((prevTask) => ({
        ...prevTask,
        comments: [...prevTask.comments, newCommentObj],
      }));
      setNewComment("");
    }
  };

  return (
    <>
      <EmployeeChange save={save} onCancel={onCancel} />
      <div
        className={`task-det-container position-fixed overflow-y-scroll px-4 d-flex flex-column py-3 ${
          detailsWindow ? "task-det-active" : ""
        }`}
      >
        <div className="task-det-proj d-flex justify-content-between">
          <div>
            <span className="text-muted " style={{ fontSize: "90%" }}>
              Project /{" "}
            </span>
            {project?.title}
          </div>

          <IoMdClose
            className="task-det-close"
            onClick={() => dispatch(hideTaskDetailsWindow())}
          />
        </div>

        <div className="task-det-title d-flex align-items-center">
          {editName ? (
            <input
              className="task-title-input"
              value={updatedTask?.title}
              onChange={(e) =>
                setUpdatedTask((prevTask) => ({
                  ...prevTask,
                  title: e.target.value,
                }))
              }
            />
          ) : (
            updatedTask?.title
          )}

          <button
            className="editBtn"
            onClick={() => {
              setEditName(true);
              setSave(true);
            }}
          >
            <svg height="1em" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
            </svg>
          </button>
        </div>
        <div
          className="task-det-content d-flex flex-column"
          style={{ gap: "10px" }}
        >
          <div
            className="task-det-section d-flex flex-column "
            style={{ gap: "5px" }}
          >
            <table border>
              <tr className="task-det-info">
                {updatedTask ? (
                  <>
                    <td className="task-det-label text-muted">Assignee</td>
                    <td
                      className="d-flex align-items-center "
                      style={{ gap: "20px" }}
                    >
                      <div
                        className="d-flex align-items-center task-det"
                        style={{
                          backgroundColor: "#3030301c",
                          border: " solid 1px #30303086",
                        }}
                      >
                        <img src={assignee.photo} />
                        <div>
                          {assignee.first_name} {assignee.last_name}
                        </div>
                      </div>
                      {changeAssignee ? (
                        <MdOutlineCancel
                          className="task-ass-change"
                          onClick={() => setChangeAssignee(false)}
                        />
                      ) : (
                        <MdOutlineChangeCircle
                          className="task-ass-change"
                          onClick={() => setChangeAssignee(true)}
                        />
                      )}
                    </td>
                  </>
                ) : null}
              </tr>
              {changeAssignee ? (
                <tr className="d-flex justify-content-center">
                  <td className="">
                    <Accordion
                      style={{
                        width: "250px",
                      }}
                    >
                      <Accordion.Item eventKey="0" className="rr-accordion">
                        <Accordion.Header style={{ width: "100%" }}>
                          <div className="rr-top d-flex flex-column">
                            <div className=" d-flex align-items-center">
                              <div
                                style={{
                                  fontSize: "90%",
                                  fontWeight: "500",
                                }}
                              >
                                Select new assignee
                              </div>
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body className="rr-accordion-body p-0 ">
                          <div className="mx-3">
                            {employees.map((employee) => (
                              <div
                                className="dep-head d-flex justify-content-start align-items-center py-2 my-1"
                                key={employee.user_id}
                                style={{
                                  gap: "10px",
                                  cursor: "pointer",
                                }}
                                // onClick={() =>
                                //   handleDepartmentHeadChange(
                                //     item.department_id,
                                //     employee.user_id
                                //   )
                                // }
                              >
                                <img src={employee.photo} />
                                <div className="dep-head-name">
                                  {employee.first_name +
                                    " " +
                                    employee.last_name}
                                </div>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </td>
                </tr>
              ) : null}

              <tr className="task-det-info">
                <td className="task-det-label text-muted">Status</td>
                <td
                  className=" task-det"
                  style={{ backgroundColor: listColor }}
                >
                  {updatedTask?.status === "todo"
                    ? "Todo"
                    : updatedTask?.status === "in progress"
                    ? "In Progress"
                    : updatedTask?.employee_done
                    ? "Done"
                    : "Upcoming"}
                </td>
              </tr>
              <tr className="task-det-info">
                <td className="task-det-label text-muted">Due date</td>
                <td style={{ fontSize: "75%", fontWeight: "500" }}>
                  <input
                    type="date"
                    className="task-det-deadline px-2"
                    id="deadline"
                    value={updatedTask?.end}
                    onChange={(e) => {
                      setUpdatedTask((prevTask) => ({
                        ...prevTask,
                        end: e.target.value,
                      }));
                      setSave(true);
                    }}
                  />
                </td>
              </tr>
              {updatedTask?.done_date ? (
                <>
                  <tr className="task-det-info">
                    <td className="task-det-label text-muted">Done at</td>
                    <td
                      className="d-flex align-items-center task-deadline px-2 "
                      style={{
                        fontSize: "75%",
                        fontWeight: "500",
                        border: "solid 2px #005238",
                      }}
                    >
                      <FaRegCalendarAlt />
                      {formatDate(updatedTask?.done_date)}
                    </td>
                  </tr>
                </>
              ) : null}
            </table>
          </div>
          <div className="d-flex flex-column" style={{ gap: "5px" }}>
            <label className="task-det-label text-muted">Description</label>
            <textarea
              value={updatedTask?.description}
              className="task-det-desc py-1"
              placeholder={
                updatedTask?.description === ""
                  ? "Add a description for this task"
                  : null
              }
              onChange={(e) => {
                setUpdatedTask((prevTask) => ({
                  ...prevTask,
                  description: e.target.value,
                }));
                setSave(true);
              }}
            />
          </div>
          <div>
            <label className="task-det-label text-muted mb-1">
              Task Progress
            </label>

            {updatedTask?.subtasks.map((item, index) => (
              <div id="checklist">
                <input
                  type="checkbox"
                  id={index}
                  checked={item.done}
                  onChange={(e) =>
                    setUpdatedTask((prevTask) => {
                      const updatedSubtasks = [...prevTask.subtasks];
                      updatedSubtasks[index] = {
                        ...updatedSubtasks[index],
                        done: e.target.checked,
                      };
                      setSave(true);
                      return { ...prevTask, subtasks: updatedSubtasks };
                    })
                  }
                />
                <label>{item.name}</label>
              </div>
            ))}
            {addSubtask ? (
              <div className="d-flex flex-column mt-2" style={{ gap: "5px" }}>
                <input
                  className="task-addsubtask ps-2"
                  placeholder="Add a subtask"
                  value={newSubtask}
                  onChange={(e) => {
                    setNewSubtask(e.target.value);
                  }}
                />
                <div className="d-flex ms-3" style={{ gap: "10px" }}>
                  <div
                    className="task-addsub-butt  px-2"
                    onClick={() => {
                      if (newSubtask.trim() !== "") {
                        setUpdatedTask((prevTask) => ({
                          ...prevTask,
                          subtasks: [
                            ...prevTask.subtasks,
                            { name: newSubtask, done: false },
                          ],
                        }));
                        setNewSubtask("");
                        setSave(true);
                      }
                    }}
                  >
                    Add
                  </div>
                  <div
                    style={{ cursor: "pointer " }}
                    onClick={() => {
                      setAddSubtask(false);
                    }}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="task-addsub-butt py-1 px-2 ms-5 mt-2"
                style={{ fontSize: "90%" }}
                onClick={() => setAddSubtask(true)}
              >
                Add another subtask
              </div>
            )}
          </div>
          <div
            className="d-flex flex-column justify-content-start "
            style={{ gap: "5px" }}
          >
            <label className="task-det-label text-muted">Comments</label>
            {updatedTask?.comments.map((item, index) => (
              <div key={index} className="d-flex ps-2 " style={{ gap: "8px" }}>
                <img
                  className="task-comment-img"
                  src={
                    employees.find(
                      (employee) => employee.user_id === item.commentator_id
                    ).photo
                  }
                />
                <div
                  className="d-flex flex-column "
                  style={{ width: "fit-content", maxWidth: "60%" }}
                >
                  <div className="task-comment px-2 py-1">{item.comment}</div>
                  <div className="task-comment-date align-self-end text-muted">
                    {formatDate(item.date)}
                  </div>
                </div>
              </div>
            ))}

            <div className="cb-send my-2 ">
              <textarea
                ref={textareaRef}
                className="auto-height-textarea"
                value={newComment}
                onChange={handleChange}
                placeholder="Comment as Firas Trabelsi"
              />

              <button onClick={addComment}>
                <IoSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetails;
