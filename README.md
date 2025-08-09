# Amlak Real Estate Platform - Frontend

![Project Screenshot](/public/screenshot.png) 

A high-performance real estate web application built with Next.js 15, featuring modern authentication, property listings, and responsive design.

## ✨ Key Features

- **Next.js 15** (App Router)
- **TypeSafe** with TypeScript strict mode
- **Cookie-based Auth** (HTTP-only, Secure)
- **UI Components** with shadcn/ui + Tailwind
- **Dark/Light Mode**
- **Optimized Fetching** (Axios + React Query)
- **Form Validation** (Zod + React Hook Form)
- **Error Handling** (Global error boundaries)

## 🛠 Tech Stack

**Core:**
- Next.js 15 (App Router)
- TypeScript 5.3
- Tailwind CSS 3.4

**Data Fetching:**
- Axios (Custom configured instance)
- React Query v5
- SWR (Optional for real-time)

**State Management:**
- Zustand (Global state)
- React Context (UI state)

**Auth Flow:**
- HTTP-only cookies
- JWT tokens
- Middleware protected routes

**Testing (In Progress):**
- Jest + React Testing Library
- Cypress (E2E)
- Storybook (Component library)

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm (recommended)

### Installation
```bash
git clone https://github.com/yourusername/real-estate-frontend.git
cd real-estate-frontend
npm install
npm run dev
```

