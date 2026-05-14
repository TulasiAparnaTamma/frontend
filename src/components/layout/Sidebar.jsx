import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, CheckSquare, Library, Bell, Users, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';

const Sidebar = () => {
  const { user } = useAuthStore();

  const getNavLinks = () => {
    const commonLinks = [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Library', path: '/dashboard/library', icon: Library },
      { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    ];

    if (user?.role === 'student') {
      return [
        ...commonLinks,
        { name: 'Course Catalog', path: '/dashboard/catalog', icon: BookOpen },
        { name: 'My Courses', path: '/dashboard/courses', icon: BookOpen },
        { name: 'Assignments', path: '/dashboard/assignments', icon: FileText },
        { name: 'Quizzes', path: '/dashboard/quizzes', icon: CheckSquare },
      ];
    } else if (user?.role === 'faculty') {
      return [
        ...commonLinks,
        { name: 'Manage Courses', path: '/dashboard/courses', icon: BookOpen },
        { name: 'Create Course', path: '/dashboard/courses/new', icon: BookOpen },
        { name: 'Evaluate', path: '/dashboard/evaluate', icon: FileText },
        { name: 'Students', path: '/dashboard/students', icon: Users },
      ];
    } else if (user?.role === 'admin') {
      return [
        ...commonLinks,
        { name: 'Users', path: '/dashboard/users', icon: Users },
        { name: 'System Settings', path: '/dashboard/settings', icon: Settings },
      ];
    }
    return commonLinks;
  };

  const links = getNavLinks();

  return (
    <div className="w-72 hidden md:block px-4 py-8 sticky top-24 h-[calc(100vh-8rem)]">
      <div className="card h-full flex flex-col p-4">
        <div className="mb-6 px-4">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">
            Main Menu
          </p>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-text-secondary hover:text-primary hover:bg-surface-hover border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-primary' : 'text-text-muted group-hover:text-primary'}`} />
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-sm"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-border">
          <div className="p-4 card flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-medium text-text-secondary">System Status: Optimal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
