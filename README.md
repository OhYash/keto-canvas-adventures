# Everything Yash

An infinite canvas portfolio interface built with React and TypeScript that showcases personal content through an interactive 2D navigation experience.

## Features

- **Infinite Canvas Interface**: Navigate through different portfolio sections positioned on a virtual 2D grid
- **Smooth Navigation**: Arrow key controls and mouse/touch panning with fluid animations
- **Interactive Sections**: Home, Work, Projects, Travel Stories, Personal info, and more
- **Responsive Design**: Mobile-first approach with glass morphism design elements
- **Travel Stories**: Detailed travel experiences with rich content and navigation

## Getting Started

### Prerequisites

- Node.js (recommended to install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd everything-yash

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Technology Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom animations
- **Routing**: React Router DOM
- **State Management**: @tanstack/react-query for server state
- **Icons**: Lucide React
- **Charts**: Recharts

## Architecture

This application implements an infinite canvas interface where different portfolio sections are positioned on a virtual 2D grid. Key architectural components include:

- **InfiniteCanvas System**: Main container managing viewport positioning and navigation
- **Hook-Based Architecture**: Separated concerns with custom hooks for viewport, section management, canvas events, and grid navigation
- **Section System**: Modular React components for each portfolio section
- **Navigation Features**: Arrow key navigation, mouse/touch panning, breadcrumb navigation

## Project Structure

```
src/
├── components/
│   ├── canvas/           # Canvas-specific components
│   ├── sections/         # Portfolio section components
│   ├── ui/              # shadcn/ui components
│   └── InfiniteCanvas.tsx
├── hooks/               # Custom React hooks
├── data/               # Static data files
├── types/              # TypeScript type definitions
└── pages/              # Route components
```

## Development

This project was built with [Lovable](https://lovable.dev) and [Claude Code](https://claude.ai/code) for AI-assisted development.

## License

This project is open source and available under the [MIT License](LICENSE).
