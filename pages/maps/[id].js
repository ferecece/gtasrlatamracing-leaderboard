import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import Flag from "@components/icons/Flag";
import styles from "@styles/MapPage.module.css";
import Spinner from "@components/Spinner";
import ColoredText from "@components/ColoredText";
import dayjs from "@lib/dayjsConfig";
import { msToTime } from "@lib/utils";

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

const MapPage = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const router = useRouter();
  const { id } = router.query;

  const {
    data: map,
    error,
    isLoading,
  } = useSWR(id ? `/api/toptimes?mapResName=${id}` : null, fetcher);

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.centered}>
          <p>Error: {error.message}</p>
          <Link href="/" className={styles.button}>
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !map) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{map.infoName}</h1>
      <p className={styles.author}>
        <strong>Contribución de:</strong> {map.author ?? "Anónimo"}
      </p>
      <p className={styles.played}>
        <strong>Última vez:</strong>{" "}
        <span
          title={
            map.lastTimePlayed
              ? dayjs(map.lastTimePlayed * 1000)
                  .tz(timeZone)
                  .format("DD/MM/YY HH:mm:ss")
              : "Sin registros disponibles"
          }
        >
          {map.lastTimePlayed
            ? dayjs(map.lastTimePlayed * 1000)
                .tz(timeZone)
                .fromNow()
            : "Sin registros recientes"}
        </span>
      </p>
      <p className={styles.played}>
        <strong>Runs completadas:</strong> {map.playedCount ?? "0"}
      </p>
      {map.mapToptimes && map.mapToptimes.length > 0 ? (
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
            {map.mapToptimes.map((time, index) => (
              <tr key={index}>
                <td className={styles.alignCenter}>
                  {index + 1 === 1 ? (
                    <img
                      src="/places/1st.png"
                      alt="Top 1"
                      width={16}
                      height={16}
                    />
                  ) : index + 1 === 2 ? (
                    <img
                      src="/places/2nd.png"
                      alt="Top 2"
                      width={16}
                      height={16}
                    />
                  ) : index + 1 === 3 ? (
                    <img
                      src="/places/3rd.png"
                      alt="Top 3"
                      width={16}
                      height={16}
                    />
                  ) : (
                    index + 1
                  )}
                </td>
                <td>
                  {time.player.country && (
                    <Flag
                      countryCode={time.player.country}
                      width={18}
                      height={12}
                    />
                  )}
                  <Link href={`/players/${time.player.id}`}>
                    <ColoredText text={time.player.name} />
                  </Link>
                </td>
                <td>{msToTime(time.timeMs)}</td>
                <td>
                  <span
                    title={dayjs(time.dateRecorded).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  >
                    {dayjs.utc(time.dateRecorded).tz(timeZone).fromNow()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.container}>
          <div className={styles.centered}>
            <p>
              Aún no hay tiempos registrados para este mapa. ¡Sé el primero
              en marcar un récord!
            </p>
            <Link href="/" className={styles.button}>
              Volver al inicio
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
