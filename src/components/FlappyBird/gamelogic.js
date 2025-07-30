import kaplay from "kaplay";

// Global variable to track if KAPLAY is already initialized
let gameInstance = null;

export function initFlappyBirdGame(container) {
  // If there's already a game instance, clean it up first
  if (gameInstance) {
    try {
      gameInstance.quit();
    } catch (error) {
      console.warn("Error cleaning up previous game instance:", error);
    }
    gameInstance = null;
  }

  const k = kaplay({
    canvas: container,
    width: 800,
    height: 600,
    background: [135, 206, 250], // Sky blue background
  });

  // Store the instance globally
  gameInstance = k;

  // Define gravity
  k.setGravity(3200);

  k.scene("game", () => {
    const PIPE_OPEN = 240;
    const PIPE_MIN = 60;
    const JUMP_FORCE = 800;
    const SPEED = 320;
    const CEILING = -60;

    // Create the bird using basic shapes instead of sprites
    const bean = k.add([
      k.circle(16),
      k.color(255, 215, 0), // Gold color
      k.pos(k.width() / 4, 0),
      k.area(),
      k.body(),
      k.outline(2, k.Color.ORANGE),
    ]);

    // Add eyes to the bird
    k.add([
      k.circle(3),
      k.color(0, 0, 0),
      k.pos(k.width() / 4 - 6, -6),
      k.follow(bean, k.vec2(-6, -6)),
    ]);

    // Check for fall death
    bean.onUpdate(() => {
      if (bean.pos.y >= k.height() || bean.pos.y <= CEILING) {
        k.go("lose", score);
      }
    });

    // Jump controls
    k.onKeyPress("space", () => {
      bean.jump(JUMP_FORCE);
    });

    k.onGamepadButtonPress("south", () => {
      bean.jump(JUMP_FORCE);
    });

    // Mobile tap
    k.onClick(() => {
      bean.jump(JUMP_FORCE);
    });

    function spawnPipe() {
      // Calculate pipe positions
      const h1 = k.rand(PIPE_MIN, k.height() - PIPE_MIN - PIPE_OPEN);
      const h2 = k.height() - h1 - PIPE_OPEN;

      // Top pipe
      k.add([
        k.pos(k.width(), 0),
        k.rect(64, h1),
        k.color(0, 127, 255),
        k.outline(4),
        k.area(),
        k.move(k.LEFT, SPEED),
        k.offscreen({ destroy: true }),
        "pipe",
      ]);

      // Bottom pipe
      k.add([
        k.pos(k.width(), h1 + PIPE_OPEN),
        k.rect(64, h2),
        k.color(0, 127, 255),
        k.outline(4),
        k.area(),
        k.move(k.LEFT, SPEED),
        k.offscreen({ destroy: true }),
        "pipe",
        { passed: false },
      ]);
    }

    // Collision with pipes
    bean.onCollide("pipe", () => {
      k.go("lose", score);
      k.addKaboom(bean.pos);
    });

    // Check if bean passed the pipe
    k.onUpdate("pipe", (p) => {
      if (p.pos.x + p.width <= bean.pos.x && p.passed === false) {
        addScore();
        p.passed = true;
      }
    });

    // Spawn a pipe every 1 second
    k.loop(1, () => {
      spawnPipe();
    });

    let score = 0;

    // Display score
    const scoreLabel = k.add([
      k.text(score.toString()),
      k.anchor("center"),
      k.pos(k.width() / 2, 80),
      k.fixed(),
      k.z(100),
      k.color(255, 255, 255),
    ]);

    function addScore() {
      score++;
      scoreLabel.text = score.toString();
    }
  });

  k.scene("lose", (score) => {
    // Game over screen
    k.add([
      k.text("Game Over", { size: 48 }),
      k.pos(k.width() / 2, k.height() / 2 - 100),
      k.anchor("center"),
      k.color(255, 255, 255),
    ]);

    k.add([
      k.circle(48),
      k.color(255, 215, 0),
      k.pos(k.width() / 2, k.height() / 2 - 50),
      k.anchor("center"),
      k.outline(4, k.Color.ORANGE),
    ]);

    // Display final score
    k.add([
      k.text("Score: " + score, { size: 32 }),
      k.pos(k.width() / 2, k.height() / 2 + 50),
      k.anchor("center"),
      k.color(255, 255, 255),
    ]);

    k.add([
      k.text("Press SPACE or Click to Play Again", { size: 16 }),
      k.pos(k.width() / 2, k.height() / 2 + 100),
      k.anchor("center"),
      k.color(255, 255, 255),
    ]);

    // Restart game
    k.onKeyPress("space", () => k.go("game"));
    k.onClick(() => k.go("game"));
  });

  // Start the game
  k.go("game");

  return k;
}

export function cleanupGame() {
  if (gameInstance) {
    try {
      gameInstance.quit();
    } catch (error) {
      console.warn("Error cleaning up game instance:", error);
    }
    gameInstance = null;
  }
}
