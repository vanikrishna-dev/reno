# Notice Board

A full-stack Notice Board application built with Next.js, Prisma, and TiDB Cloud (MySQL). Supports full CRUD operations with server-side validation.

## Live URL
https://reno-notice-board.vercel.app

## Tech Stack
- **Framework**: Next.js (Pages Router)
- **Database ORM**: Prisma v5
- **Database**: TiDB Cloud (MySQL-compatible, free tier)
- **Styling**: Tailwind CSS v4
- **Hosting**: Vercel (free tier)

## How to Run Locally

### 1. Clone the repository
git clone https://github.com/vanikrishna-dev/reno.git
cd reno/notice-board

### 2. Install dependencies
npm install

### 3. Set up environment variables
Create a `.env` file in the root of the `notice-board` folder:
DATABASE_URL="your-tidb-connection-string-here"

### 4. Push Prisma schema to database
npx prisma db push

### 5. Start the development server
npm run dev

Open http://localhost:3000 in your browser.

## Features
- Create, read, update and delete notices
- Server-side input validation (required fields, valid date)
- Urgent notices always appear above Normal notices
- Red "Urgent" badge on urgent notices
- Filter notices by category (Exam, Event, General) and priority
- Responsive design — works on mobile and desktop
- Confirmation step before deleting a notice
- Optional image URL for notices

## What I Would Improve With More Time
- Add image upload support via Cloudinary instead of just an image URL field
- Add user authentication so only admins can create/edit/delete notices
- Add pagination for when there are many notices
- Add search functionality to find notices by keyword
- Add email notifications for Urgent notices

## AI Usage
Used Claude (Anthropic) were used as development assistants during the project, including:
- Scaffolding initial API route structures.
- Prisma schema definition
- Troubleshooting development issues and debugging errors.
- TypeScript types for Notice model
- Reviewing code for potential improvements and best practices.

All AI-generated code was reviewed, understood, and adapted manually. Database setup, environment configuration, deployment to Vercel, and debugging were done independently. The overall architecture decisions and feature choices were made by me.