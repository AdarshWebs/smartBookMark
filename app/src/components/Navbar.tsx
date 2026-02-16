'use client'

import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { LogOut, User as UserIcon, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navbar({ user }: { user: User }) {
    const supabase = createClient()
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 rounded-2xl glass-panel px-6 py-3 flex items-center justify-between"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/25">
                    <Sparkles className="text-white w-5 h-5 animate-pulse" />
                </div>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 hidden sm:block tracking-wide">
                    SmartBookmark
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5 shadow-inner">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold ring-2 ring-black/50">
                        {user.email?.[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-300 hidden sm:inline">{user.email}</span>
                </div>

                <button
                    onClick={handleLogout}
                    className="p-2.5 text-gray-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-transparent rounded-xl transition-all duration-300 group"
                    title="Sign Out"
                >
                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </button>
            </div>
        </motion.nav>
    )
}
