import React, { useEffect, useState } from "react";
import "./Projects.css";
import { useDrop } from "react-dnd";
import { reorderTasks } from "../../State/TasksState";
import { ItemTypes } from "./Task";
import { updateTask } from "../../State/TasksState";
import { useDispatch, useSelector } from "react-redux";

function List({ type, children }) {
  const [listName, setListName] = useState("");
  const [listColor, setListColor] = useState("");
  const tasks = useSelector((state) => state.tasks.tasksByProject);
  const dispatch = useDispatch();

  const currentDate = `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;

  function moveTask(status, task) {
    let updatedTask = { ...task.task };
    if (status === "done") {
      updatedTask.status = null;
      updatedTask.employee_done = true;
      updatedTask.done_date = currentDate;
    } else if (status === "progress") {
      updatedTask.status = "in progress";
      updatedTask.employee_done = false;
      updatedTask.manager_approved = false;
      updatedTask.done_date = null;
    } else if (status === "todo") {
      updatedTask.status = "todo";
      updatedTask.employee_done = false;
      updatedTask.manager_approved = false;
      updatedTask.done_date = null;
    } else {
      updatedTask.status = null;
      updatedTask.employee_done = false;
      updatedTask.manager_approved = false;
      updatedTask.done_date = null;
    }
    dispatch(updateTask(updatedTask));
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

  return (
    <div
      ref={drop}
      style={{ minWidth: "270px", maxWidth: "270px" }}
      className="proj-list-container d-flex flex-column align-items-center col "
    >
      <div
        className="proj-list-name py-2"
        style={{ backgroundColor: listColor }}
      >
        {listName}
      </div>
      <div
        className="d-flex flex-column align-items-center w-100 pb-5 "
        style={{ gap: "8px", minHeight: "300px" }}
      >
        {children}
      </div>
    </div>
  );
}

export default List;
