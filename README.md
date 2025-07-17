# 🗺️ Mapa Clientes Astro

Una aplicación moderna de gestión de clientes y repartos construida con **Astro** y **Tailwind CSS**. Permite gestionar clientes con ubicaciones geográficas, organizar flotas de camiones, configurar días de entrega y asignar repartos de manera eficiente.

![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)

## 🌟 Características Principales

- **📊 Dashboard Interactivo**: Estadísticas en tiempo real de todas las entidades
- **👥 Gestión de Clientes**: CRUD completo con geolocalización y mapas interactivos
- **🚛 Administración de Camiones**: Control de flota con información detallada
- **📅 Días de Entrega**: Configuración flexible de días de reparto
- **📦 Sistema de Repartos**: Asignación inteligente de camiones a días específicos
- **🗺️ Mapas Interactivos**: Visualización de ubicaciones con Leaflet
- **📱 Diseño Responsive**: Interfaz adaptable a móviles y escritorio

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Astro 5.12.0 con JavaScript
- **Estilos**: Tailwind CSS 3.4.17
- **Base de Datos**: SQLite con better-sqlite3
- **Mapas**: Leaflet 1.9.4
- **Servidor**: Node.js con @astrojs/node

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/psarasua/mapa-clientes-astro.git
cd mapa-clientes-astro
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configuración inicial (primera vez)
```bash
# Inicializar base de datos y cargar datos de ejemplo
npm run setup
```

### 4. Iniciar servidor de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:4321`

## 📋 Comandos Disponibles

### 🔧 Comandos Principales
```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Vista previa de build

# Configuración
npm run start        # Inicializa BD + servidor dev
npm run setup        # Configuración completa con datos
```

### 🗃️ Gestión de Base de Datos
```bash
# Inicialización
npm run init-db      # Crea las tablas de la base de datos
npm run create:all   # Crea todas las tablas (alternativo)

# Datos de ejemplo por tabla
npm run seed:clientes    # Inserta clientes de ejemplo
npm run seed:camiones    # Inserta camiones de ejemplo
npm run seed:dias        # Inserta días de entrega
npm run seed:repartos    # Inserta repartos de ejemplo
```

### 🧹 Comandos de Limpieza
```bash
# Limpiar tablas individuales
npm run seed:clientes:clean
npm run seed:camiones:clean
npm run seed:dias:clean
npm run seed:repartos:clean

# Resetear (limpiar + seedear)
npm run seed:clientes:reset
npm run seed:camiones:reset
npm run seed:dias:reset
npm run seed:repartos:reset
```

## 📁 Estructura del Proyecto

```
mapaClientesAstro/
├── data/                    # Base de datos SQLite
│   └── clientes.db
├── scripts/                 # Scripts de gestión de BD
│   ├── create/             # Scripts de creación de tablas
│   ├── seed/               # Scripts de datos de ejemplo
│   ├── clean/              # Scripts de limpieza
│   └── init-db.js          # Inicializador principal
├── src/
│   ├── components/         # Componentes Astro
│   │   ├── Navigation.astro
│   │   ├── MapaClientes.astro
│   │   └── FormularioCliente.astro
│   ├── layouts/
│   │   └── Layout.astro    # Layout principal
│   ├── lib/               # Servicios y utilidades
│   │   ├── database.js    # Conexión a BD
│   │   ├── clienteService.js
│   │   ├── camionesService.js
│   │   ├── diasEntregaService.js
│   │   └── repartosService.js
│   ├── pages/             # Páginas de la aplicación
│   │   ├── index.astro    # Dashboard
│   │   ├── clientes.astro # Gestión de clientes
│   │   ├── camiones.astro # Gestión de camiones
│   │   ├── dias-entrega.astro
│   │   ├── repartos.astro
│   │   └── api/           # Endpoints REST
│   │       ├── clientes.js
│   │       ├── camiones.js
│   │       ├── dias-entrega.js
│   │       └── repartos.js
│   └── ...
├── astro.config.mjs       # Configuración Astro
├── tailwind.config.mjs    # Configuración Tailwind
└── package.json
```

## 🎯 Guía de Uso

### 📊 Dashboard (Página Principal)
- **URL**: `/`
- **Función**: Resumen general con estadísticas
- **Características**:
  - Contadores dinámicos de todas las entidades
  - Acciones rápidas para crear nuevos registros
  - Enlaces directos a cada sección

### 👥 Gestión de Clientes
- **URL**: `/clientes`
- **Funciones**:
  - ✅ Listar todos los clientes
  - ✅ Crear nuevo cliente con geolocalización
  - ✅ Editar información de cliente
  - ✅ Eliminar cliente (con confirmación)
  - ✅ Visualizar ubicaciones en mapa interactivo
