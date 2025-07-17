# 🗺️ Mapa de Clientes - Guía Completa de Uso

Una aplicación moderna para gestionar clientes con mapeo interactivo, construida con **Astro** y **SQLite**.

![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)

## 📋 Índice
- [Instalación y Configuración](#-instalación-y-configuración)
- [Guía de Uso](#-guía-de-uso)
- [Funcionalidades Principales](#-funcionalidades-principales)
- [API Endpoints](#-api-endpoints)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías](#-tecnologías)
- [Troubleshooting](#-troubleshooting)

## 🚀 Instalación y Configuración

### ⚡ Inicio Rápido (3 pasos)

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Inicializar base de datos**
   ```bash
   npm run init-db
   ```

3. **Ejecutar aplicación**
   ```bash
   npm run dev
   ```

4. **Abrir en navegador**
   ```
   http://localhost:4321
   ```

### � Prerrequisitos
- **Node.js** 18+ 
- **npm** o **yarn**
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)

> ✅ **No necesitas instalar PostgreSQL ni ninguna base de datos externa**. La aplicación usa SQLite que se configura automáticamente.

## � Guía de Uso

### 🏠 Página Principal

Al abrir la aplicación verás:

![Página Principal](https://via.placeholder.com/800x400/f8f9fa/333?text=Mapa+de+Clientes)

1. **🗺️ Mapa Interactivo** (lado izquierdo)
2. **📋 Lista de Clientes** (lado derecho)
3. **🔘 Botones de Acción** en la parte superior

### ➕ Crear Nuevo Cliente

#### Método 1: Botón "Nuevo Cliente"
1. Haz clic en **"➕ Nuevo Cliente"**
2. Completa el formulario:
   - **Nombre** (obligatorio)
   - **Email** (opcional)
   - **Teléfono** (opcional)
   - **Dirección** (opcional)
   - **Coordenadas** (opcional)

#### Método 2: Seleccionar en el Mapa
1. Haz clic en **"📍 Agregar en Mapa"**
2. Haz clic en cualquier punto del mapa
3. Se abrirá el formulario con las coordenadas preseleccionadas

#### Método 3: Geolocalización
1. En el formulario, haz clic en **"📍 Obtener mi ubicación"**
2. Permite el acceso a la ubicación en tu navegador
3. Las coordenadas se completarán automáticamente

### ✏️ Editar Cliente

#### Desde el Mapa:
1. Haz clic en cualquier **marcador azul** del mapa
2. En el popup, haz clic en **"✏️ Editar"**
3. Modifica los datos necesarios
4. Haz clic en **"Actualizar Cliente"**

#### Desde la Lista:
1. En la lista de clientes (lado derecho)
2. Haz clic en **"✏️ Editar"** junto al cliente
3. Modifica los datos necesarios
4. Haz clic en **"Actualizar Cliente"**

### 🗑️ Eliminar Cliente

#### Desde el Mapa:
1. Haz clic en el **marcador** del cliente
2. En el popup, haz clic en **"🗑️ Eliminar"**
3. Confirma la eliminación

#### Desde la Lista:
1. Haz clic en **"🗑️ Eliminar"** junto al cliente
2. Confirma la eliminación

### 🔍 Buscar Clientes Cercanos

Usa el endpoint de búsqueda para encontrar clientes por proximidad:
```
http://localhost:4321/api/clientes/buscar?lat=40.4168&lng=-3.7038&radio=10
```

- `lat`: Latitud del punto central
- `lng`: Longitud del punto central  
- `radio`: Radio de búsqueda en kilómetros (opcional, por defecto 10km)

## 🎯 Funcionalidades Principales

### 📊 Gestión de Clientes
- ✅ **Crear** clientes con información completa
- ✅ **Visualizar** todos los clientes en lista y mapa
- ✅ **Editar** información existente
- ✅ **Eliminar** clientes
- ✅ **Buscar** por proximidad geográfica

### 🗺️ Mapa Interactivo
- ✅ **Marcadores** para cada cliente con coordenadas
- ✅ **Popups informativos** al hacer clic en marcadores
- ✅ **Selección de ubicación** haciendo clic en el mapa
- ✅ **Zoom automático** para mostrar todos los clientes
- ✅ **Mapas base** de OpenStreetMap

### 📍 Geolocalización
- ✅ **Obtener ubicación actual** del usuario
- ✅ **Autocompletar coordenadas** en formularios
- ✅ **Cálculo de distancias** entre puntos
- ✅ **Búsqueda por radio** de proximidad

### 📱 Diseño Responsive
- ✅ **Mobile-first** optimizado para móviles
- ✅ **Grid adaptativo** que se ajusta a la pantalla
- ✅ **Formularios accesibles** en dispositivos táctiles
- ✅ **Mapas optimizados** para touch

## 🔌 API Endpoints

| Método | Endpoint | Descripción | Ejemplo |
|--------|----------|-------------|---------|
| `GET` | `/api/clientes` | Obtener todos los clientes | `curl http://localhost:4321/api/clientes` |
| `POST` | `/api/clientes` | Crear nuevo cliente | Ver ejemplo POST abajo |
| `GET` | `/api/clientes/[id]` | Obtener cliente por ID | `curl http://localhost:4321/api/clientes/1` |
| `PUT` | `/api/clientes/[id]` | Actualizar cliente | Ver ejemplo PUT abajo |
| `DELETE` | `/api/clientes/[id]` | Eliminar cliente | `curl -X DELETE http://localhost:4321/api/clientes/1` |
| `GET` | `/api/clientes/buscar` | Buscar por proximidad | `curl "http://localhost:4321/api/clientes/buscar?lat=40.4168&lng=-3.7038&radio=10"` |

### � Ejemplo POST - Crear Cliente
```bash
curl -X POST http://localhost:4321/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "telefono": "+34 600 123 456",
    "direccion": "Calle Mayor 123, Madrid",
    "latitud": 40.4168,
    "longitud": -3.7038
  }'
```

### 📝 Ejemplo PUT - Actualizar Cliente
```bash
curl -X PUT http://localhost:4321/api/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez García",
    "email": "juan.perez@email.com",
    "telefono": "+34 600 123 789",
    "direccion": "Avenida Principal 456, Madrid",
    "latitud": 40.4200,
    "longitud": -3.7100
  }'
```

### � Formato de Respuesta
Todas las respuestas siguen este formato:
```json
{
  "success": true,
  "data": { /* datos del cliente */ },
  "message": "Operación exitosa"
}
```

En caso de error:
```json
{
  "success": false,
  "error": "Descripción del error",
  "details": "Información adicional"
}
```

## 🏗️ Estructura del Proyecto

```
📂 mapaClientesAstro/
├── 📂 src/
│   ├── � components/          # Componentes reutilizables
│   │   ├── 🗺️ MapaClientes.astro      # Mapa interactivo
│   │   └── 📝 FormularioCliente.astro  # Formulario de cliente
│   ├── 📂 layouts/
│   │   └── 🎨 Layout.astro             # Layout principal
│   ├── � lib/                 # Servicios y utilidades
│   │   ├── 🗄️ database.js              # Configuración SQLite
│   │   └── 👥 clienteService.js        # Operaciones CRUD
│   └── 📂 pages/               # Páginas y API
│       ├── 🏠 index.astro              # Página principal
│       ├── 📂 api/clientes/            # API REST
│       └── 📂 clientes/                # Páginas de gestión
├── 📂 data/                    # Base de datos SQLite
│   └── 🗄️ clientes.db                 # Archivo de base de datos
├── 📂 scripts/
│   └── ⚙️ init-db.js                   # Script de inicialización
├── 📄 .env                     # Variables de entorno
├── 📄 package.json             # Dependencias y scripts
└── 📖 README.md               # Esta documentación
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo en http://localhost:4321
npm run start        # Inicializar BD + servidor de desarrollo

# Base de datos
npm run init-db      # Crear/reinicializar base de datos SQLite

# Producción
npm run build        # Compilar aplicación para producción
npm run preview      # Previsualizar build de producción

# Utilidades
npm run astro        # Ejecutar comandos de Astro CLI
```

## 🎨 Tecnologías

### 🚀 Frontend
- **[Astro 5.12.0](https://astro.build/)** - Framework web moderno
- **[Leaflet 1.9.4](https://leafletjs.com/)** - Mapas interactivos
- **JavaScript ES6+** - Sin TypeScript para simplicidad
- **CSS3 nativo** - Sin frameworks externos

### 🗄️ Backend
- **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3)** - Base de datos SQLite
- **[Astro API Routes](https://docs.astro.build/en/core-concepts/endpoints/)** - Endpoints REST
- **[Node.js](https://nodejs.org/)** - Runtime de JavaScript

### 🔧 Herramientas
- **[Vite](https://vitejs.dev/)** - Build tool (incluido en Astro)
- **dotenv** - Gestión de variables de entorno

## 🔒 Seguridad

- ✅ **Prepared statements** para prevenir SQL injection
- ✅ **Validación de entrada** en frontend y backend
- ✅ **Sanitización** de coordenadas geográficas
- ✅ **Manejo seguro** de variables de entorno

## 🐛 Troubleshooting

### ❌ Problema: "Error conectando a la base de datos"
**Solución:**
```bash
npm run init-db
```

### ❌ Problema: "Puerto 4321 ya en uso"
**Solución:**
1. Mata el proceso: `Ctrl + C`
2. Cambia el puerto en `astro.config.mjs`:
```js
export default defineConfig({
  server: { port: 3000 }
});
```

### ❌ Problema: "Mapa no se carga"
**Solución:**
1. Verifica conexión a internet
2. Revisa la consola del navegador (F12)
3. Prueba refrescar la página

### ❌ Problema: "Geolocalización no funciona"
**Solución:**
1. Usa HTTPS o localhost
2. Permite ubicación en el navegador
3. Verifica permisos del sitio

### ❌ Problema: "No se pueden agregar clientes"
**Solución:**
1. Verifica que el servidor esté ejecutándose
2. Revisa la consola del navegador
3. Confirma que el nombre esté completado (campo obligatorio)

## 📈 Próximas Mejoras

- 🔍 **Búsqueda por texto** en nombre y dirección
- 📊 **Estadísticas** de clientes por zona
- 🌐 **Geocodificación** automática de direcciones
- 🎨 **Temas personalizables** para el mapa
- 📱 **App móvil** nativa con Capacitor
- 🔐 **Autenticación** de usuarios
- 📤 **Exportar/Importar** datos en CSV/JSON

## 🤝 Contribuir

1. **Fork** el repositorio
2. **Crear branch**: `git checkout -b feature/nueva-funcionalidad`
3. **Commit**: `git commit -m 'Agregar nueva funcionalidad'`
4. **Push**: `git push origin feature/nueva-funcionalidad`
5. **Pull Request**

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo `LICENSE` para más detalles.

## 🆘 Soporte

¿Necesitas ayuda? 

1. 📖 **Revisa esta documentación**
2. 🐛 **Busca en Issues** del repositorio
3. 💬 **Crea un nuevo Issue** con:
   - Descripción del problema
   - Pasos para reproducir
   - Capturas de pantalla (si aplica)
   - Información del sistema

---

**📝 Última actualización:** 17 de julio de 2025  
**👨‍💻 Desarrollado con:** ❤️ usando Astro, SQLite y JavaScript
