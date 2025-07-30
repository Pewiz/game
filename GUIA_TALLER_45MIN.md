# 🎓 Guía del Instructor - Taller Flappy Bird (45 minutos)

## 📋 **Estructura del Taller**

### **🎯 Objetivo General:**
Enseñar conceptos básicos de programación de videojuegos usando Flappy Bird como ejemplo práctico.

---

## ⏰ **Cronograma Detallado (45 minutos)**

### **📋 SECCIÓN 1: CONFIGURACIÓN INICIAL (5 minutos)**
**Conceptos a enseñar:**
- ¿Qué son las variables globales?
- Importación de librerías
- Singleton pattern (nivel básico)

**Código a mostrar:**
```javascript
import kaplay from "kaplay";
let instanciaJuego = null;
let canvasEnUso = null;
```

**Explicación para estudiantes:**
- "Como cuando importas herramientas para un proyecto"
- "Las variables globales son como cajas que todos pueden usar"

**Tiempo sugerido:** 5 minutos
**Actividad:** Mostrar el código, explicar brevemente

---

### **🚀 SECCIÓN 2: INICIALIZACIÓN DEL MOTOR (5 minutos)**
**Conceptos a enseñar:**
- Configuración básica de un juego
- Coordenadas y dimensiones
- Colores RGB

**Código destacado:**
```javascript
const k = kaplay({
  width: 800,        // Ancho del juego
  height: 600,       // Alto del juego
  background: [135, 206, 250], // Fondo azul cielo
});
```

**Explicación para estudiantes:**
- "Como preparar un lienzo para pintar"
- "RGB: Rojo, Verde, Azul - como mezclar colores"

**Tiempo sugerido:** 5 minutos
**Actividad:** Cambiar colores en vivo, mostrar efectos

---

### **🎮 SECCIÓN 3: VARIABLES DEL JUEGO (5 minutos)**
**Conceptos a enseñar:**
- Constantes vs variables
- Parámetros de dificultad
- Comentarios descriptivos

**Código destacado:**
```javascript
const ABERTURA_TUBO = 240;   // Más grande = más fácil
const FUERZA_SALTO = 800;    // Qué tan fuerte salta
const VELOCIDAD = 320;       // Más rápido = más difícil
```

**Explicación para estudiantes:**
- "Como los ajustes de dificultad en un videojuego"
- "Cambiar un número = cambiar la experiencia"

**Tiempo sugerido:** 5 minutos
**Actividad:** Modificar valores y mostrar diferencias

---

### **🐦 SECCIÓN 4: CREAR EL PERSONAJE (10 minutos)**
**Conceptos a enseñar:**
- Objetos y propiedades
- Formas geométricas
- Posicionamiento
- Física básica

**Código destacado:**
```javascript
const pajaro = instanciaJuego.add([
  instanciaJuego.circle(16),                    // Forma
  instanciaJuego.color(255, 215, 0),            // Color
  instanciaJuego.pos(instanciaJuego.width() / 4, 0), // Posición
  instanciaJuego.body(),                        // Física
]);
```

**Explicación para estudiantes:**
- "Como crear un personaje en un videojuego"
- "Cada línea añade una característica"
- "body() = afectado por gravedad"

**Tiempo sugerido:** 10 minutos
**Actividad:** Cambiar colores, tamaños, posiciones en tiempo real

---

### **🎯 SECCIÓN 5: CONTROLES Y MOVIMIENTO (8 minutos)**
**Conceptos a enseñar:**
- Eventos e input del usuario
- Funciones
- Condiciones (if/else)
- Múltiples controles

**Código destacado:**
```javascript
function saltar() {
  pajaro.jump(FUERZA_SALTO);
}

instanciaJuego.onKeyPress("space", saltar);  // Teclado
instanciaJuego.onClick(saltar);              // Mouse
```

**Explicación para estudiantes:**
- "Como responder a lo que hace el jugador"
- "Una función = un conjunto de instrucciones"
- "Eventos = 'cuando pasa esto, haz aquello'"

**Tiempo sugerido:** 8 minutos
**Actividad:** Probar diferentes controles, cambiar fuerza de salto

---

### **🏗️ SECCIÓN 6: CREACIÓN DE OBSTÁCULOS (8 minutos)**
**Conceptos a enseñar:**
- Funciones más complejas
- Números aleatorios
- Creación dinámica de objetos
- Movimiento automático

**Código destacado:**
```javascript
function generarTubos() {
  const h1 = instanciaJuego.rand(TUBO_MINIMO, altura_maxima);
  
  instanciaJuego.add([
    instanciaJuego.rect(64, h1),              // Forma rectangular
    instanciaJuego.move(instanciaJuego.LEFT, VELOCIDAD), // Movimiento
    "tubo",                                   // Etiqueta
  ]);
}
```

