// 🎮 EJEMPLOS DE MODIFICACIONES PARA ESTUDIANTES
// =====================================================
// Copia y pega estos ejemplos en tu archivo gamelogic.js para modificar el juego

// =====================================================
// EJEMPLO 1: MODO FÁCIL
// =====================================================
/*
const CONFIGURACION_JUEGO = {
  ABERTURA_TUBO: 350,      // Mucho más espacio entre tubos
  TUBO_MINIMO: 80,         // Tubos un poco más altos mínimo
  FUERZA_SALTO: 900,       // Salto más potente
  VELOCIDAD: 200,          // Tubos más lentos
  TECHO: -60,              
  VOLUMEN_MUSICA: 0.5      // Música más alta
};
*/

// =====================================================
// EJEMPLO 2: MODO DIFÍCIL
// =====================================================
/*
const CONFIGURACION_JUEGO = {
  ABERTURA_TUBO: 180,      // Menos espacio entre tubos
  TUBO_MINIMO: 40,         // Tubos más bajos mínimo
  FUERZA_SALTO: 700,       // Salto menos potente
  VELOCIDAD: 400,          // Tubos más rápidos
  TECHO: -30,              // Techo más bajo
  VOLUMEN_MUSICA: 0.2      
};
*/

// =====================================================
// EJEMPLO 3: PÁJARO MÁS GRANDE Y COLORIDO
// =====================================================
/*
function crearPajaro(k) {
  return k.add([
    k.sprite("pajaro"),
    k.pos(k.width() / 4, 0),
    k.area(),
    k.body(),
    k.scale(1.2),           // Más grande
    k.color(255, 200, 100), // Tinte dorado
  ]);
}
*/

// =====================================================
// EJEMPLO 4: CONTROLES ADICIONALES
// =====================================================
/*
function configurarControles(k, pajaro, musicaActual, puntuacionRef) {
  function saltar() {
    pajaro.jump(CONFIGURACION_JUEGO.FUERZA_SALTO);
  }

  // Múltiples controles
  k.onKeyPress("space", saltar);
  k.onKeyPress("w", saltar);
  k.onKeyPress("up", saltar);
  k.onKeyPress("enter", saltar);
  k.onClick(saltar);

  // Verificar límites del pájaro
  pajaro.onUpdate(() => {
    if (pajaro.pos.y >= k.height() || pajaro.pos.y <= CONFIGURACION_JUEGO.TECHO) {
      if (musicaActual) {
        musicaActual.stop();
      }
      k.go("perder", puntuacionRef.valor);
    }
  });
}
*/

// =====================================================
// EJEMPLO 5: TUBOS CON COLORES DIFERENTES
// =====================================================
/*
function crearTubo(k, x, y, altura, invertido = false) {
  try {
    const tubo = k.add([
      k.pos(x, y),
      k.sprite("tubo"),
      k.scale(2.5, altura / 100),
      k.area(),
      k.move(k.LEFT, CONFIGURACION_JUEGO.VELOCIDAD),
      k.offscreen({ destroy: true }),
      k.color(100, 255, 100), // Tinte verde
      "tubo",
    ]);

    if (invertido) {
      tubo.angle = 180;
      tubo.pos.y += altura;
      tubo.esSuperior = true;
    }

    return tubo;
  } catch {
    // Tubos rectangulares coloridos si no hay sprite
    const colores = [
      [255, 100, 100], // Rojo
      [100, 255, 100], // Verde
      [100, 100, 255], // Azul
      [255, 255, 100], // Amarillo
      [255, 100, 255], // Magenta
    ];
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    
    return k.add([
      k.pos(x, y),
      k.rect(64, altura),
      k.color(...colorAleatorio),
      k.outline(4),
      k.area(),
      k.move(k.LEFT, CONFIGURACION_JUEGO.VELOCIDAD),
      k.offscreen({ destroy: true }),
      "tubo",
    ]);
  }
}
*/

