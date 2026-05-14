import { Users, BookOpen, FileText, BarChart, Plus, Bell, GraduationCap, ArrowUpRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { GlassCard } from '../../components/ui/GlassCard';

const FacultyDashboard = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Faculty Console</h1>
          <p className="text-text-muted mt-1">Managing educational assets and student performance.</p>
        </div>
        <Button className="group shadow-sm">
          <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
          Create New Course
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Courses', value: '3', icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Total Students', value: '142', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Pending Grading', value: '28', icon: FileText, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Avg Performance', value: '85%', icon: BarChart, color: 'text-secondary', bg: 'bg-secondary/10' },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Submissions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-text-primary">Grading Queue</h3>
            <button className="text-xs font-bold text-primary hover:underline">MANAGE ALL</button>
          </div>
          
          <div className="space-y-4">
            {[
              { student: 'John Doe', project: 'Neural Networks Final', time: '2 hours ago', avatar: 'https://i.pravatar.cc/150?u=1' },
              { student: 'Sarah Smith', project: 'Distributed Systems Project', time: '5 hours ago', avatar: 'https://i.pravatar.cc/150?u=2' },
              { student: 'Mike Johnson', project: 'Cloud Infrastructure Paper', time: '1 day ago', avatar: 'https://i.pravatar.cc/150?u=3' },
            ].map((sub, idx) => (
              <GlassCard key={idx} delay={0.4 + (idx * 0.1)} className="group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={sub.avatar} alt="" className="h-10 w-10 rounded-xl border border-border" />
                    <div>
                      <h4 className="font-bold text-text-primary group-hover:text-primary transition-colors">{sub.student}</h4>
                      <p className="text-xs text-text-secondary mt-0.5">{sub.project} • <span className="text-primary/80">{sub.time}</span></p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="group-hover:bg-primary group-hover:text-text-inverse transition-all duration-300">
                    Grade Now
                    <ArrowUpRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-text-primary">Quick Actions</h3>
            <Zap className="h-4 w-4 text-primary" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: GraduationCap, label: 'Add Material', color: 'text-blue-500' },
              { icon: FileText, label: 'Create Quiz', color: 'text-amber-500' },
              { icon: Users, label: 'Attendance', color: 'text-emerald-500' },
              { icon: Bell, label: 'Broadcast', color: 'text-rose-500' },
            ].map((action, idx) => (
              <button 
                key={idx}
                className="card border border-border hover:border-primary/30 hover:bg-surface-hover transition-all duration-300 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 group"
              >
                <div className={`p-3 rounded-xl bg-surface group-hover:bg-primary/10 transition-colors`}>
                  <action.icon className={`h-6 w-6 ${action.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest group-hover:text-primary transition-colors">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
