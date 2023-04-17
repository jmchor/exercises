// src/pages/EditProjectPage.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

function EditProjectPage(props) {
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');

        const { projectId } = useParams();
        const navigate = useNavigate();

        useEffect(() => {
                axios.get(`${API_URL}/api/projects/${projectId}`)
                        .then((res) => {
                                const updateProject = res.data;
                                setTitle(updateProject.title);
                                setDescription(updateProject.description);
                        })
                        .catch((err) => {
                                console.error(err);
                        });
        }, [projectId]);

        const handleFormSubmit = () => {
                const requestBody = { title, description };

                axios.put(`${API_URL}/api/projects/${projectId}`, requestBody)
                        .then((res) => {
                                navigate(`/projects/${projectId}`);
                        })
                        .catch((err) => {
                                console.error(err);
                        });
        };

        const deleteProject = () => {
                axios.delete(`${API_URL}/api/projects/${projectId}`)
                        .then((res) => {
                                navigate('/projects');
                        })
                        .catch((err) => {
                                console.error(err);
                        });
        };

        return (
                <div className="EditProjectPage">
                        <h3>Edit the Project</h3>

                        <form onSubmit={handleFormSubmit}>
                                <label>Title:</label>
                                <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                />

                                <label>Description:</label>
                                <textarea
                                        name="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                />

                                <button type="submit">Update Project</button>
                        </form>

                        {/*     ADD     */}
                        <button onClick={deleteProject}>Delete Project</button>
                </div>
        );
}

export default EditProjectPage;
