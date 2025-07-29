# 🎮 Guía del Instructor - Taller de Videojuegos

## Ingeniería Civil Informática

### Duración: 2-3 horas

### Participantes: Estudiantes de enseñanza media (sin experiencia previa requerida)

---

## 📋 **PLAN DEL TALLER**

### **Parte 1: Introducción (20 min)**

1. **Bienvenida y presentación de la carrera**
2. **¿Qué es un videojuego?** - Conceptos básicos
3. **Demostración del juego final**

### **Parte 2: Fundamentos (30 min)**

1. **HTML5 Canvas** - El lienzo donde dibujamos
2. **JavaScript básico** - Variables, funciones, eventos
3. **Game Loop** - El corazón de todo juego

### **Parte 3: Construcción paso a paso (90 min)**

1. **Configuración inicial**
2. **Dibujando el auto**
3. **Movimiento con teclado**
4. **Obstáculos que caen**
5. **Detección de colisiones**
6. **Sistema de puntuación**
7. **IA básica**

### **Parte 4: Personalización (20 min)**

1. **Cambiar colores**
2. **Modificar velocidades**
3. **Agregar efectos**

---

## 🎯 **GUIÓN DETALLADO**

### **INTRODUCCIÓN**

> "¡Hola! Soy [Nombre], estudiante/profesor de Ingeniería Civil Informática. Hoy vamos a crear nuestro primer videojuego desde cero, y al final del taller tendrás tu propia página web con tu juego funcionando."

**Demostrar el juego:**

- Mostrar el juego funcionando
- Explicar las mecánicas básicas
- Mostrar la IA en acción

### **CONCEPTOS FUNDAMENTALES**

#### 1. **¿Qué es un Game Loop?**

```javascript
function gameLoop() {
  updateGame(); // 1. Actualizar lógica del juego
  render(); // 2. Dibujar en pantalla
  requestAnimationFrame(gameLoop); // 3. Repetir
}
```

#### 2. **Canvas HTML5**

```javascript
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
```

---

## 📝 **PASOS DE CONSTRUCCIÓN**

### **PASO 1: Configuración del Canvas**

```javascript
// Configuración básica
const GAME_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  CAR_WIDTH: 50,
  CAR_HEIGHT: 80,
};
```

**Explicar:**

- ¿Qué son las constantes?
- ¿Por qué usar configuraciones?
- Coordenadas en 2D (x, y)

### **PASO 2: Estado del Juego**

```javascript
const gameState = {
  car: {
    x: 375, // Posición horizontal
    y: 520, // Posición vertical
    width: 50,
    height: 80,
  },
  score: 0,
  isPlaying: true,
};
```

**Explicar:**

- ¿Qué es un objeto en JavaScript?
- ¿Por qué guardar el estado?
- Sistema de coordenadas

### **PASO 3: Dibujar el Auto**

```javascript
function drawCar(car) {
  // Cuerpo del auto
  ctx.fillStyle = "#4A90E2";
  ctx.fillRect(car.x, car.y, car.width, car.height);

  // Ventanas
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(car.x + 10, car.y + 10, car.width - 20, 20);
}
```

**Explicar:**

- ¿Qué es una función?
- Canvas API básica
- Colores en hexadecimal

### **PASO 4: Movimiento del Auto**

```javascript
function handleInput() {
  if (keys["ArrowLeft"] && car.x > 0) {
    car.x -= CAR_SPEED;
  }
  if (keys["ArrowRight"] && car.x + car.width < CANVAS_WIDTH) {
    car.x += CAR_SPEED;
  }
}
```

**Explicar:**

- Event listeners
- Condiciones (if)
- Límites de pantalla

### **PASO 5: Obstáculos**

```javascript
const block = {
  x: Math.random() * (CANVAS_WIDTH - BLOCK_WIDTH),
  y: -BLOCK_HEIGHT,
  width: BLOCK_WIDTH,
  height: BLOCK_HEIGHT,
  color: COLORS.RED,
  speed: BLOCK_SPEED,
};
```

**Explicar:**

- Math.random()
- Posiciones negativas
- Velocidad constante

### **PASO 6: Detección de Colisiones**

```javascript
function checkCollision(car, block) {
  return (
    car.x < block.x + block.width &&
    car.x + car.width > block.x &&
    car.y < block.y + block.height &&
    car.y + car.height > block.y
  );
}
```

