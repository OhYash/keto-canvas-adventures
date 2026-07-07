# Human-Agent Communication Guidelines

This document provides guidance for efficient communication when requesting changes to the Keto Canvas Adventures website. The human sees the UI, while Claude Code works with the underlying code structure.

## Efficient Communication Terms

### UI Components
Use these terms to reference specific interface elements:

- **"HomeSection"** - The main landing page component
- **"NavigationBreadcrumb"** - The breadcrumb trail at the top of the interface
- **"SectionRenderer"** - How individual sections are displayed and rendered
- **"InfiniteCanvas"** - The main container/viewport that manages the 2D navigation

### Content Areas
Reference specific content sections with these terms:

- **"subtitle"** - Descriptive text that appears under section titles
- **"navigation grid"** - The 6 cards displayed on the home page
- **"welcome message"** - The quoted text section with italic styling
- **"visit statistics"** - The analytics display showing page visit data
- **"not sure where to start"** - The guidance section at the bottom with suggested navigation paths

### Specific Sections
Reference individual portfolio sections:

- **"WorkSection"** - Professional work overview
- **"PersonalSection"** - Personal information and biography
- **"KetoSection"** - Content about the cat
- **"HobbiesSection"** - Hobbies and interests
- **"ProjectsSection"** - Personal projects showcase
- **"TravelStoriesSection"** - Travel experiences and stories
- **"ContactSection"** - Contact information and social links
- **"NowSection"** - Current activities and focus
- **"WorkExperienceSection"** - Detailed work experience

### Data & Logic Components
Reference backend logic and data structures:

- **"useSectionManagement"** - Hook containing section definitions and navigation logic  
- **"sections array"** - Where section titles, subtitles, and metadata are defined
- **"position"** - 2D coordinates where sections are located in the canvas space

## Best Communication Patterns

### Effective Request Formats
Use these patterns for clear, efficient requests:

- **"Change the [component name] [element]"**  
  Example: "Change the HomeSection title"

- **"In the [section name], update the [element]"**  
  Example: "In the PersonalSection, update the subtitle"

- **"The [UI element] should say [new text]"**  
  Example: "The welcome message should say 'Welcome to my digital space'"

### What This Approach Achieves
- **Reduces search time** - Claude goes directly to the right file
- **Minimizes resource usage** - Fewer broad searches across the codebase
- **Faster implementation** - Direct targeting of specific components
- **Clearer communication** - Shared vocabulary between human and agent

## Examples

### ✅ Good Requests
- "Update the HomeSection subtitle to say 'Exploring life through code and creativity'"
- "Change the navigation grid card for WorkSection to have a different icon"
- "In the ContactSection, add a new social link"
- "The welcome message should be more concise"

### ❌ Less Efficient Requests  
- "Change the text on the main page" (too vague)
- "Update the description somewhere" (requires broad searching)
- "Fix the title" (unclear which title, which component)
- "Make the page look better" (no specific target)

## Notes
- This vocabulary is based on the actual file structure and component names in the codebase
- Using these terms helps Claude Code navigate directly to the relevant files
- The more specific the reference, the faster the implementation