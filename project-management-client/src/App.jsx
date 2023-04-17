import axios from 'axios';
import './App.css';
import { Routes, Route } from 'react-router-dom'; // <== IMPORT

import Navbar from './components/Navbar'; // <== IMPORT
import HomePage from './pages/HomePage'; // <== IMPORT
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import EditProjectPage from './pages/EditProjectPage';
import EditTaskPage from './pages/EditTaskPage';

function App() {
        return (
                <div className="App">
                        s{/* Below: ADD <Navbar>, <Routes> & <Route> */}
                        <Navbar />
                        <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/projects" element={<ProjectListPage />} />
                                <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
                                <Route path="/projects/edit/:projectId" element={<EditProjectPage />} />
                                <Route path="/tasks/edit/:taskId" element={<EditTaskPage />} />
                        </Routes>
                </div>
        );
}

export default App;
