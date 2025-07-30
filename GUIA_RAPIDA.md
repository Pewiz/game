# 🎯 Guía Rápida del Taller - Puntos Clave

## ⚡ Conceptos para Explicar (En Orden)

### 1. Variables (5 minutos)

```javascript
let puntuacion = 0; // "Caja" que guarda números
let nombre = "María"; // "Caja" que guarda texto
let esDivertido = true; // "Caja" que guarda verdadero/falso
```

**Analogía:** Variables = Cajas etiquetadas donde guardamos cosas

### 2. Funciones (5 minutos)

```javascript
function saltarPajaro() {
  pajaro.jump(800); // Instrucciones que hacer
}
saltarPajaro(); // "Ejecutar" la función
```

**Analogía:** Funciones = Máquinas que hacen trabajos específicos

### 3. Eventos (5 minutos)

```javascript
k.onKeyPress("space", () => {
  saltarPajaro(); // Esto pasa cuando presionas espacio
});
```

**Analogía:** Eventos = Detectores que responden a acciones

### 4. Objetos del Juego (10 minutos)

```javascript
const pajaro = k.add([
  k.circle(16), // Forma: círculo
  k.color(255, 215, 0), // Color: dorado
  k.pos(200, 300), // Posición: x=200, y=300
  k.body(), // Le afecta la gravedad
]);
```

---

## 🔧 Modificaciones Fáciles para Principiantes

### Cambio 1: Color del Pájaro

**Buscar:** `k.color(255, 215, 0),`
**Cambiar por:**

- `k.color(255, 0, 0),` → Rojo
- `k.color(0, 255, 0),` → Verde
- `k.color(255, 0, 255),` → Rosa

### Cambio 2: Tamaño del Pájaro

**Buscar:** `k.circle(16),`
**Cambiar por:**

- `k.circle(24),` → Más grande
- `k.circle(8),` → Más pequeño

### Cambio 3: Velocidad del Juego

**Buscar:** `const VELOCIDAD = 320;`
**Cambiar por:**

- `const VELOCIDAD = 160;` → Más lento
- `const VELOCIDAD = 480;` → Más rápido

### Cambio 4: Dificultad

**Buscar:** `const ABERTURA_TUBO = 240;`
**Cambiar por:**

- `const ABERTURA_TUBO = 300;` → Más fácil
- `const ABERTURA_TUBO = 180;` → Más difícil

---

## 🎨 Actividades Prácticas

### Actividad 1: "Diseña tu Pájaro" (10 min)

1. Cambiar color del pájaro
2. Cambiar tamaño del pájaro
3. Ver los cambios en vivo

### Actividad 2: "Ajusta la Dificultad" (10 min)

1. Hacer el juego más fácil (abertura más grande)
2. Hacer el juego más lento
3. Probar diferentes combinaciones

### Actividad 3: "Experimenta con la Física" (10 min)

1. Cambiar la gravedad: `k.setGravity(1600);` (más lenta)
2. Cambiar fuerza de salto: `const FUERZA_SALTO = 1200;`
3. Ver cómo afecta el juego

---

## 🎯 Preguntas para Generar Participación

### Al Explicar Variables:

- "¿Qué información necesitamos guardar en nuestro juego?"
- "¿Cómo le decimos a la computadora cuántos puntos tiene el jugador?"

### Al Explicar Funciones:

- "¿Qué hace el pájaro cuando presionamos espacio?"
- "¿Cómo podemos hacer que haga lo mismo cada vez?"

### Al Explicar Eventos:

- "¿Cómo sabe la computadora cuándo presionamos una tecla?"
- "¿Qué otras acciones del jugador podríamos detectar?"

### Al Explicar Colisiones:

- "¿Cómo sabe el juego cuándo el pájaro toca un tubo?"
- "¿Qué debería pasar cuando chocan?"

---

## ⚠️ Errores Comunes y Soluciones

### Error 1: "No se ve el cambio"

**Solución:**

1. ¿Guardaste el archivo? (Ctrl+S)
2. ¿Refrescaste el navegador? (F5)

### Error 2: "El juego no funciona"

**Revisar:**

- Falta una coma `,`
- Falta un paréntesis `)`
- Error de tipeo en nombres

### Error 3: "Página en blanco"

**Solución:**

- Abrir herramientas de desarrollador (F12)
- Ver errores en la consola
- Corregir sintaxis

---

## 🎪 Dinámicas del Taller

### Inicio (5 min)

1. Mostrar el juego funcionando
2. Preguntar: "¿Cómo creen que funciona?"
3. Introducir el objetivo del taller

### Desarrollo (90 min)

1. **Conceptos básicos** (20 min)
2. **Explorar código** (30 min)
3. **Modificaciones** (30 min)
4. **Experimentación libre** (10 min)

### Cierre (10 min)

1. Mostrar creaciones de los estudiantes
2. Preguntar qué aprendieron
3. Compartir recursos para seguir aprendiendo

---

## 🚀 Consejos para el Instructor

### Mantener Energía:

- Hacer preguntas constantemente
- Celebrar pequeños logros
- Caminar por el aula ayudando

### Manejar Diferentes Niveles:

- **Principiantes:** Cambios simples de colores/tamaños
- **Avanzados:** Agregar nuevas funcionalidades
- **Trabajo en parejas** para apoyo mutuo

### Fomentar Experimentación:

- "¿Qué pasa si...?"
- "Prueben diferentes valores"
- "No tengan miedo a 'romper' el código"

---

## 📱 Lista de Verificación Rápida

### Antes del Taller:

- [ ] Todos los equipos funcionan
- [ ] Proyecto se ejecuta sin errores
- [ ] VS Code instalado y configurado
- [ ] Backup del código funcionando

### Durante el Taller:

- [ ] Explicar antes de mostrar código
- [ ] Hacer que todos prueben cada cambio
- [ ] Ayudar individualmente
- [ ] Tomar descansos cada 30 min

### Al Final:

- [ ] Tiempo para preguntas
- [ ] Compartir recursos adicionales
- [ ] Foto grupal con sus creaciones
- [ ] Recoger feedback

---

## 🎁 Recursos Extra

### Para Seguir Aprendiendo:

- **Scratch:** scratch.mit.edu
- **Code.org:** code.org
- **Khan Academy:** khanacademy.org/computing

### Documentación:

- **KAPLAY:** kaplayjs.com
- **JavaScript básico:** developer.mozilla.org

---

**¡Recuerda: El objetivo es que se diviertan mientras aprenden! 🎮✨**
