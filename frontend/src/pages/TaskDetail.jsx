import "../styles/TaskDetail.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTask } from "../services/taskService";

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await getTask(id);
        setTask(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load task", err);
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="task-detail">
      <h2>{task?.title}</h2>
      <div className="meta">
        <span className={`status ${task?.status}`}>{task?.status}</span>
        <span className="due-date">
          Due: {(new Date(task?.dueDate), "MM/dd/yyyy")}
        </span>
      </div>
      <p className="description">{task?.description}</p>
      <div className="actions">
        <Link to={`/edit-task/${id}`} className="edit-button">
          Edit Task
        </Link>
        <Link to="/" className="back-link">
          Back to List
        </Link>
      </div>
    </div>
  );
}
