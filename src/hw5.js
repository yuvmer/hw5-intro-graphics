import {OrbitControls} from './OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Set background color
scene.background = new THREE.Color(0x000000);

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 15);
scene.add(directionalLight);

// Enable shadows
renderer.shadowMap.enabled = true;
directionalLight.castShadow = true;

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi/180);
}

// Create the basketball court with lines and hoops
function createBasketballCourt() {
  // === Court Floor ===
  // Create a flat wooden-looking box to represent the court surface
  const courtGeometry = new THREE.BoxGeometry(30, 0.2, 15); // length x thickness x width
  const courtMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xc68642, // Wood brown
    shininess: 50
  });
  const court = new THREE.Mesh(courtGeometry, courtMaterial);
  court.receiveShadow = true;
  scene.add(court);

  // === Court Lines Material ===
  const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // white lines

  // === Center Line ===
  // A thin white box stretching across the middle of the court (Z direction)
  const centerLineGeometry = new THREE.BoxGeometry(0.1, 0.1, 15);
  const centerLine = new THREE.Mesh(centerLineGeometry, lineMaterial);
  centerLine.position.y = 0.11; // slightly above the court to avoid z-fighting
  scene.add(centerLine);

  // === Center Circle ===
  // A white ring drawn at center court
  const centerCircleGeometry = new THREE.RingGeometry(1.8, 2, 32); // innerRadius, outerRadius, segments
  const centerCircleMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffffff,
    side: THREE.DoubleSide // so it renders from both directions
  });
  const centerCircle = new THREE.Mesh(centerCircleGeometry, centerCircleMaterial);
  centerCircle.rotation.x = Math.PI / 2; // rotate flat to match court
  centerCircle.position.y = 0.11;
  scene.add(centerCircle);

  // === Three-Point Arcs ===
  // Define the arc radius and number of segments for smoothness
  const threePointRadius = 6.75;
  const threePointSegments = 32;
  const halfPi = Math.PI / 2;

  // --- Right Side Three-Point Arc ---
  const rightThreePointPoints = [];
  for (let i = 0; i <= threePointSegments; i++) {
    const angle = halfPi + (Math.PI * i / threePointSegments);
    const x = 13.5 + threePointRadius * Math.cos(angle); // offset from center
    const z = threePointRadius * Math.sin(angle);
    rightThreePointPoints.push(new THREE.Vector3(x, 0.11, z));
  }
  const rightThreePointGeometry = new THREE.BufferGeometry().setFromPoints(rightThreePointPoints);
  const rightThreePointLine = new THREE.Line(rightThreePointGeometry, new THREE.LineBasicMaterial({ color: 0xffffff }));
  scene.add(rightThreePointLine);

  // --- Left Side Three-Point Arc ---
  const leftThreePointPoints = [];
  for (let i = 0; i <= threePointSegments; i++) {
    const angle = halfPi - (Math.PI * i / threePointSegments);
    const x = -13.5 + threePointRadius * Math.cos(angle);
    const z = threePointRadius * Math.sin(angle);
    leftThreePointPoints.push(new THREE.Vector3(x, 0.11, z));
  }
  const leftThreePointGeometry = new THREE.BufferGeometry().setFromPoints(leftThreePointPoints);
  const leftThreePointLine = new THREE.Line(leftThreePointGeometry, new THREE.LineBasicMaterial({ color: 0xffffff }));
  scene.add(leftThreePointLine);

  // === Free Throw Line and Circle ===
  function addFreeThrowArea(xOffset) {
    const direction = xOffset > 0 ? 1 : -1;
  
    // Free throw line
    const lineGeometry = new THREE.BoxGeometry(0.1, 0.01, 4.9);
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.position.set(xOffset - direction * 4.57, 0.11, 0);
    scene.add(line);
  
    // Free throw circle
    const circleGeometry = new THREE.RingGeometry(1.8, 1.85, 64);
    const circle = new THREE.Mesh(circleGeometry, lineMaterial);
    circle.rotation.x = -Math.PI / 2;
    circle.position.set(xOffset - direction * 4.57, 0.11, 0);
    scene.add(circle);
  
    // Lane lines (vertical sides of the key)
    const laneLineLength = 4.57; // meters
    const laneLineGeometry = new THREE.BoxGeometry(laneLineLength, 0.01, 0.1); // horizontal in X
  
    const laneLeft = new THREE.Mesh(laneLineGeometry, lineMaterial);
    laneLeft.position.set(
      xOffset - direction * (laneLineLength / 2), // midpoint between baseline and free throw
      0.11,
      -2.45 // left edge of key
    );
    scene.add(laneLeft);
  
    const laneRight = laneLeft.clone();
    laneRight.position.z = 2.45; // right edge of key
    scene.add(laneRight);
  }
  
  
  addFreeThrowArea(-13.5); // Left side
  addFreeThrowArea(13.5);  // Right side

  // === Hoops ===
  // Add static hoops to both ends of the court
  createBasketballHoop(-13.5, 0, true);   // Left hoop, facing right
  createBasketballHoop(13.5, 0, false);   // Right hoop, facing left
}


