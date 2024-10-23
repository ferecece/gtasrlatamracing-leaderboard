# 🏎️ **GTA Speedrun LATAM Racing Leaderboard**  

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.15-blue?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Node.js-%3E%3D18.12.0-green?style=flat-square&logo=node.js" alt="Node.js" />
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

## ⚙️ Requisitos del Sistema  
- 🟢 **Node.js v18.12.0 o superior**  
- 🟠 **MySQL** (para la conexión a la base de datos del servidor)  

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

3. **Configura la conexión** a la base de datos y las variables de entorno según tus necesidades.  

4. **Inicia el entorno de desarrollo:**  

   ```bash
   npm run dev
   ```

   El servidor estará disponible en [http://localhost:3000](http://localhost:3000).  

## 📦 Scripts Disponibles  
- **`npm run dev`**: Inicia el servidor en modo desarrollo.  
- **`npm run build`**: Genera la versión de producción.  
- **`npm run start`**: Inicia la aplicación en modo producción.  
- **`npm run lint`**: Ejecuta **ESLint** para validar el código.  

## 🛠️ Tecnologías Utilizadas  
- ⚛️ **Next.js:** Framework para React con renderizado del lado del servidor.  
- ⚛️ **React:** Biblioteca de JavaScript para interfaces de usuario.  
- 🔄 **SWR:** React hooks para la gestión de datos remotos.  
- 🗄️ **Sequelize:** ORM para la integración con MySQL.  
- 🕒 **Day.js:** Librería para la manipulación de fechas y horas.  
- 🎨 **React-Select** y **React-Icons:** Componentes interactivos y personalización de iconos.  


## 🙏 Agradecimientos  
Queremos expresar nuestro agradecimiento especial a:  

- 👨‍💻 **dinojoaco, feroci y pcurz**, por su colaboración en el desarrollo del proyecto.  
- 🏆 La comunidad de **GTA Speedrun LATAM**, cuyo entusiasmo y participación hacen posible este leaderboard.  
- 💡 A todos los colaboradores que contribuyeron con ideas y pruebas.  

## 📄 Licencia  
Este proyecto está licenciado bajo los términos de la **GNU General Public License v3.0**. Para más información, consulta el archivo [LICENSE](./LICENSE) o visita [https://www.gnu.org/licenses/](https://www.gnu.org/licenses/).

¡Gracias por usar **GTA Speedrun LATAM Racing Leaderboard**! 🎉  
