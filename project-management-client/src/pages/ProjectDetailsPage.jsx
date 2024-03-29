// src/pages/ProjectDetailsPage.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AddTask from '../components/AddTask';
import TaskCard from '../components/TaskCard';

const API_URL = 'http://localhost:5005';

function ProjectDetailsPage(props) {
        const [project, setProject] = useState(null);

        const { projectId } = useParams();

        const getProject = () => {
                const storedToken = localStorage.getItem('authToken');

                axios.get(`${API_URL}/api/projects/${projectId}`, {
                        headers: { Authorization: `Bearer ${storedToken}` },
                })
                        .then((res) => {
                                setProject(res.data);
                        })
                        .catch((err) => {
                                console.error(err);
                        });
        };

        useEffect(() => {
                getProject();
        }, []);

        return (
                <div className="ProjectDetails">
                        {project && (
                                <>
                                        <h1>{project.title}</h1>
                                        <p>{project.description}</p>
                                </>
                        )}

                        <AddTask refreshProject={getProject} projectId={projectId} />

                        {project &&
                                project.tasks.map((task) => (
                                        <TaskCard key={task._id} {...task} projectId={projectId} />
                                ))}

                        <Link to="/projects">
                                <button>Back to projects</button>
                        </Link>

                        <Link to={`/projects/edit/${projectId}`}>
                                <button>Edit Project</button>
                        </Link>
                </div>
        );
}

export default ProjectDetailsPage;
