import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTasks, deleteTask } from "../services/taskService";
import "../styles/TaskList.css";
import {
  FiLogOut,
  FiPlus,
  FiEdit,
  FiTrash,
  FiClock,
  FiFilter,
  FiXCircle,
} from "react-icons/fi";
import moment from "moment";
import { useAuth } from "../context/AuthContext";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", dueDate: "" });
  const [appliedFilters, setAppliedFilters] = useState({
    status: "",
    dueDate: "",
  });
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, [appliedFilters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await getTasks(appliedFilters);
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
    navigate("/login");
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({ status: "", dueDate: "" });
    setAppliedFilters({ status: "", dueDate: "" });
  };

  return (
    <div className="task-list-container">
      <nav className="navbar">
        <h1>Task Manager</h1>
        <div className="nav-controls">
          <Link to="/add-task" className="add-button">
            <FiPlus /> Add Task
          </Link>
          <button onClick={handleLogout} className="logout-button">
            <FiLogOut /> Logout
          </button>
        </div>
      </nav>

      {/* Filters Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "20px 0",
          padding: "12px",
          background: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#333",
          }}
        >
          <FiFilter /> Filters:
        </span>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          style={{
            padding: "10px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            width: "200px",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
          }}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={filters.dueDate}
          onChange={handleFilterChange}
          style={{
            padding: "10px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            width: "200px",
            backgroundColor: "#f9f9f9",
          }}
        />

        <button
          onClick={applyFilters}
          style={{
            background: "#007bff",
            color: "white",
            padding: "10px 16px",
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Apply
        </button>

        <button
          onClick={resetFilters}
          style={{
            background: "#dc3545",
            color: "white",
            padding: "10px 16px",
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FiXCircle /> Reset
        </button>
      </div>

      <div className="task-grid">
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks found. Lets create one!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-card">
              <div className="card-header">
                <h3>{task.title}</h3>
                <span className={`status ${task.status}`}>{task.status}</span>
              </div>
              <p className="description">{task.description}</p>

              <div className="card-footer">
                <div className="due-date">
                  <FiClock />
                  {task.dueDate
                    ? moment(task.dueDate).format("YYYY-MM-DD")
                    : "No due date"}
                </div>
                <div className="actions">
                  <Link to={`/edit-task/${task._id}`} className="edit-btn">
                    <FiEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="delete-btn"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
