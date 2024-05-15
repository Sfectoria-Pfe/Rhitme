import React from "react";
import List from "./List";
import Task from "./Task";
import { useOutletContext } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Management() {
  const { tasks } = useOutletContext();

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="mt-3 container-fluid overflow-x-hidden">
          <div className="row d-flex justify-content-around">
            <List type="done">
              {tasks
                .filter((task) => task.status === "done")
                .map((item) => {
                  return <Task task={item} key={item.task_id} />;
                })}
            </List>
            <List type="progress">
              {tasks
                .filter((task) => task.status === "in progress")
                .map((item) => {
                  return <Task task={item} key={item.task_id} />;
                })}
            </List>
            <List type="todo">
              {tasks
                .filter((task) => task.status === "todo")
                .map((item) => {
                  return <Task task={item} key={item.task_id} />;
                })}
            </List>
            <List type="upcoming">
              {tasks
                .filter((task) => task.status === "upcoming")
                .map((item) => {
                  return <Task task={item} key={item.task_id} />;
                })}
            </List>
          </div>
        </div>
      </DndProvider>
    </>
  );
}

export default Management;
