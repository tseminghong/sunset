# HPCSS ICT Revision Hub - Next.js Version

A modern, interactive learning platform built with Next.js, TypeScript, and Tailwind CSS. This is a complete rewrite of the original HTML/CSS/JavaScript ICT Revision Hub using modern web development practices.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Interactive Components**: Reusable React components with Framer Motion animations
- **Dark/Light Theme**: System-aware theme switching with smooth transitions
- **Authentication**: Integrated auth system with JWT tokens
- **Responsive Design**: Mobile-first design that works on all devices
- **Glassmorphism UI**: Beautiful glass-effect design with custom CSS variables
- **Performance Optimized**: Fast loading with Next.js optimizations
- **SEO Friendly**: Proper meta tags and structured data
- **Neon Alt Experience**: `/new-design` route showcases the experimental immersive layout with AI chat and fluid backgrounds

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **Authentication**: Custom JWT-based auth system
- **UI Components**: Headless UI for accessible components

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Navigate to the Next.js project**
   ```bash
   cd nextjs-revision-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

### Optional Neon Experience + AI Tutor

1. Create a `.env.local` file if you do not already have one
2. Add your Gemini key (requires Google AI Studio access)

```
GEMINI_API_KEY=your-key-here
```

3. Start the dev server and open `http://localhost:3000/new-design` to explore the immersive prototype and AI chat.

## 📁 Project Structure

```
sunset/
├── src/                    # Main application source code
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx     # Root layout with providers
│   │   ├── page.tsx       # Homepage
│   │   ├── javascript/    # JavaScript course page
│   │   ├── python/        # Python algorithms page
│   │   └── courses/       # All courses listing
│   ├── components/        # Reusable React components
│   │   ├── Header.tsx     # Navigation header
│   │   ├── HeroSection.tsx # Landing page hero
│   │   └── ...            # Other components
│   ├── contexts/          # React Context providers
│   ├── data/              # Static data and configuration
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript type definitions
├── docs/                  # Documentation (organized by category)
│   ├── design/            # Design specs and mockups
│   ├── implementation/    # Technical guides
│   └── planning/          # Project planning docs
├── scripts/               # Build and utility scripts
├── public/                # Static assets
├── new-design/            # Experimental design prototype (Vite)
├── archive/               # Archived files
└── types/                 # Global type definitions
```

## 🎨 Design Features

- **Glassmorphism Effects**: Backdrop blur with subtle transparency
- **Smooth Animations**: Framer Motion for natural interactions
- **Dark/Light Themes**: Automatic system detection with manual toggle
- **Responsive Layout**: Mobile-first design approach
- **Interactive Elements**: Button press effects and micro-interactions

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory, organized by category:
- **Design**: Visual specifications and design system documentation
- **Implementation**: Technical implementation guides
- **Planning**: Project planning and delivery documentation

See [docs/README.md](docs/README.md) for a complete list.

## 🔧 Scripts

Utility scripts are located in the `/scripts` directory:
- `DELIVERY_CHECKLIST.js` - Project delivery checklist and status
- `update-apk.ps1` - Android APK update automation (PowerShell)

## 🔄 Migration from Original Version

This Next.js version maintains all functionality from the original HTML version while adding modern development practices and better performance. The original HTML files remain accessible for backward compatibility.

## 📱 Live Demo

The application is now running at: **http://localhost:3000**

- Homepage with hero section and resource cards
- Dark/light theme toggle
- Authentication modal
- Responsive design
- Smooth animations and interactions
