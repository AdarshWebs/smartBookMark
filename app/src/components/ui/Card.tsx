import { ReactNode } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

interface CardProps {
    children: ReactNode
    className?: string
    noPadding?: boolean
    hoverEffect?: boolean
}

export function Card({ children, className, noPadding = false, hoverEffect = false }: CardProps) {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -5, scale: 1.01 } : {}}
            className={clsx(
                'glass-panel rounded-2xl overflow-hidden relative group',
                !noPadding && 'p-6',
                className
            )}
        >
            {hoverEffect && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}
            {children}
        </motion.div>
    )
}
