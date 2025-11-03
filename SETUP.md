# Typewriter Publishing System

A vintage typewriter interface where users can write and publish their thoughts to a public gallery.

## Features

- **12-line limit**: Hard cap on typing to keep content concise
- **Content moderation**: Client-side profanity filtering
- **Public gallery**: View all published writings
- **Shareable links**: Each writing gets a unique URL
- **No authentication**: Simple name-based publishing

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to the SQL Editor
3. Run this SQL to create the writings table:

```sql
CREATE TABLE writings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_flagged BOOLEAN DEFAULT FALSE
);
```

4. Go to Settings > API to get your project URL and anon key
5. Create a `.env.local` file in the project root:

```
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run the Application

```bash
npm run dev
```

## Usage

1. **Write**: Type on the virtual typewriter (max 12 lines)
2. **Publish**: Click "Publish" to share your writing with your name
3. **Gallery**: View all published writings in the gallery
4. **Share**: Copy shareable links for individual writings

## Technical Details

- **Frontend**: React + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + REST API)
- **Content Moderation**: bad-words library
- **Routing**: React Router
- **Styling**: CSS with responsive design

## File Structure

```
src/
├── components/
│   ├── typewriter1.tsx    # Main typewriter interface
│   ├── PublishModal.tsx   # Publishing dialog
│   └── Gallery.tsx        # Public gallery view
├── pages/
│   └── SharedWriting.tsx  # Individual writing view
├── lib/
│   ├── supabase.ts        # Supabase client
│   └── moderation.ts     # Content moderation
└── App.tsx               # Main app with routing
```
