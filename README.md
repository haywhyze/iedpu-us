# IEDPU-USA

Web application for the **Ilorin Emirate Descendants Progressive Union** (USA Chapter). The platform serves as a hub for members to stay connected, access organization news, view events, and manage their profiles. Admins can manage members, payments, events, news articles, leadership records, and the photo gallery.

## Tech Stack

- **Frontend:** Next.js 12, React 17, Material-UI, Emotion, SASS
- **Backend:** Firebase Cloud Functions (Node.js 16)
- **Database:** Cloud Firestore
- **Auth:** Firebase Authentication (Email/Password, Google, Facebook)
- **Hosting:** Firebase Hosting with Cloud Function rewrites
- **Media:** Cloudinary (profile photo uploads)

## Project Structure

```
src/
├── app/                  # Next.js application
│   ├── pages/            # Routes (index, about, events, news, gallery, history, profile, admin)
│   ├── components/       # Reusable UI components (Header, Footer, Navbar, Sidebar, etc.)
│   ├── Sections/         # Page-specific content sections
│   ├── views/            # Admin dashboard views
│   ├── assets/           # Styles (JSS, SCSS) and static images
│   ├── firebaseConfig.js # Firebase client config
│   └── routes.js         # Admin dashboard route definitions
└── functions/            # Firebase Cloud Functions
    └── index.js          # Auth triggers + Next.js SSR handler
```

## Public Pages

- **Home** — Landing page with hero section and donate button
- **About** — Organization info, Executives, Board of Trustees, Advisory Council
- **Events** — Upcoming and past events
- **News** — Articles and updates
- **Gallery** — Photo gallery
- **History** — Historical content about Ilorin Emirate
- **Profile** — Member profile management

## Admin Dashboard

Accessible to authorized admins. Sections include:

- Dashboard overview
- Members management
- Payments & donations tracking
- Events & meetings (CRUD)
- News & articles (CRUD)
- Executives, Board of Trustees, Advisory Council management
- Gallery management

## Getting Started

### Prerequisites

- Node.js 16+
- Firebase CLI: `npm i -g firebase-tools`
- A Firebase project ([create one here](https://console.firebase.google.com/))

### Setup

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Update `.firebaserc` with your Firebase project ID.

3. Create `src/app/.env.local` with your Firebase and Cloudinary config.

4. Log in to Firebase:

   ```bash
   firebase login
   ```

### Development

```bash
npm run dev
```

### Local Firebase Testing

```bash
npm run serve
```

### Deploy

```bash
npm run deploy
```

### Clean Build

```bash
npm run clean
```

## Notes

- The Next.js app is served via a Firebase Cloud Function, with Firebase Hosting rewrite rules directing all traffic to it.
- On user signup, a Cloud Function trigger automatically creates a Firestore profile document. On deletion, it cleans up the profile.
- Admin access is controlled via Firebase custom claims assigned to specific email addresses in the Cloud Functions.
