import kaplay from "kaplay";

// ============================================================================
// 📋 SECCIÓN 1: CONFIGURACIÓN INICIAL DEL JUEGO (5 minutos)
// ============================================================================

// Variable global para rastrear si KAPLAY ya está inicializado
let instanciaJuego = null;
let canvasEnUso = null;

// ============================================================================
// 🚀 SECCIÓN 2: INICIALIZACIÓN DEL MOTOR DE JUEGO (5 minutos)
// ============================================================================

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
      width: 800, // 🎯 Ancho del juego
      height: 600, // 🎯 Alto del juego
      background: [135, 206, 250], // 🎨 Fondo azul cielo (RGB)
    });

    // Guardamos la instancia y el canvas globalmente
    instanciaJuego = k;
    canvasEnUso = contenedor;
  }

  // ⚡ Configuramos la física del juego
  instanciaJuego.setGravity(3200); // 🎯 La gravedad hace que el pájaro caiga

  // 🖼️ Cargamos las imágenes del juego desde internet
  instanciaJuego.loadSprite(
    "pajaro",
    "/assets/pajaro.png" // URL de la imagen del pájaro
  );

  // 🌅 Intentamos cargar imagen de fondo (si no existe, usamos color plano)
  instanciaJuego.loadSprite(
    "fondo",
    "/assets/fondo.jpg" // URL de la imagen de fondo
  );

  // 🏗️ Intentamos cargar imagen para los tubos (si no existe, usamos rectángulos)
  instanciaJuego.loadSprite(
    "tubo",
    "/assets/tubo.png" // URL de la imagen del tubo
  );

  // 🎵 Cargamos la música de fondo del juego
  instanciaJuego.loadSound(
    "musica",
    "/assets/music.mp3" // URL de la música de fondo
  );

  // ============================================================================
  // 🎮 SECCIÓN 3: CONFIGURACIÓN DE VARIABLES DEL JUEGO (5 minutos)
  // ============================================================================

  instanciaJuego.scene("juego", () => {
    // 🔇 Pausar toda la música anterior antes de empezar
    try {
      instanciaJuego.audio.ctx.resume(); // Reanudar contexto de audio si está suspendido
      // Detener todos los sonidos que puedan estar reproduciéndose
      if (instanciaJuego.audio) {
        instanciaJuego.audio.masterNode.disconnect();
        instanciaJuego.audio.masterNode.connect(
          instanciaJuego.audio.ctx.destination
        );
      }
    } catch {
      // Si hay error con el audio, continuar
    }

    // 🎯 Variables que controlan la dificultad del juego
    const ABERTURA_TUBO = 240; // 📏 Espacio entre tubos (más grande = más fácil)
    const TUBO_MINIMO = 60; // 📏 Altura mínima de los tubos
    const FUERZA_SALTO = 800; // 🚀 Qué tan fuerte salta el pájaro
    const VELOCIDAD = 320; // ⚡ Velocidad de los tubos (más rápido = más difícil)
    const TECHO = -60; // 🛡️ Límite superior (invisible)

    // 🌅 Agregamos fondo con imagen o color de respaldo
    try {
      // Intentamos usar la imagen de fondo
      instanciaJuego.add([
        instanciaJuego.sprite("fondo"), // 🖼️ Imagen de fondo
        instanciaJuego.pos(0, 0), // 📍 Posición en esquina superior izquierda
        instanciaJuego.scale(
          Math.max(
            instanciaJuego.width() / 800, // Escalar según ancho
            instanciaJuego.height() / 600 // Escalar según alto
          )
        ),
        instanciaJuego.z(-100), // 🎭 Enviar al fondo (detrás de todo)
      ]);
    } catch {
      // Si no se puede cargar la imagen, mantenemos el color de fondo predeterminado
      console.log("Usando color de fondo predeterminado (azul cielo)");
    }

    // ============================================================================
    // 🐦 SECCIÓN 4: CREAR EL PERSONAJE PRINCIPAL (10 minutos)
    // ============================================================================

    // 🎨 Creamos el pájaro usando una imagen personalizada
    const pajaro = instanciaJuego.add([
      instanciaJuego.sprite("pajaro"), // �️ Imagen del pájaro cargada
      instanciaJuego.pos(instanciaJuego.width() / 4, 0), // 📍 Posición inicial (1/4 del ancho)
      instanciaJuego.area(), // 💥 Detecta colisiones
      instanciaJuego.body(), // ⚡ Afectado por la gravedad
      instanciaJuego.scale(0.8), // � Ajustar tamaño de la imagen (80%)
    ]);

    // 📊 Variable para contar los puntos del jugador
    let puntuacion = 0;

    // 🎵 Variable para controlar la música
    let musicaActual = null;

    // 🎵 Reproducir música de fondo (en bucle y con volumen moderado)
    try {
      musicaActual = instanciaJuego.play("musica", {
        loop: true, // 🔄 Repetir la música indefinidamente
        volume: 0.3, // 🔊 Volumen al 30% para no ser molesta
      });
    } catch {
      // Si no se puede cargar la música, continuamos sin ella
      console.log("Música no disponible, continuando sin audio");
    }

    // ============================================================================
    // 🎯 SECCIÓN 5: CONTROLES Y MOVIMIENTO (8 minutos)
    // ============================================================================

    // 💀 Verificamos si el pájaro se cae o toca el techo
    pajaro.onUpdate(() => {
      // Si toca el suelo o el techo invisible, ¡GAME OVER!
      if (pajaro.pos.y >= instanciaJuego.height() || pajaro.pos.y <= TECHO) {
        // 🔇 Pausar la música cuando pierde
        if (musicaActual) {
          musicaActual.stop(); // 🛑 Detener la música
        }
        instanciaJuego.go("perder", puntuacion); // 🔄 Cambia a la pantalla de "Game Over"
      }
    });

    // 🚀 Función que hace saltar al pájaro
    function saltar() {
      pajaro.jump(FUERZA_SALTO); // ⬆️ Impulso hacia arriba
    }

    // 🎮 Controles del juego - ¡Múltiples formas de jugar!
    instanciaJuego.onKeyPress("space", () => {
      // ⌨️ Tecla ESPACIO
      saltar();
    });

    instanciaJuego.onClick(() => {
      // 🖱️ Clic del mouse
      saltar();
    });

    // ============================================================================
    // 🏗️ SECCIÓN 6: CREACIÓN DE OBSTÁCULOS (8 minutos)
    // ============================================================================

    // � Función auxiliar para crear un tubo (con imagen o color de respaldo)
    function crearTubo(x, y, altura, invertido = false) {
      try {
        // Intentamos usar la imagen del tubo
        const tubo = instanciaJuego.add([
          instanciaJuego.pos(x, y), // 📍 Posición del tubo
          instanciaJuego.sprite("tubo"), // �️ Imagen del tubo
          instanciaJuego.scale(
            2.5, // � Escalamos a 64 píxeles de ancho (asumiendo imagen de 100px)
            altura / 100 // 📏 Escalamos la altura según necesidad
          ),
          instanciaJuego.area(), // 💥 Puede colisionar
          instanciaJuego.move(instanciaJuego.LEFT, VELOCIDAD), // ⬅️ Se mueve hacia la izquierda
          instanciaJuego.offscreen({ destroy: true }), // 🗑️ Se destruye al salir de pantalla
          "tubo", // 🏷️ Etiqueta para identificarlo
        ]);

        if (invertido) {
          // Rotar 180 grados y ajustar posición
          tubo.angle = 180;
          tubo.pos.y += altura; // Ajustar posición después de rotar
          tubo.esSuperior = true; // 🏷️ Marcar como tubo superior para puntuación
        }

        return tubo; // 📤 Devolver el tubo creado
      } catch {
        // Si no se puede cargar la imagen, usamos rectángulo de color
        return instanciaJuego.add([
          instanciaJuego.pos(x, y), // 📍 Posición del tubo
          instanciaJuego.rect(64, altura), // 📐 Rectángulo azul
          instanciaJuego.color(0, 127, 255), // 🎨 Color azul
          instanciaJuego.outline(4), // 🖍️ Borde negro
          instanciaJuego.area(), // 💥 Puede colisionar
          instanciaJuego.move(instanciaJuego.LEFT, VELOCIDAD), // ⬅️ Se mueve hacia la izquierda
          instanciaJuego.offscreen({ destroy: true }), // 🗑️ Se destruye al salir de pantalla
          "tubo", // 🏷️ Etiqueta para identificarlo
        ]);
      }
    }

    // 🏭 Función que crea los tubos (obstáculos del juego)
    function generarTubos() {
      // 🎲 Calculamos alturas aleatorias para los tubos
      const h1 = instanciaJuego.rand(
        TUBO_MINIMO,
        instanciaJuego.height() - TUBO_MINIMO - ABERTURA_TUBO
      );
      const h2 = instanciaJuego.height() - h1 - ABERTURA_TUBO;

      // 🔵 Tubo superior (viene desde arriba)
      crearTubo(instanciaJuego.width(), 0, h1, true);

      // 🔵 Tubo inferior (viene desde abajo)
      crearTubo(instanciaJuego.width(), h1 + ABERTURA_TUBO, h2);
    }

    // ============================================================================
    // 💥 SECCIÓN 7: COLISIONES Y PUNTUACIÓN (5 minutos)
    // ============================================================================

    // 💀 ¡Detectamos cuando el pájaro choca con un tubo!
    pajaro.onCollide("tubo", () => {
      // 🔇 Pausar la música cuando pierde
      if (musicaActual) {
        musicaActual.stop(); // 🛑 Detener la música
      }
      instanciaJuego.go("perder", puntuacion); // 🔄 Game Over
      instanciaJuego.addKaboom(pajaro.pos); // 💥 Explosión visual
    });

    // 🏆 Sistema de puntuación - ¡Ganar puntos al pasar tubos!
    instanciaJuego.onUpdate("tubo", (t) => {
      // Si el pájaro pasa completamente un tubo...
      if (t.pos.x + t.width <= pajaro.pos.x && t.puntuado !== true) {
        // Solo contamos puntos en el tubo superior para evitar duplicados
        if (t.esSuperior === true) {
          puntuacion++; // 📈 ¡Sumar un punto!
          t.puntuado = true; // ✅ Marcar como contado
        }
      }
    });

    // ⏰ Generar tubos automáticamente cada segundo
    instanciaJuego.loop(1, () => {
      generarTubos(); // 🏭 Crear nuevos obstáculos
    });

    // ============================================================================
    // 📊 SECCIÓN 8: INTERFAZ DE USUARIO - MOSTRAR PUNTUACIÓN (3 minutos)
    // ============================================================================

    // 🏆 Mostrar la puntuación en pantalla mientras juegas
    const etiquetaPuntuacion = instanciaJuego.add([
      instanciaJuego.text(puntuacion.toString()), // 📝 Convertir número a texto
      instanciaJuego.pos(24, 24), // 📍 Esquina superior izquierda
      instanciaJuego.fixed(), // 📌 No se mueve con la cámara
      instanciaJuego.color(255, 255, 255), // ⚪ Color blanco
      instanciaJuego.scale(1.5), // 🔍 Hacer el texto más grande
      instanciaJuego.z(100), // 🎭 En primer plano (delante de todo)
      { value: puntuacion }, // 💾 Guardar valor actual
    ]);

    // 🔄 Actualizar el texto de puntuación cuando cambie
    etiquetaPuntuacion.onUpdate(() => {
      if (etiquetaPuntuacion.value !== puntuacion) {
        etiquetaPuntuacion.value = puntuacion; // 💾 Actualizar valor guardado
        etiquetaPuntuacion.text = puntuacion.toString(); // 📝 Actualizar texto mostrado
      }
    });
  });

  // ============================================================================
  // 💀 SECCIÓN 9: PANTALLA DE GAME OVER (3 minutos)
  // ============================================================================

  // 🔄 Escena que se muestra cuando el jugador pierde
  instanciaJuego.scene("perder", (puntuacion) => {
    // 🌅 Agregamos el mismo fondo que en el juego
    try {
      // Intentamos usar la imagen de fondo
      instanciaJuego.add([
        instanciaJuego.sprite("fondo"), // 🖼️ Imagen de fondo
        instanciaJuego.pos(0, 0), // 📍 Posición en esquina superior izquierda
        instanciaJuego.scale(
          Math.max(
            instanciaJuego.width() / 800, // Escalar según ancho
            instanciaJuego.height() / 600 // Escalar según alto
          )
        ),
        instanciaJuego.z(-100), // 🎭 Enviar al fondo (detrás de todo)
      ]);
    } catch {
      // Si no se puede cargar la imagen, mantenemos el color de fondo predeterminado
      console.log("Usando color de fondo predeterminado en Game Over");
    }

    // 💀 Título "Fin del Juego"
    instanciaJuego.add([
      instanciaJuego.text("Fin del Juego"), // 📝 Texto principal
      instanciaJuego.pos(
        instanciaJuego.width() / 2, // 📍 Centro horizontal
        instanciaJuego.height() / 2 - 80 // 📍 Un poco arriba del centro
      ),
      instanciaJuego.scale(1.5), // 🔍 Texto grande
      instanciaJuego.anchor("center"), // ⚖️ Centrado
      instanciaJuego.color(255, 255, 255), // ⚪ Color blanco
    ]);

    // 🏆 Mostrar la puntuación final obtenida
    instanciaJuego.add([
      instanciaJuego.text(`Puntuación: ${puntuacion}`), // 📝 Puntos obtenidos
      instanciaJuego.pos(
        instanciaJuego.width() / 2, // 📍 Centro horizontal
        instanciaJuego.height() / 2 // 📍 Centro vertical
      ),
      instanciaJuego.scale(1.2), // 🔍 Texto mediano
      instanciaJuego.anchor("center"), // ⚖️ Centrado
      instanciaJuego.color(255, 255, 255), // ⚪ Color blanco
    ]);

    // 🔄 Instrucciones para jugar de nuevo
    instanciaJuego.add([
      instanciaJuego.text("Presiona ESPACIO o Haz Clic para Jugar de Nuevo"), // 📝 Instrucciones
      instanciaJuego.pos(
        instanciaJuego.width() / 2, // 📍 Centro horizontal
        instanciaJuego.height() / 2 + 80 // 📍 Un poco abajo del centro
      ),
      instanciaJuego.scale(0.8), // 🔍 Texto pequeño
      instanciaJuego.anchor("center"), // ⚖️ Centrado
      instanciaJuego.color(255, 255, 255), // ⚪ Color blanco
    ]);

    // 🔄 Función para reiniciar el juego
    function reiniciar() {
      instanciaJuego.go("juego"); // 🚀 Volver a empezar
    }

    // 🎮 Controles para reiniciar el juego
    instanciaJuego.onKeyPress("space", reiniciar); // ⌨️ Tecla ESPACIO
    instanciaJuego.onClick(reiniciar); // 🖱️ Clic del mouse
  });

  // ============================================================================
  // 🚀 SECCIÓN 10: INICIAR EL JUEGO (2 minutos)
  // ============================================================================

  // 🎬 ¡Empezar a jugar! - Va a la escena principal
  instanciaJuego.go("juego");

  return instanciaJuego; // 📤 Devolver la instancia del juego
}

// ============================================================================
// 🧹 SECCIÓN 11: LIMPIEZA Y CIERRE (1 minuto)
// ============================================================================

// 🧹 Función para limpiar el juego cuando se cierra
export function limpiarJuego() {
  if (instanciaJuego) {
    try {
      instanciaJuego.quit(); // 🛑 Cerrar el motor de juego
    } catch (error) {
      console.warn("Error limpiando instancia del juego:", error);
    }
    instanciaJuego = null; // 🗑️ Limpiar variable
    canvasEnUso = null; // 🗑️ Limpiar canvas
  }
}
