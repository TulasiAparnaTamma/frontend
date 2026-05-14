import { useState, useEffect } from 'react';
import { Users, BookOpen, ShieldCheck, Activity, Search, Filter, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../store/authStore';
import { GlassCard } from '../../components/ui/GlassCard';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch users');
      setLoading(false);
    }
  };

  const studentsCount = users.filter(u => u.role === 'student').length;
  const facultyCount = users.filter(u => u.role === 'faculty').length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">System Core</h1>
          <p className="text-text-muted mt-1">Global administrative controls and infrastructure monitoring.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-bold text-emerald-500">NODE STATUS: ONLINE</span>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Node Users', value: users.length, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Active Students', value: studentsCount, icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Faculty Assets', value: facultyCount, icon: ShieldCheck, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'System Uptime', value: '99.9%', icon: Activity, color: 'text-secondary', bg: 'bg-secondary/10' },
        ].map((stat, idx) => (
          <GlassCard key={idx} delay={idx * 0.1} className="flex items-center gap-4 p-5">
            <div className={`p-3 rounded-2xl ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Users Table Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
          <h3 className="text-xl font-bold text-text-primary">User Directory</h3>
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input 
                placeholder="Search users..." 
                className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-xl text-sm text-text-primary focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
              />
            </div>
            <button className="p-2 card text-text-secondary hover:text-primary hover:bg-surface-hover transition-colors">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        <GlassCard className="p-0 overflow-hidden" hover={false}>
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center gap-4">
              <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="text-text-muted font-bold text-xs tracking-widest uppercase">Initializing Directory...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-surface-hover">
                  <tr>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Identity</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Email Anchor</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Protocol Role</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Registered</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Status</th>
                    <th className="px-6 py-4 text-right text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-transparent">
                  {users.slice(0, 8).map((u, idx) => (
                    <motion.tr 
                      key={u._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      className="hover:bg-surface-hover transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img className="h-9 w-9 rounded-xl border border-border group-hover:border-primary/30 transition-colors" src={u.avatar} alt="" />
                          <div className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{u.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{u.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-[10px] font-bold rounded-lg border ${
                          u.role === 'admin' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                          u.role === 'faculty' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                          'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        } uppercase tracking-wider`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                          <span className="text-[10px] font-bold text-text-muted uppercase">Active</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="p-2 text-text-secondary hover:text-primary transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
