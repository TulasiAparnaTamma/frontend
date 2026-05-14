import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CourseCatalog from './pages/dashboards/CourseCatalog';
import CreateCourse from './pages/dashboards/CreateCourse';
import CoursePlayer from './pages/dashboards/CoursePlayer';
import Assignments from './pages/dashboards/Assignments';
import Quizzes from './pages/dashboards/Quizzes';
import Library from './pages/dashboards/Library';
import Notifications from './pages/dashboards/Notifications';

import ManageCourses from './pages/dashboards/ManageCourses';
import FacultyCourseDashboard from './pages/dashboards/FacultyCourseDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="catalog" element={<CourseCatalog />} />
                <Route path="courses/new" element={<CreateCourse />} />
                <Route path="courses/:id/play" element={<CoursePlayer />} />
                <Route path="courses/:id/manage" element={<FacultyCourseDashboard />} />
                <Route path="library" element={<Library />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="courses" element={<ManageCourses />} />
                <Route path="assignments" element={<Assignments />} />
                <Route path="quizzes" element={<Quizzes />} />
                <Route path="users" element={<div className="p-4 card">User Management Placeholder</div>} />
                <Route path="settings" element={<div className="p-4 card">System Settings Placeholder</div>} />
              </Route>
            </Route>
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
