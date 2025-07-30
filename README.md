# 🐦 Taller de Programación: Flappy Bird

¡Bienvenido al taller de programación! Hoy aprenderás a crear tu propio juego Flappy Bird mientras descubres los conceptos básicos de la programación.

## 🎯 ¿Qué vamos a aprender?

En este taller descubrirás:

- **Variables**: Como "cajas" donde guardamos información
- **Funciones**: Como "máquinas" que hacen trabajos específicos
- **Eventos**: Como responder cuando el jugador presiona teclas
- **Lógica**: Como hacer que el juego tome decisiones
- **Creatividad**: Como personalizar tu juego

## 🚀 ¿Cómo empezar?

### 1. Preparar tu computadora

```bash
# 1. Abre la terminal y ve a la carpeta del proyecto
cd ruta/al/proyecto

# 2. Instala las dependencias (solo la primera vez)
npm install

# 3. Inicia el juego
npm run dev
```

### 2. Abre tu navegador

Ve a `http://localhost:5179` y ¡verás tu juego funcionando!

## 🎮 ¿Cómo jugar?

- **ESPACIO** o **CLICK**: Hacer saltar al pájaro
- **Objetivo**: Pasar por los tubos sin chocar
- **Meta**: ¡Conseguir la puntuación más alta!

## 🔧 ¿Cómo personalizar tu juego?

### Cambiar el color del pájaro

Busca esta línea en el código:

```javascript
k.color(255, 215, 0), // Color dorado
```

Cambia los números para diferentes colores:

- `k.color(255, 0, 0)` = Rojo
- `k.color(0, 255, 0)` = Verde
- `k.color(0, 0, 255)` = Azul
- `k.color(255, 0, 255)` = Rosa

### Cambiar el tamaño del pájaro

Busca esta línea:

```javascript
k.circle(16), // Tamaño del pájaro
```

- Número más grande = Pájaro más grande
- Número más pequeño = Pájaro más pequeño

### Hacer el juego más fácil o difícil

```javascript
const VELOCIDAD = 320; // Cambiar para más rápido/lento
const ABERTURA_TUBO = 240; // Cambiar para abertura más grande/pequeña
const FUERZA_SALTO = 800; // Cambiar para salto más fuerte/débil
```

### Cambiar la gravedad

```javascript
k.setGravity(3200); // Número más alto = cae más rápido
```

## 📚 Conceptos que aprenderás

### Variables - Las "Cajas de Datos"

```javascript
let puntuacion = 0; // Guarda un número
let velocidad = 320; // Guarda la velocidad
let colorPajaro = "dorado"; // Guarda texto
```

**¿Qué son?** Como cajas etiquetadas donde guardamos información que podemos usar después.

### Funciones - Las "Máquinas Trabajadoras"

```javascript
function saltarPajaro() {
  pajaro.jump(FUERZA_SALTO);
}
```

**¿Qué son?** Como máquinas que hacen un trabajo específico cuando las "encendemos".

### Eventos - Los "Detectores de Acciones"

```javascript
k.onKeyPress("space", () => {
  saltarPajaro(); // Esto pasa cuando presionas espacio
});
```

**¿Qué son?** Como sensores que detectan cuando haces algo (clic, tecla, etc.).

### Bucles - Los "Repetidores Automáticos"

```javascript
k.loop(1, () => {
  generarTubo(); // Esto se repite cada segundo
});
```

**¿Qué son?** Como alarmas que hacen que algo se repita automáticamente.

## 🎨 Retos Creativos

### Reto 1: Pájaro Multicolor

¿Puedes hacer que el pájaro tenga diferentes colores?

### Reto 2: Juego Más Fácil

Haz que la abertura entre tubos sea más grande para principiantes.

### Reto 3: Súper Velocidad

¿Qué pasa si haces que todo vaya súper rápido?

### Reto 4: Gravedad Espacial

Prueba con gravedad muy baja, ¡como si fuera en el espacio!

## 🐛 ¿Algo no funciona?

### El juego no aparece

1. ¿Está corriendo `npm run dev`?
2. ¿Vas a la dirección correcta en el navegador?
3. ¿Hay algún error en la consola?

### Hice un cambio pero no se ve

1. ¿Guardaste el archivo? (Ctrl+S)
2. ¿Refrescaste el navegador? (F5)

### El código tiene errores

1. Revisa que no falten comas `,`
2. Revisa que los paréntesis estén balanceados `()`
3. ¡Pide ayuda al instructor!

## 🎯 Estructura del Código

### Archivos principales:

- `src/components/FlappyBird/gameLogic.js` - La lógica del juego
- `src/components/FlappyBird/index.jsx` - La interfaz de usuario
- `src/App.jsx` - La aplicación principal

### Secciones del código:

1. **Configuración inicial** - Crear el mundo del juego
2. **Crear el pájaro** - Darle forma, color y física
3. **Controles** - Detectar cuando presionas teclas
4. **Generar tubos** - Crear obstáculos automáticamente
5. **Detectar colisiones** - Saber cuándo el pájaro choca
6. **Sistema de puntuación** - Contar puntos
7. **Pantalla de fin** - Mostrar cuando pierdes

## 🌟 ¿Qué sigue después?

Una vez que termines este taller, puedes:

- Crear más juegos con KAPLAY
- Aprender más JavaScript
- Explorar React para interfaces web
- Hacer tu propia página web
- ¡Continuar tu aventura en la programación!

## 🤝 ¿Necesitas ayuda?

- Levanta la mano si tienes dudas
- Trabaja en equipo con tus compañeros
- ¡Los errores son normales y parte del aprendizaje!
- Experimenta y diviértete

## 📖 Recursos adicionales

- [Scratch](https://scratch.mit.edu/) - Programación visual para principiantes
- [Code.org](https://code.org/) - Cursos gratuitos de programación
- [KAPLAY Docs](https://kaplayjs.com/) - Documentación oficial de KAPLAY

---

**¡Recuerda:** La programación es como aprender un nuevo idioma. Al principio puede parecer confuso, pero con práctica se vuelve más claro. ¡Lo más importante es divertirse mientras aprendes!

**🎮 ¡Que disfrutes creando tu juego! 🚀**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
