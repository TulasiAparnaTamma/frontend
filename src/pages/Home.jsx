import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Shield, Zap, Sparkles, ArrowRight, Library, Book, PenTool, Monitor, GraduationCap, Laptop, Pencil } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';

const FloatingSymbols = () => {
  const symbols = [
    { Icon: Book, x: '8%', y: '15%', size: 64, delay: 0, color: 'text-primary/20' },
    { Icon: PenTool, x: '88%', y: '12%', size: 48, delay: 1, color: 'text-secondary/20' },
    { Icon: Monitor, x: '85%', y: '75%', size: 80, delay: 2, color: 'text-accent/20' },
    { Icon: GraduationCap, x: '12%', y: '75%', size: 56, delay: 0.5, color: 'text-primary/20' },
    { Icon: Laptop, x: '6%', y: '45%', size: 72, delay: 1.5, color: 'text-secondary/20' },
    { Icon: Pencil, x: '92%', y: '45%', size: 40, delay: 2.5, color: 'text-accent/20' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {symbols.map((sym, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${sym.color}`}
          style={{ left: sym.x, top: sym.y }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8 + (idx % 4) * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: sym.delay
          }}
        >
          <sym.Icon size={sym.size} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <div className="relative pt-24 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20 bg-gradient-to-br from-surface via-surface-hover to-surface">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-accent/15 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-40 z-10">
        <FloatingSymbols />
        <div className="container mx-auto max-w-7xl relative">
          {/* Central Glow to "pop" text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-surface/40 blur-[120px] rounded-full -z-10"></div>
          
          <div className="flex flex-col items-center text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-hover border border-border text-primary text-xs font-bold mb-8 backdrop-blur-xl shadow-sm">
                <Sparkles className="h-4 w-4" />
                <span className="tracking-widest uppercase">The Future of Education</span>
              </div>
              
              <h1 className="text-6xl lg:text-9xl font-black tracking-tighter text-text-primary mb-8 leading-[0.9] drop-shadow-md">
                MASTER YOUR <br />
                <span className="text-gradient">UNI-VERSE</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed font-semibold">
                Experience the world's most advanced AI-integrated learning ecosystem. 
                Sleek. Powerful. Futuristic. Designed for the elite academic elite.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-2xl mx-auto">
                <Link to="/register" className="w-full sm:w-auto">
                  <button className="btn-primary group text-lg px-8 py-4 flex items-center justify-center h-16 w-full min-w-[240px]">
                    Join the Revolution
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <button className="card hover:bg-surface-hover text-lg px-8 py-4 rounded-2xl font-bold transition-all text-text-primary border border-border hover:border-primary/50 flex items-center justify-center h-16 w-full min-w-[240px]">
                    Sign In to Portal
                  </button>
                </Link>
              </div>
            </motion.div>


          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative bg-surface-hover">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-24">
            <h2 className="text-xs font-bold tracking-[0.5em] text-primary uppercase mb-6">Technological Core</h2>
            <p className="text-4xl lg:text-6xl font-black text-text-primary mb-8">Architecting Future Minds</p>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">Beyond standard education. We've built a system that evolves with your intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: BookOpen, title: 'Quantum LMS', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
              { icon: Shield, title: 'Neural Security', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              { icon: Zap, title: 'AI Acceleration', color: 'text-amber-400', bg: 'bg-amber-400/10' },
              { icon: Library, title: 'Omni-Archive', color: 'text-secondary', bg: 'bg-secondary/10' },
              { icon: Award, title: 'Chain-Verify', color: 'text-rose-400', bg: 'bg-rose-400/10' },
              { icon: Users, title: 'Bio-Sync Sync', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
            ].map((feature, idx) => (
              <GlassCard key={idx} delay={idx * 0.1} className="hover:border-primary/50 group">
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed font-medium">
                  Experience next-level operational efficiency with our custom-tuned protocols designed for maximum data retention.
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
