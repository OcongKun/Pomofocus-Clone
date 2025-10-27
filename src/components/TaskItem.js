import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask, editTask } from "../redux/taskSlice";
import classes from "./TaskItem.module.css";
import Icon from "./Icon";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const onToggle = () => dispatch(toggleTask(task.id));
  const onDelete = () => dispatch(deleteTask(task.id));
  const onSave = () => {
    if (title.trim() === "") return;
    dispatch(editTask({ id: task.id, title: title.trim() }));
    setEditing(false);
  };

  return (
    <div className={classes.item}>
      <div className={classes.leftBar} />
      <input type="checkbox" checked={task.isCompleted} onChange={onToggle} />

      {!editing ? (
        <div
          className={`${classes.title} ${
            task.isCompleted ? classes.completed : ""
          }`}
          onDoubleClick={() => setEditing(true)}
        >
          {task.title}
        </div>
      ) : (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={onSave} className={classes.smallBtn}>
            Save
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setTitle(task.title);
            }}
            className={classes.smallBtn}
          >
            Cancel
          </button>
        </>
      )}

      <div className={classes.rightMeta}>
        <div style={{ fontSize: 12, opacity: 0.9 }}>0/1</div>
        <button
          className={classes.smallBtn}
          onClick={onDelete}
          title="Delete task"
        >
          <Icon name="delete" size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
