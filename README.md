# 🎓 I Love College - Anonymous Student Community Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.2-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.1-purple.svg)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)](https://vercel.com/)

> **A full-stack anonymous social platform where college students can share their experiences, frustrations, and connect with peers from their institutions.**

## 🚀 Live Demo

**[View Live Application](https://i-luv-college-1.vercel.app/)** *(Replace with actual deployment URL)*

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [📦 Installation & Setup](#-installation--setup)
- [🔧 Environment Variables](#-environment-variables)
- [🚀 Deployment](#-deployment)
- [📊 Database Schema](#-database-schema)
- [🔐 Authentication & Security](#-authentication--security)
- [🎨 UI/UX Features](#-uiux-features)
- [📱 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [📈 Performance Optimizations](#-performance-optimizations)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🎯 Core Functionality
- **Anonymous Posting**: Students can share their college experiences without revealing identity
- **College-Specific Communities**: Posts organized by college for relevant discussions
- **Image Sharing**: Upload and share college-related images with like functionality
- **Voting System**: Upvote/downvote posts and comments to surface quality content
- **Real-time Comments**: Engage in discussions with fellow students
- **User Authentication**: Secure JWT-based authentication system
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 🔥 Advanced Features
- **Dynamic Image Carousel**: Showcase college images with smooth transitions
- **Infinite Scroll**: Optimized content loading for better performance
- **SEO Optimization**: Prerender.io integration for search engine visibility
- **Toast Notifications**: Real-time feedback for user actions
- **Dark/Light Theme**: User preference-based theme switching
- **Email Subscription**: Mailing list for college updates
- **Image Liking System**: Social engagement through image interactions

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ORM**: Prisma 6.16.1
- **Authentication**: JWT + bcryptjs
- **File Upload**: Multer (for image handling)
- **CORS**: Cross-origin resource sharing
- **Environment**: dotenv

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.3.1
- **Styling**: Tailwind CSS + DaisyUI
- **Routing**: React Router DOM 6.24.0
- **State Management**: React Context API
- **HTTP Client**: Axios 1.7.3
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React + React Icons
- **Notifications**: React Toastify

### DevOps & Deployment
- **Platform**: Vercel
- **Database**: MongoDB Atlas
- **CDN**: Vercel Edge Network
- **SEO**: Prerender.io integration
- **Monitoring**: Sentry integration

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React/Vite)  │◄──►│   (Express.js)  │◄──►│   (MongoDB)     │
│                 │    │                 │    │                 │
│ • TypeScript    │    │ • REST API      │    │ • Prisma ORM    │
│ • Tailwind CSS  │    │ • JWT Auth      │    │ • Atlas Cloud   │
│ • React Router  │    │ • File Upload   │    │ • Document DB   │
│ • Context API   │    │ • CORS Enabled  │    │ • Indexing      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Project Structure
```
i-luv-college/
├── backend/                 # Express.js API server
│   ├── controllers/        # Route handlers
│   ├── middlewares/        # Custom middleware
│   ├── routes/            # API route definitions
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── contexts/      # React Context providers
│   │   ├── routes/        # Route definitions
│   │   └── utils/         # Frontend utilities
│   └── dist/              # Built application
├── prisma/                # Database schema
│   └── schema.prisma      # Prisma schema definition
└── vercel.json           # Deployment configuration
```

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/i-luv-college.git
cd i-luv-college
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
npm install --prefix frontend
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (for development)
npx prisma db push
```

### 4. Environment Configuration
Create `.env` file in the root directory:
```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/i-luv-college"

# JWT
JWT_SECRET="your-super-secret-jwt-key"

# Prerender.io (for SEO)
PRERENDER_TOKEN="your-prerender-token"

# Server
PORT=3001
```

### 5. Start Development Server
```bash
# Start backend server
npm run devstart

# In another terminal, start frontend
cd frontend && npm run dev
```

### 6. Build for Production
```bash
# Build frontend
npm run build

# Start production server
npm start
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ |
| `PRERENDER_TOKEN` | Prerender.io token for SEO | ❌ |
| `PORT` | Server port (default: 3001) | ❌ |

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Ensure `DATABASE_URL` is properly configured

3. **Build Configuration**
   - Build command: `npm run build`
   - Output directory: `frontend/dist`
   - Install command: `npm install`

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy to your preferred platform
# (Heroku, DigitalOcean, AWS, etc.)
```

## 📊 Database Schema

### Core Models

#### User Model
```prisma
model User {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  username       String    @unique
  password       String
  profilePicLink String
  createdAt      DateTime  @default(now())
  
  // Relations
  College        College[]
  Posts          Post[]
  likedColleges  UserCollegeLike[]
  upvotedPosts   UserPostUpvote[]
  comments       Comment[]
  likedImages    UserImageLike[]
}
```

#### College Model
```prisma
model College {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String   @unique
  description String
  likes       Int      @default(0)
  createdBy   String   @db.ObjectId
  createdAt   DateTime @default(now())
  
  // Relations
  creator   User   @relation(fields: [createdBy], references: [id])
  images    Image[]
  posts     Post[]
  likedBy   UserCollegeLike[]
}
```

#### Post Model
```prisma
model Post {
  id              String   @id @default(auto()) @map("_id") @db.ObjectId
  postTitle       String
  postDescription String
  upvotes         Int      @default(0)
  createdAt       DateTime @default(now())
  
  // Relations
  collegeId String?  @db.ObjectId
  userId    String?  @db.ObjectId
  College   College? @relation(fields: [collegeId], references: [id])
  User      User?    @relation(fields: [userId], references: [id])
  upvoteData UserPostUpvote[]
  comments   Comment[]
}
```

## 🔐 Authentication & Security

### JWT Implementation
- **Token-based authentication** using JSON Web Tokens
- **Password hashing** with bcryptjs (salt rounds: 12)
- **Secure cookie handling** for token storage
- **Route protection** middleware for authenticated endpoints

### Security Features
- **CORS enabled** for cross-origin requests
- **Input validation** on all API endpoints
- **SQL injection prevention** through Prisma ORM
- **XSS protection** with proper data sanitization
- **Rate limiting** (can be implemented with express-rate-limit)

## 🎨 UI/UX Features

### Design System
- **Mobile-first responsive design**
- **Consistent color palette** with accent colors
- **Typography hierarchy** using custom fonts
- **Component-based architecture** for reusability

### User Experience
- **Smooth animations** with Tailwind CSS transitions
- **Loading states** and skeleton screens
- **Error handling** with user-friendly messages
- **Accessibility** considerations (ARIA labels, keyboard navigation)

### Key Components
- **Hero Section** with dynamic image rotation
- **Post Cards** with upvote functionality
- **Image Carousel** with smooth transitions
- **Comment System** with nested replies
- **User Profile** with college associations

## 📱 API Documentation

### Authentication Endpoints
```http
POST /api/users/register
POST /api/users/login
POST /api/users/logout
GET  /api/users/profile
```

### College Endpoints
```http
GET    /api/colleges          # Get all colleges
POST   /api/colleges          # Create new college
GET    /api/colleges/:id      # Get specific college
PUT    /api/colleges/:id      # Update college
DELETE /api/colleges/:id      # Delete college
POST   /api/colleges/:id/like # Like/unlike college
```

### Post Endpoints
```http
GET    /api/posts             # Get all posts
POST   /api/posts             # Create new post
GET    /api/posts/:id         # Get specific post
PUT    /api/posts/:id         # Update post
DELETE /api/posts/:id         # Delete post
POST   /api/posts/:id/upvote  # Upvote post
```

### Image Endpoints
```http
GET    /api/images            # Get all images
POST   /api/images            # Upload image
GET    /api/images/:id        # Get specific image
DELETE /api/images/:id        # Delete image
POST   /api/images/:id/like   # Like image
```

## 🧪 Testing

### Test Coverage Areas
- **Unit Tests**: Individual component testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user workflow testing

### Running Tests
```bash
# Frontend tests
cd frontend && npm test

# Backend tests
npm test

# E2E tests
npm run test:e2e
```

## 📈 Performance Optimizations

### Frontend Optimizations
- **Code splitting** with React.lazy()
- **Image optimization** with proper sizing
- **Bundle analysis** and tree shaking
- **Lazy loading** for images and components
- **Memoization** with React.memo() and useMemo()

### Backend Optimizations
- **Database indexing** on frequently queried fields
- **Connection pooling** for database connections
- **Caching** strategies for static content
- **Compression** middleware for API responses

### Database Optimizations
- **Compound indexes** for complex queries
- **Query optimization** with Prisma
- **Connection pooling** configuration
- **Read replicas** for scaling (production)

## 🚀 Future Enhancements

### Planned Features
- [ ] **Real-time notifications** with WebSocket
- [ ] **Advanced search** with filters and sorting
- [ ] **User profiles** with activity history
- [ ] **Moderation tools** for content management
- [ ] **Analytics dashboard** for college insights
- [ ] **Mobile app** with React Native
- [ ] **Push notifications** for engagement
- [ ] **Content recommendation** algorithm

### Technical Improvements
- [ ] **Redis caching** for better performance
- [ ] **CDN integration** for static assets
- [ ] **Microservices architecture** for scalability
- [ ] **GraphQL API** for flexible data fetching
- [ ] **Docker containerization** for deployment
- [ ] **CI/CD pipeline** with GitHub Actions

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**HARSH YADAV**
- GitHub: [harshsksh](https://github.com/harshsksh)
- [LinkedIn](https://www.linkedin.com/in/harsh-yadav-218370272/)
- Email: hr392002@gmail.com

## 🙏 Acknowledgments

- **Prisma** for the excellent ORM
- **Vercel** for seamless deployment
- **Tailwind CSS** for the utility-first CSS framework
- **React** community for the amazing ecosystem
- **MongoDB** for the flexible database solution

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/i-luv-college?style=social)](https://github.com/yourusername/i-luv-college)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/i-luv-college?style=social)](https://github.com/yourusername/i-luv-college)

</div>
