'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Plus, Link as LinkIcon, Type } from 'lucide-react'
import { motion } from 'framer-motion'

import { Bookmark } from '@/types/custom'

export default function AddBookmarkForm({ userId, onAddAction }: { userId: string, onAddAction: (b: Bookmark) => void }) {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!url) return

        setIsLoading(true)

        try {
            // Get the current user directly from the client to ensure session is valid
            const { data: { user }, error: authError } = await supabase.auth.getUser()

            if (authError || !user) {
                throw new Error('You must be logged in to add a bookmark.')
            }

            const { data, error } = await supabase.from('bookmarks').insert({
                title: title || new URL(url).hostname, // Fallback title
                url,
                user_id: user.id, // Use the verified user ID from the active session
            }).select().single()

            if (error) {
                console.error('Error adding bookmark:', JSON.stringify(error, null, 2))
                alert(`Error: ${error.message || 'Failed to add bookmark'}. \n\nDid you run the SQL commands in the Supabase Dashboard?`)
            } else if (data) {
                onAddAction(data as Bookmark)
                setTitle('')
                setUrl('')
                setIsOpen(false)
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            layout
            className="mb-12 relative z-20"
        >
            <div className="glass-panel rounded-2xl p-2 flex items-center gap-2 shadow-2xl shadow-brand-primary/10 border-white/10">
                <div className="flex-1">
                    <input
                        type="url"
                        placeholder="Paste a URL to save..."
                        className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 px-4 py-3 h-14"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                    />
                </div>
                <Button
                    onClick={handleSubmit}
                    disabled={!url || isLoading}
                    isLoading={isLoading}
                    className="h-12 w-12 !p-0 rounded-xl flex-shrink-0"
                >
                    <Plus className="w-6 h-6" />
                </Button>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                >
                    <div className="pt-2 px-2">
                        <Input
                            placeholder="Add a custom title (optional)"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            icon={<Type className="w-4 h-4" />}
                            className="bg-white/5 border-white/5"
                        />
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}