**Explicación para estudiantes:**
- "Como crear obstáculos que cambian cada vez"
- "rand() = números al azar"
- "Las etiquetas ayudan a identificar objetos"

**Tiempo sugerido:** 8 minutos
**Actividad:** Cambiar velocidad, tamaño de tubos, frecuencia

---

### **💥 SECCIÓN 7: COLISIONES Y PUNTUACIÓN (5 minutos)**
**Conceptos a enseñar:**
- Detección de colisiones
- Lógica de juego
- Contadores y variables

**Código destacado:**
```javascript
pajaro.onCollide("tubo", () => {
  instanciaJuego.go("perder", puntuacion);    // Game Over
});

// Sistema de puntuación
if (tubo_pasado) {
  puntuacion++;
}
```

**Explicación para estudiantes:**
- "Como detectar cuando algo toca algo"
- "La lógica del juego: ganar puntos, perder"

**Tiempo sugerido:** 5 minutos
**Actividad:** Mostrar colisiones, explicar puntuación

---

### **📊 SECCIÓN 8: INTERFAZ DE USUARIO (3 minutos)**
**Conceptos a enseñar:**
- Texto en pantalla
- Actualización en tiempo real
- Posicionamiento fijo

**Código destacado:**
```javascript
const etiquetaPuntuacion = instanciaJuego.add([
  instanciaJuego.text(puntuacion.toString()),
  instanciaJuego.pos(24, 24),
  instanciaJuego.fixed(),
]);
```

**Explicación para estudiantes:**
- "Como mostrar información al jugador"
- "fixed() = no se mueve con el juego"

**Tiempo sugerido:** 3 minutos
**Actividad:** Cambiar posición y tamaño del texto

---

### **💀 SECCIÓN 9: PANTALLA DE GAME OVER (3 minutos)**
**Conceptos a enseñar:**
- Escenas y transiciones
- Reinicio de juego
- Interfaz de usuario avanzada

**Código destacado:**
```javascript
instanciaJuego.scene("perder", (puntuacion) => {
  // Mostrar textos de Game Over
  // Controles para reiniciar
});
```

**Explicación para estudiantes:**
- "Como tener diferentes pantallas en un juego"
- "Pasar información entre pantallas"

**Tiempo sugerido:** 3 minutos
**Actividad:** Mostrar transición, reinicio

---

### **🚀 SECCIÓN 10: INICIAR EL JUEGO (2 minutos)**
**Conceptos a enseñar:**
- Flujo del programa
- Punto de entrada

**Tiempo sugerido:** 2 minutos

---

### **🧹 SECCIÓN 11: LIMPIEZA Y CIERRE (1 minuto)**
**Conceptos a enseñar:**
- Buenas prácticas
- Gestión de memoria

**Tiempo sugerido:** 1 minuto

---

## 🎯 **Consejos para el Instructor:**

### **Mantener la Atención:**
- 🔄 **Mostrar cambios en vivo** - Modificar valores y ver efectos inmediatos
- 🎮 **Dejar que jueguen** - 2-3 minutos para probar después de cada sección
- 🤔 **Hacer preguntas** - "¿Qué pasaría si cambiamos este número?"

### **Ejemplos Prácticos:**
- 🎨 **Colores**: "¿Qué color quieren para el pájaro?"
- 🏃 **Velocidad**: "¿Muy fácil? ¡Hagámoslo más rápido!"
- 🎯 **Dificultad**: "¿Tubos más juntos o más separados?"

### **Conceptos Clave a Reforzar:**
1. **Variables = Cajas que guardan información**
2. **Funciones = Conjuntos de instrucciones**
3. **Eventos = Respuestas a acciones del usuario**
4. **Objetos = Cosas del juego con propiedades**

### **Actividades Interactivas:**
- 🔧 **Personalización**: Que cada estudiante cambie colores/velocidades
- 🎮 **Competencia amistosa**: ¿Quién hace el juego más difícil?
- 🎨 **Creatividad**: Cambiar formas, añadir elementos visuales

### **Si Sobra Tiempo:**
- 🖼️ **Mostrar personalización con imágenes**
- 🎵 **Hablar sobre sonidos** (conceptualmente)
- 🌟 **Ideas para expandir el juego**

### **Si Falta Tiempo:**
- ⚡ **Unir secciones 8-11** en explicación rápida
- 🎯 **Enfocarse en las secciones 4-7** (lo más visual e interactivo)

¡Recuerda: Lo importante es que entiendan los conceptos básicos y se diviertan programando! 🎮✨
