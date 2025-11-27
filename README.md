iGottaPee

A bathroom-locator web app built with Next.js, Supabase, and Leaflet.
The project includes a public map for users and a secure admin panel for managing bathroom locations.

Tech Stack

Next.js (App Router)

Supabase — Database, Auth, and future Storage

Leaflet — Interactive map and pins

TailwindCSS — Styling

Local Development

Install dependencies:

npm install


Run the local server:

npm run dev


The app will be available at:

http://localhost:3000


Environment variables must be set in .env.local:

NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret

Project Structure
app/
  map/                  → Public map page
  admin/
    login/              → Admin login page
    bathrooms/          → Admin bathroom list, add, edit
components/
  UI/                   → Shared UI components
  admin/                → Admin-specific components
lib/
  supabase/             → Client + server Supabase helpers

Core Features (Phase 1 MVP)

Public Leaflet map

Bathroom pins loaded from Supabase

Admin authentication

Add Bathroom (no photos)

Edit + Delete Bathroom

Admin filters (ZIP, neighborhood, search)

Success/error banners

Planned Features

GPS “Find Nearest Bathroom”

Photo uploads (Supabase Storage)

Better mobile UI

PWA install option

Ratings + reviews

Favorites

Search + filters for public map

Deployment

This project is built for deployment on Vercel.
Push to GitHub → Vercel auto-builds and deploys.