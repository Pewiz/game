# 🎮 Guía del Instructor - Taller Flappy Bird con KAPLAY

## 📋 Información General

**Duración estimada:** 2-3 horas  
**Nivel:** Principiante (sin conocimientos previos de programación)  
**Participantes:** 10-20 estudiantes  
**Edad recomendada:** 12+ años

---

## 🎯 Objetivos del Taller

### Objetivos Principales
- Introducir conceptos básicos de programación de manera divertida
- Enseñar lógica de programación a través de un juego
- Familiarizar con herramientas de desarrollo web modernas
- Fomentar el interés por la programación

### Objetivos Específicos
- Entender qué es una variable y cómo se usa
- Comprender las funciones y su propósito
- Aprender sobre eventos (click, teclas)
- Entender la lógica de colisiones
- Conocer el concepto de loop (bucle)

---

## 🛠️ Preparación Previa

### Requisitos Técnicos
- [ ] Computadoras con navegador web moderno
- [ ] Editor de código (VS Code recomendado)
- [ ] Node.js instalado
- [ ] Proyector para mostrar código

### Preparación del Instructor
- [ ] Revisar todo el código y probarlo previamente
- [ ] Preparar ejemplos simples para explicar conceptos
- [ ] Tener backup del proyecto funcionando
- [ ] Preparar preguntas para generar participación

---

## 📚 Estructura del Taller

### 1. Introducción (15 minutos)
**¿Qué vamos a hacer?**
- Mostrar el juego funcionando
- Explicar que crearemos nuestro propio Flappy Bird
- Introducir conceptos básicos: "código", "programar", "variables"

**Preguntas para romper el hielo:**
- ¿Quién ha jugado Flappy Bird?
- ¿Qué creen que necesita el juego para funcionar?
- ¿Cómo creen que la computadora "sabe" cuando el pájaro choca?

### 2. Conceptos Básicos (20 minutos)

#### Variables - "Las Cajas de Datos"
```javascript
// Explicar como cajas que guardan información
let puntuacion = 0;  // Caja que guarda un número
let nombreJugador = "María";  // Caja que guarda texto
```

**Analogía:** Las variables son como cajas etiquetadas donde guardamos cosas.

#### Funciones - "Las Máquinas que Hacen Trabajos"
```javascript
// Una función es como una máquina que hace un trabajo específico
function saltarPajaro() {
    // Aquí ponemos las instrucciones para hacer saltar al pájaro
}
```

**Analogía:** Las funciones son como electrodomésticos - cada uno hace un trabajo específico.

### 3. Explorando el Código del Juego (45 minutos)

#### Sección 1: El Pájaro (15 minutos)
```javascript
// Creamos el pájaro usando formas básicas
const pajaro = k.add([
    k.circle(16),           // Es un círculo de tamaño 16
    k.color(255, 215, 0),   // Color dorado
    k.pos(k.width() / 4, 0), // Posición en pantalla
    k.area(),               // Puede chocar con cosas
    k.body(),               // Le afecta la gravedad
]);
```

**Preguntas guía:**
- ¿Qué pasa si cambiamos el 16 por 30?
- ¿Qué pasa si cambiamos los números del color?
- ¿Por qué creen que necesitamos `k.body()`?

**Actividad práctica:**
- Cambiar el tamaño del pájaro
- Cambiar el color del pájaro
- Ver qué pasa sin `k.body()`

#### Sección 2: La Gravedad y el Salto (15 minutos)
```javascript
// La gravedad hace que las cosas caigan
k.setGravity(3200);

// Cuando presionamos espacio, el pájaro salta
k.onKeyPress("space", () => {
    pajaro.jump(FUERZA_SALTO);
});
```

**Conceptos a explicar:**
- La gravedad es una fuerza constante hacia abajo
- El salto es una fuerza hacia arriba
- Los eventos responden a acciones del usuario

**Actividad práctica:**
- Cambiar la gravedad (más alta = cae más rápido)
- Cambiar la fuerza de salto
- Agregar otro control (click del mouse)

#### Sección 3: Los Tubos (15 minutos)
```javascript
function generarTubo() {
    // Calculamos posiciones aleatorias
    const h1 = k.rand(TUBO_MINIMO, k.height() - TUBO_MINIMO - ABERTURA_TUBO);
    
    // Creamos tubo superior
    k.add([
        k.pos(k.width(), 0),    // Empieza a la derecha
        k.rect(64, h1),         // Rectángulo de cierto tamaño
        k.color(0, 127, 255),   // Color azul
        k.move(k.LEFT, VELOCIDAD), // Se mueve hacia la izquierda
        "tubo",                 // Etiqueta para identificarlo
    ]);
}
```

**Conceptos clave:**
- `k.rand()` genera números aleatorios
- Los objetos se mueven automáticamente
- Las etiquetas nos ayudan a identificar objetos

