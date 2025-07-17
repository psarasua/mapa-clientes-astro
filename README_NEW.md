# 🗺️ Mapa de Clientes - Aplicación Astro

Una aplicación moderna para gestionar clientes con mapeo interactivo, construida con **Astro** y **PostgreSQL**.

## ✨ Características

- 📊 **CRUD completo de clientes** con datos de contacto y ubicación
- 🗺️ **Mapa interactivo** con Leaflet para visualizar ubicaciones
- 📍 **Geolocalización automática** para obtener coordenadas
- 🔍 **Búsqueda geográfica** de clientes por proximidad
- 📱 **Diseño responsive** optimizado para móviles
- ⚡ **API REST** eficiente con Astro
- 🛡️ **Base de datos PostgreSQL** con consultas optimizadas

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **PostgreSQL** (versión 12 o superior)
- **npm** o **yarn**

### Instalación

1. **Clonar y configurar**
   ```bash
   cd mapaClientesAstro
   npm install
   ```

2. **Configurar base de datos**
   - Crear una base de datos PostgreSQL llamada `mapa_clientes`
   - Copiar `.env` y configurar las credenciales:
   ```env
   DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/mapa_clientes
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=mapa_clientes
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   ```

3. **Inicializar y ejecutar**
   ```bash
   npm run init-db  # Crear tablas
   npm run dev      # Iniciar servidor de desarrollo
   ```

4. **Abrir aplicación**
   Visitar: http://localhost:4321

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes Astro reutilizables
│   ├── MapaClientes.astro     # Mapa interactivo con Leaflet
│   └── FormularioCliente.astro # Formulario de cliente
├── layouts/
│   └── Layout.astro     # Layout principal
├── lib/                 # Servicios y utilidades
│   ├── database.js      # Configuración y conexión a PostgreSQL
│   └── clienteService.js # Operaciones CRUD de clientes
├── pages/
│   ├── api/             # Endpoints REST
│   │   └── clientes/    # API de clientes
│   ├── clientes/        # Páginas de gestión
│   └── index.astro      # Página principal
└── scripts/
    └── init-db.js       # Script de inicialización de BD
```

## 🔌 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/clientes` | Obtener todos los clientes |
| `POST` | `/api/clientes` | Crear nuevo cliente |
| `GET` | `/api/clientes/[id]` | Obtener cliente por ID |
| `PUT` | `/api/clientes/[id]` | Actualizar cliente |
| `DELETE` | `/api/clientes/[id]` | Eliminar cliente |
| `GET` | `/api/clientes/buscar?lat={lat}&lng={lng}&radio={km}` | Buscar clientes cercanos |

## 🗄️ Esquema de Base de Datos

```sql
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  telefono VARCHAR(50),
  direccion TEXT,
  latitud DECIMAL(10, 8),
  longitud DECIMAL(11, 8),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Funcionalidades Principales

### 📊 Gestión de Clientes
- Crear, editar, eliminar clientes
- Campos: nombre, email, teléfono, dirección, coordenadas
- Validación de datos en frontend y backend

### 🗺️ Mapa Interactivo
- Visualización de todos los clientes en el mapa
- Marcadores clickeables con información del cliente
- Selección de ubicación haciendo clic en el mapa
- Geolocalización automática del usuario

### 🔍 Búsqueda Geográfica
- Buscar clientes dentro de un radio específico
- Cálculo de distancias usando fórmula haversine
- Resultados ordenados por proximidad

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Previsualizar build de producción
npm run init-db      # Inicializar base de datos
npm run start        # Inicializar BD y ejecutar desarrollo
```

## 🔧 Configuración

### Variables de Entorno
Configurar en `.env`:

```env
# Base de datos PostgreSQL
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/mapa_clientes
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mapa_clientes
DB_USER=postgres
DB_PASSWORD=tu_contraseña

# Servidor
PORT=3000
```

### Configuración de PostgreSQL
1. Instalar PostgreSQL
2. Crear base de datos: `CREATE DATABASE mapa_clientes;`
3. Configurar credenciales en `.env`
4. Ejecutar: `npm run init-db`

## 🎨 Tecnologías Utilizadas

- **[Astro](https://astro.build/)** - Framework web moderno
- **[PostgreSQL](https://postgresql.org/)** - Base de datos relacional
- **[Leaflet](https://leafletjs.com/)** - Biblioteca de mapas interactivos
- **[pg](https://node-postgres.com/)** - Cliente PostgreSQL para Node.js
- **JavaScript ES6+** - Sin TypeScript
- **CSS3** - Estilos nativos sin frameworks

## 🔒 Seguridad

- Prepared statements para prevenir SQL injection
- Validación de datos de entrada
- Manejo seguro de variables de entorno
- Sanitización de coordenadas geográficas

## 📱 Responsive Design

- Diseño mobile-first
- Grid layout adaptativo
- Mapas optimizados para touch
- Formularios accesibles en móviles

## 🤝 Contribuir

1. Fork el proyecto
2. Crear branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras algún problema:

1. Verifica que PostgreSQL esté ejecutándose
2. Confirma las credenciales en `.env`
3. Revisa los logs de la consola
4. Crea un issue en GitHub con detalles del error

---

Desarrollado con ❤️ usando Astro y PostgreSQL
