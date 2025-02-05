import { useEffect, useContext, useState } from "react";
import { AppContext } from "../Auth/AuthProvider";
import "../css/addpage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateTaskPage() {
  const { token } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [selectedOptionCategory, setSelectedOptionCategory] = useState("");
  const [selectedOptionPriority, setSelectedOptionPriority] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState(0);
  const [status, setStatus] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!token) return; // Ensure token exists before making the request
    console.log(id);
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/Category/getCategory`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.data?.data) {
          setCategories(response.data.data);
        }
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/Task/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data?.data) {
          setSelectedOptionCategory(response.data.data?.category?.id);
          setTitle(response.data.data?.title);
          setDescription(response.data.data?.description);
          setSelectedOptionPriority(response.data.data?.priorityType);
          setTaskStatus(response.data.data?.status);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchTasks();

    fetchCategories();
  }, [token]);

  const handleChangeCategory = (event) => {
    setSelectedOptionCategory(event.target.value);
  };

  const handleChangePriority = (event) => {
    console.log(event.target.value);
    setSelectedOptionPriority(parseInt(event.target.value, 10));
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    if (title.length == 0 || description.length == 0) {
      return;
    }
    console.log(typeof taskStatus);
    console.log(selectedOptionCategory);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/Task/UpdateTask/${id}`,
        {
          title,
          description,
          status: Number(taskStatus),
          CategoryId: selectedOptionCategory || null,
          priorityType: selectedOptionPriority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Task added:", response.data);
      setStatus(true);
      setTimeout(() => {
        setStatus(false);
      }, 1000);
    } catch (e) {
      console.error("Error adding task:", e);
    }
  };

  const handleChangeStatus = (event) => {
    setTaskStatus(event.target.value);
  };

  return (
    <div className="addPage-main">
      <div className="addPage-form">
        <input
          type="text"
          placeholder="Task Title"
          onChange={handleChangeTitle}
          value={title}
        />
        <textarea
          name="message"
          rows="10"
          cols="30"
          style={{ resize: "none" }}
          placeholder="Task Description"
          onChange={handleChangeDescription}
          value={description}
        ></textarea>
        <select value={selectedOptionCategory} onChange={handleChangeCategory}>
          {selectedOptionCategory ? <></> : <option value="">None</option>}
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <select value={selectedOptionPriority} onChange={handleChangePriority}>
          <option value={0}>Low</option>
          <option value={1}>Medium</option>
          <option value={2}>High</option>
        </select>
        <select value={taskStatus} onChange={handleChangeStatus}>
          <option value={0}>Pending</option>
          <option value={1}>Completed</option>
        </select>
        <button onClick={handleSubmit}>Add Task</button>
        {status && (
          <div
            style={{
              color: "green",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Added
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateTaskPage;
