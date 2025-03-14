# AI-Full-Vuln-Scan-Web

Vulnerability Scanner Dashboard
Welcome to the Vulnerability Scanner Dashboard! This is a cool web app built with React that helps you scan networks, find vulnerabilities, and see the results in a neat dashboard. It has charts, a 3D network map, and tools like Nmap and Nslookup—all in one place. Think of it like a superhero toolkit for checking website or network safety!

What’s Inside?
A dashboard to start scans and see results.
Tools like Nmap, Nslookup, WhatWeb, Dirb, Gobuster, and DNS Recon.
Pretty charts (pies and lines!) to show vulnerabilities.
A 3D network map to visualize your scan.
Dark mode because it’s easier on the eyes.
Dependencies (The Building Blocks)
These are the special packages we use to make the app work:

React: The main library to build the app.
three: Makes the 3D network map look awesome.
framer-motion: Adds smooth animations.
recharts: Creates the charts (pies, lines, etc.).
lucide-react: Gives us nice icons like shields and search buttons.
tailwindcss: Helps style everything fast and pretty.
postcss & autoprefixer: Makes Tailwind work smoothly.
How to Set It Up (Baby Steps)
Don’t worry, it’s easy! Just follow these steps in your VS Code terminal:

Open Terminal in VS Code
Click "Terminal" > "New Terminal" in VS Code.
Go to the Project Folder
Type this and press Enter:
text

Collapse

Wrap

Copy
cd my-react-app

Install the Basics
This gets React and other core stuff:
text

Collapse

Wrap

Copy
npm install
Add the Cool Packages
Run this to get the 3D, charts, icons, and animations:
text

Collapse

Wrap

Copy
npm install three framer-motion recharts lucide-react
Set Up Tailwind (Styling Magic)
Install Tailwind and its helpers:
text

Collapse

Wrap

Copy
npm install -D tailwindcss postcss autoprefixer
Create the Tailwind config files:
text

Collapse

Wrap

Copy
npx tailwindcss init -p
Start the App
Launch the app in your browser:
text

Collapse

Wrap

Copy
npm start
It should open automatically at http://localhost:3000. If not, just type that into your browser!

