// src/components/TaskList.js

import React, { useRef, useState } from "react";
// Hook untuk mengambil state dari Redux Store (esensi dari TaskList)
import { useSelector, useDispatch } from "react-redux";

// Komponen anak untuk tiap tugas
import TaskItem from "./TaskItem";
import Icon from "./Icon";
import { addTask } from "../redux/taskSlice";
import styles from "./TaskList.module.css";

const TaskList = () => {
  const dispatch = useDispatch();

  // Ambil array tasks dari state Redux (jika tersedia)
  const tasks = useSelector((state) => state.task?.tasks ?? []);
  const [title, setTitle] = useState("");
  const inputRef = useRef();

  const onAdd = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch(addTask({ title: trimmed }));
    setTitle("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Tasks</div>
        <div className={styles.taskCount}>
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </div>
      </div>
      <div className={styles.divider} />

      <div className={styles.list}>
        {/* Add box always visible so user can add many tasks */}
        <div
          className={styles.addBox}
          onClick={() => inputRef.current && inputRef.current.focus()}
        >
          <Icon name="add" size={20} />
          <div className={styles.emptyMsg}>Add Task</div>
          <form onSubmit={onAdd} style={{ flex: 1 }}>
            <input
              ref={inputRef}
              className={styles.addInput}
              placeholder="Tambahkan tugas..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        </div>

        {/* Render tasks (if none, show small helper message) */}
        {tasks.length === 0 ? (
          <div className={styles.emptyMsg} style={{ marginTop: 8 }}>
            Belum ada tugas — tambahkan di atas.
          </div>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

export default TaskList;
