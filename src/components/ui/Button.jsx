import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Button = forwardRef(({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
  const variants = {
    primary: 'bg-primary text-text-inverse hover:shadow-neon hover:bg-primary-hover border-transparent',
    secondary: 'bg-surface-hover text-text-primary border-border hover:bg-border',
    outline: 'bg-transparent border-primary/50 text-primary hover:bg-primary/10',
    ghost: 'bg-transparent text-text-secondary hover:text-primary hover:bg-surface-hover border-transparent',
    danger: 'bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
    icon: 'p-2',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export { Button };
