# Snapbio

![Next.js](https://img.shields.io/badge/Next.js-16.2.7-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-powered-green?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4.0-skyblue?logo=tailwindcss)

---

<p align="center">
  <img src="https://img.shields.io/badge/Link%20in%20Bio%20Builder-Snapbio-purple?style=for-the-badge&logo=linktree" alt="Snapbio banner" />
</p>

## What is Snapbio? 🚀

Snapbio is a modern, polished bio link platform built with Next.js and MongoDB. It lets users create an elegant personal landing page with reusable links, custom themes, icons, and analytics.

It is designed for creators, freelancers, small teams, and anyone who wants a beautiful single-page presence to share on social media.

---

## Key Features ✨

- **Link Builder**: Add, edit, reorder, and toggle link visibility with drag-and-drop.
- **Theme Picker**: Choose from free and Pro themes to personalize your page.
- **Profile Management**: Customize name, bio, username, avatar, and profile details.
- **Public Bio Pages**: Each user gets a sharable `https://your-site.com/<username>` link page.
- **Realtime UI**: Smooth, responsive client UI powered by React, Framer Motion, and Tailwind.
- **Authentication**: NextAuth credential + Google sign-in support.
- **Analytics**: Click tracking, top links, click distribution, and stats for Pro users.
- **Admin & API-ready**: Built with Next.js API routes and MongoDB for extensibility.

---

## Product Tour 🧭

- `/` — Landing page with marketing, CTA, and demo preview.
- `/auth/signin` — Sign in with email/password or Google.
- `/auth/signup` — Create a new account.
- `/dashboard` — Account overview with links and click stats.
- `/dashboard/builder` — Full link editor, icon picker, and theme manager.
- `/demo` — Example preview page.
- `/<username>` — Public bio page powered by your saved links and theme.

---

## Built With 🛠️

- Next.js 16
- React 19
- Tailwind CSS v4
- MongoDB + Mongoose
- NextAuth
- Zustand
- Framer Motion
- Sonner
- lucide-react
- react-icons
- @hello-pangea/dnd
- shadcn/ui

---

## Getting Started 💻

### Prerequisites

- Node.js 20+
- pnpm, npm, or yarn
- MongoDB database

### Install

```bash
pnpm install
```

### Environment Variables

Create a `.env` file at the project root with at least:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

If you want Google sign-in, also add:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Run Locally

```bash
pnpm dev
```

Open `http://localhost:3000` to view the app.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Project Structure 📁

- `app/` — Next.js app routes, pages, and API entrypoints.
- `components/` — Reusable UI components like icon pickers and navigation.
- `lib/` — Shared utilities for auth, database, themes, and avatars.
- `models/` — Mongoose models for `User`, `Link`, `Click`, and more.
- `stores/` — Client state store using Zustand.
- `public/` — Static assets, favicons, and images.

---

## API & Data Flow 🔁

Notable API routes:

- `app/api/auth/[...nextauth]/route.js` — NextAuth session handling.
- `app/api/auth/signup/route.js` — Signup endpoint.
- `app/api/links/route.js` — Create links.
- `app/api/links/[id]/route.js` — Update / delete links.
- `app/api/links/reorder/route.js` — Reorder links.
- `app/api/user/update/route.js` — Profile updates and theme selection.
- `app/api/analytics/route.js` — Pro analytics data.

Data is stored in MongoDB and retrieved by server components for secure rendering.

---

## Notes 📝

- Pro-only themes and analytics are gated by the `isPro` user flag.
- Link limits and upgrade requirements are enforced server-side.
- The public profile page renders with the selected theme and active links.

---

## Contributing 🤝

1. Fork the repo
2. Create a feature branch
3. Install dependencies
4. Submit a pull request

If you want to add more theme designs, analytics charts, or new social integrations, this codebase is ready for extension.

---

## License

This repository does not currently specify a license.

---

## Final Thoughts 💡

Snapbio is a polished, production-ready link-in-bio starter with a strong focus on design, flexibility, and end-user experience. It is ideal for launching a custom landing page product or building a fully-branded creator hub.
