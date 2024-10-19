import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import Flag from '@components/icons/Flag';
import styles from '@styles/MapPage.module.css';
import Spinner from '@components/Spinner';
import ColoredText from '@components/ColoredText';
import dayjs from '@lib/dayjsConfig';
import { msToTime } from '@lib/utils';

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

const MapPage = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const router = useRouter();
  const { id } = router.query;

  const { data: map, error, isLoading } = useSWR(
    id ? `/api/toptimes?mapResName=${id}` : null,
    fetcher
  );

  if (router.isFallback || isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {error ? (
        <div className={styles.centered}>
          <p>{error.message}</p>
          <Link href="/" className={styles.button}>
            Volver al inicio
          </Link>
        </div>
      ) : (
        <>
          <h1 className={styles.title}>{map?.infoName}</h1>
          <p className={styles.author}>
          <strong>Contribución de:</strong> {map?.author}
          </p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.alignCenter}>#</th>
                <th>Jugador</th>
                <th>Tiempo</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {map.mapToptimes.length > 0 ? (
                map.mapToptimes.map((time, index) => (
                  <tr key={index}>
                    <td className={styles.alignCenter}>
                      {index + 1 === 1 ? (
                        <img src="/places/1st.png" alt="Top 1" width={16} height={16} />
                      ) : index + 1 === 2 ? (
                        <img src="/places/2nd.png" alt="Top 2" width={16} height={16} />
                      ) : index + 1 === 3 ? (
                        <img src="/places/3rd.png" alt="Top 3" width={16} height={16} />
                      ) : (
                        index + 1
                      )}
                    </td>
                    <td>
                      {time.player.country && (
                        <Flag countryCode={time.player.country} width={18} height={12} />
                      )}
                      <Link href={`/players/${time.player.id}`}>
                      <ColoredText text={time.player.name} />
                      </Link>
                    </td>
                    <td>{msToTime(time.timeMs)}</td>
                    <td>
                    <span title={dayjs(time.dateRecorded).format('DD/MM/YYYY HH:mm:ss')}>
                    {dayjs.utc(time.dateRecorded).tz(timeZone).fromNow()}
                  </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No hay tiempos registrados para este mapa.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MapPage;
