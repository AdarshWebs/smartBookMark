import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import BookmarkManager from '@/components/BookmarkManager'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background relative selection:bg-brand-primary/30 selection:text-white">

      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-[120px] animate-float opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-secondary/10 rounded-full blur-[120px] animate-float animation-delay-4000 opacity-50"></div>
      </div>

      <Navbar user={user} />

      <main className="max-w-6xl mx-auto px-6 py-28 relative z-10">
        <header className="mb-16 text-center sm:text-left">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-gray-500 mb-4 tracking-tight leading-tight">
            My Collection
          </h1>
          <p className="text-lg text-gray-400 font-light max-w-xl">
            Organize, access, and manage your intelligent bookmarks in one beautiful space.
          </p>
        </header>

        <BookmarkManager user={user} />
      </main>
    </div>
  )
}
