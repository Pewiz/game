# 📖 Guía para Estudiantes - Flappy Bird

## 🎮 Estructura del Código

El código del juego Flappy Bird ha sido **componetizado** para que sea más fácil de entender y modificar. Cada parte del juego está separada en funciones específicas.

## 🔧 Configuración del Juego (Fácil de Modificar)

En la parte superior del archivo encontrarás `CONFIGURACION_JUEGO`. Aquí puedes cambiar los parámetros del juego:

```javascript
const CONFIGURACION_JUEGO = {
  ABERTURA_TUBO: 240, // Espacio entre tubos (más grande = más fácil)
  TUBO_MINIMO: 60, // Altura mínima de tubo
  FUERZA_SALTO: 800, // Fuerza del salto del pájaro (más alto = salta más)
  VELOCIDAD: 320, // Velocidad de movimiento de los tubos (más alto = más difícil)
  TECHO: -60, // Límite superior del juego
  VOLUMEN_MUSICA: 0.3, // Volumen de la música de fondo (0.0 a 1.0)
};
```

## 📂 Funciones Principales que Puedes Modificar

### 🎨 Elementos Visuales

- **`configurarFondo(k)`**: Cambia el fondo del juego
- **`crearPajaro(k)`**: Modifica la apariencia y posición inicial del pájaro
- **`crearInterfazPuntuacion(k, puntuacion)`**: Personaliza cómo se ve la puntuación

### 🎵 Audio

- **`reproducirMusica(k)`**: Cambia la música de fondo o el volumen

### 🚧 Obstáculos

- **`crearTubo(k, x, y, altura, invertido)`**: Modifica la apariencia de los tubos
- **`generarTubos(k)`**: Cambia cómo y cuándo aparecen los tubos

### 🎮 Controles

- **`configurarControles(k, pajaro, musicaActual, puntuacionRef)`**: Modifica los controles del juego

### 💥 Colisiones

- **`configurarColisionesYPuntuacion(k, pajaro, musicaActual, puntuacionRef, etiquetaPuntuacion)`**: Cambia qué pasa cuando el pájaro choca

## 🖥️ Pantallas (Menos Modificables)

### 🎯 Pantalla de Game Over

- **`pantallaGameOver(k, puntuacion)`**: Ya está completamente configurada, pero puedes cambiar los textos o colores

## 🎯 Ejemplos de Modificaciones Comunes

### 1. Hacer el Juego Más Fácil

```javascript
const CONFIGURACION_JUEGO = {
  ABERTURA_TUBO: 300, // Más espacio entre tubos
  FUERZA_SALTO: 900, // Salta más alto
  VELOCIDAD: 250, // Tubos más lentos
  // ... resto de configuración
};
```

### 2. Cambiar el Sprite del Pájaro

```javascript
function crearPajaro(k) {
  return k.add([
    k.sprite("pajaro"), // Cambia "pajaro" por otro sprite
    k.pos(k.width() / 4, 0),
    k.area(),
    k.body(),
    k.scale(1.2), // Cambia el tamaño (0.8 = más pequeño, 1.2 = más grande)
  ]);
}
```

### 3. Cambiar los Controles

```javascript
function configurarControles(k, pajaro, musicaActual, puntuacionRef) {
  function saltar() {
    pajaro.jump(CONFIGURACION_JUEGO.FUERZA_SALTO);
  }

  // Agregar más controles
  k.onKeyPress("space", saltar);
  k.onKeyPress("w", saltar); // Agregar tecla W
  k.onKeyPress("up", saltar); // Agregar flecha arriba
  k.onClick(saltar);
}
```

### 4. Personalizar el Game Over

```javascript
function pantallaGameOver(k, puntuacion) {
  configurarFondo(k);

  // Cambiar el título
  k.add([
    k.text("¡Has Perdido!"), // Texto personalizado
    k.pos(k.width() / 2, k.height() / 2 - 80),
    k.scale(1.5),
    k.anchor("center"),
    k.color(255, 0, 0), // Color rojo
  ]);

  // Resto del código...
}
```

## 💡 Consejos para Estudiantes

1. **Comienza con `CONFIGURACION_JUEGO`**: Es la forma más fácil de cambiar el comportamiento del juego
2. **Experimenta con los valores**: Cambia un número a la vez y observa qué pasa
3. **Lee los comentarios**: Cada función tiene comentarios que explican qué hace
4. **No tengas miedo de romper algo**: Siempre puedes volver a la versión original

## 🚀 Funciones que NO Deberías Modificar (a menos que sepas lo que haces)

- `iniciarJuegoFlappyBird(contenedor)`: Es la función principal que inicia todo
- `limpiarJuego()`: Se encarga de limpiar la memoria cuando el juego termina
- `configurarEscenaJuego(k)`: Coordina todas las partes del juego

## 📝 Estructura de Archivos de Recursos

Asegúrate de que tienes estos archivos en tu carpeta `public/assets/`:

- `pajaro.png` - Sprite del pájaro
- `fondo.jpg` - Imagen de fondo
- `tubo.png` - Sprite de los tubos
- `music.mp3` - Música de fondo

¡Diviértete modificando el juego! 🎮
