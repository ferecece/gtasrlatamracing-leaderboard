import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import Flag from "@components/icons/Flag";
import styles from "@styles/MapPage.module.css";
import Spinner from "@components/Spinner";
import ColoredText from "@components/ColoredText";
import dayjs from "@lib/dayjsConfig";
import { msToTime } from "@lib/utils";
import Image from "next/image";
import Head from "next/head";

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
        <Head>
          <title>Error | GTA Speedrun LATAM Racing</title>
          <meta name="description" content="Error al cargar el mapa." />
        </Head>
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
        <Head>
          <title>GTA Speedrun LATAM Racing</title>
          <meta
            name="description"
            content="Explora los récords de mapas en GTA Speedrun LATAM Racing."
          />
          <meta
            name="keywords"
            content="MTA, GTA, Speedrun, LATAM, Racing, Runs"
          />
          <meta property="og:title" content="GTA Speedrun LATAM Racing" />
          <meta
            property="og:description"
            content="Explora los récords de mapas en GTA Speedrun LATAM Racing."
          />
          <meta
            property="og:url"
            content={`https://mta.gtaspeedrun.lat/maps/${id}`}
          />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {map
            ? `${map.infoName} | GTA Speedrun LATAM Racing`
            : "GTA Speedrun LATAM Racing"}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Explora los récords de mapas en GTA Speedrun LATAM Racing."
        />
        <meta
          name="keywords"
          content="MTA, GTA, Speedrun, LATAM, Racing, Mapa, Contribución, Runs, Jugador, Tiempo, Fecha"
        />
        <meta
          property="og:title"
          content={
            map
              ? `${map.infoName} | GTA Speedrun LATAM Racing`
              : "GTA Speedrun LATAM Racing"
          }
        />
        <meta
          property="og:description"
          content="Explora los récords de mapas en GTA Speedrun LATAM Racing."
        />
        <meta
          property="og:url"
          content={`https://mta.gtaspeedrun.lat/maps/${id}`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta property="og:image" content="/preview.png" />
      </Head>
      <h1 className={styles.title}>{`Mapa ${map.infoName}`}</h1>
      <h2 className={styles.author}>
        Contribución de {map.author ?? "Anónimo"}
      </h2>
      <h2 className={styles.played}>
        Última vez jugado{" "}
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
            : "sin registros recientes"}
        </span>
      </h2>
      <h2 className={styles.played}>
        Runs completadas {map.playedCount}
      </h2>
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
                    <Image
                      src="/places/1st.png"
                      alt="Top 1"
                      width={16}
                      height={16}
                    />
                  ) : index + 1 === 2 ? (
                    <Image
                      src="/places/2nd.png"
                      alt="Top 2"
                      width={16}
                      height={16}
                    />
                  ) : index + 1 === 3 ? (
                    <Image
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
              Aún no hay tiempos registrados para este mapa. ¡Sé el primero en
              marcar un récord!
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
