import kaplay from "kaplay";

// CONFIGURACIÓN INICIAL DEL JUEGO
let instanciaJuego = null;
let canvasEnUso = null;

export function iniciarJuegoFlappyBird(contenedor) {
  if (instanciaJuego && canvasEnUso === contenedor) {
    return instanciaJuego;
  }

  if (instanciaJuego && canvasEnUso !== contenedor) {
    try {
      instanciaJuego.quit();
    } catch (error) {
      console.warn("Error limpiando instancia anterior del juego:", error);
    }
    instanciaJuego = null;
    canvasEnUso = null;
  }

  if (!instanciaJuego) {
    const k = kaplay({
      canvas: contenedor,
      width: 800,
      height: 600,
      background: [135, 206, 250],
    });

    instanciaJuego = k;
    canvasEnUso = contenedor;
  }

  instanciaJuego.setGravity(3200);

  instanciaJuego.loadSprite("pajaro", "/assets/pajaro.png");

  instanciaJuego.loadSprite("fondo", "/assets/fondo.jpg");

  instanciaJuego.loadSprite("tubo", "/assets/tubo.png");

  instanciaJuego.loadSound("musica", "/assets/music.mp3");

  // CONFIGURACIÓN DE VARIABLES DEL JUEGO
  instanciaJuego.scene("juego", () => {
    try {
      instanciaJuego.audio.ctx.resume();
      if (instanciaJuego.audio) {
        instanciaJuego.audio.masterNode.disconnect();
        instanciaJuego.audio.masterNode.connect(
          instanciaJuego.audio.ctx.destination
        );
      }
    } catch {
      // Si hay error con el audio, continuar
    }

    const ABERTURA_TUBO = 240;
    const TUBO_MINIMO = 60;
    const FUERZA_SALTO = 800;
    const VELOCIDAD = 320;
    const TECHO = -60;

    try {
      instanciaJuego.add([
        instanciaJuego.sprite("fondo"),
        instanciaJuego.pos(0, 0),
        instanciaJuego.scale(
          Math.max(instanciaJuego.width() / 800, instanciaJuego.height() / 600)
        ),
        instanciaJuego.z(-100),
      ]);
    } catch {
      console.log("Usando color de fondo predeterminado (azul cielo)");
    }

    //CREAR EL PERSONAJE PRINCIPAL
    const pajaro = instanciaJuego.add([
      instanciaJuego.sprite("pajaro"),
      instanciaJuego.pos(instanciaJuego.width() / 4, 0),
      instanciaJuego.area(),
      instanciaJuego.body(),
      instanciaJuego.scale(0.8),
    ]);

    let puntuacion = 0;

    let musicaActual = null;

    //Reproducir música de fondo
    try {
      musicaActual = instanciaJuego.play("musica", {
        loop: true,
        volume: 0.3,
      });
    } catch {
      console.log("Música no disponible, continuando sin audio");
    }

    // CONTROLES Y MOVIMIENTO
    pajaro.onUpdate(() => {
      if (pajaro.pos.y >= instanciaJuego.height() || pajaro.pos.y <= TECHO) {
        if (musicaActual) {
          musicaActual.stop();
        }
        instanciaJuego.go("perder", puntuacion);
      }
    });

    function saltar() {
      pajaro.jump(FUERZA_SALTO);
    }

    instanciaJuego.onKeyPress("space", () => {
      saltar();
    });

    instanciaJuego.onClick(() => {
      saltar();
    });

    //CREACIÓN DE OBSTÁCULOS
    function crearTubo(x, y, altura, invertido = false) {
      try {
        const tubo = instanciaJuego.add([
          instanciaJuego.pos(x, y),
          instanciaJuego.sprite("tubo"),
          instanciaJuego.scale(2.5, altura / 100),
          instanciaJuego.area(),
          instanciaJuego.move(instanciaJuego.LEFT, VELOCIDAD),
          instanciaJuego.offscreen({ destroy: true }),
          "tubo",
        ]);

        if (invertido) {
          tubo.angle = 180;
          tubo.pos.y += altura;
          tubo.esSuperior = true;
        }

        return tubo;
      } catch {
        return instanciaJuego.add([
          instanciaJuego.pos(x, y),
          instanciaJuego.rect(64, altura),
          instanciaJuego.color(0, 127, 255),
          instanciaJuego.outline(4),
          instanciaJuego.area(),
          instanciaJuego.move(instanciaJuego.LEFT, VELOCIDAD),
          instanciaJuego.offscreen({ destroy: true }),
          "tubo",
        ]);
      }
    }

    function generarTubos() {
      const h1 = instanciaJuego.rand(
        TUBO_MINIMO,
        instanciaJuego.height() - TUBO_MINIMO - ABERTURA_TUBO
      );
      const h2 = instanciaJuego.height() - h1 - ABERTURA_TUBO;

      crearTubo(instanciaJuego.width(), 0, h1, true);

      crearTubo(instanciaJuego.width(), h1 + ABERTURA_TUBO, h2);
    }

    //  COLISIONES Y PUNTUACIÓN
    pajaro.onCollide("tubo", () => {
      if (musicaActual) {
        musicaActual.stop();
      }
      instanciaJuego.go("perder", puntuacion);
      instanciaJuego.addKaboom(pajaro.pos);
    });

    instanciaJuego.onUpdate("tubo", (t) => {
      if (t.pos.x + t.width <= pajaro.pos.x && t.puntuado !== true) {
        if (t.esSuperior === true) {
          puntuacion++;
          t.puntuado = true;
        }
      }
    });

    instanciaJuego.loop(1, () => {
      generarTubos();
    });

    //INTERFAZ DE USUARIO - MOSTRAR PUNTUACIÓN
    const etiquetaPuntuacion = instanciaJuego.add([
      instanciaJuego.text(puntuacion.toString()),
      instanciaJuego.pos(24, 24),
      instanciaJuego.fixed(),
      instanciaJuego.color(255, 255, 255),
      instanciaJuego.scale(1.5),
      instanciaJuego.z(100),
      { value: puntuacion },
    ]);

    etiquetaPuntuacion.onUpdate(() => {
      if (etiquetaPuntuacion.value !== puntuacion) {
        etiquetaPuntuacion.value = puntuacion;
        etiquetaPuntuacion.text = puntuacion.toString();
      }
    });
  });

  //PANTALLA DE GAME OVER
  instanciaJuego.scene("perder", (puntuacion) => {
    try {
      instanciaJuego.add([
        instanciaJuego.sprite("fondo"),
        instanciaJuego.pos(0, 0),
        instanciaJuego.scale(
          Math.max(instanciaJuego.width() / 800, instanciaJuego.height() / 600)
        ),
        instanciaJuego.z(-100),
      ]);
    } catch {
      console.log("Usando color de fondo predeterminado en Game Over");
    }

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

    function reiniciar() {
      instanciaJuego.go("juego");
    }

    instanciaJuego.onKeyPress("space", reiniciar);
    instanciaJuego.onClick(reiniciar);
  });

  // INICIAR EL JUEGO
  instanciaJuego.go("juego");

  return instanciaJuego;
}

// LIMPIEZA Y CIERRE
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
