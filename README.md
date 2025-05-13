# Test Vue Stream Zapping

## Descripción

Una aplicación de streaming de video desarrollada con Vue 3 y Vite que permite a los usuarios ver y cambiar entre diferentes canales de transmisión, con soporte multilenguaje (Español y Portugués) y controles de reproducción avanzados.

## Características Principales

- 🎥 Reproductor de video personalizado con controles accesibles
- 🔊 Control de volumen con interfaz visual y soporte ARIA
- 🌐 Soporte multilenguaje (Español/Portugués)
- ⌨️ Atajos de teclado para navegación
- 📺 Lista de canales con navegación accesible
- 🎮 Controles de reproducción (play/pause)
- 📱 Diseño responsive
- ♿ Soporte completo de accesibilidad ARIA
- 🎯 Navegación por teclado mejorada
- 🔍 Alto contraste y legibilidad

## Tecnologías Utilizadas

- Vue 3
- Vue Router
- Vue I18n
- Vite
- SASS
- ESLint
- Vitest
- ARIA (Accesibilidad)

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

## Estructura del Proyecto

- /src/components/player/ : Componentes del reproductor de video
- /src/components/common/ : Componentes comunes reutilizables
- /src/components/navigation/ : Componentes de navegación
- /src/components/layout/ : Componentes de estructura
- /src/composables/ : Composables de Vue (useLanguage, etc.)
- /src/assets/ : Recursos estáticos
- /src/views/ : Vistas principales
- /src/router/ : Configuración de rutas
- /src/i18n/ : Archivos de internacionalización

## Configuración IDE Recomendada

- VSCode
- Extensión Volar
- Desactivar Vetur si está instalado
- Extensiones recomendadas para accesibilidad

## Características del Reproductor

- Control de volumen visual con barra deslizante
- Botón de silencio con estados ARIA
- Navegación entre canales con feedback auditivo
- Vista de detalles del canal
- Persistencia del último canal seleccionado
- Controles de reproducción intuitivos
- Soporte completo de teclado
- Mensajes de estado para lectores de pantalla

## Internacionalización

La aplicación soporta múltiples idiomas:

- 🇪🇸 Español (por defecto)
- 🇧🇷 Portugués
  La preferencia de idioma se guarda automáticamente en localStorage.

## Atajos de Teclado

- ⬆️ Canal siguiente
- ⬇️ Canal anterior
- ➡️ Mostrar/ocultar lista de canales
- ⬅️ Mostrar información del canal
- M/m Silenciar/Activar sonido
- F/f Pantalla completa
- ESC Salir de pantalla completa

## Persistencia de Datos

- Último canal seleccionado
- Preferencia de idioma
- Configuración de volumen
- Estado de reproducción
- Historial de navegación

## Accesibilidad

- Roles ARIA implementados
- Navegación por teclado
- Estados dinámicos
- Mensajes de estado
- Alto contraste
- Textos alternativos
- Focus visible
- Skip links

## Licencia

Proyecto privado - Todos los derechos reservados
