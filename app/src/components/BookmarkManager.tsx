'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Bookmark } from '@/types/custom'
import { User } from '@supabase/supabase-js'
import AddBookmarkForm from './AddBookmarkForm'
import BookmarkList from './BookmarkList'
import { Loader2 } from 'lucide-react'

export default function BookmarkManager({ user }: { user: User }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchBookmarks = async () => {
            const { data } = await supabase
                .from('bookmarks')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (data) {
                setBookmarks(data as Bookmark[])
            }
            setLoading(false)
        }

        fetchBookmarks()

        const channel = supabase
            .channel('realtime bookmarks')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setBookmarks((prev) => [payload.new as Bookmark, ...prev])
                    } else if (payload.eventType === 'DELETE') {
                        setBookmarks((prev) =>
                            prev.filter((bookmark) => bookmark.id !== payload.old.id)
                        )
                    } else if (payload.eventType === 'UPDATE') {
                        setBookmarks((prev) =>
                            prev.map((bookmark) =>
                                bookmark.id === payload.new.id
                                    ? (payload.new as Bookmark)
                                    : bookmark
                            )
                        )
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, user.id])

    const handleAdd = (newBookmark: Bookmark) => {
        setBookmarks((prev) => [newBookmark, ...prev])
    }

    const handleDelete = (id: string) => {
        setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id))
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center animate-pulse">
                    <Loader2 className="w-6 h-6 animate-spin text-brand-primary" />
                </div>
                <p className="text-gray-500 text-sm">Syncing your library...</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <AddBookmarkForm userId={user.id} onAddAction={handleAdd} />
            <BookmarkList bookmarks={bookmarks} onDeleteAction={handleDelete} />
        </div>
    )
}
