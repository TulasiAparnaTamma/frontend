import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

const Login = () => {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
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
            Unlock the <br /> 
            <span className="text-gradient">Next Generation</span> <br />
            of Learning.
          </h2>
          <div className="space-y-6">
            {[
              { icon: Sparkles, text: 'AI-Powered personalized roadmaps' },
              { icon: ShieldCheck, text: 'Industry-standard secure certifications' },
              { icon: Zap, text: 'Real-time collaborative workspace' }
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

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-text-primary mb-2">Welcome Back</h2>
            <p className="text-text-muted">
              New here? {' '}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
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
                <div className="flex justify-between mb-2 ml-1">
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest">Password</label>
                  <Link to="#" className="text-[10px] font-bold text-primary hover:underline">FORGOT PASSWORD?</Link>
                </div>
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading} size="lg">
              Sign In to Dashboard
            </Button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-surface px-4 text-text-secondary font-bold">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="secondary" className="w-full py-2">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </Button>
              <Button variant="secondary" className="w-full py-2">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                Github
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
