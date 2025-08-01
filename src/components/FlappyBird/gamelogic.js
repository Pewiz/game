import kaplay from "kaplay";

// ========================================
// CONFIGURACIÓN INICIAL DEL JUEGO
// ========================================
let instanciaJuego = null;
let canvasEnUso = null;

// CONFIGURACIÓN DE VARIABLES DEL JUEGO (que los estudiantes pueden modificar fácilmente)
const CONFIGURACION_JUEGO = {
  ABERTURA_TUBO: 240, // Espacio entre tubos
  TUBO_MINIMO: 60, // Altura mínima de tubo
  FUERZA_SALTO: 800, // Fuerza del salto del pájaro
  VELOCIDAD: 320, // Velocidad de movimiento de los tubos
  TECHO: -60, // Límite superior del juego
  VOLUMEN_MUSICA: 0.3, // Volumen de la música de fondo
};

// ========================================
// FUNCIONES AUXILIARES PARA CARGAR RECURSOS
// ========================================

// FUNCIÓN PARA CARGAR RECURSOS DEL JUEGO
function cargarRecursos(k) {
  k.loadSprite("pajaro", "/assets/pajaro.png");
  k.loadSprite("fondo", "/assets/fondo.jpg");
  k.loadSprite("tubo", "/assets/tubo.png");
  k.loadSound("musica", "/assets/music.mp3");
}

// ========================================
// FUNCIONES PARA ELEMENTOS VISUALES
// ========================================

// FUNCIÓN PARA CONFIGURAR EL FONDO
function configurarFondo(k) {
  try {
    k.add([
      k.sprite("fondo"),
      k.pos(0, 0),
      k.scale(Math.max(k.width() / 800, k.height() / 600)),
      k.z(-100),
    ]);
  } catch {
    console.log("Usando color de fondo predeterminado (azul cielo)");
  }
}

// FUNCIÓN PARA CREAR EL PERSONAJE PRINCIPAL
function crearPajaro(k) {
  return k.add([
    k.sprite("pajaro"),
    k.pos(k.width() / 4, 0),
    k.area(),
    k.body(),
    k.scale(0.8),
  ]);
}

// FUNCIÓN PARA CREAR LA INTERFAZ DE PUNTUACIÓN
function crearInterfazPuntuacion(k, puntuacion) {
  return k.add([
    k.text(puntuacion.toString()),
    k.pos(24, 24),
    k.fixed(),
    k.color(255, 255, 255),
    k.scale(1.5),
    k.z(100),
    { value: puntuacion },
  ]);
}

// ========================================
// FUNCIONES PARA AUDIO
// ========================================

// FUNCIÓN PARA REPRODUCIR MÚSICA DE FONDO
function reproducirMusica(k) {
  try {
    return k.play("musica", {
      loop: true,
      volume: CONFIGURACION_JUEGO.VOLUMEN_MUSICA,
    });
  } catch {
    console.log("Música no disponible, continuando sin audio");
    return null;
  }
}

// ========================================
// FUNCIONES PARA OBSTÁCULOS
// ========================================

// FUNCIÓN PARA CREAR UN TUBO
function crearTubo(k, x, y, altura, invertido = false) {
  try {
    const tubo = k.add([
      k.pos(x, y),
      k.sprite("tubo"),
      k.scale(2.5, altura / 100),
      k.area(),
      k.move(k.LEFT, CONFIGURACION_JUEGO.VELOCIDAD),
      k.offscreen({ destroy: true }),
      "tubo",
    ]);

    if (invertido) {
      tubo.angle = 180;
      tubo.pos.y += altura;
      tubo.esSuperior = true;
    }

    return tubo;
  } catch {
    // Fallback: crear tubo rectangular si el sprite no está disponible
    return k.add([
      k.pos(x, y),
      k.rect(64, altura),
      k.color(0, 127, 255),
      k.outline(4),
      k.area(),
      k.move(k.LEFT, CONFIGURACION_JUEGO.VELOCIDAD),
      k.offscreen({ destroy: true }),
      "tubo",
    ]);
  }
}

// FUNCIÓN PARA GENERAR TUBOS
function generarTubos(k) {
  const h1 = k.rand(
    CONFIGURACION_JUEGO.TUBO_MINIMO,
    k.height() -
      CONFIGURACION_JUEGO.TUBO_MINIMO -
      CONFIGURACION_JUEGO.ABERTURA_TUBO
  );
  const h2 = k.height() - h1 - CONFIGURACION_JUEGO.ABERTURA_TUBO;

  // Crear tubo superior (invertido)
  crearTubo(k, k.width(), 0, h1, true);
  // Crear tubo inferior
  crearTubo(k, k.width(), h1 + CONFIGURACION_JUEGO.ABERTURA_TUBO, h2);
}

// ========================================
// FUNCIONES PARA CONTROLES Y MECÁNICAS
// ========================================

// FUNCIÓN PARA CONFIGURAR CONTROLES
function configurarControles(k, pajaro, musicaActual, puntuacionRef) {
  // Función de salto
  function saltar() {
    pajaro.jump(CONFIGURACION_JUEGO.FUERZA_SALTO);
  }

  // Controles de entrada
  k.onKeyPress("space", () => {
    saltar();
  });

  k.onClick(() => {
    saltar();
  });

  // Verificar límites del pájaro
  pajaro.onUpdate(() => {
    if (
      pajaro.pos.y >= k.height() ||
      pajaro.pos.y <= CONFIGURACION_JUEGO.TECHO
    ) {
      if (musicaActual) {
        musicaActual.stop();
      }
      k.go("perder", puntuacionRef.valor);
    }
  });
}

