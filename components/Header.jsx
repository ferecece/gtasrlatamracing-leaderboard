import useSWR from 'swr';
import Link from 'next/link';
import styles from '@styles/Home.module.css';
import Spinner from '@components/Spinner';

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

const Header = () => {
  const { data: serverInfo, error, isLoading } = useSWR(
    '/api/server',
    fetcher,
    { refreshInterval: 10000 }
  );

  const statusColor = error ? 'red' : 'green';

  return (
    <nav className={styles.nav}>
      <div className={styles.navbarContainer}>
        <div className={styles.leftSection}>
          <h2 className={styles.title}>
            <span>
              <span
                className={styles.statusIndicator}
                style={{ backgroundColor: statusColor }}
              ></span>
              <Link href="/">
                {'GTA Speedrun LATAM Racing'}
              </Link>
            </span>
          </h2>
        </div>
        <div className={styles.centerSection}>
          {isLoading ? (
            <Spinner />
          ) : error? (
            <p>{error.message}</p>
          ) : (
            <Link href="mtasa://sv.gtaspeedrun.lat:36129">
              sv.gtaspeedrun.lat:36129
            </Link>
          )}
        </div>

        <div className={styles.rightSection}>
          {!error && serverInfo && (
              <p>Mapa activo: {serverInfo.map}<br/>Jugadores: {`${serverInfo.players}/${serverInfo.max_players}`}</p>                
          )}
          <></>
        </div>
      </div>
    </nav>
  );
};

export default Header;