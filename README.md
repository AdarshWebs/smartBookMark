# Smart Bookmark App

A premium, intelligent bookmark manager built with **Next.js 14 (App Router)**, **Supabase**, and **Tailwind CSS**.

## Features

- **Google Authentication**: Secure login via Supabase Auth.
- **Real-time Updates**: Bookmarks appear instantly across devices without refreshing.
- **Private & Secure**: Row Level Security (RLS) ensures users only see their own bookmarks.
- **Premium UI**: Glassmorphic design with smooth animations using Framer Motion.

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js installed.
- A Supabase project.

### 2. Supabase Configuration (CRITICAL)

You must set up your Supabase project manually as follows:

**A. Create the Table**
Run this SQL in your Supabase SQL Editor:
```sql
create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  created_at timestamptz default now()
);

alter table bookmarks enable row level security;

create policy "Users can view their own bookmarks"
on bookmarks for select
using ( auth.uid() = user_id );

create policy "Users can insert their own bookmarks"
on bookmarks for insert
with check ( auth.uid() = user_id );

create policy "Users can delete their own bookmarks"
on bookmarks for delete
using ( auth.uid() = user_id );
```

**B. Enable Realtime**
1. Go to **Database** -> **Replication**.
2. Click the source (`supabase_realtime` or similar).
3. Toggle the **Insert**, **Update**, and **Delete** events for the `bookmarks` table.

**C. Enable Google Auth**
1. Go to **Authentication** -> **Providers**.
2. Enable **Google**.
3. Configure your Client ID and Secret (from Google Cloud Console).
4. Add `https://<your-project>.supabase.co/auth/v1/callback` to your Google Authorized Redirect URIs.

### 3. Environment Variables
Ensure you have a `.env.local` file in the root:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

## 📦 Deployment to Vercel

1. Push this code to a GitHub repository.
2. Import the project into Vercel.
3. Add the Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel project settings.
4. Deploy!