// FUNCIÓN PARA CONFIGURAR COLISIONES Y PUNTUACIÓN
function configurarColisionesYPuntuacion(
  k,
  pajaro,
  musicaActual,
  puntuacionRef,
  etiquetaPuntuacion
) {
  // Colisión con tubos
  pajaro.onCollide("tubo", () => {
    if (musicaActual) {
      musicaActual.stop();
    }
    k.go("perder", puntuacionRef.valor);
    k.addKaboom(pajaro.pos);
  });

  // Sistema de puntuación
  k.onUpdate("tubo", (t) => {
    if (t.pos.x + t.width <= pajaro.pos.x && t.puntuado !== true) {
      if (t.esSuperior === true) {
        puntuacionRef.valor++;
        t.puntuado = true;
      }
    }
  });

  // Actualizar etiqueta de puntuación
  etiquetaPuntuacion.onUpdate(() => {
    if (etiquetaPuntuacion.value !== puntuacionRef.valor) {
      etiquetaPuntuacion.value = puntuacionRef.valor;
      etiquetaPuntuacion.text = puntuacionRef.valor.toString();
    }
  });
}

// ========================================
// PANTALLAS DEL JUEGO
// ========================================

// FUNCIÓN PARA LA PANTALLA DE GAME OVER
function pantallaGameOver(k, puntuacion) {
  // Configurar fondo
  configurarFondo(k);

  // Título de Game Over
  k.add([
    k.text("Fin del Juego"),
    k.pos(k.width() / 2, k.height() / 2 - 80),
    k.scale(1.5),
    k.anchor("center"),
    k.color(255, 255, 255),
  ]);

  // Mostrar puntuación
  k.add([
    k.text(`Puntuación: ${puntuacion}`),
    k.pos(k.width() / 2, k.height() / 2),
    k.scale(1.2),
    k.anchor("center"),
    k.color(255, 255, 255),
  ]);

  // Instrucciones para reiniciar
  k.add([
    k.text("Presiona ESPACIO o Haz Clic para Jugar de Nuevo"),
    k.pos(k.width() / 2, k.height() / 2 + 80),
    k.scale(0.8),
    k.anchor("center"),
    k.color(255, 255, 255),
  ]);

  // Función para reiniciar
  function reiniciar() {
    k.go("juego");
  }

  k.onKeyPress("space", reiniciar);
  k.onClick(reiniciar);
}

// ========================================
// CONFIGURACIÓN PRINCIPAL DEL JUEGO
// ========================================

// FUNCIÓN PRINCIPAL PARA CONFIGURAR LA ESCENA DEL JUEGO
function configurarEscenaJuego(k) {
  // Configurar audio
  try {
    k.audio.ctx.resume();
    if (k.audio) {
      k.audio.masterNode.disconnect();
      k.audio.masterNode.connect(k.audio.ctx.destination);
    }
  } catch {
    // Si hay error con el audio, continuar
  }

  // Configurar fondo
  configurarFondo(k);

  // Crear personaje principal
  const pajaro = crearPajaro(k);

  // Variable de puntuación (usando objeto para mantener referencia)
  const puntuacionRef = { valor: 0 };

  // Reproducir música
  const musicaActual = reproducirMusica(k);

  // Crear interfaz de puntuación
  const etiquetaPuntuacion = crearInterfazPuntuacion(k, puntuacionRef.valor);

  // Configurar controles
  configurarControles(k, pajaro, musicaActual, puntuacionRef);

  // Configurar colisiones y puntuación
  configurarColisionesYPuntuacion(
    k,
    pajaro,
    musicaActual,
    puntuacionRef,
    etiquetaPuntuacion
  );

  // Generar tubos cada segundo
  k.loop(1, () => {
    generarTubos(k);
  });
}

// ========================================
// FUNCIÓN PRINCIPAL EXPORTADA
// ========================================

export function iniciarJuegoFlappyBird(contenedor) {
  // Verificar si ya existe una instancia del juego para este contenedor
  if (instanciaJuego && canvasEnUso === contenedor) {
    return instanciaJuego;
  }

  // Limpiar instancia anterior si existe
  if (instanciaJuego && canvasEnUso !== contenedor) {
    try {
      instanciaJuego.quit();
    } catch (error) {
      console.warn("Error limpiando instancia anterior del juego:", error);
    }
    instanciaJuego = null;
    canvasEnUso = null;
  }

  // Crear nueva instancia del juego
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

  // Configurar gravedad
  instanciaJuego.setGravity(3200);

  // Cargar recursos del juego
  cargarRecursos(instanciaJuego);

  // CONFIGURAR ESCENA PRINCIPAL DEL JUEGO
  instanciaJuego.scene("juego", () => {
    configurarEscenaJuego(instanciaJuego);
  });

  // CONFIGURAR PANTALLA DE GAME OVER
  instanciaJuego.scene("perder", (puntuacion) => {
    pantallaGameOver(instanciaJuego, puntuacion);
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
