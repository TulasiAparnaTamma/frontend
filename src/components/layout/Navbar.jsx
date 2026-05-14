import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, Bell } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { Button } from '../ui/Button';
import { api } from '../../store/authStore';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Fetch initial unread count
      api.get('/notifications').then(res => {
        const unread = res.data.filter(n => !n.isRead).length;
        setUnreadCount(unread);
      }).catch(err => console.error(err));

      // Setup Socket.io
      const socket = io('http://localhost:5001');
      socket.emit('join', user._id);

      socket.on('newNotification', (notification) => {
        setUnreadCount(prev => prev + 1);
        toast(notification.title, { icon: '🔔' });
      });

      return () => socket.disconnect();
    }
  }, [isAuthenticated, user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="card bg-surface/80 rounded-2xl px-4 sm:px-6 lg:px-8 shadow-sm backdrop-blur-xl border-border">
        <div className="flex h-16 justify-between items-center">
          <div className="flex">
            <Link to="/" className="flex flex-shrink-0 items-center group">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <span className="ml-3 text-xl font-bold text-text-primary tracking-tight">LearNova</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="hidden md:flex items-center space-x-6">
              {['Features', 'About', 'Pricing'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-text-secondary hover:text-primary font-medium transition-colors">
                  {item}
                </a>
              ))}
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3 sm:gap-6">
                <Link to="/dashboard" className="text-sm text-text-secondary hover:text-primary font-medium transition-colors">
                  Dashboard
                </Link>
                <div className="h-6 w-[1px] bg-border hidden sm:block"></div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <Link to="/dashboard/notifications" className="relative p-2 text-text-secondary hover:text-primary hover:bg-surface-hover rounded-full transition-all">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 bg-primary text-text-inverse text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-surface">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Link>
                  <div className="flex items-center gap-3 p-1 pl-2 pr-1 rounded-xl bg-surface-hover border border-border hover:bg-border transition-colors group cursor-pointer">
                    <div className="hidden sm:block text-right">
                      <span className="block text-xs font-bold text-text-primary leading-none">{user?.name}</span>
                      <span className="block text-[10px] text-text-secondary capitalize mt-0.5">{user?.role}</span>
                    </div>
                    <img src={user?.avatar} alt="avatar" className="h-8 w-8 rounded-lg border border-border object-cover" />
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleLogout} className="text-text-secondary hover:text-rose-500 hover:bg-rose-500/10">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
