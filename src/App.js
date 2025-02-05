import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import AddPage from "./pages/AddPage";
import ViewPage from "./pages/ViewPage";
import CategoryList from "./pages/Categories";
import TaskList from "./pages/TaskList";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AuthProvider from "./Auth/AuthProvider";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NotFound from "./pages/NotFound";
import PrivateComponent from "./Auth/PrivateComponent";
import UpdateTaskPage from "./pages/UpdateTaskPage";

function App() {
  useEffect(() => {}, []);

  return (
    <div className="main-container">
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <PrivateComponent>
                  <AddPage />
                </PrivateComponent>
              }
            />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/sign" element={<SignUpPage />} />
            <Route
              path="/viewpage"
              element={
                <PrivateComponent>
                  <ViewPage />
                </PrivateComponent>
              }
            />
            <Route
              path="/updatetask/:id"
              element={
                <PrivateComponent>
                  <UpdateTaskPage />
                </PrivateComponent>
              }
            />
            <Route
              path="/categorylist"
              element={
                <PrivateComponent>
                  <CategoryList />
                </PrivateComponent>
              }
            />
            <Route
              path="/tasklist"
              element={
                <PrivateComponent>
                  <TaskList />
                </PrivateComponent>
              }
            />
            <Route
              path="/tasklistbycategory/:id"
              element={
                <PrivateComponent>
                  <ViewPage />
                </PrivateComponent>
              }
            />
            <Route
              path="/*"
              element={
                <PrivateComponent>
                  <NotFound />
                </PrivateComponent>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>

      {/* <AddPage /> */}
      {/* <ViewPage /> */}
      {/* <CategoryList /> */}
      {/* <TaskList /> */}
      {/* <LoginPage /> */}
      {/* <SignUpPage /> */}
    </div>
  );
}

export default App;
