import Head from "next/head";
import styles from "@styles/Home.module.css";
import RecentToptimesTable from "@components/RecentToptimesTable";
import PlayersTable from "@components/PlayersTable";
import SearchMap from "@components/SearchMap";

export default function Home() {
  return (
    <>
      <Head>
        <title>GTA Speedrun LATAM Racing</title>
        <meta
          name="description"
          content="Consulta los tiempos más rápidos del servidor MTA:SA y compite por el primer lugar."
        />
        <meta
          name="keywords"
          content="GTA Speedrun LATAM Racing, Ranking Global, Bienvenid@, Tiempos Recientes, Nombre, Puntos, Jugador, Tiempo, Mapa, Fecha"
        />
        <meta
          property="og:title"
          content="GTA Speedrun LATAM Racing Leaderboard"
        />
        <meta
          property="og:description"
          content="Consulta los tiempos más rápidos del servidor MTA:SA y compite por el primer lugar."
        />
        <meta property="og:url" content="https://mta.gtaspeedrun.lat/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>¡Bienvenid@!</h1>
          <section className={styles.content}>
            <p>
              Aquí es donde la velocidad y la precisión se combinan para ofrecer
              la experiencia de carreras más competitiva en <em>MTA:SA</em>. Si
              eres amante del speedrunning, este es tu lugar para demostrar tus
              habilidades y competir por el primer puesto en el ranking global.
            </p>
            <p>
              Además de competir por los mejores tiempos, podrás explorar perfiles de jugadores destacados. Consulta sus estadísticas y analiza cómo han conseguido liderar los rankings en los mapas más complejos.
            </p>
            <p>
              Únete a la comunidad, mejora tus habilidades y <strong>compite</strong>. Los rankings no solo reflejan el mejor tiempo de un jugador sino también su <em>consistencia</em> y habilidad en múltiples mapas. La tabla de posiciones se actualiza constantemente, lo que asegura que cada carrera cuente.
            </p>
          </section>
          <div className={styles["searchbar-maps"]}>
          <SearchMap/>
          </div>
          <div className={styles["row-content"]}>
            <div className={styles["table-container"]}>
              <PlayersTable />
            </div>
            <div className={styles["table-container"]}>
              <RecentToptimesTable />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
