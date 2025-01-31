import Link from 'next/link';
import styles from '@styles/Home.module.css';
import Spinner from '@components/Spinner';
import useServer from 'hooks/useServer';


const Header = () => {
  const { server, isError, isLoading } = useServer();
  const statusColor = isError ? 'red' : 'green';

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
          ) : isError? (
            <p>{isError.message}</p>
          ) : (
            <Link href="mtasa://sv.gtaspeedrun.lat:36129">
              sv.gtaspeedrun.lat:36129
            </Link>
          )}
        </div>

        <div className={styles.rightSection}>
          {!isError && server && (
              <p>Mapa activo: {server.map}<br/>Jugadores: {`${server.players}/${server.max_players}`}</p>                
          )}
          <></>
        </div>
      </div>
    </nav>
  );
};

export default Header;