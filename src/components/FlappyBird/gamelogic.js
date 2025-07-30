import kaplay from "kaplay";

// Variable global para rastrear si KAPLAY ya está inicializado
let instanciaJuego = null;

export function iniciarJuegoFlappyBird(contenedor) {
  // Si ya hay una instancia del juego, la limpiamos primero
  if (instanciaJuego) {
    try {
      instanciaJuego.quit();
    } catch (error) {
      console.warn("Error limpiando instancia anterior del juego:", error);
    }
    instanciaJuego = null;
  }

  const k = kaplay({
    canvas: contenedor,
    width: 800,
    height: 600,
    background: [135, 206, 250], // Fondo azul cielo
  });

  // Guardamos la instancia globalmente
  instanciaJuego = k;

  // Definimos la gravedad
  k.setGravity(3200);

  k.scene("juego", () => {
    const ABERTURA_TUBO = 240;
    const TUBO_MINIMO = 60;
    const FUERZA_SALTO = 800;
    const VELOCIDAD = 320;
    const TECHO = -60;

    // Creamos el pájaro usando formas básicas en lugar de sprites
    const pajaro = k.add([
      k.circle(16),
      k.color(255, 215, 0), // Color dorado
      k.pos(k.width() / 4, 0),
      k.area(),
      k.body(),
      k.outline(2, k.Color.ORANGE),
    ]);

    // Agregamos ojos al pájaro
    k.add([
      k.circle(3),
      k.color(0, 0, 0),
      k.pos(k.width() / 4 - 6, -6),
      k.follow(pajaro, k.vec2(-6, -6)),
    ]);

    // Verificamos si el pájaro se cae y muere
    pajaro.onUpdate(() => {
      if (pajaro.pos.y >= k.height() || pajaro.pos.y <= TECHO) {
        k.go("perder", puntuacion);
      }
    });

    // Controles de salto
    k.onKeyPress("space", () => {
      pajaro.jump(FUERZA_SALTO);
    });

    k.onGamepadButtonPress("south", () => {
      pajaro.jump(FUERZA_SALTO);
    });

    // Toque móvil
    k.onClick(() => {
      pajaro.jump(FUERZA_SALTO);
    });

    function generarTubo() {
      // Calculamos las posiciones de los tubos
      const h1 = k.rand(TUBO_MINIMO, k.height() - TUBO_MINIMO - ABERTURA_TUBO);
      const h2 = k.height() - h1 - ABERTURA_TUBO;

      // Tubo superior
      k.add([
        k.pos(k.width(), 0),
        k.rect(64, h1),
        k.color(0, 127, 255),
        k.outline(4),
        k.area(),
        k.move(k.LEFT, VELOCIDAD),
        k.offscreen({ destroy: true }),
        "tubo",
      ]);

      // Tubo inferior
      k.add([
        k.pos(k.width(), h1 + ABERTURA_TUBO),
        k.rect(64, h2),
        k.color(0, 127, 255),
        k.outline(4),
        k.area(),
        k.move(k.LEFT, VELOCIDAD),
        k.offscreen({ destroy: true }),
        "tubo",
        { pasado: false },
      ]);
    }

    // Colisión con tubos
    pajaro.onCollide("tubo", () => {
      k.go("perder", puntuacion);
      k.addKaboom(pajaro.pos);
    });

    // Verificamos si el pájaro pasó el tubo
    k.onUpdate("tubo", (t) => {
      if (t.pos.x + t.width <= pajaro.pos.x && t.pasado === false) {
        agregarPunto();
        t.pasado = true;
      }
    });

    // Generamos un tubo cada 1 segundo
    k.loop(1, () => {
      generarTubo();
    });

    let puntuacion = 0;

    // Mostramos la puntuación
    const etiquetaPuntuacion = k.add([
      k.text(puntuacion.toString()),
      k.anchor("center"),
      k.pos(k.width() / 2, 80),
      k.fixed(),
      k.z(100),
      k.color(255, 255, 255),
    ]);

    function agregarPunto() {
      puntuacion++;
      etiquetaPuntuacion.text = puntuacion.toString();
    }
  });

  k.scene("perder", (puntuacion) => {
    // Pantalla de fin del juego
    k.add([
      k.text("Fin del Juego", { size: 48 }),
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

    // Mostramos la puntuación final
    k.add([
      k.text("Puntuación: " + puntuacion, { size: 32 }),
      k.pos(k.width() / 2, k.height() / 2 + 50),
      k.anchor("center"),
      k.color(255, 255, 255),
    ]);

    k.add([
      k.text("Presiona ESPACIO o Haz Clic para Jugar de Nuevo", { size: 16 }),
      k.pos(k.width() / 2, k.height() / 2 + 100),
      k.anchor("center"),
      k.color(255, 255, 255),
    ]);

    // Reiniciar juego
    k.onKeyPress("space", () => k.go("juego"));
    k.onClick(() => k.go("juego"));
  });

  // Iniciamos el juego
  k.go("juego");

  return k;
}

export function limpiarJuego() {
  if (instanciaJuego) {
    try {
      instanciaJuego.quit();
    } catch (error) {
      console.warn("Error limpiando instancia del juego:", error);
    }
    instanciaJuego = null;
  }
}
