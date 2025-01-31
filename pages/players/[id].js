import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@styles/PlayerPage.module.css";
import PlayerTimesTable from "@components/PlayerTimesTable";
import { removeHexColorCoding } from "@lib/utils";
import Link from "next/link";
import PlayerInfo from "@components/PlayerInfo";
import usePlayer from "hooks/usePlayer";
import { useEffect } from "react";

const PlayerPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { player, isError, isLoading } = usePlayer(id);

  let pageTitle = "GTA Speedrun LATAM Racing";
  if (player) {
    pageTitle = `${removeHexColorCoding(
      player?.name
    )} | GTA Speedrun LATAM Racing`;
  }

  useEffect(() => {
    isError && router.replace("/");
  }, [isError, router]);
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
        {isError ? (
          <main className={styles.centered}>
            <p>
              {isError.status === 500 || isError.status === 400
                ? isError.message
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
                <PlayerInfo player={player} isLoading={isLoading} />
              </div>
              <div className={styles.statsSection}>
                <h1>Tiempos</h1>
                <PlayerTimesTable player={player} isLoading={isLoading} />
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default PlayerPage;
