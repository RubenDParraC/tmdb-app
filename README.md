# CineApp - Prueba Técnica FrontEnd

CineApp es una aplicación web desarrollada en Next.js que permite a los usuarios buscar películas, ver sus detalles y marcarlas como favoritas. Esta aplicación integra la API de The Movie Database (TMDb) para obtener información actualizada sobre películas.

## Requisitos

- Node.js 16 o superior
- npm 7 o superior
- Cuenta activa en [TMDb](https://www.themoviedb.org/)

## Instalación

1. Clona este repositorio:
   ```bash
   https://github.com/RubenDParraC/tmdb-app.git
   ```
2. Ingresa al directorio del proyecto:
   ```bash
   cd tmdb-app
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto.
2. Añade las siguientes variables de entorno:
   ```env
   NEXT_PUBLIC_API_URL=https://api.themoviedb.org
   NEXT_PUBLIC_BEARER_TMDB=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDU1MWZiMTFkNWIyMjVhN2NjYjE2MGI3YWU5YjZmYyIsIm5iZiI6MTczNjY0MDcwMC45MzIsInN1YiI6IjY3ODMwOGJjOTRmYzg3ZWY0ODdhZjUwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LwbyQ6zyTUvlcTWoONu-a78ir17fPU-a9FftXW0PfKg
   ```

## Ejecución en Desarrollo

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
2. Abre tu navegador y ve a `http://localhost:3000` para interactuar con la aplicación.
3. OPCIONAL, si deseas ver la aplicación desplegada en vercel, visita el siguiente [enlace](https://movies-tmdb-3y8avzwm6-rubenparras-projects.vercel.app/)

## Despliegue

Para desplegar la aplicación, utilicé la plataforma Vercel.

## Funcionalidades

### Página de Inicio

- Muestra una lista de películas populares obtenidas de la API de TMDb.
- Implementación de paginación para manejar grandes cantidades de datos.

### Barra de Búsqueda

- Buscador de películas por título y muestra resultados paginados.

### Detalles de la Película

- Información completa de la película, incluyendo título, descripción, fecha de lanzamiento, puntuación, géneros y actores.
- Visualización del listado de videos que sean tráiler (si están disponibles).

### Favoritos

- Permite a los usuarios marcar películas como favoritas y almacenarlas en el localStorage.
- Lista de películas favoritas guardadas.
- Buscador de películas por título y muestra resultados paginados.

### Diseño Responsivo

- Enfoque mobile-first con un diseño minimalista y atractivo, adaptable a cualquier tamaño de pantalla.

### SEO

- Mejores prácticas de SEO, incluyendo meta tags, Open Graph tags, y URLs bien estructuradas.

### Validaciones y Manejo de Errores

- Validación de entradas del usuario y manejo adecuado de errores de la API.

## Tecnologías

- **Framework**: Next.js
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS y CSS
- **Calidad de Código**: ESLint y Prettier configurados

## Recursos

- [Documentación oficial de Next.js](https://nextjs.org/docs)
- [API de The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api)

---

¡Gracias por revisar este proyecto! Para cualquier consulta o comentario, no dudes en contactarme.
