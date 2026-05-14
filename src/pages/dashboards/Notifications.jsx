import { useState, useEffect } from 'react';
import { api } from '../../store/authStore';
import { Bell, Check, Trash2, Info, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/notifications');
      setNotifications(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load notifications');
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error(error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      toast.success('All marked as read');
    } catch (error) {
      console.error(error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'assignment': return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'quiz': return <AlertTriangle className="h-5 w-5 text-rose-500" />;
      default: return <Info className="h-5 w-5 text-primary" />;
    }
  };

  if (loading) return <div className="animate-pulse p-4 text-text-muted">Loading notifications...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Notifications</h2>
        <Button variant="outline" size="sm" onClick={markAllAsRead}>
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </div>

      <div className="card overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-text-muted flex flex-col items-center">
            <Bell className="h-12 w-12 text-text-muted/50 mb-4" />
            <p className="text-lg font-medium">No notifications yet</p>
            <p className="text-sm">You're all caught up!</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {notifications.map((notification) => (
              <li 
                key={notification._id} 
                className={`p-4 hover:bg-surface-hover transition-colors flex items-start gap-4 cursor-pointer ${!notification.isRead ? 'bg-primary/5' : ''}`}
                onClick={() => !notification.isRead && markAsRead(notification._id)}
              >
                <div className="mt-1 flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className={`text-sm font-medium ${!notification.isRead ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {notification.title}
                    </p>
                    <span className="text-xs text-text-muted whitespace-nowrap">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
