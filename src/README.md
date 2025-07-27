# Exercise 6 – Interactive Basketball Court with Physics and Controls

## Overview
This exercise adds interactive elements, physics, and controls to the basketball court scene created in **HW05**. The basketball court is now dynamic with a controllable basketball, including shooting mechanics, movement, scoring, and more. The ball follows realistic physics (gravity, bouncing, etc.) and can be controlled by the player with keyboard input.


## Tasks - HW05 INFRASTRUCTURE ONLY
1. Add court lines to the basketball court:
   - Center line
   - Center circle  
   - Three-point lines on both sides
   - Court markings must be white and clearly visible

2. Create basketball hoops (static):
   - Backboard (white, partially transparent)
   - Rim (orange) at regulation height
   - Net using line segments (at least 8 segments)
   - Support structure (pole and arms) positioned BEHIND the backboard
   - Place hoops on both ends of the court

3. Implement a static basketball:
   - Create a sphere with orange material and black seams
   - Position at center court
   - Proper size and spherical geometry
   - NO physics or movement

4. Camera and lighting infrastructure:
   - Interactive camera controls (orbit) - toggle with 'O' key
   - Appropriate lighting with shadows
   - Proper initial camera positioning

5. Basic UI framework preparation:
   - HTML containers for future score display
   - HTML containers for future controls display  
   - Basic CSS styling for UI elements

## Tasks - HW06 INTERACTIVITY & PHYSICS
1. **Basketball Physics:**
   - Implement gravity on the basketball.
   - Implement bounce physics for the ball when it hits the floor and walls.
   - Apply some friction to the horizontal velocity during bounces.

2. **Player Control:**
   - Use the arrow keys to move the ball on the court.
   - Implement the 'W' and 'S' keys to adjust the shot power.
   - Implement the spacebar to shoot the ball with the current power.

3. **Camera Control:**
   - Implement orbit controls to rotate the camera around the scene.
   - Toggle camera controls with the 'O' key.

4. **Scoring and Hoop Collision:**
   - Detect collisions between the ball and the hoop.
   - Add scoring functionality (2 points per basket) and display the score.
   - Provide visual feedback for successful shots.

5. **UI Elements:**
   - Display shot power as a dynamic power bar.
   - Display the score and instructions for the player.

## Technical Requirements
- All objects should cast and receive shadows
- Use appropriate meshes and materials for each object
- The scene should be responsive when the browser window is resized
- Basketball must remain STATIC (no physics or movement)