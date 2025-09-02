# Overview

This is a digital wedding invitation platform called "EkanKotri" built for the Shinay community. The application serves as a comprehensive wedding management system that displays multiple couples' wedding events, gift information, venue details, and contact information. It features a bilingual interface (Gujarati and English) and includes both public viewing and admin management capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Internationalization**: Custom hook-based i18n system supporting Gujarati and English

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth integration with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage
- **API Design**: RESTful API with separate public and authenticated endpoints

## Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless driver
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Session Storage**: PostgreSQL table for user sessions
- **Database Structure**: Tables for users, events, couples, gifts, site content, and contact information

## Authentication and Authorization
- **Authentication Provider**: Replit Auth using OpenID Connect
- **Session Management**: Server-side sessions stored in PostgreSQL
- **Authorization**: Route-level protection for admin endpoints
- **User Management**: User profiles stored with Replit user data

## Core Features Architecture
- **Multi-language Support**: Dynamic language switching between Gujarati and English
- **Admin Panel**: Full CRUD operations for managing events, couples, gifts, and contact information
- **Public Website**: Read-only access to wedding information for visitors
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Development and Deployment
- **Development**: Vite dev server with hot module replacement
- **Build Process**: Separate client and server builds using Vite and esbuild
- **Environment**: Designed for Replit deployment with special Replit integrations
- **Code Quality**: TypeScript for type safety across the entire stack

# External Dependencies

## Database Services
- **Neon**: Serverless PostgreSQL database hosting
- **Connection**: Uses @neondatabase/serverless driver with WebSocket support

## Authentication Services
- **Replit Auth**: Primary authentication provider using OpenID Connect
- **Session Storage**: connect-pg-simple for PostgreSQL session management

## UI and Component Libraries
- **Radix UI**: Accessible component primitives for complex UI components
- **Shadcn/ui**: Pre-built component library based on Radix UI
- **Lucide React**: Icon library for consistent iconography
- **Font Awesome**: Additional icon support (referenced in components)

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type checking and compilation
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with autoprefixer

## Third-party Integrations
- **Google Maps**: For venue directions and location sharing
- **WhatsApp**: For sharing wedding invitations and quick communication
- **External Fonts**: Google Fonts integration for multilingual typography