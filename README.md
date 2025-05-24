# 🏎️ **GTA Speedrun LATAM Racing Leaderboard**  

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.15-blue?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Node.js-%3E%3D18.12.0-green?style=flat-square&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/MySQL-2.3.11.3-orange?style=flat-square&logo=mysql" alt="MySQL" />
  <img src="https://img.shields.io/badge/License-GPLv3-yellow?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
</p>

## 🌐 Página en Producción  

¡Accede a la versión en línea de **GTA Speedrun LATAM Racing Leaderboard** haciendo clic aquí! 👇  

🔗 **[Visita el Leaderboard](https://mta.gtaspeedrun.lat)**  

## 📋 Descripción del Proyecto  
Una aplicación web creada con **Next.js** para mostrar un leaderboard en tiempo real del servidor de carreras **MTA:SA** de la comunidad **GTA Speedrun LATAM**. El sistema permite a los jugadores visualizar los mejores tiempos, explorar mapas y obtener estadísticas detalladas de cada jugador. La aplicación también integra búsquedas interactivas y tablas dinámicas para facilitar la consulta de información.  

## 🚀 Características  
- 🏅 **Leaderboard en tiempo real:** Visualiza los tiempos más rápidos y las posiciones destacadas de los jugadores.  
- 📊 **Estadísticas de jugadores:** Muestra el perfil de cada jugador con su historial de mejores tiempos.  
- 🗺️ **Búsqueda de mapas:** Facilita la consulta de mapas específicos con sus respectivos tiempos récord.  
- 🌍 **Soporte para internacionalización:** Incluye banderas y metadatos para identificar la nacionalidad de los jugadores.  
- 🔗 **Interactividad con mapas y jugadores:** Acceso rápido a la información mediante enlaces directos desde las tablas.  

## 🧱 Arquitectura del Proyecto

### Estructura de Directorios
```
gtasrlatamracing-leaderboard/
├── components/         # Componentes React reutilizables
│   └── icons/          # Iconos personalizados
├── context/            # Contextos de React para estado global
├── hooks/              # Hooks personalizados de React
├── lib/                # Utilidades y configuración
│   ├── api.js          # Funciones de acceso a API
│   ├── db.js           # Configuración de Sequelize y MySQL
│   ├── dayjsConfig.js  # Configuración de Day.js
│   ├── utils.js        # Funciones de utilidad
│   └── models/         # Modelos de datos de Sequelize
│       ├── Player.js   # Modelo para jugadores
│       ├── Map.js      # Modelo para mapas
│       └── Toptime.js  # Modelo para tiempos récord
├── pages/              # Páginas de Next.js
│   ├── api/            # Endpoints de API
│   │   ├── players/    # API para jugadores
│   │   ├── server/     # API para estado del servidor
│   │   └── toptimes/   # API para tiempos récord
│   ├── maps/           # Páginas de mapas
│   └── players/        # Páginas de jugadores
├── public/             # Archivos estáticos
│   └── places/         # Imágenes para posiciones
├── styles/             # Estilos CSS/SASS
└── middleware.js       # Middleware de Next.js para rutas
```

### Modelo de Datos
El proyecto utiliza **Sequelize** como ORM con tres modelos principales:
- **Player**: Información de jugadores (nombre, país, puntos)
- **Map**: Información de mapas (nombre, tipo, creador)
- **Toptime**: Registros de tiempos (jugador, mapa, tiempo, fecha)

### Tecnologías Frontend
- **Mantine UI**: Framework de componentes para React
- **SWR**: Para la gestión de datos con fetching inteligente
- **React Select**: Para componentes de selección avanzados
- **React World Flags**: Para mostrar banderas de países

### Tecnologías Backend
- **Next.js API Routes**: Para crear endpoints RESTful
- **MySQL2**: Driver optimizado para MySQL
- **Sequelize**: ORM para interacción con base de datos

## ⚙️ Requisitos del Sistema  
- 🟢 **Node.js v18.12.0 o superior**  
- 🟠 **MySQL 5.7 o superior**  

## 🛠️ Instalación  

1. **Clona este repositorio:**  

   ```bash
   git clone https://github.com/pcurz/gtasrlatamracing-leaderboard.git
   cd gtasrlatamracing-leaderboard
   ```

2. **Instala las dependencias:**  

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env.local` con las siguientes variables:

   ```
   NEXT_PUBLIC_MYSQL_HOST=localhost
   NEXT_PUBLIC_MYSQL_PORT=3306
   NEXT_PUBLIC_MYSQL_DATABASE=nombre_de_tu_base_de_datos
   NEXT_PUBLIC_MYSQL_USER=usuario
   NEXT_PUBLIC_MYSQL_PASSWORD=contraseña
   ```

4. **Inicia el entorno de desarrollo:**  

   ```bash
   npm run dev
   ```

   El servidor estará disponible en [http://localhost:3000](http://localhost:3000).  

5. **Para producción:**

   ```bash
   npm run build
   npm run start
   ```

## 📦 Scripts Disponibles  
- **`npm run dev`**: Inicia el servidor en modo desarrollo en el puerto 3000.
- **`npm run build`**: Genera la versión de producción optimizada.
- **`npm run start`**: Inicia la aplicación en modo producción en el puerto 3001.
- **`npm run lint`**: Ejecuta **ESLint** para validar el código.

## 🔄 Flujo de Trabajo para Desarrollo

1. La aplicación utiliza **SWR** para la gestión de datos, permitiendo actualizaciones en tiempo real.
2. El middleware controla las rutas dinámicas y redirige las rutas no válidas.
3. Los modelos de Sequelize definen las relaciones entre jugadores, mapas y tiempos.
4. La interfaz de usuario utiliza componentes de Mantine UI para una experiencia moderna.

## 🛠️ Tecnologías Utilizadas  
- ⚛️ **Next.js 14.2.15**: Framework para React con renderizado del lado del servidor.
- ⚛️ **React 18.3.1**: Biblioteca de JavaScript para interfaces de usuario.
- 🔄 **SWR 2.2.5**: React hooks para la gestión de datos remotos.
- 🗄️ **Sequelize 6.37.4**: ORM para la integración con MySQL.
- 💾 **MySQL2 3.11.3**: Driver para conexión a MySQL.
- 🕒 **Day.js 1.11.13**: Librería para la manipulación de fechas y horas.
- 🎨 **Mantine UI 7.17.5**: Sistema de componentes para React.
- 🎭 **React-Icons 5.2.1**: Biblioteca de iconos para React.
- 🎯 **Zod 3.23.8**: Validación de esquemas.

## 🙏 Agradecimientos  
Queremos expresar nuestro agradecimiento especial a:  

- 👨‍💻 **dinojoaco, feroci y pcurz**, por su colaboración en el desarrollo del proyecto.  
- 🏆 La comunidad de **GTA Speedrun LATAM**, cuyo entusiasmo y participación hacen posible este leaderboard.  
- 💡 A todos los colaboradores que contribuyeron con ideas y pruebas.  

## 📄 Licencia  
Este proyecto está licenciado bajo los términos de la **GNU General Public License v3.0**. Para más información, consulta el archivo [LICENSE](./LICENSE) o visita [https://www.gnu.org/licenses/](https://www.gnu.org/licenses/).

¡Gracias por usar **GTA Speedrun LATAM Racing Leaderboard**! 🎉
