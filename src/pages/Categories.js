import React, { useContext, useEffect, useState } from "react";
import "../css/category.css";
import axios from "axios";
import { AppContext } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const { token } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const Navigate = useNavigate();
  const [newCategory, setNewCategory] = useState("");

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
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      fetchCategories();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/Category/createCategory`,
        {
          categoryName: newCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCategories();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="category-list">
      <div className="categories">
        <div className="category-item">
          <h3>Create Category</h3>
          <input type="text" onChange={handleCategoryChange} />
          <button onClick={handleSubmit}>Create +</button>
        </div>
        {categories.map((category) => (
          <div
            onClick={() => Navigate(`/tasklistbycategory/${category.id}`)}
            key={category.id}
            className="category-item"
          >
            <h3>{category.categoryName}</h3>
            <button>View All Tasks</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