### 4. Modificaciones Divertidas (30 minutos)

#### Modificación 1: Cambiar Colores
```javascript
// Pájaro multicolor
k.color(255, 0, 255),  // Rosa brillante
// Tubos verdes
k.color(0, 255, 0),    // Verde
```

#### Modificación 2: Cambiar Velocidad
```javascript
const VELOCIDAD = 160;  // Más lento para principiantes
const VELOCIDAD = 640;  // Más rápido para expertos
```

#### Modificación 3: Cambiar Tamaños
```javascript
const ABERTURA_TUBO = 300;  // Abertura más grande = más fácil
k.circle(24),               // Pájaro más grande
```

### 5. Conceptos Avanzados (20 minutos)

#### Las Colisiones - "¿Cómo sabe la computadora que chocamos?"
```javascript
pajaro.onCollide("tubo", () => {
    k.go("perder", puntuacion);
    k.addKaboom(pajaro.pos);  // ¡Explosión!
});
```

**Explicar:**
- La computadora revisa constantemente si dos objetos se tocan
- Cuando pasa, ejecuta el código dentro de `onCollide`

#### Los Bucles - "Hacer cosas repetidamente"
```javascript
// Cada 1 segundo, generar un tubo
k.loop(1, () => {
    generarTubo();
});
```

### 6. Actividad Final (15 minutos)

**Reto creativo:** Cada estudiante modifica el juego:
- Cambiar colores
- Cambiar velocidad
- Cambiar tamaños
- Agregar más obstáculos

---

## 🎤 Técnicas de Enseñanza

### Analogías Útiles
- **Variables = Cajas etiquetadas** donde guardamos cosas
- **Funciones = Electrodomésticos** que hacen trabajos específicos
- **Eventos = Timbre de casa** que nos avisa cuando pasa algo
- **Bucles = Alarma de reloj** que se repite constantemente

### Preguntas para Mantener Atención
- "¿Qué creen que pasa si...?"
- "¿Quién puede explicar por qué...?"
- "¿Cómo podríamos hacer que...?"
- "¿Qué diferencia ven entre...?"

### Manejo de Errores
- **Normalizar los errores:** "Los errores son normales, hasta los programadores expertos los cometen"
- **Usar errores como oportunidades de aprendizaje**
- **Tener paciencia y explicar paso a paso**

---

## 🚨 Troubleshooting Común

### Problemas Técnicos
1. **El juego no inicia:**
   - Verificar que el servidor esté corriendo (`npm run dev`)
   - Revisar la consola del navegador para errores

2. **Cambios no se ven:**
   - Refrescar la página del navegador
   - Verificar que se guardó el archivo

3. **Error de sintaxis:**
   - Revisar paréntesis, comas y puntos y comas
   - Usar el editor para encontrar errores

### Problemas de Participación
1. **Estudiantes perdidos:**
   - Hacer parejas para trabajo colaborativo
   - Caminar por el aula y ayudar individualmente

2. **Estudiantes avanzados aburridos:**
   - Darles retos adicionales
   - Pedirles que ayuden a sus compañeros

---

## 📝 Evaluación

### Indicadores de Éxito
- [ ] Estudiantes pueden explicar qué es una variable
- [ ] Entienden cómo funciona una función básica
- [ ] Pueden modificar valores y ver cambios
- [ ] Muestran interés por seguir aprendiendo

### Preguntas de Cierre
1. ¿Qué fue lo más fácil de entender?
2. ¿Qué fue lo más difícil?
3. ¿Qué les gustaría aprender después?
4. ¿Cambió su idea sobre la programación?

---

## 🔗 Recursos Adicionales

### Para Seguir Aprendiendo
- [Scratch](https://scratch.mit.edu/) - Programación visual
- [Code.org](https://code.org/) - Cursos gratuitos
- [KAPLAY Documentation](https://kaplayjs.com/) - Documentación oficial

### Para el Instructor
- [Pedagogía en Programación](https://example.com)
- [Técnicas de Enseñanza STEM](https://example.com)

---

## ✅ Lista de Verificación Final

### Antes del Taller
- [ ] Todos los equipos funcionan correctamente
- [ ] El proyecto se ejecuta sin errores
- [ ] Material de apoyo preparado
- [ ] Backup del código listo

### Durante el Taller
- [ ] Mantener energía y entusiasmo
- [ ] Hacer preguntas constantemente
- [ ] Caminar por el aula ayudando
- [ ] Celebrar los logros pequeños

### Después del Taller
- [ ] Recoger feedback de los estudiantes
- [ ] Compartir recursos adicionales
- [ ] Documentar mejoras para futuras sesiones

---

**¡Recuerda:** El objetivo es que se diviertan mientras aprenden. La programación debe verse como algo divertido y accesible, no intimidante.

**¡Éxito en tu taller! 🚀**
