import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskDetail from "./pages/TaskDetail";
import AddEditTask from "./pages/AddEditTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { useAuth } from "./context/AuthContext";
function App() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <TaskList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/tasks/:id"
          element={
            isAuthenticated ? <TaskDetail /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/add-task"
          element={
            isAuthenticated ? <AddEditTask /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/edit-task/:id"
          element={
            isAuthenticated ? <AddEditTask /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? <Register /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
