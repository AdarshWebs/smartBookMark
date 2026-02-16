import { InputHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2 w-full">
                {label && (
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-primary transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={clsx(
                            'w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all duration-300 rounded-xl',
                            icon ? 'pl-11 pr-4 py-3' : 'px-4 py-3',
                            error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20',
                            className
                        )}
                        {...props}
                    />
                    {/* Glow effect on focus */}
                    <div className="absolute inset-0 -z-10 rounded-xl bg-brand-primary/0 group-focus-within:bg-brand-primary/10 blur-md transition-all duration-300" />
                </div>

                {error && (
                    <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 ml-1"
                    >
                        {error}
                    </motion.span>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'
