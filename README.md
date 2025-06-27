# Computer Graphics - Exercise 5 - WebGL Basketball Court

## Getting Started
1. Clone this repository to your local machine
2. Make sure you have Node.js installed
3. Start the local web server: `node index.js`
4. Open your browser and go to http://localhost:8000

## Group Members
**MANDATORY: Add the full names of all group members here:**
- Yuval Merims

## Technical Details
- Run the server with: `node index.js`
- Access at http://localhost:8000 in your web browser

## Features Implemented

- Full 3D basketball court with:
  - Court floor and white line markings
  - Center line and circle
  - Two three-point arcs
  - Free throw lines and circles - Extra
  - Lane boundary lines connecting the free throw to the baseline - Extra

- Two complete basketball hoops:
  - Transparent backboards
  - Orange rims
  - Chain-style net made of cylinder links - Extra
  - Full support structure (pole, main arm, angled arm, base)

- Basketball object with:
  - Realistic shape and seams (horizontal and vertical torus geometry)
---

## Known Issues / Limitations

- Bottom half of free throw circles are not dashed.
- Chain net is visual only; it doesn't respond to physics or collisions.
- Dimensions are close to real-world but not precisely to NBA/FIBA specs.

---

## External Assets & Sources

- `OrbitControls.js` – from [three.js examples](https://threejs.org/docs/#examples/en/controls/OrbitControls)
- Court measurements reference: [Wikipedia - Basketball Court](https://en.wikipedia.org/wiki/Basketball_court)
