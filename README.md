# value-pair-manager-v.2

## Author

Dmitro Utkin

## Overview
Value Pair Manager is a simple, responsive web application that allows users to manage name-value pairs with various operations like adding, sorting, deleting, and exporting to XML.

## Features
- Add name-value pairs with validation
- Sort pairs by name or value
- Delete selected pairs
- Export pairs to XML format
- Responsive design that works on desktop and mobile devices

## Validation Rules
- Pairs must be in the format: `name=value`
- Both name and value must:
  - Contain only alphanumeric characters
  - Cannot be empty
- Duplicate pairs are not allowed

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript
- Vite (build tool)

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/value-pair-manager.git
cd value-pair-manager