# 📝 Guía Detallada del Código - Flappy Bird

Esta guía explica cada sección del código para que puedas entender cómo funciona el juego paso a paso.

## 🏗️ Estructura General

```javascript
// SECCIÓN 1: IMPORTACIONES Y CONFIGURACIÓN INICIAL
import kaplay from "kaplay";

// SECCIÓN 2: VARIABLE GLOBAL (Singleton Pattern)
let instanciaJuego = null;

// SECCIÓN 3: FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
export function iniciarJuegoFlappyBird(contenedor) {
  // SECCIÓN 4: LIMPIEZA DE INSTANCIAS PREVIAS
  // SECCIÓN 5: CREAR EL MUNDO DEL JUEGO
  // SECCIÓN 6: ESCENA PRINCIPAL DEL JUEGO
  // SECCIÓN 7: ESCENA DE FIN DE JUEGO
  // SECCIÓN 8: INICIAR EL JUEGO
}

// SECCIÓN 9: FUNCIÓN DE LIMPIEZA
export function limpiarJuego() {}
```

---

## 📋 Sección por Sección

### SECCIÓN 1: Importaciones y Configuración Inicial

```javascript
import kaplay from "kaplay";
```

**¿Qué hace?** Importa la librería KAPLAY que nos permite crear juegos.
**Analogía:** Como traer las herramientas necesarias a tu taller.

### SECCIÓN 2: Variable Global

```javascript
let instanciaJuego = null;
```

**¿Qué hace?** Guarda la referencia al juego actual para evitar duplicados.
**¿Por qué es importante?** Evita que se creen múltiples juegos al mismo tiempo.

### SECCIÓN 3: Función Principal

```javascript
export function iniciarJuegoFlappyBird(contenedor) {
```

**¿Qué hace?** Esta es la función principal que crea todo el juego.
**Parámetro:** `contenedor` es donde se va a mostrar el juego (el canvas).

### SECCIÓN 4: Limpieza de Instancias Previas

```javascript
if (instanciaJuego) {
  try {
    instanciaJuego.quit();
  } catch (error) {
    console.warn("Error limpiando instancia anterior del juego:", error);
  }
  instanciaJuego = null;
}
```

**¿Qué hace?** Si ya hay un juego corriendo, lo cierra antes de crear uno nuevo.
**¿Por qué?** Para evitar problemas de rendimiento y errores.

### SECCIÓN 5: Crear el Mundo del Juego

```javascript
const k = kaplay({
  canvas: contenedor,
  width: 800,
  height: 600,
  background: [135, 206, 250], // Fondo azul cielo
});

instanciaJuego = k;
k.setGravity(3200);
```

**¿Qué hace?**

- Crea un mundo de juego de 800x600 píxeles
- Le da un fondo azul cielo
- Establece la gravedad (lo que hace que las cosas caigan)

**Valores importantes:**

- `width: 800` - Ancho del juego
- `height: 600` - Alto del juego
- `[135, 206, 250]` - Color RGB (Rojo, Verde, Azul)
- `3200` - Fuerza de gravedad

---

## 🎮 ESCENA PRINCIPAL DEL JUEGO

### SECCIÓN 6A: Configuración de Constantes

```javascript
k.scene("juego", () => {
    const ABERTURA_TUBO = 240;
    const TUBO_MINIMO = 60;
    const FUERZA_SALTO = 800;
    const VELOCIDAD = 320;
    const TECHO = -60;
```

**¿Qué son las constantes?** Valores que no cambian durante el juego.
**¿Por qué usarlas?** Facilita ajustar la dificultad del juego.

**Explicación de cada una:**

- `ABERTURA_TUBO`: Espacio entre tubos superior e inferior
- `TUBO_MINIMO`: Altura mínima de un tubo
- `FUERZA_SALTO`: Qué tan fuerte salta el pájaro
- `VELOCIDAD`: Qué tan rápido se mueven los tubos
- `TECHO`: Límite superior invisible

### SECCIÓN 6B: Crear el Pájaro