// Create a complete basketball hoop (backboard, rim, net, support structure)
function createBasketballHoop(x, z, facingRight) {
  // === Constants ===
  const rimHeight = 10;               // Rim height (10 feet ≈ 3 meters)
  const backboardTop = rimHeight + 2; // Backboard top is 2m above the rim
  const poleHeight = backboardTop + 3;

  const rimOffsetX = facingRight ? 1 : -1; // Rim sits 1m in front of the backboard
  const rimPosX = x + rimOffsetX;

  // === Group for entire hoop structure ===
  const hoopGroup = new THREE.Group();
  scene.add(hoopGroup);

  // === Backboard ===
  const backboardGeometry = new THREE.BoxGeometry(0.2, 4, 6); // thickness, height, width
  const backboardMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.9
  });
  const backboard = new THREE.Mesh(backboardGeometry, backboardMaterial);
  backboard.position.set(x, backboardTop - 2, z); // Centered vertically
  backboard.castShadow = true;
  hoopGroup.add(backboard);

  // === Rim ===
  const rimGeometry = new THREE.TorusGeometry(0.8, 0.05, 16, 32);
  const rimMaterial = new THREE.MeshPhongMaterial({ color: 0xf97316 }); // Orange
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  rim.position.set(rimPosX, rimHeight, z);
  rim.rotation.x = Math.PI / 2;
  rim.castShadow = true;
  hoopGroup.add(rim);

  // === Chain-style Net ===
  const linksPerStrand = 6;
  const netTopRadius = 0.8;
  const netBottomRadius = 0.4;
  const netHeight = 1.5;
  const strands = 16;

  const netMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    metalness: 1.0,
    roughness: 0.3
  });

  for (let i = 0; i < strands; i++) {
    const angle = (Math.PI * 2 / strands) * i;

    for (let j = 0; j < linksPerStrand; j++) {
      const t = j / linksPerStrand;
      const radius = netTopRadius * (1 - t) + netBottomRadius * t;
      const linkX = rimPosX + Math.cos(angle) * radius;
      const linkY = rimHeight - t * netHeight;
      const linkZ = z + Math.sin(angle) * radius;

      const netLink = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.15, 8),
        netMaterial
      );
      netLink.rotation.z = angle + Math.PI / 2;
      netLink.rotation.x = Math.PI / 2;
      netLink.position.set(linkX, linkY, linkZ);
      hoopGroup.add(netLink);
    }
  }

  // === Support Structure ===
  const poleOffset = facingRight ? -0.7 : 0.7;
  const poleX = x + poleOffset;

  // Pole
  const poleGeometry = new THREE.CylinderGeometry(0.3, 0.3, poleHeight, 16);
  const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  pole.position.set(poleX, poleHeight / 2, z);
  pole.castShadow = true;
  hoopGroup.add(pole);

  // Main horizontal support arm (to top of backboard)
  const armLength = Math.abs(poleX - x);
  const armGeometry = new THREE.BoxGeometry(armLength, 0.3, 0.3);
  const arm = new THREE.Mesh(armGeometry, poleMaterial);
  arm.position.set((poleX + x) / 2, backboardTop, z);
  arm.castShadow = true;
  hoopGroup.add(arm);

  // Diagonal support arm (angled for stability)
  const diagonalLength = Math.sqrt(armLength ** 2 + 4 ** 2);
  const diagonalGeometry = new THREE.BoxGeometry(diagonalLength, 0.2, 0.2);
  const diagonalArm = new THREE.Mesh(diagonalGeometry, poleMaterial);
  const supportArmAngle = Math.atan2(4, armLength); // rise/run
  diagonalArm.rotation.z = facingRight ? -supportArmAngle : supportArmAngle;
  diagonalArm.position.set((poleX + x) / 2, backboardTop - 2, z);
  diagonalArm.castShadow = true;
  hoopGroup.add(diagonalArm);

  // Base plate under the pole
  const baseGeometry = new THREE.CylinderGeometry(1, 1.2, 0.6, 16);
  const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.set(poleX, 0.3, z);
  base.castShadow = true;
  hoopGroup.add(base);
}

