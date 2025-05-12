# Test Vue Stream Zapping

## Descripción

Una aplicación de streaming de video desarrollada con Vue 3 y Vite que permite a los usuarios ver y cambiar entre diferentes canales de transmisión, con soporte multilenguaje (Español y Portugués) y controles de reproducción avanzados.

## Características Principales

- 🎥 Reproductor de video personalizado
- 🔊 Control de volumen con interfaz visual
- 🌐 Soporte multilenguaje (Español/Portugués)
- ⌨️ Atajos de teclado para navegación
- 📺 Lista de canales con navegación
- 🎮 Controles de reproducción (play/pause)
- 📱 Diseño responsive

## Tecnologías Utilizadas

- Vue 3
- Vue Router
- Vue I18n
- Vite
- SASS
- ESLint
- Vitest

## Requisitos Previos

- Node.js (versión recomendada: última LTS)
- npm (incluido con Node.js)

## Configuración del Proyecto

### Instalación

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Estructura del Proyecto

- /src/components/player/ : Componentes del reproductor de video
- /src/components/common/ : Componentes comunes reutilizables
- /src/composables/ : Composables de Vue (como useLanguage)
- /src/assets/ : Recursos estáticos
- /src/views/ : Vistas principales de la aplicación

## Configuración IDE Recomendada

- VSCode
- Extensión Volar
- Desactivar Vetur si está instalado

## Características del Reproductor

- Control de volumen visual con barra deslizante
- Botón de silencio
- Navegación entre canales
- Vista de detalles del canal
- Persistencia del último canal seleccionado
- Controles de reproducción intuitivos

## Internacionalización

La aplicación soporta múltiples idiomas:

- 🇪🇸 Español (por defecto)
- 🇧🇷 Portugués
  La preferencia de idioma se guarda automáticamente en localStorage.

## Atajos de Teclado

- ⬆️ Canal siguiente
- ⬇️ Canal anterior
- ➡️ Mostrar/ocultar lista de canales

## Persistencia de Datos

- Último canal seleccionado
- Preferencia de idioma
- Configuración de volumen

## Licencia

Proyecto privado - Todos los derechos reservados