```javascript
const pajaro = k.add([
  k.circle(16), // Forma: círculo de radio 16
  k.color(255, 215, 0), // Color: dorado
  k.pos(k.width() / 4, 0), // Posición: 1/4 del ancho, arriba
  k.area(), // Puede colisionar
  k.body(), // Le afecta la gravedad
  k.outline(2, k.Color.ORANGE), // Borde naranja de 2 píxeles
]);

// Ojos del pájaro
k.add([
  k.circle(3), // Círculo pequeño para el ojo
  k.color(0, 0, 0), // Color negro
  k.pos(k.width() / 4 - 6, -6), // Posición relativa al pájaro
  k.follow(pajaro, k.vec2(-6, -6)), // Sigue al pájaro
]);
```

**Componentes del pájaro:**

- `k.circle(16)` - La forma (círculo)
- `k.color(255, 215, 0)` - El color (dorado)
- `k.pos()` - Dónde aparece
- `k.area()` - Puede chocar con cosas
- `k.body()` - La gravedad lo afecta
- `k.outline()` - Un borde decorativo

### SECCIÓN 6C: Detección de Muerte

```javascript
pajaro.onUpdate(() => {
  if (pajaro.pos.y >= k.height() || pajaro.pos.y <= TECHO) {
    k.go("perder", puntuacion);
  }
});
```

**¿Qué hace?** Cada frame del juego, revisa si el pájaro:

- Tocó el suelo (`pajaro.pos.y >= k.height()`)
- Tocó el techo (`pajaro.pos.y <= TECHO`)

**Si pasa cualquiera:** Cambia a la escena "perder".

### SECCIÓN 6D: Controles del Jugador

```javascript
// Tecla espacio
k.onKeyPress("space", () => {
  pajaro.jump(FUERZA_SALTO);
});

// Botón de gamepad
k.onGamepadButtonPress("south", () => {
  pajaro.jump(FUERZA_SALTO);
});

// Click del mouse / toque táctil
k.onClick(() => {
  pajaro.jump(FUERZA_SALTO);
});
```

**¿Qué hace?** Define qué pasa cuando el jugador:

- Presiona la barra espaciadora
- Presiona un botón del control
- Hace click o toca la pantalla

**Todos hacen lo mismo:** `pajaro.jump(FUERZA_SALTO)`

### SECCIÓN 6E: Generación de Tubos

```javascript
function generarTubo() {
  // Calcular altura aleatoria
  const h1 = k.rand(TUBO_MINIMO, k.height() - TUBO_MINIMO - ABERTURA_TUBO);
  const h2 = k.height() - h1 - ABERTURA_TUBO;

  // Tubo superior
  k.add([
    k.pos(k.width(), 0), // Empieza a la derecha, arriba
    k.rect(64, h1), // Rectángulo de ancho 64, altura h1
    k.color(0, 127, 255), // Color azul
    k.outline(4), // Borde de 4 píxeles
    k.area(), // Puede colisionar
    k.move(k.LEFT, VELOCIDAD), // Se mueve hacia la izquierda
    k.offscreen({ destroy: true }), // Se destruye al salir de pantalla
    "tubo", // Etiqueta para identificarlo
  ]);

  // Tubo inferior (similar pero abajo)
  k.add([
    k.pos(k.width(), h1 + ABERTURA_TUBO),
    k.rect(64, h2),
    k.color(0, 127, 255),
    k.outline(4),
    k.area(),
    k.move(k.LEFT, VELOCIDAD),
    k.offscreen({ destroy: true }),
    "tubo",
    { pasado: false }, // Propiedad extra: ¿ya lo pasamos?
  ]);
}
```

**Pasos de la función:**

1. **Calcular altura aleatoria** con `k.rand()`
2. **Crear tubo superior** que va de arriba hasta cierta altura
3. **Crear tubo inferior** que va desde cierta altura hasta abajo
4. **Ambos se mueven** hacia la izquierda automáticamente

### SECCIÓN 6F: Detección de Colisiones

```javascript
pajaro.onCollide("tubo", () => {
  k.go("perder", puntuacion);
  k.addKaboom(pajaro.pos);
});
```

**¿Qué hace?** Cuando el pájaro toca cualquier objeto etiquetado como "tubo":

1. Cambia a la escena "perder"
2. Crea una explosión en la posición del pájaro

### SECCIÓN 6G: Sistema de Puntuación

```javascript
k.onUpdate("tubo", (t) => {
  if (t.pos.x + t.width <= pajaro.pos.x && t.pasado === false) {
    agregarPunto();
    t.pasado = true;
  }
});
```