- **Campos**: Nombre, email, teléfono, dirección, coordenadas

### 🚛 Gestión de Camiones
- **URL**: `/camiones`
- **Funciones**:
  - ✅ Registro de camiones de la flota
  - ✅ CRUD completo con interfaz de tarjetas
  - ✅ Información de fecha de creación
- **Campos**: Nombre del camión

### 📅 Días de Entrega
- **URL**: `/dias-entrega`
- **Funciones**:
  - ✅ Configurar días de la semana para repartos
  - ✅ Añadir descripciones a cada día
  - ✅ Interfaz visual con emojis distintivos
- **Campos**: Día de la semana, descripción opcional

### 📦 Sistema de Repartos
- **URL**: `/repartos`
- **Funciones**:
  - ✅ Asignar camiones a días específicos
  - ✅ Filtros por camión y día
  - ✅ Gestión de relaciones entre entidades
  - ✅ Descripciones personalizadas de repartos
- **Campos**: Camión, día de entrega, descripción

## 🔗 API Endpoints

### Clientes
```
GET    /api/clientes           # Listar todos
POST   /api/clientes           # Crear nuevo
GET    /api/clientes/[id]      # Obtener uno
PUT    /api/clientes/[id]      # Actualizar
DELETE /api/clientes/[id]      # Eliminar
GET    /api/clientes/buscar    # Búsqueda avanzada
```

### Camiones
```
GET    /api/camiones           # Listar todos
POST   /api/camiones           # Crear nuevo
GET    /api/camiones/[id]      # Obtener uno
PUT    /api/camiones/[id]      # Actualizar
DELETE /api/camiones/[id]      # Eliminar
```

### Días de Entrega
```
GET    /api/dias-entrega       # Listar todos
POST   /api/dias-entrega       # Crear nuevo
GET    /api/dias-entrega/[id]  # Obtener uno
PUT    /api/dias-entrega/[id]  # Actualizar
DELETE /api/dias-entrega/[id]  # Eliminar
```

### Repartos
```
GET    /api/repartos           # Listar todos
POST   /api/repartos           # Crear nuevo
GET    /api/repartos/[id]      # Obtener uno
PUT    /api/repartos/[id]      # Actualizar
DELETE /api/repartos/[id]      # Eliminar
```

## 🗃️ Estructura de Base de Datos

### Tabla: clientes
```sql
- id (INTEGER PRIMARY KEY)
- nombre (TEXT NOT NULL)
- email (TEXT)
- telefono (TEXT)
- direccion (TEXT)
- latitud (REAL)
- longitud (REAL)
- created_at (DATETIME DEFAULT CURRENT_TIMESTAMP)
```

### Tabla: camiones
```sql
- id (INTEGER PRIMARY KEY)
- nombre (TEXT NOT NULL)
- created_at (DATETIME DEFAULT CURRENT_TIMESTAMP)
```

### Tabla: diasEntrega
```sql
- id (INTEGER PRIMARY KEY)
- nombre (TEXT NOT NULL)
- descripcion (TEXT)
- created_at (DATETIME DEFAULT CURRENT_TIMESTAMP)
```

### Tabla: repartos
```sql
- id (INTEGER PRIMARY KEY)
- camion_id (INTEGER, FK → camiones.id)
- dia_id (INTEGER, FK → diasEntrega.id)
- descripcion (TEXT)
- created_at (DATETIME DEFAULT CURRENT_TIMESTAMP)
```

## 🎨 Personalización

### Colores del Sistema
- **Primario**: Azul (clientes, general)
- **Secundario**: Verde (camiones)
- **Acento**: Púrpura (días de entrega)
- **Especial**: Naranja/Índigo (repartos)

### Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navegación**: Menú hamburguesa en móviles

## 🚀 Despliegue en Producción

### Build para producción
```bash
npm run build
```

### Vista previa local del build
```bash
npm run preview
```

### Variables de Entorno
Crear archivo `.env` en la raíz:
```env
# Configuración de base de datos (opcional)
DB_PATH=./data/clientes.db
```

## 🐛 Solución de Problemas

### Error: "Cannot find module 'better-sqlite3'"
```bash
npm install better-sqlite3
```

### Error: Base de datos no encontrada
```bash
npm run init-db
```

### Error: Páginas sin datos
```bash
npm run setup  # Recrea BD con datos de ejemplo
```

### Error: Puerto en uso
```bash
# Cambiar puerto en astro.config.mjs
export default defineConfig({
  server: { port: 3000 }
});
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Paulo Sarasua**
- GitHub: [@psarasua](https://github.com/psarasua)

---

⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella en GitHub!

**📝 Última actualización:** 17 de julio de 2025