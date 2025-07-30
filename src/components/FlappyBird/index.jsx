import { useEffect, useRef } from "react";
import { initFlappyBirdGame, cleanupGame } from "./gameLogic.js";

const FlappyBird = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (canvasRef.current && !gameRef.current && !initializedRef.current) {
      try {
        // Initialize the game
        initializedRef.current = true;
        gameRef.current = initFlappyBirdGame(canvasRef.current);
      } catch (error) {
        console.error("Error initializing game:", error);
        initializedRef.current = false;
      }
    }

    // Add window cleanup listener
    const handleBeforeUnload = () => {
      cleanupGame();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      if (gameRef.current || initializedRef.current) {
        try {
          cleanupGame();
        } catch (error) {
          console.error("Error quitting game:", error);
        }
        gameRef.current = null;
        initializedRef.current = false;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-600">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          🐦 Flappy Bird
        </h1>
        <p className="text-white text-center">Press SPACE or Click to jump!</p>
      </div>

      <div className="border-4 border-white rounded-lg shadow-2xl overflow-hidden">
        <canvas
          ref={canvasRef}
          className="block"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <div className="mt-4 text-white text-center max-w-md">
        <p className="text-sm">
          Navigate the bird through the pipes! Avoid hitting the pipes or the
          ground.
        </p>
      </div>
    </div>
  );
};

export default FlappyBird;
