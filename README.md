# Computer Graphics - Exercise 5 - WebGL Basketball Court

## Overview
This exercise requires you to create a 3D basketball court with interactive elements using WebGL and Three.js. The provided skeleton code gives you a basic starting point - a simple brown court floor without any markings, hoops, or basketball.

## Getting Started
1. Clone this repository to your local machine
2. Make sure you have Node.js installed
3. Start the local web server: `node index.js`
4. Open your browser and go to http://localhost:8000

## What's Included
The skeleton code includes:
- Basic THREE.js setup (scene, camera, renderer)
- A simple brown court surface
- Basic lighting setup with shadows
- Orbit camera controls (toggle with 'O' key)
- Animation loop

## Your Tasks
You need to implement:
1. Court markings (center line, center circle, three-point lines)
2. Basketball hoops at both ends of the court
3. A basketball with realistic physics
4. User controls for moving and shooting the ball
5. Scoring system
6. UI elements (score display, power indicator, etc.)

See detailed requirements in:
- `/src/README.md` - Technical implementation details
- `basketball_exercise_instructions.html` - Complete exercise specifications

## Controls To Implement
- Arrow Keys: Move the basketball
- W/S Keys: Adjust shot power
- Spacebar: Shoot the ball
- R Key: Reset ball position
- O Key: Toggle orbit camera controls (already implemented)

## Submission Guidelines
- Implement all required features as specified in the instructions
- Test your implementation thoroughly
- Submit your entire project as a zip file
- Include any additional notes or explanations in your README

## Technical Details
- Run the server with: `node index.js`
- Access at http://localhost:8000 in your web browser