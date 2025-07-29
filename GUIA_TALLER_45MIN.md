# 🎮 Taller de Videojuegos - 45 Minutos

## ¡Crea tu primer juego con JavaScript!

---

## 📅 **PLAN DEL TALLER (45 minutos)**

### **1. Introducción (10 minutos)**

- Presentación de la carrera
- ¿Qué vamos a crear hoy?
- Demostración del juego final

### **2. Explicación Paso a Paso (25 minutos)**

- Conceptos básicos
- Revisión del código (sin escribir)
- Personalización simple

### **3. Personalización y Cierre (10 minutos)**

- Los estudiantes modifican colores y velocidades
- Toma de fotos y despedida

---

## 🎯 **GUIÓN PARA EL INSTRUCTOR**

### **INTRODUCCIÓN (10 min)**

> "¡Hola chicos! Soy [Nombre] y estudio Ingeniería Civil Informática. ¿Alguna vez han soñado con crear su propio videojuego? ¡Hoy lo vamos a hacer!"

**1. Mostrar el juego funcionando (3 min)**

- "Este es el juego que vamos a crear juntos"
- Demostrar los controles
- Mostrar que funciona en cualquier computador

**2. ¿Qué es Ingeniería Civil Informática? (4 min)**

- "Creamos aplicaciones, videojuegos, páginas web"
- "Programamos desde aplicaciones móviles hasta inteligencia artificial"
- "Y sí, ¡puedes trabajar creando videojuegos!"

**3. ¿Qué necesitamos para programar? (3 min)**

- Solo un computador y ganas de aprender
- Mostrar que el código está escrito en español
- "Al final del taller tendrán su página web con su juego"

---

### **EXPLICACIÓN DEL CÓDIGO (25 min)**

#### **Parte 1: Configuración del Juego (8 min)**

> "Todo juego necesita reglas básicas. Veamos cómo definimos las nuestras:"

```javascript
// 🎮 CONFIGURACIÓN DEL JUEGO - ¡Puedes cambiar estos valores!
const CONFIGURACION = {
  ANCHO_CANVAS: 800, // ¿Qué tan ancha es la pantalla?
  ALTO_CANVAS: 600, // ¿Qué tan alta es la pantalla?
  ANCHO_AUTO: 60, // ¿Qué tan grande es nuestro auto?
  VELOCIDAD_AUTO: 6, // ¿Qué tan rápido se mueve?
  VELOCIDAD_OBSTACULO: 4, // ¿Qué tan rápido caen los obstáculos?
};
```

**Explicar:**

- "Estas son como las configuraciones de un videojuego"
- "Si cambio la velocidad del auto, ¿qué creen que pasa?"
- "¿Quién quiere que el auto sea más grande?"

#### **Parte 2: Los Colores (3 min)**

```javascript
// 🎨 COLORES - ¡Cambia estos colores para personalizar tu juego!
const COLORES = {
  ROJO: "#FF0000", // Obstáculo peligroso
  VERDE: "#00FF00", // Poder especial
  AZUL: "#4169E1", // Color del auto
};
```

**Explicar:**

- "En programación, los colores se escriben con códigos especiales"
- "FF0000 significa rojo puro"
- "¿Qué color les gustaría para su auto?"

#### **Parte 3: El Auto (5 min)**

```javascript
// 🎨 FUNCIÓN PARA DIBUJAR EL AUTO
const dibujarAuto = (auto) => {
  // Cuerpo del auto
  ctx.fillStyle = COLORES.AZUL;
  ctx.fillRect(auto.x, auto.y, auto.ancho, auto.alto);

  // Ventana del auto
  ctx.fillStyle = COLORES.GRIS;
  ctx.fillRect(auto.x + 10, auto.y + 10, auto.ancho - 20, 25);
};
```

**Explicar:**

- "Una función es como una receta"
- "Esta receta dibuja nuestro auto"
- "Primero dibuja el cuerpo, después las ventanas"

#### **Parte 4: Movimiento (5 min)**

```javascript
// Mover el auto con las flechas del teclado
if (teclas["ArrowLeft"] && auto.x > 0) {
  auto.x -= CONFIGURACION.VELOCIDAD_AUTO;
}
if (teclas["ArrowRight"] && auto.x + auto.ancho < CONFIGURACION.ANCHO_CANVAS) {
  auto.x += CONFIGURACION.VELOCIDAD_AUTO;
}
```

**Explicar:**

- "Aquí decidimos qué pasa cuando presionan las flechas"
- "Si presionan izquierda, el auto se mueve a la izquierda"
- "Pero no puede salirse de la pantalla"

#### **Parte 5: Colisiones (4 min)**

```javascript
// 💥 FUNCIÓN PARA DETECTAR CHOQUES
const hayColision = (auto, obstaculo) => {
  return (
    auto.x < obstaculo.x + obstaculo.ancho &&
    auto.x + auto.ancho > obstaculo.x &&
    auto.y < obstaculo.y + obstaculo.alto &&
    auto.y + auto.alto > obstaculo.y
  );
};
```

