# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Type-check with `tsc -b` then build with Vite
- `npm run lint` — Run ESLint across the project
- `npm run preview` — Preview the production build locally

## Architecture

Personal portfolio/blog site built with React 19, TypeScript, Vite, and React Router v7.

**Routing:** `src/App.tsx` defines all routes inside a `BrowserRouter`. Pages are wrapped in a shared `Layout` component (Header + Outlet + Footer).

Routes: `/` (Home), `/blog` (Blog list), `/blog/:slug` (individual post), `/projects`, `/about`.

**Data:** Blog posts and projects are stored as static TypeScript arrays in `src/data/posts.ts` and `src/data/projects.ts` — no backend or CMS. Posts include inline markdown-style content strings. Use `getPostBySlug()` to look up a post.

**Styling:** CSS Modules (`*.module.css`) per component/page, plus `src/styles/global.css` for base styles.
