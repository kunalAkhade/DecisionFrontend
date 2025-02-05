import "../css/viewpage.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "This is task 1 description.",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is task 2 description.",
    priority: "Medium",
    status: "Completed",
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is task 3 description.",
    priority: "Low",
    status: "Pending",
  },
  {
    id: 4,
    title: "Task 1",
    description: "This is task 1 description.",
    priority: "High",
    status: "Pending",
  },
  {
    id: 5,
    title: "Task 2",
    description: "This is task 2 description.",
    priority: "Medium",
    status: "Completed",
  },
  {
    id: 6,
    title: "Task 3",
    description: "This is task 3 description.",
    priority: "Low",
    status: "Pending",
  },
];

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const { token } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState("");
  const [filterTasks, setFilterTasks] = useState([]);
  const [signal, setSignal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/Task`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data?.data) {
          setTasks(response.data.data);
          setFilterTasks(response.data.data);
        }
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTasks();
  }, [signal]);

  const toggleDescription = (taskId) => {
    // Toggle showing the description
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const deleteTask = async (taskId) => {
    // Delete the task

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/Task/Delete/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setSignal((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  const updateTask = (taskId) => {
    navigate(`/updatetask/${taskId}`);
  };

  const printPriority = (type) => {
    switch (type) {
      case 0:
        return "Low";
      case 1:
        return "Medium";
      default:
        return "High";
    }
  };

  const printStatus = (type) => {
    if (type === 0) {
      return {
        color: "red",
        value: "Pending",
      };
    }
    return {
      color: "green",
      value: "Completed",
    };
  };

  const handleSearch = (event) => {
    //setSearchInput(event.target.value);
    if (event.target.value == "") {
      setFilterTasks(tasks);
    } else {
      setFilterTasks(
        tasks.filter((item) =>
          item.title.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="viewpage-main">
      <div className="task-list">
        <h2>Task List</h2>
        <div className="filter">
          <input
            type="text"
            placeholder="Enter Title to Search..."
            onChange={handleSearch}
          />
        </div>
        {filterTasks.length == 0 ? (
          <div className="default-msg"> No Tasks </div>
        ) : (
          <>
            {filterTasks?.map((task) => (
              <div className="task-item" key={task.id}>
                <div className="task-summary">
                  <h3>{task.title}</h3>
                  <p>Priority: {printPriority(task.priorityType)}</p>
                  <p>
                    Status:{" "}
                    <span
                      style={{
                        color: `${printStatus(task.status).color}`,
                        fontWeight: "700",
                      }}
                    >
                      {printStatus(task.status).value}
                    </span>
                  </p>
                  <button onClick={() => toggleDescription(task.id)}>
                    {expandedTaskId === task.id
                      ? "Hide Description"
                      : "Show Description"}
                  </button>
                  <button onClick={() => updateTask(task.id)}>Update</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
                {expandedTaskId === task.id && (
                  <div className="task-description">
                    <p>{task.description}</p>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default TaskList;