**Explicar:**

- "El computador necesita saber cuándo dos cosas se tocan"
- "Es como preguntarle: ¿está el auto en el mismo lugar que el obstáculo?"
- "Si la respuesta es sí, ¡hay choque!"

---

### **PERSONALIZACIÓN (10 min)**

#### **¡Ahora ustedes van a modificar el juego!**

**1. Cambiar colores (4 min)**

- Mostrar cómo cambiar el color del auto
- Cada estudiante elige su color favorito
- Ver el resultado inmediatamente

**2. Cambiar velocidades (3 min)**

- "¿Quieren un juego más fácil o más difícil?"
- "¿Auto más rápido o más lento?"
- Probar diferentes valores

**3. Cambiar tamaños (3 min)**

- "¿Auto más grande o más pequeño?"
- "¿Obstáculos más grandes?"
- Ver cómo cambia la dificultad

---

## 🎨 **VALORES PARA PERSONALIZAR**

### **Colores Populares:**

```javascript
COLORES = {
  ROJO: "#FF0000", // Rojo
  AZUL: "#0000FF", // Azul
  VERDE: "#00FF00", // Verde
  AMARILLO: "#FFFF00", // Amarillo
  MORADO: "#800080", // Morado
  NARANJA: "#FFA500", // Naranja
  ROSA: "#FF69B4", // Rosa
  NEGRO: "#000000", // Negro
};
```

### **Velocidades Recomendadas:**

```javascript
VELOCIDAD_AUTO: 4,        // Lento
VELOCIDAD_AUTO: 6,        // Normal
VELOCIDAD_AUTO: 8,        // Rápido
VELOCIDAD_AUTO: 10,       // Muy rápido

VELOCIDAD_OBSTACULO: 2,   // Fácil
VELOCIDAD_OBSTACULO: 4,   // Normal
VELOCIDAD_OBSTACULO: 6,   // Difícil
```

### **Tamaños Sugeridos:**

```javascript
ANCHO_AUTO: 40,          // Auto pequeño
ANCHO_AUTO: 60,          // Auto normal
ANCHO_AUTO: 80,          // Auto grande

ANCHO_OBSTACULO: 50,     // Obstáculos pequeños
ANCHO_OBSTACULO: 70,     // Obstáculos normales
ANCHO_OBSTACULO: 90,     // Obstáculos grandes
```

---

## 💡 **FRASES CLAVE PARA USAR**

### **Para Explicar Conceptos:**

- "Una función es como una receta que le damos al computador"
- "Las variables son como cajas donde guardamos información"
- "El bucle del juego es como el corazón: late 60 veces por segundo"
- "Los colores en programación se escriben con códigos especiales"

### **Para Mantener Interés:**

- "¿Qué creen que pasa si cambio este número?"
- "¿Quién quiere probar con su color favorito?"
- "¡Miren cómo cambia el juego!"
- "Esto es exactamente lo que hacen los programadores de videojuegos"

### **Para Promocionar la Carrera:**

- "En Ingeniería Civil Informática aprenden a crear esto y mucho más"
- "¿Se imaginan trabajar creando videojuegos todos los días?"
- "Los programadores de hoy crean las aplicaciones que usan mañana"
- "Esto es solo el comienzo, hay un mundo entero por descubrir"

---

## 📊 **OBJETIVOS DEL TALLER**

### **Que los estudiantes:**

- [ ] Vean que programar puede ser divertido
- [ ] Entiendan conceptos básicos sin abrumarse
- [ ] Modifiquen algo del juego por sí mismos
- [ ] Se interesen por la carrera
- [ ] Se lleven su página web funcionando

### **Que el instructor:**

- [ ] Mantenga un ambiente relajado y divertido
- [ ] No use términos muy técnicos
- [ ] Permita que experimenten
- [ ] Responda dudas sin complicar
- [ ] Tome fotos para redes sociales

---

## 🎯 **CIERRE (últimos 2 minutos)**

> "¡Felicidades! En 45 minutos crearon su primer videojuego. Esto es lo que hacemos en Ingeniería Civil Informática todos los días: crear soluciones tecnológicas que cambian el mundo."

> "Su juego estará disponible en internet en [URL] para que lo compartan con su familia y amigos."

> "Si les gustó esta experiencia, los esperamos en nuestra carrera. ¡Aquí pueden convertir su pasión por la tecnología en su profesión!"

---

## 📚 **TIPS PARA EL INSTRUCTOR**

### **Antes del Taller:**

- Prueba que todo funcione
- Ten códigos de colores a la mano
- Prepara frases simples para explicar
- Ten ejemplos de otras velocidades

### **Durante el Taller:**

- Habla despacio y claro
- Usa analogías simples
- Permite que experimenten
- Celebra cada pequeño logro
- Toma fotos del proceso

### **Después del Taller:**

- Toma contactos interesados
- Sube las fotos a redes sociales
- Envía información de la carrera
- Programa taller de seguimiento

---

_¡Que disfruten creando su primer videojuego! 🎮✨_
