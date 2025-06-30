# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

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

## Architecture Overview

This is a React TypeScript application built with Vite that implements an **infinite canvas interface** for showcasing personal portfolio content. The core concept is a navigable 2D space where different sections (Home, Work, Projects, Travel, etc.) are positioned on a virtual grid.

### Key Architectural Components

**InfiniteCanvas System** (`src/components/InfiniteCanvas.tsx`):
- Main container managing viewport positioning and navigation
- Coordinates between multiple custom hooks for separation of concerns
- Handles mouse/touch events for panning and keyboard navigation
- Renders sections at calculated positions in 2D space

**Hook-Based Architecture** (`src/hooks/`):
- `useViewport`: Manages viewport position and drag state
- `useSectionManagement`: Handles section positioning, navigation, and breadcrumb logic
- `useCanvasEvents`: Processes mouse/touch events for canvas interaction
- `useGridNavigation`: Implements arrow key navigation between sections

**Section System** (`src/components/sections/`):
- Each portfolio section is a React component (WorkSection, ProjectsSection, etc.)
- Sections are positioned on a virtual grid and rendered dynamically
- `SectionRenderer` component handles conditional rendering based on viewport
- Travel section has its own sub-navigation system with detailed story views

**Navigation Features**:
- Arrow key navigation between sections
- Mouse/touch panning with smooth animations
- Breadcrumb navigation showing current location and history
- Visual indicators for available navigation directions
- Home/Escape key shortcuts to return to center

### Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom animations
- **Routing**: React Router DOM 6.26.2
- **State Management**: @tanstack/react-query 5.56.2 for server state, custom hooks for local state
- **Icons**: Lucide React 0.462.0
- **Charts**: Recharts 2.12.7
- **Forms**: React Hook Form with Zod validation

### Section Components

The application consists of several main sections, each handling different aspects of the portfolio:

1. **WorkSection**: Professional work overview with navigation to work experience
2. **WorkExperienceSection**: Detailed work experience and skills
3. **PersonalSection**: Personal information with navigation to travel stories
4. **KetoSection**: About the person's cat
5. **HobbiesSection**: Hobbies and interests with navigation to projects
6. **ProjectsSection**: Personal projects showcase
7. **NowSection**: Current activities and focus
8. **TravelStoriesSection**: Travel experiences with detailed story views
9. **ContactSection**: Contact information and social links

### Section Layout & Positioning

**Main Sections** (positioned around center at 0,0):
- Work (right): x: 1000, y: 0
- Personal (left): x: -1000, y: 0
- Keto (up): x: 0, y: -1000
- Hobbies (down): x: 0, y: 1000
- Now (bottom-right): x: 1000, y: 1000
- Contact (bottom-left): x: -1000, y: 1000

**Subsections**:
- Travel Stories: x: -2000, y: 0 (child of Personal)
- Projects: x: 0, y: 2000 (child of Hobbies)
- Work Experience: x: 2000, y: 0 (child of Work)

### Key Features

**Contact Section Features**:
- Email protection with base64 encoding and progressive disclosure
- Social links (GitHub, LinkedIn, Twitter, Instagram)
- Location information and remote work availability

**Travel Stories Features**:
- Story list view with destination cards and highlights
- Detailed story view with full content and navigation
- Interactive "Read More" functionality

**Navigation System**:
- Infinite canvas with 2D positioning
- Arrow key navigation between sections
- Breadcrumb navigation with clickable history
- Section hierarchy support (main sections → subsections)

### File Structure Patterns

```
src/
├── components/
│   ├── canvas/
│   │   ├── NavigationIndicator.tsx
│   │   ├── SectionRenderer.tsx
│   │   └── StarBackground.tsx
│   ├── sections/
│   │   ├── travel/
│   │   │   ├── TravelSectionHeader.tsx
│   │   │   ├── TravelStoryCard.tsx
│   │   │   └── TravelStoryList.tsx
│   │   ├── ContactSection.tsx
│   │   ├── TravelStoriesSection.tsx
│   │   ├── WorkExperienceSection.tsx
│   │   └── [other sections...]
│   ├── ui/ (shadcn/ui components)
│   ├── InfiniteCanvas.tsx
│   └── NavigationBreadcrumb.tsx
├── hooks/
│   ├── useSectionManagement.ts
│   ├── useGridNavigation.ts
│   ├── useCanvasEvents.ts
│   └── useViewport.ts
├── data/
│   └── travelStories.ts
├── types/
│   └── travelStory.ts
└── pages/
    ├── Index.tsx
    └── NotFound.tsx
```

### Development Notes

- The application uses a 2D coordinate system where (0,0) is the home section
- Section positioning is handled through the `useSectionManagement` hook
- Canvas transformations use CSS `translate3d` for hardware acceleration
- Touch events are carefully managed to prevent conflicts with browser navigation
- The project includes Lovable integration for AI-assisted development

### Performance & Design Considerations

- **Responsive Design**: Mobile-first approach with flexible card layouts
- **Lazy Loading**: Components render only when needed
- **Memoization**: useCallback and useMemo for expensive operations
- **Glass Morphism**: Backdrop blur effects with gradient backgrounds
- **Hardware Acceleration**: CSS translate3d for smooth canvas transformations

### Known Technical Debt

- **ContactSection.tsx**: 217 lines - could be refactored into smaller components
- **useSectionManagement.ts**: 230 lines - could be split into multiple hooks
- **Hard-coded Data**: Travel stories and personal info are currently hard-coded
- **Error Handling**: Limited error boundaries and error handling
- **Testing**: No test coverage currently implemented

### Key Configuration

- **Vite**: Configured with React SWC plugin and path aliases (`@` -> `src/`)
- **TypeScript**: Strict configuration with separate configs for app and build tools
- **Tailwind**: Extended with custom color system and animations
- **ESLint**: Configured for React and TypeScript best practices