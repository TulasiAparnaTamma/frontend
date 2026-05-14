import { forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { Eye, EyeOff } from 'lucide-react';

const Input = forwardRef(({ className, type, error, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full space-y-1">
      <div className="relative group">
        <input
          type={inputType}
          className={cn(
            "flex w-full rounded-xl bg-surface border border-border px-4 py-3 text-sm text-text-primary ring-offset-surface transition-all duration-300 placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50",
            isPassword && "pr-12",
            error && "ring-2 ring-rose-500/50 border-rose-500/50",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-primary transition-colors rounded-lg hover:bg-surface-hover"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs font-medium text-rose-500 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
