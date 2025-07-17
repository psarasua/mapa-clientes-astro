# Instrucciones para GitHub Copilot

Este proyecto es una **aplicación de mapeo de clientes** construida con **Astro** y **PostgreSQL**.

## Tecnologías utilizadas
- **Frontend**: Astro con JavaScript (no TypeScript)
- **Base de datos**: PostgreSQL con driver `pg`
- **Mapas**: Leaflet para mapas interactivos
- **Estilos**: CSS nativo (sin frameworks)
- **API**: Endpoints REST en Astro

## Estructura del proyecto
- `/src/lib/` - Servicios y utilidades (database.js, clienteService.js)
- `/src/pages/api/` - Endpoints de la API REST
- `/src/components/` - Componentes Astro reutilizables
- `/src/pages/` - Páginas de la aplicación
- `/scripts/` - Scripts de utilidad (init-db.js)

## Funcionalidades principales
1. **CRUD de clientes** con datos de contacto y ubicación
2. **Mapa interactivo** que muestra ubicaciones de clientes
3. **Geolocalización** para obtener coordenadas automáticamente
4. **Búsqueda geográfica** de clientes por proximidad
5. **Interfaz responsive** y moderna

## Patrones de código
- Usar **JavaScript ES6+** (no TypeScript)
- APIs devuelven JSON con formato: `{ success: boolean, data?: any, error?: string }`
- Componentes Astro con estilos scoped
- Variables de entorno para configuración de BD
- Manejo de errores consistente en toda la aplicación

## Base de datos
- Tabla `clientes` con campos: id, nombre, email, telefono, direccion, latitud, longitud
- Usar prepared statements para prevenir SQL injection
- Índices en coordenadas para optimizar consultas geográficas

## Mejores prácticas
- Validación de datos en frontend y backend
- Responsive design mobile-first
- Accesibilidad con ARIA labels
- Optimización de performance en mapas
- Manejo de estados de carga y error