**¿Qué hace?** Para cada tubo, cada frame:

1. **Revisa si el pájaro ya pasó el tubo** (posición x del pájaro > posición x del tubo)
2. **Y si no había pasado antes** (`t.pasado === false`)
3. **Si ambas son verdad:** suma un punto y marca el tubo como pasado

### SECCIÓN 6H: Generación Automática de Tubos

```javascript
k.loop(1, () => {
  generarTubo();
});
```

**¿Qué hace?** Cada 1 segundo, llama a la función `generarTubo()`.
**Resultado:** Aparecen tubos nuevos constantemente.

### SECCIÓN 6I: Mostrar Puntuación

```javascript
let puntuacion = 0;

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
```

**¿Qué hace?**

1. **Crea una variable** para guardar la puntuación
2. **Crea un texto** que muestra la puntuación en pantalla
3. **Función `agregarPunto()`** aumenta la puntuación y actualiza el texto

---

## 💀 ESCENA DE FIN DE JUEGO

### SECCIÓN 7: Pantalla de Game Over

```javascript
k.scene("perder", (puntuacion) => {
  // Título "Fin del Juego"
  k.add([
    k.text("Fin del Juego", { size: 48 }),
    k.pos(k.width() / 2, k.height() / 2 - 100),
    k.anchor("center"),
    k.color(255, 255, 255),
  ]);

  // Pájaro grande
  k.add([
    k.circle(48),
    k.color(255, 215, 0),
    k.pos(k.width() / 2, k.height() / 2 - 50),
    k.anchor("center"),
    k.outline(4, k.Color.ORANGE),
  ]);

  // Puntuación final
  k.add([
    k.text("Puntuación: " + puntuacion, { size: 32 }),
    k.pos(k.width() / 2, k.height() / 2 + 50),
    k.anchor("center"),
    k.color(255, 255, 255),
  ]);

  // Instrucciones para reiniciar
  k.add([
    k.text("Presiona ESPACIO o Haz Clic para Jugar de Nuevo", { size: 16 }),
    k.pos(k.width() / 2, k.height() / 2 + 100),
    k.anchor("center"),
    k.color(255, 255, 255),
  ]);

  // Controles para reiniciar
  k.onKeyPress("space", () => k.go("juego"));
  k.onClick(() => k.go("juego"));
});
```

**Elementos de la pantalla:**

1. **Título grande** que dice "Fin del Juego"
2. **Pájaro decorativo** más grande que el del juego
3. **Puntuación final** obtenida
4. **Instrucciones** para volver a jugar
5. **Controles** que reinician el juego

---

## 🚀 INICIALIZACIÓN Y LIMPIEZA

### SECCIÓN 8: Iniciar el Juego

```javascript
k.go("juego");
return k;
```

**¿Qué hace?**

1. `k.go("juego")` - Cambia a la escena "juego" (empieza el juego)
2. `return k` - Devuelve la instancia de KAPLAY para poder controlarla desde afuera

### SECCIÓN 9: Función de Limpieza

```javascript
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
```

**¿Qué hace?** Cierra el juego correctamente y libera memoria.
**¿Cuándo se usa?** Cuando el componente React se desmonta o se cierra la página.

---

## 🎯 Conceptos Clave Resumidos

### Variables

```javascript
let puntuacion = 0; // Número
const VELOCIDAD = 320; // Constante
```

### Funciones

```javascript
function generarTubo() {
  // Función que hace un trabajo específico
  // código aquí
}
```

### Eventos

```javascript
k.onKeyPress("space", () => {
  // Cuando pasa algo, hacer esto
  // código aquí
});
```

### Objetos del Juego

```javascript
k.add([
  // Crear un objeto
  k.circle(16), // Con forma de círculo
  k.color(255, 0, 0), // Color rojo
  k.pos(100, 100), // En posición x=100, y=100
]);
```

### Colisiones

```javascript
objeto.onCollide("etiqueta", () => {
  // Cuando toca algo con esa etiqueta
  // hacer algo
});
```

### Bucles

```javascript
k.loop(1, () => {
  // Repetir cada 1 segundo
  // hacer algo
});
```

---

**¡Ahora entiendes cómo funciona todo el juego! 🎮✨**
