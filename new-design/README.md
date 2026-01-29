# New Design - Experimental Prototype

This directory contains an experimental design prototype built with Vite and React. It serves as a sandbox for testing new design concepts and features before integrating them into the main Next.js application.

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## Overview

This is a standalone Vite-based prototype that explores:
- Immersive neon/cyberpunk design aesthetics
- AI-powered chat tutor integration (using Gemini API)
- Fluid backgrounds and advanced animations
- Custom cursor interactions
- Glitch text effects

**Note**: This is a separate project from the main Next.js application. Features from this prototype may be gradually integrated into the main app at `/new-design` route.

## Purpose

- **Rapid Prototyping**: Test new ideas quickly without affecting the main application
- **Design Exploration**: Experiment with alternative visual styles and interactions
- **Feature Development**: Develop and test features in isolation before integration
- **Technology Evaluation**: Try out different libraries and approaches

## Technology Stack

- **Framework**: Vite + React
- **TypeScript**: Type-safe development
- **AI Integration**: Google Gemini API
- **Styling**: CSS with custom animations

## Run Locally

**Prerequisites:** Node.js

1. Navigate to the new-design directory:
   ```bash
   cd new-design
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set the `GEMINI_API_KEY` in `.env.local`:
   ```
   GEMINI_API_KEY=your-gemini-api-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Integration with Main App

Some features from this prototype are accessible in the main Next.js application at the `/new-design` route. To enable AI chat features in the main app:

1. Add `GEMINI_API_KEY` to `.env.local` in the project root
2. Start the main app: `npm run dev` (from project root)
3. Visit: `http://localhost:3000/new-design`

## AI Studio

View the original AI Studio app: https://ai.studio/apps/drive/15TGiGOXN09vtlcVU5IwTFupUHJxZW6UM

## Development Notes

- This prototype uses a separate package.json and build system
- Changes here do not automatically sync with the main application
- Features must be manually ported to the Next.js codebase for production use
