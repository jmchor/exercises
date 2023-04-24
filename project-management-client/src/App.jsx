import axios from 'axios';
import './App.css';
import { Routes, Route } from 'react-router-dom'; // <== IMPORT

import Navbar from './components/Navbar'; // <== IMPORT
import HomePage from './pages/HomePage'; // <== IMPORT
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import EditProjectPage from './pages/EditProjectPage';
import EditTaskPage from './pages/EditTaskPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsPrivate from './components/isPrivate';
import IsAnon from './components/isAnon';

function App() {
        return (
                <div className="App">
                        {/* Below: ADD <Navbar>, <Routes> & <Route> */}
                        <Navbar />
                        <Routes>
                                <Route path="/" element={<HomePage />} />

                                {/*   UPDATE THE BELOW ROUTES   */}
                                <Route
                                        path="/projects"
                                        element={
                                                <IsPrivate>
                                                        {' '}
                                                        <ProjectListPage />{' '}
                                                </IsPrivate>
                                        }
                                />

                                <Route
                                        path="/projects/:projectId"
                                        element={
                                                <IsPrivate>
                                                        {' '}
                                                        <ProjectDetailsPage />{' '}
                                                </IsPrivate>
                                        }
                                />

                                <Route
                                        path="/projects/edit/:projectId"
                                        element={
                                                <IsPrivate>
                                                        {' '}
                                                        <EditProjectPage />{' '}
                                                </IsPrivate>
                                        }
                                />

                                <Route
                                        path="/signup"
                                        element={
                                                <IsAnon>
                                                        {' '}
                                                        <SignupPage />{' '}
                                                </IsAnon>
                                        }
                                />
                                <Route
                                        path="/login"
                                        element={
                                                <IsAnon>
                                                        {' '}
                                                        <LoginPage />{' '}
                                                </IsAnon>
                                        }
                                />
                        </Routes>
                </div>
        );
}

export default App;
