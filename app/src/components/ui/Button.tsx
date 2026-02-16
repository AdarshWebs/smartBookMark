import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    isLoading?: boolean
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

export function Button({
    children,
    className,
    isLoading,
    variant = 'primary',
    size = 'md',
    disabled,
    ...props
}: ButtonProps) {
    const variants = {
        primary:
            'bg-brand-primary hover:bg-brand-secondary text-white shadow-lg shadow-brand-primary/25 border border-white/10 relative overflow-hidden group',
        secondary:
            'glass-button text-white hover:text-white',
        danger:
            'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20',
        ghost:
            'bg-transparent hover:bg-white/5 text-gray-400 hover:text-white',
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base'
    }

    return (
        <button
            disabled={disabled || isLoading}
            className={clsx(
                'relative flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {variant === 'primary' && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            )}

            {isLoading && <Loader2 className="w-4 h-4 animate-spin absolute left-1/2 -ml-2" />}
            <span className={clsx(isLoading && 'opacity-0', 'relative z-10 flex items-center gap-2')}>{children}</span>
        </button>
    )
}
