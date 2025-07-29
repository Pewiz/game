import { useEffect, useRef, useState } from "react";

function GameComponent() {
  const canvasRef = useRef(null);
  const gameStateRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    // Configuración del juego
    const GAME_CONFIG = {
      CANVAS_WIDTH: 800,
      CANVAS_HEIGHT: 600,
      CAR_WIDTH: 50,
      CAR_HEIGHT: 80,
      CAR_SPEED: 8,
      BLOCK_SPEED: 5,
      BLOCK_WIDTH: 80,
      BLOCK_HEIGHT: 80,
      AI_WATCH_DISTANCE: 150,
    };

    // Colores
    const COLORS = {
      RED: "#FF0000",
      YELLOW: "#FFFF00",
      GREEN: "#00FF00",
      WHITE: "#FFFFFF",
      BLACK: "#000000",
      GRAY: "#808080",
    };

    // Estado inicial del juego
    gameStateRef.current = {
      car: {
        x: (GAME_CONFIG.CANVAS_WIDTH - GAME_CONFIG.CAR_WIDTH) / 2,
        y: GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.CAR_HEIGHT - 10,
        width: GAME_CONFIG.CAR_WIDTH,
        height: GAME_CONFIG.CAR_HEIGHT,
      },
      block: {
        x: Math.random() * (GAME_CONFIG.CANVAS_WIDTH - GAME_CONFIG.BLOCK_WIDTH),
        y: -GAME_CONFIG.BLOCK_HEIGHT,
        width: GAME_CONFIG.BLOCK_WIDTH,
        height: GAME_CONFIG.BLOCK_HEIGHT,
        color: [COLORS.RED, COLORS.YELLOW, COLORS.GREEN][
          Math.floor(Math.random() * 3)
        ],
        speed: GAME_CONFIG.BLOCK_SPEED,
      },
      score: 0,
      isPlaying: true,
      keys: {},
    };

    // Manejo de teclas
    const handleKeyDown = (e) => {
      gameStateRef.current.keys[e.key] = true;
    };

    const handleKeyUp = (e) => {
      gameStateRef.current.keys[e.key] = false;
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Funciones del juego
    const drawCar = (car) => {
      // Dibujar auto como rectángulo azul con detalles
      ctx.fillStyle = "#4A90E2";
      ctx.fillRect(car.x, car.y, car.width, car.height);

      // Ventanas
      ctx.fillStyle = "#87CEEB";
      ctx.fillRect(car.x + 10, car.y + 10, car.width - 20, 20);

      // Ruedas
      ctx.fillStyle = COLORS.BLACK;
      ctx.fillRect(car.x + 5, car.y + car.height - 15, 10, 10);
      ctx.fillRect(car.x + car.width - 15, car.y + car.height - 15, 10, 10);
    };

    const drawBlock = (block) => {
      ctx.fillStyle = block.color;
      ctx.fillRect(block.x, block.y, block.width, block.height);

      // Borde para mejor visibilidad
      ctx.strokeStyle = COLORS.BLACK;
      ctx.lineWidth = 2;
      ctx.strokeRect(block.x, block.y, block.width, block.height);
    };

    const drawScore = (currentScore) => {
      ctx.fillStyle = COLORS.BLACK;
      ctx.font = "24px Arial";
      ctx.fillText(`Puntaje: ${currentScore}`, 20, 40);
    };

    const drawBackground = () => {
      // Fondo degradado
      const gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        GAME_CONFIG.CANVAS_HEIGHT
      );
      gradient.addColorStop(0, "#87CEEB");
      gradient.addColorStop(1, "#98FB98");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);

      // Líneas de carretera
      ctx.strokeStyle = COLORS.WHITE;
      ctx.lineWidth = 4;
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(GAME_CONFIG.CANVAS_WIDTH / 3, 0);
      ctx.lineTo(GAME_CONFIG.CANVAS_WIDTH / 3, GAME_CONFIG.CANVAS_HEIGHT);
      ctx.moveTo((GAME_CONFIG.CANVAS_WIDTH * 2) / 3, 0);
      ctx.lineTo((GAME_CONFIG.CANVAS_WIDTH * 2) / 3, GAME_CONFIG.CANVAS_HEIGHT);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const checkCollision = (car, block) => {
      return (
        car.x < block.x + block.width &&
        car.x + car.width > block.x &&
        car.y < block.y + block.height &&
        car.y + car.height > block.y
      );
    };

    const resetBlock = () => {
      const gameState = gameStateRef.current;
      gameState.block.x =
        Math.random() * (GAME_CONFIG.CANVAS_WIDTH - GAME_CONFIG.BLOCK_WIDTH);
      gameState.block.y = -GAME_CONFIG.BLOCK_HEIGHT;
      gameState.block.speed += 0.5; // Incrementar dificultad
      gameState.block.width = Math.random() * 100 + 50; // Tamaño variable
      gameState.block.color = [COLORS.RED, COLORS.YELLOW, COLORS.GREEN][
        Math.floor(Math.random() * 3)
      ];
    };

    const updateGame = () => {
      if (!gameStateRef.current.isPlaying) return;

      const gameState = gameStateRef.current;
      const { car, block, keys } = gameState;

      // Movimiento del auto
      if (keys["ArrowLeft"] && car.x > 0) {
        car.x -= GAME_CONFIG.CAR_SPEED;
      }
      if (keys["ArrowRight"] && car.x + car.width < GAME_CONFIG.CANVAS_WIDTH) {
        car.x += GAME_CONFIG.CAR_SPEED;
      }

      // Movimiento del bloque
      block.y += block.speed;

      // Si el bloque sale de pantalla
      if (block.y > GAME_CONFIG.CANVAS_HEIGHT) {
        resetBlock();
        gameState.score += 1;
        setScore(gameState.score);
      }

      // IA Simple - Esquivar bloques rojos y amarillos, perseguir verdes
      const distanceToBlock = car.y - (block.y + block.height);
      if (
        distanceToBlock < GAME_CONFIG.AI_WATCH_DISTANCE &&
        distanceToBlock > 0
      ) {
        const carCenter = car.x + car.width / 2;
        const blockCenter = block.x + block.width / 2;

        if (block.color === COLORS.GREEN) {
          // Perseguir bloques verdes
          if (
            carCenter < blockCenter &&
            car.x + car.width < GAME_CONFIG.CANVAS_WIDTH
          ) {
            car.x += GAME_CONFIG.CAR_SPEED / 2;
          } else if (carCenter > blockCenter && car.x > 0) {
            car.x -= GAME_CONFIG.CAR_SPEED / 2;
          }
        } else if (
          block.color === COLORS.RED ||
          block.color === COLORS.YELLOW
        ) {
          // Esquivar bloques rojos y amarillos
          if (
            Math.abs(carCenter - blockCenter) <
            (car.width + block.width) / 2
          ) {
            if (carCenter < blockCenter && car.x > 0) {
              car.x -= GAME_CONFIG.CAR_SPEED;
            } else if (
              carCenter > blockCenter &&
              car.x + car.width < GAME_CONFIG.CANVAS_WIDTH
            ) {
              car.x += GAME_CONFIG.CAR_SPEED;
            }
          }
        }
      }

      // Verificar colisiones
      if (checkCollision(car, block)) {
        if (block.color === COLORS.RED) {
          // Game Over
          gameState.isPlaying = false;
          setGameOver(true);
          setFinalScore(gameState.score);
        } else if (block.color === COLORS.YELLOW) {
          // Perder puntos
          gameState.score = Math.max(0, gameState.score - 2);
          setScore(gameState.score);
          resetBlock();
        } else if (block.color === COLORS.GREEN) {
          // Ganar puntos
          gameState.score += 5;
          setScore(gameState.score);
          resetBlock();
        }
      }
    };

    const render = () => {
      const gameState = gameStateRef.current;

      drawBackground();
      drawCar(gameState.car);
      drawBlock(gameState.block);
      drawScore(gameState.score);

      if (!gameState.isPlaying) {
        // Pantalla de Game Over
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);

        ctx.fillStyle = COLORS.WHITE;
        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "¡GAME OVER!",
          GAME_CONFIG.CANVAS_WIDTH / 2,
          GAME_CONFIG.CANVAS_HEIGHT / 2 - 50
        );

        ctx.font = "24px Arial";
        ctx.fillText(
          `Puntaje Final: ${gameState.score}`,
          GAME_CONFIG.CANVAS_WIDTH / 2,
          GAME_CONFIG.CANVAS_HEIGHT / 2 + 20
        );
        ctx.fillText(
          "Presiona R para reiniciar",
          GAME_CONFIG.CANVAS_WIDTH / 2,
          GAME_CONFIG.CANVAS_HEIGHT / 2 + 60
        );
        ctx.textAlign = "left";
      }
    };

    const gameLoop = () => {
      updateGame();
      render();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    // Reiniciar juego
    const handleRestart = (e) => {
      if (e.key === "r" || e.key === "R") {
        gameStateRef.current = {
          car: {
            x: (GAME_CONFIG.CANVAS_WIDTH - GAME_CONFIG.CAR_WIDTH) / 2,
            y: GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.CAR_HEIGHT - 10,
            width: GAME_CONFIG.CAR_WIDTH,
            height: GAME_CONFIG.CAR_HEIGHT,
          },
          block: {
            x:
              Math.random() *
              (GAME_CONFIG.CANVAS_WIDTH - GAME_CONFIG.BLOCK_WIDTH),
            y: -GAME_CONFIG.BLOCK_HEIGHT,
            width: GAME_CONFIG.BLOCK_WIDTH,
            height: GAME_CONFIG.BLOCK_HEIGHT,
            color: [COLORS.RED, COLORS.YELLOW, COLORS.GREEN][
              Math.floor(Math.random() * 3)
            ],
            speed: GAME_CONFIG.BLOCK_SPEED,
          },
          score: 0,
          isPlaying: true,
          keys: {},
        };
        setScore(0);
        setGameOver(false);
        setFinalScore(0);
      }
    };

    document.addEventListener("keydown", handleRestart);

    // Iniciar el juego
    gameLoop();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleRestart);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 min-h-[700px]">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🏎️ Esquiva los Obstáculos
        </h2>
        <p className="text-gray-600 mb-4">
          ¡El juego más inteligente del planeta! (Con IA incluida 🤖)
        </p>
        <div className="flex justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500"></div>
            <span>¡Evita! (Game Over)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500"></div>
            <span>¡Cuidado! (-2 puntos)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500"></div>
            <span>¡Recolecta! (+5 puntos)</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <canvas
          ref={canvasRef}
          className="border-2 border-gray-300 rounded"
          style={{ display: "block" }}
        />
      </div>

      <div className="mt-4 text-center">
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-lg font-semibold">
            Puntaje Actual: <span className="text-blue-600">{score}</span>
          </p>
          {gameOver && (
            <p className="text-red-600 font-bold mt-2">
              ¡Juego Terminado! Puntaje Final: {finalScore}
            </p>
          )}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>
            <strong>Controles:</strong> ← → para mover | R para reiniciar
          </p>
          <p>
            <strong>IA Activada:</strong> El auto esquiva obstáculos
            automáticamente
          </p>
        </div>
      </div>
    </div>
  );
}

export default GameComponent;
