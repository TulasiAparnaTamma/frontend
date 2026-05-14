import { Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Sidebar from '../components/layout/Sidebar';
import StudentDashboard from './dashboards/StudentDashboard';
import FacultyDashboard from './dashboards/FacultyDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import { useLocation } from 'react-router-dom';

const DashboardRouter = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  const isRootDashboard = location.pathname === '/dashboard';

  return (
    <div className="flex bg-surface min-h-screen pt-24">
      <Sidebar />
      <div className="flex-1 p-8">
        {isRootDashboard ? (
          <>
            {user?.role === 'student' && <StudentDashboard />}
            {user?.role === 'faculty' && <FacultyDashboard />}
            {user?.role === 'admin' && <AdminDashboard />}
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default DashboardRouter;
