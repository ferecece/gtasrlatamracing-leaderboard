import useSWR from "swr";
import styles from "@styles/Home.module.css";
import Link from "next/link";
import { msToTime } from "@lib/utils";
import dayjs from "@lib/dayjsConfig";
import Flag from "@components/icons/Flag";
import ColoredText from "@components/ColoredText";
import ShimmerLoader from "@components/ShimmerLoader";
import Image from "next/image";

const fetcher = (url) => fetch(url).then((res) => res.json());

const RecentToptimesTable = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const { data: toptimes, error, isLoading } = useSWR(
    "/api/toptimes/recent",
    fetcher,
    { refreshInterval: 10000 }
  );

  return (
    <table className={styles.table}>
      <caption>
        <h2>Tiempos Recientes</h2>
      </caption>
      <thead>
        <tr>
          <th className={styles.alignCenter}>#</th>
          <th>Jugador</th>
          <th>Tiempo</th>
          <th>Mapa</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <ShimmerLoader rows={20} /> 
        ) : toptimes && toptimes.length > 0 ? (
          toptimes.map((toptime, i) => {
            const dateRecorded = dayjs.utc(toptime.dateRecorded).tz(timeZone);
            return (
              <tr key={i}>
                <th className={styles.alignCenter}>
                  {toptime.position === 1 ? (
                    <Image
                      src="/places/1st.png"
                      alt="Top 1"
                      width={16}
                      height={16}
                    />
                  ) : toptime.position === 2 ? (
                    <Image
                      src="/places/2nd.png"
                      alt="Top 2"
                      width={16}
                      height={16}
                    />
                  ) : toptime.position === 3 ? (
                    <Image
                      src="/places/3rd.png"
                      alt="Top 3"
                      width={16}
                      height={16}
                    />
                  ) : (
                    toptime.position
                  )}
                </th>
                <td>
                  {toptime.player.country && (
                    <Flag
                      countryCode={toptime.player.country}
                      width={18}
                      height={12}
                    />
                  )}
                  <Link href={`/players/${toptime.player.id}`}>
                    <ColoredText text={toptime.player.name} />
                  </Link>
                </td>
                <td>{msToTime(toptime.timeMs)}</td>
                <td>
                  <Link href={`/maps/${toptime.raceMap.resName}`}>
                  {toptime.raceMap.infoName}
                  </Link>
                </td>
                <td>
                  <span title={dateRecorded.format("DD/MM/YYYY HH:mm:ss")}>
                    {dateRecorded.fromNow()}
                  </span>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5}>No hay tiempos recientes.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RecentToptimesTable;