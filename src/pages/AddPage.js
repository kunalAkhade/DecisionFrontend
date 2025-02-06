import { useEffect, useContext, useState } from "react";
import { AppContext } from "../Auth/AuthProvider";
import "../css/addpage.css";
import axios from "axios";

function AddPage() {
  const { token, setToken } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [selectedOptionCategory, setSelectedOptionCategory] = useState("");
  const [selectedOptionPriority, setSelectedOptionPriority] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (!token) return; // Ensure token exists before making the request

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
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/Task`,
        {
          title,
          description,
          status: 0,
          category: selectedOptionCategory || null,
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

  return (
    <div className="addPage-main">
      <div className="addPage-form">
        <input
          type="text"
          placeholder="Task Title"
          onChange={handleChangeTitle}
        />
        <textarea
          name="message"
          rows="10"
          cols="30"
          style={{ resize: "none" }}
          placeholder="Task Description"
          onChange={handleChangeDescription}
        ></textarea>
        <select value={selectedOptionCategory} onChange={handleChangeCategory}>
          <option value="">None</option>
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

export default AddPage;
