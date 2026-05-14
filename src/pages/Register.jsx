import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, UserPlus, ShieldCheck, Sparkles } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['student', 'faculty', 'admin'])
});

const Register = () => {
  const { register: registerUser, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'student' }
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password, data.role);
      toast.success('Registered successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-surface overflow-hidden">
      {/* Left Side - Visual Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-surface-hover overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-mesh opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary rounded-2xl shadow-sm">
              <BookOpen className="h-8 w-8 text-text-inverse" />
            </div>
            <span className="text-3xl font-bold text-text-primary tracking-tight">LearNova</span>
          </div>
          <h2 className="text-5xl font-bold text-text-primary mb-6 leading-tight">
            Start Your <br /> 
            <span className="text-gradient">Academic Journey</span> <br />
            Today.
          </h2>
          <div className="space-y-6">
            {[
              { icon: UserPlus, text: 'Join a community of 12k+ learners' },
              { icon: ShieldCheck, text: 'Industry-standard secure certifications' },
              { icon: Sparkles, text: 'AI-Powered personalized roadmaps' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-text-secondary">
                <div className="p-2 bg-surface rounded-lg border border-border">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-primary/20 blur-[100px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-secondary/20 blur-[100px] rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-2">Create Account</h2>
            <p className="text-text-muted">
              Already have an account? {' '}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <Input
                  {...register('name')}
                  type="text"
                  placeholder="John Doe"
                  error={errors.name?.message}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="name@example.com"
                  error={errors.email?.message}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 ml-1">Password</label>
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 ml-1">Account Role</label>
                <select
                  {...register('role')}
                  className="w-full rounded-xl bg-surface border border-border px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none appearance-none"
                >
                  <option value="student" className="bg-surface">Student</option>
                  <option value="faculty" className="bg-surface">Faculty</option>
                  <option value="admin" className="bg-surface">Admin</option>
                </select>
                {errors.role && <p className="mt-1 text-xs text-rose-500 ml-1 font-medium">{errors.role.message}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full mt-4" isLoading={isLoading} size="lg">
              Create Account
            </Button>
            
            <p className="text-center text-[10px] text-text-muted mt-6 px-8 leading-relaxed">
              By signing up, you agree to our <Link to="#" className="text-text-secondary hover:underline">Terms of Service</Link> and <Link to="#" className="text-text-secondary hover:underline">Privacy Policy</Link>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
