# 🏡 Home Away

A modern, full-stack vacation rental platform built with Next.js 14, featuring property listings, booking management, payments, and real-time reviews. Think Airbnb, but with a personal touch.

![Home Away](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=flat-square&logo=prisma)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)

## ✨ Features

### 🏠 Property Management

- **Create & Edit Listings** - Property owners can list their spaces with detailed information
- **Image Upload** - Secure image hosting with UploadThing
- **Categories & Amenities** - Organized property types with comprehensive amenity filters
- **Interactive Maps** - Location visualization with Leaflet and OpenStreetMap
- **Search & Filter** - Advanced search by location, price, and property features

### 📅 Booking System

- **Calendar Integration** - Real-time availability with react-day-picker
- **Instant Booking** - Seamless reservation flow with date range selection
- **Booking Management** - Track all your reservations in one place
- **Booking History** - View past and upcoming trips

### 💳 Payments

- **Stripe Integration** - Secure payment processing with Stripe Embedded Checkout
- **Dynamic Pricing** - Automatic calculation based on nights, cleaning fees, and service charges
- **Payment Confirmation** - Webhook-based payment verification

### 👤 User Features

- **Authentication** - Secure auth with Clerk (social login, email/password)
- **User Profiles** - Customizable profiles with profile pictures
- **Favorites** - Save properties to your wishlist
- **Reviews & Ratings** - Rate and review properties after your stay
- **Host Dashboard** - Manage your properties and reservations

### 📊 Admin Dashboard

- **Analytics** - Revenue tracking and booking statistics with Recharts
- **User Management** - Admin-only access to platform statistics
- **Property Oversight** - Monitor all listings across the platform

### 🎨 UI/UX

- **Dark Mode** - Seamless theme switching with next-themes
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Loading States** - Skeleton loaders and optimistic updates
- **Toast Notifications** - Real-time feedback for user actions
- **Accessibility** - Built with Radix UI primitives

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, shadcn/ui
- **State Management:** Zustand
- **Forms & Validation:** Zod
- **Icons:** Lucide React, React Icons

### Backend

- **API:** Next.js Server Actions & API Routes
- **Database:** MongoDB Atlas
- **ORM:** Prisma 6
- **Authentication:** Clerk
- **Payments:** Stripe
- **File Upload:** UploadThing

### Additional Libraries

- **Maps:** Leaflet, React Leaflet
- **Date Handling:** date-fns, React Day Picker
- **Charts:** Recharts
- **Social Sharing:** react-share
- **Country Data:** world-countries, react-world-flags

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB Atlas account
- Clerk account (for authentication)
- Stripe account (for payments)
- UploadThing account (for image hosting)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/lemonade0109/your-home-away-project.git
   cd home-away
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/home-away"
   ADMIN_USER_ID="your_clerk_admin_user_id"
   ```

   Create a `.env.local` file for client-side variables:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/profile/create
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/profile/create

   # Stripe Payment
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...

   # UploadThing
   UPLOADTHING_TOKEN=...
   UPLOADTHING_SECRET=sk_live_...
   UPLOADTHING_APP_ID=...

   # Website URL
   NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
home-away/
├── app/                      # Next.js app router pages
│   ├── admin/               # Admin dashboard
│   ├── api/                 # API routes (webhooks, payments)
│   ├── bookings/            # Booking management
│   ├── checkout/            # Stripe checkout
│   ├── favorites/           # User favorites
│   ├── profile/             # User profile management
│   ├── properties/          # Property details
│   ├── rentals/             # Property listings & creation
│   ├── reservations/        # Host reservations
│   └── reviews/             # Review management
├── components/              # React components
│   ├── admin/              # Admin-specific components
│   ├── bookings/           # Booking UI components
│   ├── card/               # Property cards
│   ├── form/               # Form inputs & containers
│   ├── home/               # Homepage components
│   ├── navbar/             # Navigation
│   ├── properties/         # Property detail components
│   └── ui/                 # shadcn/ui components
├── lib/                     # Core logic
│   └── actions/            # Server actions
│       ├── bookings/
│       ├── favorites/
│       ├── properties/
│       ├── reviews/
│       └── user-profile/
├── utils/                   # Utility functions
│   ├── amenities.ts        # Amenities configuration
│   ├── categories.ts       # Property categories
│   ├── countries.ts        # Country data
│   ├── schema.ts           # Zod validation schemas
│   ├── upload.ts           # UploadThing integration
│   └── helpers-function.ts # Helper utilities
├── prisma/                  # Database schema
│   └── schema.prisma
└── public/                  # Static assets
```

## 🗄️ Database Schema

The application uses MongoDB with Prisma ORM. Key models include:

- **Profile** - User profiles linked to Clerk authentication
- **Property** - Property listings with details, amenities, and location
- **Favorite** - User's saved properties
- **Booking** - Reservation records with payment info
- **Review** - Property reviews and ratings

## 🔐 Authentication Flow

1. Users sign in/up via Clerk (email, Google, etc.)
2. On first login, users are redirected to create a profile
3. Profile is stored in MongoDB and linked to Clerk user ID
4. Server actions verify authentication and profile existence

## 💰 Payment Flow

1. User selects dates and confirms booking
2. Stripe Embedded Checkout session is created
3. User completes payment on Stripe
4. Webhook confirms payment and creates booking record
5. Confirmation email sent (if configured)

## 🌐 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Import project to Vercel**

   - Connect your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add environment variables**

   - Add all variables from `.env` and `.env.local`
   - Ensure `DATABASE_URL` is set for Production

4. **Deploy**
   ```bash
   npm run build  # Test locally first
   ```

### Important Configuration

- Set `NEXT_PUBLIC_WEBSITE_URL` to your Vercel domain
- Configure Stripe webhook endpoint to your production URL
- Whitelist Vercel IPs in MongoDB Atlas (or allow all: 0.0.0.0/0)

## 🧪 Development

### Running Prisma Studio

```bash
npx prisma studio
```

### Database Migrations

```bash
npx prisma db push  # Push schema changes
npx prisma generate # Regenerate Prisma Client
```

### Lint & Type Check

```bash
npm run lint
npx tsc --noEmit
```

## 📝 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Clerk](https://clerk.com/) - Authentication made easy
- [Stripe](https://stripe.com/) - Payment processing
- [UploadThing](https://uploadthing.com/) - File uploads
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Vercel](https://vercel.com/) - Deployment platform

## 📧 Contact

Project Link: [https://github.com/lemonade0109/your-home-away-project](https://github.com/lemonade0109/your-home-away-project)

---

**Built with ❤️ using Next.js 14 and modern web technologies**
