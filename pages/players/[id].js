import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@styles/PlayerPage.module.css";
import PlayerTimesTable from "@components/PlayerTimesTable";
import { removeHexColorCoding } from "@lib/utils";
import Link from "next/link";
import PlayerInfo from "@components/PlayerInfo";
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.error || 'Ocurrió un error inesperado');
    error.status = res.status;
    throw error;
  }
  return data;
};

const PlayerPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: player, error, isLoading } = useSWR(
    id ? `/api/players/${id}` : null,
    fetcher
  );

  let pageTitle = "GTA Speedrun LATAM Racing";
  if (player) {
    pageTitle = `${removeHexColorCoding(player.name)} | GTA Speedrun LATAM Racing`;
  }

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Leaderboard del Servidor de MTA:SA de GTA Speedrun LATAM"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        {error ? (
          <main className={styles.centered}>
            <p>{error.message}</p>
            <Link href="/" className={styles.button}>Volver al inicio</Link>
          </main>
        ) : (
          <main className={styles.main}>
            <div className={styles.row}>
              <div className={styles.playerInfoSection}>
                <PlayerInfo player={player} />
              </div>
              <div className={styles.statsSection}>
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