// =====================================================
// EJEMPLO 6: PUNTUACIÓN CON ESTILO DIFERENTE
// =====================================================
/*
function crearInterfazPuntuacion(k, puntuacion) {
  return k.add([
    k.text(`Puntos: ${puntuacion.toString()}`),
    k.pos(k.width() / 2, 50), // Centrado en la parte superior
    k.fixed(),
    k.color(255, 255, 0),     // Color amarillo
    k.scale(2),               // Más grande
    k.z(100),
    k.anchor("center"),       // Centrado
    { value: puntuacion },
  ]);
}
*/

// =====================================================
// EJEMPLO 7: PANTALLA DE GAME OVER PERSONALIZADA
// =====================================================
/*
function pantallaGameOver(k, puntuacion) {
  configurarFondo(k);

  // Título personalizado
  k.add([
    k.text("💥 ¡GAME OVER! 💥"),
    k.pos(k.width() / 2, k.height() / 2 - 100),
    k.scale(1.8),
    k.anchor("center"),
    k.color(255, 50, 50), // Rojo
  ]);

  // Mensaje según puntuación
  let mensaje = "";
  if (puntuacion < 5) {
    mensaje = "¡Sigue intentando! 💪";
  } else if (puntuacion < 10) {
    mensaje = "¡Buen trabajo! 👍";
  } else if (puntuacion < 20) {
    mensaje = "¡Excelente! 🌟";
  } else {
    mensaje = "¡Eres un maestro! 🏆";
  }

  k.add([
    k.text(mensaje),
    k.pos(k.width() / 2, k.height() / 2 - 40),
    k.scale(1),
    k.anchor("center"),
    k.color(100, 255, 100), // Verde
  ]);

  // Mostrar puntuación con emoji
  k.add([
    k.text(`🎯 Puntuación: ${puntuacion} puntos`),
    k.pos(k.width() / 2, k.height() / 2 + 20),
    k.scale(1.3),
    k.anchor("center"),
    k.color(255, 255, 255),
  ]);

  // Instrucciones con emoji
  k.add([
    k.text("🎮 Presiona ESPACIO o Haz Clic para Jugar de Nuevo"),
    k.pos(k.width() / 2, k.height() / 2 + 80),
    k.scale(0.9),
    k.anchor("center"),
    k.color(200, 200, 255), // Azul claro
  ]);

  function reiniciar() {
    k.go("juego");
  }

  k.onKeyPress("space", reiniciar);
  k.onClick(reiniciar);
}
*/

// =====================================================
// EJEMPLO 8: GENERADOR DE TUBOS CON PATRONES
// =====================================================
/*
function generarTubos(k) {
  // Patrón alternante: fácil-difícil-fácil-difícil
  const esFacil = Math.floor(Date.now() / 2000) % 2 === 0; // Cambia cada 2 segundos
  
  let abertura = esFacil ? 
    CONFIGURACION_JUEGO.ABERTURA_TUBO + 50 : // Más fácil
    CONFIGURACION_JUEGO.ABERTURA_TUBO - 30;  // Más difícil

  const h1 = k.rand(
    CONFIGURACION_JUEGO.TUBO_MINIMO,
    k.height() - CONFIGURACION_JUEGO.TUBO_MINIMO - abertura
  );
  const h2 = k.height() - h1 - abertura;

  crearTubo(k, k.width(), 0, h1, true);
  crearTubo(k, k.width(), h1 + abertura, h2);
}
*/

// =====================================================
// 💡 INSTRUCCIONES DE USO:
// =====================================================
// 1. Copia el ejemplo que te guste
// 2. Pégalo en tu archivo gamelogic.js REEMPLAZANDO la función original
// 3. Guarda el archivo y recarga el juego
// 4. ¡Experimenta con los valores!

// ⚠️ IMPORTANTE:
// - Solo reemplaza UNA función a la vez para ver el cambio
// - Si algo no funciona, puedes volver a la versión original
// - Los comentarios con /* */ están desactivados, quita /* y */ para activarlos
