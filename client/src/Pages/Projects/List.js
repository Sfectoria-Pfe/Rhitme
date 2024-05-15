import React, { useEffect, useState } from "react";
import "./Projects.css";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./Task";
import { changeTask } from "../../State/TasksState";
import { useDispatch, useSelector } from "react-redux";
import { IoIosAdd } from "react-icons/io";
import { showAddTaskWindow } from "../../State/WindowsStates";
import { updateTask } from "../../State/TasksState";

function List({ type, children }) {
  const [listName, setListName] = useState("");
  const [listColor, setListColor] = useState("");
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const addTask = useSelector((state) => state.windows.addTask);

  const currentDate = `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;

  function moveTask(status, task) {
    let updatedTask = { ...task.task };
    if (status === "done") {
      updatedTask.status = "done";
      updatedTask.done_date = currentDate;
    } else if (status === "progress") {
      updatedTask.status = "in progress";
      updatedTask.manager_approved = false;
      updatedTask.done_date = null;
    } else if (status === "todo") {
      updatedTask.status = "todo";
      updatedTask.manager_approved = false;
      updatedTask.done_date = null;
    } else {
      updatedTask.status = null;
      updatedTask.manager_approved = false;
      updatedTask.done_date = null;
    }
    dispatch(changeTask(updatedTask));
    dispatch(
      updateTask({ taskId: updatedTask.task_id, taskData: updatedTask })
    );
  }

  useEffect(() => {
    if (type === "done") {
      setListName("Done");
      setListColor("#3ac93a65");
    } else if (type === "todo") {
      setListName("To Do");
      setListColor("#3a78c978");
    } else if (type === "progress") {
      setListName("In progress");
      setListColor("#fff5399a");
    } else {
      setListName("Upcoming");
      setListColor("#5555554a");
    }
  });

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,

      drop: (item) => moveTask(type, item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [type]
  );
  console.log(type);
  console.log(children);

  return (
    <div
      ref={drop}
      style={{ minWidth: "270px", maxWidth: "270px" }}
      className="proj-list-container d-flex flex-column align-items-center col pb-4"
    >
      <div
        className="proj-list-name py-2"
        style={{ backgroundColor: listColor }}
      >
        {listName}
      </div>
      <div
        className="d-flex flex-column align-items-center w-100"
        style={{ gap: "8px", minHeight: "250px" }}
      >
        {children}
      </div>
      <div className={`${type !== "upcoming" ? "d-none" : ""} border `}></div>
      <button
        className={`e-add d-flex align-items-center justify-content-around py-1 ${
          type !== "upcoming" ? "d-none" : ""
        } border `}
        onClick={() => {
          if (!addTask) {
            dispatch(showAddTaskWindow());
          }
        }}
      >
        <IoIosAdd className="e-add-icon" />
        <div className="e-add-text">Add new task</div>
      </button>
    </div>
  );
}

export default List;