// Create a basketball mesh with seams (horizontal and vertical)
function createBasketball() {
  // === Ball geometry and appearance ===
  const ballRadius = 1;
  const ballGeometry = new THREE.SphereGeometry(ballRadius, 64, 64); // smooth high-res ball
  const ballMaterial = new THREE.MeshPhongMaterial({
    color: 0xd97706, // standard orange
    shininess: 60
  });

  const ball = new THREE.Mesh(ballGeometry, ballMaterial);
  ball.position.set(0, 4, 0); // starting position above court
  ball.castShadow = true;

  // === Seam material ===
  const seamMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // black seams
  const seamThickness = 0.03;

  // === Horizontal seam (around equator) ===
  const seamHorizontal = new THREE.Mesh(
    new THREE.TorusGeometry(ballRadius + 0.01, seamThickness, 16, 100),
    seamMaterial
  );
  seamHorizontal.rotation.x = Math.PI / 2;
  ball.add(seamHorizontal);

  // === Vertical seam (top-to-bottom) ===
  const seamVertical = new THREE.Mesh(
    new THREE.TorusGeometry(ballRadius + 0.01, seamThickness, 16, 100),
    seamMaterial
  );
  seamVertical.rotation.y = Math.PI / 2;
  ball.add(seamVertical);

  // === Add to scene and return ===
  scene.add(ball);
  return ball;
}

// Create all elements
createBasketballCourt();
const basketball = createBasketball();

// Set camera position for better view
const cameraTranslate = new THREE.Matrix4();
cameraTranslate.makeTranslation(0, 15, 30);
camera.applyMatrix4(cameraTranslate);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
let isOrbitEnabled = true;

// Instructions display
const instructionsElement = document.createElement('div');
instructionsElement.style.position = 'absolute';
instructionsElement.style.bottom = '20px';
instructionsElement.style.left = '20px';
instructionsElement.style.color = 'white';
instructionsElement.style.fontSize = '16px';
instructionsElement.style.fontFamily = 'Arial, sans-serif';
instructionsElement.style.textAlign = 'left';
instructionsElement.innerHTML = `
  <h3>Controls:</h3>
  <p>O - Toggle orbit camera</p>
`;
document.body.appendChild(instructionsElement);

// Handle key events
function handleKeyDown(e) {
  if (e.key === "o") {
    isOrbitEnabled = !isOrbitEnabled;
  }
}

// Score display
const scoreElement = document.createElement('div');
scoreElement.style.position = 'absolute';
scoreElement.style.top = '20px';
scoreElement.style.left = '20px';
scoreElement.style.color = 'white';
scoreElement.style.fontSize = '24px';
scoreElement.style.fontFamily = 'Arial, sans-serif';
scoreElement.textContent = 'Score: 0';
document.body.appendChild(scoreElement);

document.addEventListener('keydown', handleKeyDown);

// Animation function
function animate() {
  requestAnimationFrame(animate);
  
  // Update controls
  controls.enabled = isOrbitEnabled;
  controls.update();
  
  renderer.render(scene, camera);
}

animate();