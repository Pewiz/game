# Taller de Desarrollo de Videojuegos 🎮

## Ingeniería Civil Informática - Universidad Ejemplo

¡Bienvenido al taller de desarrollo de videojuegos! En este proyecto aprenderás a crear tu propio juego utilizando tecnologías web modernas.

## 🚀 Tecnologías Utilizadas

- **React** - Biblioteca de JavaScript para interfaces de usuario
- **Vite** - Herramienta de desarrollo rápida
- **Tailwind CSS** - Framework de CSS para diseño rápido
- **Odyc.js** - Motor de juegos 2D para JavaScript

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx          # Encabezado con info de la universidad
│   ├── Footer.jsx          # Pie de página promocional
│   └── GameComponent.jsx   # 🎯 AQUÍ DESARROLLARÁS TU JUEGO
├── App.jsx                 # Componente principal
└── main.jsx               # Punto de entrada
```

## 🎯 Componente Principal: GameComponent.jsx

Este es el archivo donde enfocarás tu trabajo durante el taller:

- **Canvas de juego**: Área de 800x600 pixeles donde se renderiza el juego
- **Integración con Odyc.js**: Motor de juegos ya configurado
- **Lógica del juego**: Aquí implementarás la mecánica de tu videojuego

## 🛠️ Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📚 Lo que Aprenderás

### 1. **Programación en JavaScript**

- Variables, funciones y control de flujo
- Programación orientada a objetos
- Manejo de eventos y animaciones

### 2. **Desarrollo Web Moderno**

- Componentes de React
- Hooks (useState, useEffect, useRef)
- Estilos con Tailwind CSS

### 3. **Desarrollo de Videojuegos**

- Game loops y renderizado
- Detección de colisiones
- Sprites y animaciones
- Manejo de entrada del usuario

## 🎮 Estructura del Juego

Tu juego seguirá esta estructura básica:

```javascript
// Inicialización del juego
const game = new Game({
  canvas: canvas,
  width: 800,
  height: 600
});

// Crear escena
const scene = new Scene();

// Agregar elementos del juego
const player = new Sprite({...});
const enemies = [];
const powerups = [];

// Game loop principal
game.start();
```

## 🚀 Próximos Pasos

1. **Durante el taller**: Seguirás las instrucciones paso a paso para crear tu juego
2. **Personalización**: Podrás modificar colores, sprites y mecánicas
3. **Deploy**: Al final, tu juego estará disponible online con tu nombre

## 📝 Notas para el Instructor

- El archivo `GameComponent.jsx` es donde los estudiantes trabajarán principalmente
- Los comentarios TODO indican dónde agregar código de Odyc.js
- La estructura permite explicar conceptos de React sin complejidad
- El header y footer promocionan la carrera automáticamente

## 🤝 Contribuir

Este proyecto es parte del programa de promoción de Ingeniería Civil Informática.
¡Esperamos que disfrutes creando tu primer videojuego web!

---

_¿Te gustó la experiencia? ¡Considera estudiar Ingeniería Civil Informática y desarrolla el futuro de la tecnología!_
