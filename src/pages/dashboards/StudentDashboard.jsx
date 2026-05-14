import { BookOpen, Clock, Award, Bell, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../components/ui/GlassCard';

const StudentDashboard = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Academic Pulse</h1>
          <p className="text-text-muted mt-1">Monitoring your learning trajectory and upcoming milestones.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 card flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-text-primary">May 13, 2026</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Courses', value: '4', icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Certifications', value: '1', icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Hours Learned', value: '42.5', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Global Rank', value: '#128', icon: TrendingUp, color: 'text-secondary', bg: 'bg-secondary/10' },
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
        {/* Active Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-text-primary">Continue Learning</h3>
            <button className="text-xs font-bold text-primary hover:underline">VIEW ALL</button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: 'Advanced Web Architecture', module: 'Module 4: Distributed Systems', progress: 75, color: 'bg-primary' },
              { title: 'Neural Networks & Deep Learning', module: 'Module 2: Backpropagation', progress: 30, color: 'bg-secondary' },
            ].map((course, idx) => (
              <GlassCard key={idx} delay={0.4 + (idx * 0.1)} className="group cursor-pointer">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-surface-hover flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                      <BookOpen className="h-6 w-6 text-text-muted group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary group-hover:text-primary transition-colors">{course.title}</h4>
                      <p className="text-xs text-text-secondary mt-1">{course.module}</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-48">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Progress</span>
                      <span className="text-xs font-bold text-text-primary">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className={`h-full ${course.color} shadow-sm`}
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Upcoming Events / Deadlines */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-text-primary">Upcoming</h3>
            <Bell className="h-4 w-4 text-text-muted" />
          </div>
          
          <GlassCard className="p-0 overflow-hidden border-border">
            <div className="p-6 space-y-6">
              {[
                { title: 'Capstone Project', date: 'Tomorrow, 11:59 PM', type: 'Submission', border: 'border-amber-500/50' },
                { title: 'Cloud Infrastructure Quiz', date: 'Friday, 10:00 AM', type: 'Exam', border: 'border-rose-500/50' },
              ].map((event, idx) => (
                <div key={idx} className={`p-4 bg-surface-hover rounded-xl border-l-4 ${event.border} group cursor-pointer hover:bg-border transition-colors`}>
                  <p className="text-sm font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">{event.title}</p>
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-text-muted uppercase tracking-widest">{event.date}</span>
                    <span className="text-primary">{event.type}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-surface-hover text-[10px] font-bold text-text-secondary hover:text-primary hover:bg-primary/10 transition-all uppercase tracking-widest border-t border-border">
              Open Academic Calendar
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
