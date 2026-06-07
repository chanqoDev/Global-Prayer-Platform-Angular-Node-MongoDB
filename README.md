# Global Prayer Dashboard

Fullstack prayer request platform built with Angular, Express, and MongoDB. The app lets users submit prayer requests, view recent requests on a prayer wall, and manage request data through a REST API.

## Features

- Submit prayer requests through a reactive Angular form
- Display recent requests on an animated prayer wall
- Store requests with MongoDB and Mongoose
- REST API for creating, fetching, and deleting prayers
- Responsive Angular UI with Angular Material, Tailwind CSS, GSAP, and Swiper

## Tech Stack

- Angular 20
- Angular Material
- Tailwind CSS
- GSAP
- Swiper
- Express
- MongoDB with Mongoose

## Prerequisites

- Node.js and npm
- MongoDB, either local or hosted
- Angular CLI, optional if you use `npx`

## Install

Install all project dependencies from the repository root:

```bash
npm install
```

## Run the Angular App

Start the frontend development server:

```bash
npx ng serve
```

Open:

```text
http://localhost:4200/
```

The app reloads automatically when files in `src/` change.

## Run the API Server

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://localhost:27017/global-prayer-dashboard
PORT=3000
```

Start the Express API:

```bash
npm run start:server
```

By default, the API runs at:

```text
http://localhost:3000/
```

Available API routes:

- `GET /` - API health check
- `GET /api/prayers` - fetch prayer requests
- `POST /api/prayers` - create a prayer request
- `DELETE /api/prayers/:id` - delete a prayer request

## API Configuration Note

The current Angular code calls the deployed API:

```text
https://global-prayer-dashboard.onrender.com/api/prayers
```

If you want the frontend to use your local Express server, update the API URLs in:

- `src/app/components/form-component/form-component.ts`
- `src/app/features/dashboard/dashboard.ts`
- `src/app/features/prayer-cards/prayer-cards.ts`

Use:

```text
http://localhost:3000/api/prayers
```

If you change the API port in `.env`, update the frontend URLs to match.

## Build

Create a production build:

```bash
npm run build
```

The build output is written to `dist/`.

## Tests

Run unit tests:

```bash
npm test
```

## Useful Scripts

```bash
npm run build          # Production build
npm run watch          # Development build in watch mode
npm run start:server   # Start the Express API
npm test               # Run Angular unit tests
```

## Project Structure

```text
src/app/                 Angular application
src/app/components/      Reusable UI components
src/app/features/        App feature views
server.js                Express API entry point
db.js                    MongoDB connection setup
models/Prayer.js         Prayer request schema
```

## Future Improvements

- Add authentication and user roles
- Add real-time updates with WebSockets
- Add dashboard filtering and analytics
- Move API URLs into an Angular environment configuration
