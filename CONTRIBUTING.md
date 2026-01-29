# Contributing to HPCSS ICT Revision Hub

Thank you for your interest in contributing to the HPCSS ICT Revision Hub! This document provides guidelines and information for contributors.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Documentation](#documentation)

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Git
- Basic knowledge of React, Next.js, and TypeScript

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/tseminghong/sunset.git
   cd sunset
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## Project Structure

Understanding the project structure will help you navigate the codebase:

```
src/
├── app/          # Next.js pages and routes
├── components/   # Reusable React components
├── contexts/     # React Context providers
├── data/         # Static data
├── hooks/        # Custom React hooks
├── lib/          # Utility functions
├── services/     # API integrations
└── types/        # TypeScript definitions

docs/             # Documentation by category
scripts/          # Utility scripts
archive/          # Legacy files (reference only)
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed architecture information.

## Development Workflow

### Creating a New Feature

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing patterns
   - Add comments for complex logic

3. **Test your changes**
   ```bash
   npm run type-check  # TypeScript validation
   npm run lint        # Linting (if available)
   npm run dev         # Manual testing
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description
   - Reference any related issues
   - Add screenshots for UI changes

### Bug Fixes

1. Create a branch: `git checkout -b fix/bug-description`
2. Fix the bug with minimal changes
3. Test thoroughly
4. Commit: `git commit -m "fix: describe the bug fix"`
5. Submit a Pull Request

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define explicit types for props and state
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// Avoid
function Button(props: any) { }
```

### React Components
- Use functional components with hooks
- Keep components small and focused (< 200 lines)
- Extract reusable logic into custom hooks
- Use descriptive component names

```typescript
// Good
export function CourseCard({ title, description }: CourseCardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing using Tailwind's scale
- Group related utilities together

```typescript
// Good
<div className="flex flex-col gap-4 p-6 rounded-lg bg-white dark:bg-gray-800">

// Avoid inline styles
<div style={{ display: 'flex', padding: '24px' }}>
```

### File Organization
- One component per file
- Co-locate related files (component + types + utils)
- Use index files for cleaner imports

```
components/
├── CourseCard/
│   ├── CourseCard.tsx
│   ├── types.ts
│   └── index.ts
```

### Naming Conventions
- **Components**: PascalCase (`HeroSection.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPERCASE (`MAX_RETRIES`)
- **Hooks**: use prefix (`useAuth.ts`)
- **Types**: PascalCase with descriptive names (`UserProfile`)

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear commit history:

### Commit Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(auth): add password reset functionality
fix(header): correct mobile menu z-index issue
docs(readme): update installation instructions
refactor(utils): simplify date formatting function
perf(images): optimize hero section images
```

### Commit Message Tips
- Use present tense ("add feature" not "added feature")
- Keep first line under 72 characters
- Add detailed explanation in body if needed
- Reference issues: "fixes #123" or "closes #456"

## Pull Request Process

### Before Submitting
- [ ] Code follows project style guidelines
- [ ] TypeScript type checking passes (`npm run type-check`)
- [ ] Changes have been tested manually
- [ ] Documentation updated (if needed)
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile/tablet/desktop

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Screenshots (if applicable)
Add screenshots for UI changes

## Testing
Describe how you tested your changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Changes tested across browsers/devices
```

### Review Process
1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited in the commit history

## Documentation

### When to Update Documentation
- Adding new features
- Changing existing functionality
- Modifying project structure
- Adding environment variables
- Updating dependencies

### Documentation Locations
- **README.md**: Quick start and overview
- **ARCHITECTURE.md**: Technical architecture
- **docs/**: Detailed documentation by category
  - `docs/design/`: Design specifications
  - `docs/implementation/`: Implementation guides
  - `docs/planning/`: Project planning

### Writing Good Documentation
- Use clear, concise language
- Include code examples
- Add screenshots for visual features
- Keep information up-to-date
- Use proper Markdown formatting

## Questions or Need Help?

- Check existing documentation
- Search for similar issues
- Open a new issue with your question
- Tag your issue appropriately

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers
- Focus on what's best for the project
- Show empathy towards others

## Recognition

Contributors will be recognized in:
- Git commit history
- Project contributors list
- Release notes (for significant contributions)

Thank you for contributing to the HPCSS ICT Revision Hub! 🎉
