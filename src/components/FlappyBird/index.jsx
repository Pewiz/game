import { useEffect, useRef } from "react";
import { iniciarJuegoFlappyBird, limpiarJuego } from "./gameLogic.js";

const FlappyBird = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (canvasRef.current && !gameRef.current && !initializedRef.current) {
      try {
        // Pequeño delay para evitar problemas con React StrictMode
        const timeoutId = setTimeout(() => {
          if (
            canvasRef.current &&
            !gameRef.current &&
            !initializedRef.current
          ) {
            initializedRef.current = true;
            gameRef.current = iniciarJuegoFlappyBird(canvasRef.current);
          }
        }, 100);

        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error("Error inicializando el juego:", error);
        initializedRef.current = false;
      }
    }

    // Agregamos listener para limpiar antes de cerrar la ventana
    const manejarAntesDeCerrar = () => {
      limpiarJuego();
    };

    window.addEventListener("beforeunload", manejarAntesDeCerrar);

    // Función de limpieza
    return () => {
      window.removeEventListener("beforeunload", manejarAntesDeCerrar);

      if (gameRef.current || initializedRef.current) {
        try {
          limpiarJuego();
        } catch (error) {
          console.error("Error cerrando el juego:", error);
        }
        gameRef.current = null;
        initializedRef.current = false;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-600">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          🐦 Flappy Bird
        </h1>
        <p className="text-white text-center">Desarrollado por</p>
      </div>

      <div className="border-4 border-white rounded-lg shadow-2xl overflow-hidden">
        <canvas
          ref={canvasRef}
          className="block"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
    </div>
  );
};

export default FlappyBird;
