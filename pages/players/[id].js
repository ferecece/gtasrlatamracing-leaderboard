import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@styles/PlayerPage.module.css";
import PlayerTimesTable from "@components/PlayerTimesTable";
import { removeHexColorCoding } from "@lib/utils";
import Link from "next/link";
import PlayerInfo from "@components/PlayerInfo";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.error || "Ocurrió un error inesperado");
    error.status = res.status;
    throw error;
  }
  return data;
};

const PlayerPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: player,
    error,
    isLoading,
  } = useSWR(id ? `/api/players/${id}` : null, fetcher);

  let pageTitle = "GTA Speedrun LATAM Racing";
  if (player) {
    pageTitle = `${removeHexColorCoding(
      player.name
    )} | GTA Speedrun LATAM Racing`;
  }

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Consulta las estadísticas y récords del jugador en el servidor de GTA Speedrun LATAM Racing."
        />
        <meta
          name="keywords"
          content="MTA, GTA, Speedrun, LATAM, Racing, Perfil, Tiempos, Puntos, Ranking"
        />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content="Consulta las estadísticas y récords del jugador en el servidor de GTA Speedrun LATAM Racing."
        />
        <meta
          property="og:url"
          content={`https://mta.gtaspeedrun.lat/players/${id}`}
        />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={styles.container}>
        {error ? (
          <main className={styles.centered}>
            <p>
              {error.status === 500 || error.status === 400
                ? error.message
                : "No pudimos encontrar el perfil de este jugador. Es posible que la cuenta haya sido eliminada."}
            </p>
            <Link href="/" className={styles.button}>
              Volver al inicio
            </Link>
          </main>
        ) : (
          <main className={styles.main}>
            <div className={styles.row}>
              <div className={styles.playerInfoSection}>
                <h1>Perfil</h1>
                <PlayerInfo player={player} />
              </div>
              <div className={styles.statsSection}>
                <h1>Tiempos</h1>
                <PlayerTimesTable player={player} />
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default PlayerPage;
