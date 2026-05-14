import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const GlassCard = ({ children, className, hover = true, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "card p-6",
        hover && "card-hover",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
