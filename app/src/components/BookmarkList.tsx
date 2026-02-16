'use client'

import { createClient } from '@/utils/supabase/client'
import { Bookmark } from '@/types/custom'
import { Card } from '@/components/ui/Card'
import { Trash2, ExternalLink, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface BookmarkListProps {
    bookmarks: Bookmark[]
    onDeleteAction: (id: string) => void
}

export default function BookmarkList({ bookmarks, onDeleteAction }: BookmarkListProps) {
    const supabase = createClient()

    const handleDelete = async (id: string) => {
        // Optimistically update UI
        onDeleteAction(id)

        try {
            const { error } = await supabase.from('bookmarks').delete().eq('id', id)
            if (error) {
                console.error('Error deleting bookmark:', error)
                alert('Failed to delete bookmark')
                // Ideally revert state here if needed, but for now we keep it simple
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    if (bookmarks.length === 0) {
        return (
            <div className="text-center py-20 opacity-50">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-xl font-medium text-gray-300">Your collection is empty</p>
                <p className="text-sm text-gray-500 mt-2">Paste a URL above to get started</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
                {bookmarks.map((bookmark, index) => (
                    <motion.div
                        key={bookmark.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        layout
                    >
                        <Card className="h-full flex flex-col justify-between group hover:border-brand-primary/30 transition-colors" hoverEffect>
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 p-2">
                                        <img
                                            src={`https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}&sz=32`}
                                            alt="Icon"
                                            className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleDelete(bookmark.id)}
                                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 leading-tight">
                                    {bookmark.title}
                                </h3>
                                <a
                                    href={bookmark.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-brand-primary hover:underline truncate block mb-4"
                                >
                                    {new URL(bookmark.url).hostname}
                                </a>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex justify-end">
                                <a
                                    href={bookmark.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition-colors"
                                >
                                    <span>Visit</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div >
    )
}
