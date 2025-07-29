import { useEffect, useRef, useState } from "react";
import { createGame } from "odyc";

function ComponenteJuego() {
  const gameContainerRef = useRef(null);
  const [puntos, setPuntos] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [nivel, setNivel] = useState(1);

  useEffect(() => {
    const container = gameContainerRef.current;
    if (!container) return;

    // 🎮 VARIABLES DEL JUEGO - ¡Los estudiantes pueden cambiar estos valores!
    let puntosActuales = 0;
    let VELOCIDAD_OBSTACULOS = 1; // Variable para controlar la velocidad (puede usarse en futuras versiones)
    let nivelActual = 1;
    let obstaculosEsquivados = 0;

    // 🎯 CREAR EL JUEGO CON ODYC.JS
    const juego = createGame({
      title: "🏎️ Esquiva los Obstáculos",

      // 🚗 JUGADOR - Nuestro auto azul
      player: {
        sprite: `
          🚙
        `,
        position: [4, 9], // Posición inicial (columna 4, fila 9)
        solid: true,
      },

      // 🗺️ MAPA DEL JUEGO - La carretera donde jugamos
      map: `
        ##########
        #........#
        #........#
        #........#
        #........#
        #........#
        #........#
        #........#
        #........#
        #........#
      `,

      // 🎨 PLANTILLAS - Definimos los elementos del juego
      templates: {
        // 🧱 Bordes de la carretera
        "#": {
          sprite: "🟫",
          solid: true,
        },

        // 🟥 Obstáculo rojo - ¡Evítalo!
        R: {
          sprite: "🟥",
          solid: true,
          onTouch: () => {
            // ¡Game Over!
            setJuegoTerminado(true);
            return {
              dialog: "💥 ¡Chocaste! Presiona R para reiniciar",
            };
          },
        },

        // 🟩 Obstáculo verde - ¡Recoléctalo!
        G: {
          sprite: "🟩",
          onTouch: () => {
            puntosActuales += 5;
            setPuntos(puntosActuales);
            // Remover el obstáculo verde cuando lo tocamos
            return { remove: true };
          },
        },
      },

      // 🎨 CONFIGURACIÓN VISUAL
      config: {
        background: "#87CEEB", // Cielo azul
        cellSize: 40,
        screen: {
          width: 400,
          height: 400,
        },
      },

      // 🎮 EVENTOS DEL JUEGO
      events: {
        // ⏰ Cada segundo, generar nuevos obstáculos
        onTick: () => {
          // Mover obstáculos hacia abajo
          moverObstaculos();

          // Generar nuevos obstáculos
          if (Math.random() < 0.3) {
            // 30% de probabilidad
            generarObstaculo();
          }

          // Aumentar dificultad cada 10 obstáculos esquivados
          if (obstaculosEsquivados > 0 && obstaculosEsquivados % 10 === 0) {
            nivelActual++;
            VELOCIDAD_OBSTACULOS += 0.2;
            setNivel(nivelActual);
          }
        },

        // ⌨️ CONTROLES - Mover el auto con las flechas
        onKey: (key) => {
          const player = juego.getPlayer();
          const [x, y] = player.position;

          switch (key) {
            case "ArrowLeft":
              if (x > 1) {
                // No salirse del borde izquierdo
                juego.movePlayer([x - 1, y]);
              }
              break;
            case "ArrowRight":
              if (x < 8) {
                // No salirse del borde derecho
                juego.movePlayer([x + 1, y]);
              }
              break;
            case "r":
            case "R":
              if (juegoTerminado) {
                reiniciarJuego();
              }
              break;
          }
        },
      },
    });

    // 🚀 FUNCIÓN PARA GENERAR OBSTÁCULOS
    function generarObstaculo() {
      const columnaAleatoria = Math.floor(Math.random() * 8) + 1; // Columnas 1-8
      const tipoObstaculo = Math.random() > 0.7 ? "G" : "R"; // 70% rojos, 30% verdes

      // Agregar obstáculo en la parte superior
      juego.setCell([columnaAleatoria, 0], tipoObstaculo);
    }

    // ⬇️ FUNCIÓN PARA MOVER OBSTÁCULOS HACIA ABAJO
    function moverObstaculos() {
      const mapa = juego.getMap();

      // Recorrer desde abajo hacia arriba para evitar duplicados
      for (let fila = 9; fila >= 0; fila--) {
        for (let columna = 1; columna <= 8; columna++) {
          const celda = mapa[fila][columna];

          if (celda === "R" || celda === "G") {
            // Limpiar la celda actual
            juego.setCell([columna, fila], ".");

            // Mover hacia abajo
            if (fila < 9) {
              juego.setCell([columna, fila + 1], celda);
            } else {
              // Si llegó al final, contar como obstáculo esquivado
              if (celda === "R") {
                obstaculosEsquivados++;
                puntosActuales += 1;
                setPuntos(puntosActuales);
              }
            }
          }
        }
      }
    }

    // 🔄 FUNCIÓN PARA REINICIAR EL JUEGO
    function reiniciarJuego() {
      puntosActuales = 0;
      VELOCIDAD_OBSTACULOS = 1;
      nivelActual = 1;
      obstaculosEsquivados = 0;

      setPuntos(0);
      setNivel(1);
      setJuegoTerminado(false);

      // Limpiar todos los obstáculos del mapa
      for (let fila = 0; fila < 10; fila++) {
        for (let columna = 1; columna <= 8; columna++) {
          juego.setCell([columna, fila], ".");
        }
      }

      // Resetear posición del jugador
      juego.movePlayer([4, 9]);
    }

    // 🎯 INICIAR EL JUEGO
    juego.mount(container);

    // Limpiar cuando el componente se desmonte
    return () => {
      if (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [juegoTerminado]); // Agregar juegoTerminado como dependencia

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 min-h-[700px]">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🏎️ ¡Esquiva los Obstáculos!
        </h2>
        <p className="text-gray-600 mb-4">
          ¡Tu primer videojuego creado con Odyc.js!
        </p>

        {/* 📊 ESTADÍSTICAS DEL JUEGO */}
        <div className="flex justify-center space-x-6 mb-4">
          <div className="bg-blue-100 px-4 py-2 rounded-lg">
            <span className="font-bold text-blue-800">Puntos: {puntos}</span>
          </div>
          <div className="bg-purple-100 px-4 py-2 rounded-lg">
            <span className="font-bold text-purple-800">Nivel: {nivel}</span>
          </div>
        </div>

        {/* 🎯 EXPLICACIÓN DE LOS ELEMENTOS */}
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🟥</span>
            <span className="font-semibold">¡Evita los rojos!</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🟩</span>
            <span className="font-semibold">¡Recolecta los verdes!</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🚙</span>
            <span className="font-semibold">¡Tu auto!</span>
          </div>
        </div>
      </div>

      {/* 🎮 ÁREA DEL JUEGO */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div
          ref={gameContainerRef}
          className="border-4 border-gray-400 rounded"
        />
      </div>

      {/* 📖 INSTRUCCIONES */}
      <div className="mt-6 text-center max-w-md">
        {juegoTerminado && (
          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <p className="text-red-600 font-bold text-lg">
              💥 ¡Se acabó el juego!
            </p>
            <p className="text-red-600">Puntos finales: {puntos}</p>
          </div>
        )}

        <div className="bg-yellow-50 p-4 rounded-lg text-sm">
          <h3 className="font-bold text-lg mb-2">📖 Instrucciones:</h3>
          <div className="space-y-1">
            <p>
              <strong>← →</strong> Mover el auto
            </p>
            <p>
              <strong>R</strong> Reiniciar el juego
            </p>
            <p>
              <strong>🟥 Rojos:</strong> ¡No los toques o pierdes!
            </p>
            <p>
              <strong>🟩 Verdes:</strong> ¡Recoléctalos para +5 puntos!
            </p>
            <p>
              <strong>🎯 Objetivo:</strong> ¡Esquiva obstáculos para subir de
              nivel!
            </p>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 p-3 rounded-lg text-xs">
          <p className="font-semibold text-blue-800">
            💡 ¡La dificultad aumenta cada 10 obstáculos esquivados!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComponenteJuego;
