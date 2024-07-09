Movie App

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Start the App](#start-the-app)
- [Testing](#testing)
- [State Management](#state-management)

## Overview

Wanted to create a highly interactive and responsive movie application.
It leverages Vite as the build tool for fast development and optimized builds.
The main stack used for this app includes:
React, TypeScript, Less, Vitest, and the react-beautiful-dnd library.

## Features

• Fully Typed: The application is fully typed using TypeScript,
ensuring type safety and better developer experience.
• Fully Tested: Comprehensive testing is implemented with the Vitest framework
to ensure the reliability and quality of the codebase.
• Styling with Less: The application uses Less for styling,
taking advantage of its powerful mixins and variables for maintainable and scalable styles.
• Accessibility: The app is designed with accessibility in mind,
supporting keyboard navigation with the arrow keys (up, down, left, right), backspace, and enter.
It includes focus outlines, aria-attributes,
and appropriate tabindex values to ensure a seamless experience for all users.
• Drag and Drop: Implemented drag-and-drop functionality for the Box component
using the react-beautiful-dnd library, enhancing the interactive experience.
• Theme Switcher: Users can switch between different themes,
with their preferences preserved in localStorage.
• Star Rating: An independent StarRating component that can be used across various projects. It allows you to get a userRating by
providing a setter function to the component.

## Technologies Used

• React
• TypeScript
• Less
• Vite
• Vitest
• react-beautiful-dnd

## Start the App:

git clone https://github.com/MilovanMilovanov/popcorn

install dependencies:

npm install

Start the development server:

npm run dev

## Testing

-- Unit Tests --

To run tests with Vitest:

npm run test

## State Management

I utalized Context API for state management
