# Styles Directory Overview

This directory contains all SCSS stylesheets used throughout the project. It is organized to promote modularity, ease of maintenance, and scalability. Below is a description of each sub-directory and its intended purpose.

## Directory Structure

- **`/component-css`**: Contains modular SCSS files for specific components. Each component has its own SCSS module.
- **`/page-css`**: Includes styles specific to individual pages. These styles are meant to augment the component styles with layout adjustments or page-specific styling that doesn't fit within global components.
- **`/utilities`**: Stores utility classes and helper styles that are reused across various components and pages. This includes spacing, typography helpers, visibility classes, etc.
- **`/mixins`**: Contains SCSS mixins that are used throughout the project to promote DRY code practices. Mixins for responsive design, theme-specific mixins, and other reusable code snippets are located here.
- **`/theme`**: Holds the theming variables and foundational styles such as color schemes, font settings, and other CSS properties that contribute to the overall look and feel of the application.
- **`globals.scss`**: This file includes global styles that affect the entire application. This includes body, links, headings, and other high-level elements.
- **`layout.scss`**: Defines the main layout components of the site, including grid setup, header, footer, and main structural layouts.
- **`overrides.scss`**: Contains style overrides for third-party components or libraries that do not fit within the normal styling methodology of the site.
