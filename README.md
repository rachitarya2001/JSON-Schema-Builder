
JSON Schema Builder - README
Overview
A dynamic JSON Schema Builder application built with React, TypeScript, and ShadCN UI. This tool allows users to create complex JSON schemas with nested structures through an intuitive interface.
Features

Dynamic Field Management: Add, edit, and delete fields on the fly
Multiple Field Types: Support for String, Number, and Nested object types
Recursive Nesting: Create unlimited levels of nested structures
Real-time JSON Preview: See your schema output update live as you build
Form Validation: Built-in validation with React Hook Form
Modern UI: Clean, professional interface using ShadCN components
Visual Hierarchy: Clear indentation shows nested field relationships

Demo
🔗 Live Demo: JSON Schema Builder
Screenshots
The application provides a clean, intuitive interface for building JSON schemas with proper visual hierarchy for nested structures.
Tech Stack

Frontend: React 18 with TypeScript
UI Library: ShadCN UI components
Styling: Tailwind CSS
Form Management: React Hook Form
Build Tool: Vite
Deployment: Vercel

Getting Started
Prerequisites

Node.js (v16 or higher)
npm or yarn

Installation

Clone the repository

bashgit clone https://github.com/rachitarya2001/JSON-Schema-Builder.git
cd JSON-Schema-Builder

Install dependencies

bashnpm install

Start the development server

bashnpm run dev


Building for Production
bashnpm run build
npm run preview
Usage

Add Fields: Click "Add Field" to create new schema fields
Edit Names: Click on any field name to edit it
Choose Types: Select from String, Number, or Nested types
Create Nesting: For Nested types, click "Add Nested" to add child fields
Delete Fields: Use the red Delete button to remove unwanted fields
Preview JSON: Switch to the "JSON Preview" tab to see your schema output
Validate: Click "Validate Schema" to check for errors


Contributing
This project was built as part of a technical assessment. While it's not actively seeking contributions, feel free to fork and modify for your own use.
Development Notes

Built with mobile-first responsive design
Follows React best practices with TypeScript
Uses modern CSS Grid and Flexbox for layouts
Implements proper error handling and validation
Optimized for performance with proper React patterns

Browser Support

Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)