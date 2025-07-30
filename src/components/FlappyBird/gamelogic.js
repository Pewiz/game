import kaplay from "kaplay";

// Variable global para rastrear si KAPLAY ya está inicializado
let instanciaJuego = null;
let canvasEnUso = null;

export function iniciarJuegoFlappyBird(contenedor) {
  // Si ya hay una instancia del juego en el mismo canvas, la devolvemos
  if (instanciaJuego && canvasEnUso === contenedor) {
    return instanciaJuego;
  }

  // Si hay una instancia anterior con diferente canvas, la limpiamos
  if (instanciaJuego && canvasEnUso !== contenedor) {
    try {
      instanciaJuego.quit();
    } catch (error) {
      console.warn("Error limpiando instancia anterior del juego:", error);
    }
    instanciaJuego = null;
    canvasEnUso = null;
  }

  // Solo crear nueva instancia si no existe
  if (!instanciaJuego) {
    const k = kaplay({
      canvas: contenedor,
      width: 800,
      height: 600,
      background: [135, 206, 250], // Fondo azul cielo
    });

    // Guardamos la instancia y el canvas globalmente
    instanciaJuego = k;
    canvasEnUso = contenedor;
  }

  // Definimos la gravedad
  instanciaJuego.setGravity(3200);

  instanciaJuego.scene("juego", () => {
    const ABERTURA_TUBO = 240;
    const TUBO_MINIMO = 60;
    const FUERZA_SALTO = 800;
    const VELOCIDAD = 320;
    const TECHO = -60;

    // Creamos el pájaro usando formas básicas en lugar de sprites
    const pajaro = instanciaJuego.add([
      instanciaJuego.circle(16),
      instanciaJuego.color(255, 215, 0), // Color dorado
      instanciaJuego.pos(instanciaJuego.width() / 4, 0),
      instanciaJuego.area(),
      instanciaJuego.body(),
      instanciaJuego.outline(2, instanciaJuego.Color.ORANGE),
    ]);

    // Agregamos ojos al pájaro
    instanciaJuego.add([
      instanciaJuego.circle(3),
      instanciaJuego.color(0, 0, 0),
      instanciaJuego.pos(instanciaJuego.width() / 4 - 6, -6),
      instanciaJuego.follow(pajaro, instanciaJuego.vec2(-6, -6)),
    ]);

    // Variable para rastrear la puntuación
    let puntuacion = 0;

    // Verificamos si el pájaro se cae y muere
    pajaro.onUpdate(() => {
      if (pajaro.pos.y >= instanciaJuego.height() || pajaro.pos.y <= TECHO) {
        instanciaJuego.go("perder", puntuacion);
      }
    });

    // Función para hacer saltar al pájaro
    function saltar() {
      pajaro.jump(FUERZA_SALTO);
    }

    // Controles del pájaro
    instanciaJuego.onKeyPress("space", () => {
      saltar();
    });

    instanciaJuego.onGamepadButtonPress("south", () => {
      saltar();
    });

    // Control con clic del mouse
    instanciaJuego.onClick(() => {
      saltar();
    });

    // Función para generar tubos
    function generarTubos() {
      const h1 = instanciaJuego.rand(
        TUBO_MINIMO,
        instanciaJuego.height() - TUBO_MINIMO - ABERTURA_TUBO
      );
      const h2 = instanciaJuego.height() - h1 - ABERTURA_TUBO;

      // Tubo superior
      instanciaJuego.add([
        instanciaJuego.pos(instanciaJuego.width(), 0),
        instanciaJuego.rect(64, h1),
        instanciaJuego.color(0, 127, 255),
        instanciaJuego.outline(4),
        instanciaJuego.area(),
        instanciaJuego.move(instanciaJuego.LEFT, VELOCIDAD),
        instanciaJuego.offscreen({ destroy: true }),
        "tubo",
      ]);

      // Tubo inferior
      instanciaJuego.add([
        instanciaJuego.pos(instanciaJuego.width(), h1 + ABERTURA_TUBO),
        instanciaJuego.rect(64, h2),
        instanciaJuego.color(0, 127, 255),
        instanciaJuego.outline(4),
        instanciaJuego.area(),
        instanciaJuego.move(instanciaJuego.LEFT, VELOCIDAD),
        instanciaJuego.offscreen({ destroy: true }),
        "tubo",
      ]);
    }

    // Detectamos colisiones con los tubos
    pajaro.onCollide("tubo", () => {
      instanciaJuego.go("perder", puntuacion);
      instanciaJuego.addKaboom(pajaro.pos);
    });

    // Detectamos cuando el pájaro pasa por un tubo para incrementar puntuación
    instanciaJuego.onUpdate("tubo", (t) => {
      if (t.pos.x + t.width <= pajaro.pos.x && t.puntuado !== true) {
        // Solo contamos puntos en el tubo superior para evitar duplicados
        if (t.pos.y === 0) {
          puntuacion++;
          t.puntuado = true;
        }
      }
    });

    // Generar tubos cada 1 segundo
    instanciaJuego.loop(1, () => {
      generarTubos();
    });

    // Mostrar puntuación en pantalla
    const etiquetaPuntuacion = instanciaJuego.add([
      instanciaJuego.text(puntuacion.toString()),
      instanciaJuego.pos(24, 24),
      instanciaJuego.fixed(),
      instanciaJuego.color(255, 255, 255),
      instanciaJuego.scale(1.5),
      { value: puntuacion },
    ]);

    // Actualizar texto de puntuación
    etiquetaPuntuacion.onUpdate(() => {
      if (etiquetaPuntuacion.value !== puntuacion) {
        etiquetaPuntuacion.value = puntuacion;
        etiquetaPuntuacion.text = puntuacion.toString();
      }
    });
  });

  // Escena de fin de juego
  instanciaJuego.scene("perder", (puntuacion) => {
    instanciaJuego.add([
      instanciaJuego.text("Fin del Juego"),
      instanciaJuego.pos(
        instanciaJuego.width() / 2,
        instanciaJuego.height() / 2 - 80
      ),
      instanciaJuego.scale(1.5),
      instanciaJuego.anchor("center"),
      instanciaJuego.color(255, 255, 255),
    ]);

    // Mostrar puntuación final
    instanciaJuego.add([
      instanciaJuego.text(`Puntuación: ${puntuacion}`),
      instanciaJuego.pos(
        instanciaJuego.width() / 2,
        instanciaJuego.height() / 2
      ),
      instanciaJuego.scale(1.2),
      instanciaJuego.anchor("center"),
      instanciaJuego.color(255, 255, 255),
    ]);

    instanciaJuego.add([
      instanciaJuego.text("Presiona ESPACIO o Haz Clic para Jugar de Nuevo"),
      instanciaJuego.pos(
        instanciaJuego.width() / 2,
        instanciaJuego.height() / 2 + 80
      ),
      instanciaJuego.scale(0.8),
      instanciaJuego.anchor("center"),
      instanciaJuego.color(255, 255, 255),
    ]);

    // Función para reiniciar el juego
    function reiniciar() {
      instanciaJuego.go("juego");
    }

    // Controles para reiniciar
    instanciaJuego.onKeyPress("space", reiniciar);
    instanciaJuego.onClick(reiniciar);
  });

  // Iniciamos el juego
  instanciaJuego.go("juego");

  return instanciaJuego;
}

export function limpiarJuego() {
  if (instanciaJuego) {
    try {
      instanciaJuego.quit();
    } catch (error) {
      console.warn("Error limpiando instancia del juego:", error);
    }
    instanciaJuego = null;
    canvasEnUso = null;
  }
}
