import useSWR from "swr";
import styles from "@styles/Home.module.css";
import Link from "next/link";
import { msToTime } from "@lib/utils";
import dayjs from "@lib/dayjsConfig";
import ShimmerLoader from "@components/ShimmerLoader";
import { useState } from "react";
import Image from "next/image";
import usePlayerTimes from "hooks/usePlayerTimes";

const ITEMS_PER_PAGE = 15;
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const PlayerTimesTable = ({ player }) => {
  const [page, setPage] = useState(0);

  const { toptimes, isError, isLoading } = usePlayerTimes(player?.id);

  const paginatedTimes = toptimes.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const totalPages = toptimes ? Math.ceil(toptimes.length / ITEMS_PER_PAGE) : 0;

  const handleNextPage = () =>
    setPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.alignCenter}>#</th>
            <th>Tiempo</th>
            <th>Mapa</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {!player || isLoading ? (
            <ShimmerLoader rows={ITEMS_PER_PAGE} columns={4} />
          ) : isError ? (
            <tr>
              <td colSpan={4}>Error al obtener los tiempos.</td>
            </tr>
          ) : paginatedTimes.length > 0 ? (
            paginatedTimes.map((toptime, i) => {
              const dateRecorded = dayjs(toptime.recordedAtMs).tz(timeZone);
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
                  <td>{msToTime(toptime.timeMs)}</td>
                  <td>
                    <Link href={`/maps/${toptime.map.resName}`}>
                      {toptime.map.infoName}
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
              <td colSpan={4}>El jugador no tiene tiempos.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={page === 0}>
          &lt;
        </button>
        <span>
          {page + 1} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page + 1 >= totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PlayerTimesTable;
