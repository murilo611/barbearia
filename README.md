# Barbearia - Modern Barbershop Management System

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.5.0-blue?logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?logo=tailwind-css)

A modern barbershop management system built with Next.js, featuring appointment booking, barbershop management, and user authentication.

## ✨ Features

- **User Authentication** with email/password
- **Barbershop Management** for owners
- **Service Booking System** for customers
- **Responsive UI** built with Tailwind CSS and Shadcn/ui
- **Type-Safe** with TypeScript
- **ORM** with Prisma for PostgreSQL

## 🛠 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Components**: Shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS + CSS Modules
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **State Management**: React Context
- **Build Tool**: Turbopack

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-repo/barbearia.git
cd barbearia
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your database connection in `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/barbearia?schema=public"
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Seed the database (optional):
```bash
npx prisma db seed
```

### Running the Project

Development server:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## 🗃 Database Schema

The system uses PostgreSQL with the following main entities:

- **Users**: Customer accounts and authentication
- **Barbershops**: Registered barbershop locations
- **Services**: Offered barbershop services
- **Bookings**: Customer appointments

![Database Schema Diagram](public/schema-diagram.png)

## 📂 Project Structure

```
barbearia/
├── app/                  # Next.js app router
│   ├── _components/      # Shared UI components
│   ├── _lib/             # Utility functions and Prisma client
│   └── page.tsx          # Main page
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── styles/               # Global styles
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

MIT
