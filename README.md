ReachInbox Email Scheduler

A full-stack email scheduler application built with React, Express, MySQL, Redis, and BullMQ, with restart-safe scheduling, concurrency & rate-limiting, and email delivery via Ethereal Email.

Table of Contents

Project Overview

Backend Setup

Frontend Setup

Ethereal Email Setup

Architecture Overview

Features Implemented

Project Overview

ReachInbox allows users to:

Schedule emails for future delivery.

View scheduled and sent emails.

Compose emails via a modal.

Persist email schedules even on server restarts.

Handle concurrent email delivery with rate limits.

Backend Setup

Requirements: Node.js, MySQL, Redis

Clone the repo and navigate to backend:

cd backend
npm install


Set up MySQL database:

CREATE DATABASE reachinbox;
CREATE USER 'reachinbox_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON reachinbox.* TO 'reachinbox_user'@'localhost';
FLUSH PRIVILEGES;


Update .env with your credentials.

Configure .env:

DB_HOST=localhost
DB_USER=reachinbox_user
DB_PASSWORD=password
DB_NAME=reachinbox
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
ETHEREAL_USER=your-ethereal-username
ETHEREAL_PASS=your-ethereal-password


Start backend server:

npm run dev


Start BullMQ worker (for sending scheduled emails):

node worker.js

Frontend Setup

Requirements: Node.js, npm or yarn

Navigate to frontend:

cd frontend
npm install


Start the development server:

npm run dev


Open http://localhost:5173
 in your browser.

Ethereal Email Setup

Ethereal Email provides a test SMTP server:

Go to https://ethereal.email
 and create a test account.

Note the username and password.

Add them to your .env as ETHEREAL_USER and ETHEREAL_PASS.

Architecture Overview
1. Scheduling Flow

User schedules an email via frontend → POST request to backend.

Backend stores email in MySQL with status: scheduled.

Email is added to BullMQ queue with scheduled_at delay.

Worker picks up jobs and sends emails via Ethereal SMTP.

2. Persistence on Restart

Scheduled emails are stored in MySQL.

On backend/worker restart, pending jobs are reloaded from MySQL into BullMQ.

3. Rate Limiting & Concurrency

Concurrency: BullMQ worker limits number of concurrent email sends (concurrency: 5).

Rate Limiting: Emails per interval are throttled to prevent overwhelming SMTP.

Features Implemented
Backend

Scheduler: ✅

Restart-safe persistence: ✅

Rate limiting: ✅

Concurrency handling: ✅

MySQL + Redis integration: ✅

Frontend

Login / Authentication: ✅

Dashboard (Scheduled & Sent tables): ✅

Compose modal: ✅

Email scheduling: ✅

CSV import (optional): ✅

Staggered UI animations with Framer Motion: ✅

Project Structure
backend/
 ├─ controllers/
 ├─ models/
 ├─ routes/
 ├─ worker.js
 └─ server.js

frontend/
 ├─ src/
 │   ├─ pages/
 │   │   └─ Dashboard.tsx
 │   ├─ components/
 │   │   └─ ComposeModal.tsx
 │   └─ services/
 │       └─ email.service.ts
 └─ package.json

Running Everything

Start MySQL and Redis.

Run backend server: npm run dev.

Run BullMQ worker: node worker.js.

Run frontend: npm run dev.

Access frontend: http://localhost:5173.