import { Link, useParams } from 'react-router-dom';

const TaskCard = ({ title, description }) => {
        const { taskId } = useParams();
        return (
                <li className="TaskCard card">
                        <h3>{title}</h3>
                        <h4>Description:</h4>
                        <p>{description}</p>

                        <Link to={`/tasks/edit/${taskId}`}>
                                <button>Edit Task</button>
                        </Link>
                </li>
        );
};

export default TaskCard;

// src/components/TaskCard.js
