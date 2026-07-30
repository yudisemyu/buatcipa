# 🤖 AGENTS.md

Version: 1.0 (LOCKED)

Project

Our Little Universe

Framework

Next.js 15

Status

Production

---

# Mission

You are not building a website.

You are building an emotional experience.

Every line of code should support storytelling.

Never implement features simply because they look cool.

If a feature does not improve the emotional experience,
it should not exist.

---

# Product Context

This project is a birthday gift.

It is intentionally linear.

Users should experience one scene at a time.

There is no navigation.

There are no dashboards.

There are no unnecessary pages.

Everything exists to tell one story.

Read

PRD.md

DESIGN.md

CONTENT.md

before writing code.

These documents are the single source of truth.

---

# Technology

Next.js 15

App Router

React 19

TypeScript

Tailwind CSS

Framer Motion

GSAP

Howler

Lenis

shadcn/ui

---

# Never Install

Bootstrap

Material UI

Ant Design

jQuery

Redux

Moment

Lodash

Anime.js

Three.js

Unless the project owner explicitly approves.

---

# Project Architecture

Use feature-first architecture.

Never organize by pages.

Correct

features/

timeline/

gallery/

letter/

Wrong

components/gallery

components/timeline

pages/gallery

---

# Folder Structure

app/

components/

features/

hooks/

lib/

constants/

types/

providers/

public/

styles/

---

# Feature Structure

Every feature should contain

components/

hooks/

types/

constants/

utils/

index.ts

Example

features/

timeline/

components/

Timeline.tsx

TimelineCard.tsx

hooks/

useTimeline.ts

types.ts

constants.ts

utils.ts

index.ts

---

# Scene Rules

Every scene is isolated.

A scene cannot directly manipulate another scene.

Communication happens through props.

Never through global hacks.

---

# Page Rules

Only one page.

app/page.tsx

This page assembles scenes.

Nothing else.

---

# Components

Keep components small.

Target

Below 200 lines.

Split when necessary.

Avoid giant JSX files.

---

# React Rules

Functional Components only.

Strict TypeScript.

No class components.

Prefer composition.

Never duplicate UI.

---

# State

Prefer local state.

Avoid global state.

Context only if absolutely necessary.

No Redux.

---

# Styling

Tailwind only.

Never inline CSS.

Never CSS Modules.

Never styled-components.

---

# Naming

PascalCase

Components

camelCase

Functions

UPPER_CASE

Constants

kebab-case

Folders

---

# Imports

Prefer absolute imports.

Never long relative chains.

Good

@/features/gallery

Bad

../../../../gallery

---

# Icons

Use Lucide.

Never mix icon packs.

---

# Images

Use next/image.

Always.

Never img tag.

---

# Motion

Framer Motion first.

GSAP only when Framer cannot achieve the effect.

Avoid overengineering.

---

# Animations

Allowed

Fade

Blur

Scale

Opacity

Slide

Parallax

Forbidden

Bounce

Rotate

Shake

Elastic

Flip

---

# Performance

Lazy load videos.

Optimize images.

Memoize expensive components.

Dynamic import heavy scenes.

---

# Accessibility

Keyboard support.

Reduced motion.

Alt text.

ARIA labels when required.

---

# Data

Never hardcode memories.

Everything comes from

CONTENT.md

(or future data files)

---

# Assets

public/

images/

videos/

audio/

music/

stickers/

---

# Tailwind

Use utility classes.

Extract repeated patterns.

Never create unreadable class strings.

---

# Custom Hooks

Business logic belongs in hooks.

Never inside JSX.

---

# Utilities

Pure functions only.

No DOM manipulation.

---

# Error Handling

Graceful.

Never crash.

If assets fail,

display fallback.

---

# Mobile

Responsive from day one.

Never "desktop first then fix later."

---

# Code Comments

Comment WHY.

Never comment WHAT.

---

# Git

Commits

feat:

fix:

refactor:

docs:

style:

perf:

---

# Pull Requests

Small.

Focused.

One feature per PR.

---

# Testing

Before finishing a feature verify

Desktop

Tablet

Mobile

Keyboard

Reduced Motion

Performance

No console errors

---

# Definition of Done

A feature is complete when

✓ Responsive

✓ Accessible

✓ Animated

✓ Matches DESIGN.md

✓ Matches PRD.md

✓ Uses CONTENT.md

✓ No TypeScript errors

✓ No ESLint errors

✓ No hydration issues

---

# AI Behaviour

Always prefer simplicity.

Always prefer readability.

Always prefer consistency.

Never invent new UI.

Never invent new colors.

Never invent new animations.

Never create additional pages.

Never change user flow.

Never introduce features not defined in PRD.

When uncertain,

ask.

Do not guess.

---

# Priority

Story

↓

Experience

↓

Consistency

↓

Performance

↓

Animation

↓

Code

---

# Final Rule

If your implementation makes the website feel more complicated,

you are moving in the wrong direction.

If it makes the story easier to experience,

you are moving in the right direction.