**Explicar:**

- Geometría básica
- Operadores lógicos (&&)
- Rectángulos que se superponen

### **PASO 7: Sistema de Puntuación**

```javascript
if (block.color === COLORS.GREEN) {
  gameState.score += 5;
  setScore(gameState.score);
} else if (block.color === COLORS.RED) {
  gameState.isPlaying = false;
  setGameOver(true);
}
```

**Explicar:**

- Comparación de valores (===)
- Estados del juego
- React hooks (useState)

### **PASO 8: IA Básica**

```javascript
// IA - Esquivar obstáculos automáticamente
const distanceToBlock = car.y - (block.y + block.height);
if (distanceToBlock < AI_WATCH_DISTANCE) {
  const carCenter = car.x + car.width / 2;
  const blockCenter = block.x + block.width / 2;

  if (carCenter < blockCenter) {
    car.x -= CAR_SPEED;
  } else {
    car.x += CAR_SPEED;
  }
}
```

**Explicar:**

- Distancias y predicción
- Centros de objetos
- Decisiones automáticas

---

## 🎨 **PERSONALIZACIÓN**

### **Colores**

```javascript
const COLORS = {
  RED: "#FF0000", // Peligro
  YELLOW: "#FFFF00", // Precaución
  GREEN: "#00FF00", // Puntos
  BLUE: "#4A90E2", // Auto
};
```

### **Velocidades**

```javascript
const SPEEDS = {
  CAR: 8, // Velocidad del jugador
  BLOCK: 5, // Velocidad de obstáculos
  AI: 4, // Velocidad de la IA
};
```

### **Efectos Visuales**

```javascript
// Fondo degradado
const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
gradient.addColorStop(0, "#87CEEB");
gradient.addColorStop(1, "#98FB98");
```

---

## 💡 **CONCEPTOS CLAVE A EXPLICAR**

### **Programación**

- **Variables**: Cajas que guardan información
- **Funciones**: Recetas que hacen tareas específicas
- **Objetos**: Formas de organizar información relacionada
- **Condicionales**: Decisiones en el código
- **Loops**: Repetir acciones

### **Desarrollo de Juegos**

- **Game Loop**: El ciclo infinito del juego
- **Estados**: Diferentes momentos del juego
- **Sprites**: Imágenes del juego
- **Colisiones**: Cuando los objetos se tocan
- **IA**: Comportamiento automático

### **Desarrollo Web**

- **HTML**: Estructura de la página
- **CSS**: Estilos y diseño
- **JavaScript**: Interactividad y lógica
- **Canvas**: Área de dibujo
- **React**: Biblioteca para interfaces

---

## 📊 **MÉTRICAS DE ÉXITO**

### **Objetivos de Aprendizaje**

- [ ] Entienden qué es un game loop
- [ ] Pueden modificar velocidades y colores
- [ ] Comprenden las colisiones básicas
- [ ] Ven funcionando la IA
- [ ] Su juego funciona al final

### **Engagement**

- [ ] Hacen preguntas durante el taller
- [ ] Experimentan con los valores
- [ ] Se emocionan con su creación
- [ ] Piden información sobre la carrera

---

## 🚀 **CIERRE Y PRÓXIMOS PASOS**

### **Resumen**

> "¡Felicidades! Has creado tu primer videojuego web. Has aprendido JavaScript, manejo de eventos, Canvas API, y hasta IA básica."

### **Promoción de la Carrera**

> "Esto es solo el comienzo. En Ingeniería Civil Informática aprenderás:
>
> - Desarrollo web avanzado
> - Inteligencia artificial
> - Bases de datos
> - Desarrollo móvil
> - Y mucho más..."

### **Call to Action**

> "Tu página web estará disponible en [URL] con tu nombre. ¡Compártela con tus amigos y familia!"

---

## 📚 **RECURSOS ADICIONALES**

### **Para Profundizar**

- [MDN Web Docs - Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [JavaScript.info](https://javascript.info/)
- [React Documentation](https://react.dev/)

### **Próximos Talleres**

- Desarrollo Web con React
- Inteligencia Artificial con Python
- Desarrollo Móvil
- Bases de Datos

---

_¡Que disfruten el taller y descubran su pasión por la programación!_ 🎮✨
