import Head from 'next/head';
import styles from '@styles/Home.module.css';
import RecentToptimesTable from '@components/RecentToptimesTable';
import PlayersTable from '@components/PlayersTable';
import SearchMap from '@components/SearchMap';

export default function Home() {
  return (
    <>
      <Head>
        <title>GTA Speedrun LATAM Racing</title>
        <meta
          name="description"
          content="Leaderboard del Servidor de MTA:SA de GTA Speedrun LATAM"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <SearchMap/>
        <main className={styles.main}>
          <div className={styles['row-content']}>
            <div className={styles['table-container']}>
              <PlayersTable />
            </div>
            <div className="col">
              <div className={styles['table-container']}>
                <RecentToptimesTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
