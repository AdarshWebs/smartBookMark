'use client'

import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import { Chrome, Bookmark } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
    const supabase = createClient()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {
        setIsLoading(true)
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

            {/* Animated Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl animate-blob mix-blend-screen"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl animate-blob animation-delay-2000 mix-blend-screen"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl animate-blob animation-delay-4000 mix-blend-screen"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass-panel p-10 rounded-3xl shadow-2xl max-w-md w-full text-center relative z-10 border-t border-white/10"
            >
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                    <Bookmark className="w-8 h-8 text-white" />
                </div>

                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-3 tracking-tight">
                    Welcome Back
                </h1>
                <p className="text-gray-400 mb-8 text-lg font-light leading-relaxed">
                    Your digital world, organized beautifully.
                </p>

                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="group w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-4 px-6 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <Chrome className="w-5 h-5 text-blue-600 transition-transform group-hover:rotate-12" />
                    )}
                    <span>{isLoading ? 'Connecting...' : 'Continue with Google'}</span>
                </button>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-xs text-gray-500">
                        Secure enterprise-grade authentication powered by Supabase.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
