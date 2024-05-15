import ProgressBar from "react-bootstrap/ProgressBar";
import "./Projects.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { useDrag } from "react-dnd";
import { showTaskDetailsWindow } from "../../State/WindowsStates";
import { useDispatch, useSelector } from "react-redux";

export const ItemTypes = {
  TASK: "Task",
};

function Task({ task, index }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const detailsWindow = useSelector(
    (state) => state.windows.taskDetails.status
  );

  const dispatch = useDispatch();

  const employees = useSelector((state) => state.employees.employees);
  const currentDate = new Date();
  const dueDate = new Date(task?.end);
  const differenceInDays = Math.floor(
    (dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  let daysLeftText = `${Math.abs(differenceInDays)} days left`;
  if (differenceInDays === 0) {
    daysLeftText = "Due Today";
  } else if (differenceInDays === 1) {
    daysLeftText = "Due Tomorrow";
  } else if (differenceInDays === -1) {
    daysLeftText = "Overdue by 1 day";
  } else if (differenceInDays < -1) {
    daysLeftText = `Overdue by ${Math.abs(differenceInDays)} days`;
  }
  const isOverdue = differenceInDays < 0;

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

  const employee = employees.find((emp) => emp.user_id === task?.employee_id);

  return (
    <div
      className="task-container p-2 d-flex flex-column"
      style={{ backgroundColor: isOverdue ? "#ff5e5e4f" : "" }}
      ref={drag}
      onClick={() => {
        dispatch(showTaskDetailsWindow(task));
      }}
    >
      <div className="task-title">{task?.title}</div>
      <div className="d-flex align-items-center" style={{ gap: "5px" }}>
        <div className="task-deadline d-flex align-items-center px-2">
          <FaRegCalendarAlt />
          <div>{formatDate(task?.end)} </div>
        </div>
        <div className="task-dealine-state">
          {!task?.status === "done" &&
            (isOverdue ? (
              <div>{daysLeftText}</div>
            ) : (
              <div>{daysLeftText} </div>
            ))}
        </div>
      </div>

      <div className="task-desc text-muted ">
        {task?.description
          .split(" ")
          .slice(0, 12)
          .join(" ") + "..."}
      </div>
      <div className="d-flex justify-content-center">
        <ProgressBar
          now={task?.subtasks?.filter((item) => item.done).length}
          style={{
            height: "10px",
            width: "90%",
            backgroundClip: "rgb(162, 162, 162)",
            border: "solid 1px #070f2b57",
          }}
          max={task?.subtasks?.length}
        />
      </div>
      <div className="d-flex justify-content-between px-3 text-muted">
        <img
          className="task-emp-photo"
          src={
            employees.find((emp) => emp.employee_id === task?.employee_id).photo
          }
        />
        <div className="task-comments d-flex align-items-center">
          <TfiCommentAlt />
          <div>{task?.comments ? task?.comments.length : "0"}</div>
        </div>
      </div>
    </div>
  );
}

export default Task;
