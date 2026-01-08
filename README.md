# SEO Analyzer

A simple web-based SEO audit tool that analyzes basic on-page SEO signals.

## Features
- Title & meta description check
- Heading structure analysis
- Image alt tag detection
- Link count

## Tech Stack
- Next.js
- Node.js
- Express
- Cheerio

## Usage
1. Start backend server
2. Start frontend
3. Enter a URL and analyze

## Limitations
Some websites (e.g., Google, Facebook) block automated analysis requests.
This tool works on publicly accessible websites that allow standard HTTP requests.

## How it works
The analyzer first attempts a fast HTTP request.
If the website blocks automated requests, a headless browser fallback is used to render the page before analysis.
