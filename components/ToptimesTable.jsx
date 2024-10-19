import React, { useContext } from "react";
import styles from "@styles/Home.module.css";
import Link from "next/link";
import { msToTime } from "@lib/utils";
import dayjs from '@lib/dayjsConfig';
import Flag from "@icons/Flag";
import ToptimesContext from "@context/toptimes";
import ColoredText from "@ColoredText";

const ToptimesTable = () => {
  const { toptimes, mapInfo } = useContext(ToptimesContext);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <table className={styles.table}>
      {mapInfo && (
        <caption className={styles.caption}>
          <h4>{mapInfo.infoName}</h4>
          <span className={styles.captionAuthor}>
            por {mapInfo.author || "Desconocido"}
          </span>
        </caption>
      )}
      <thead>
        <tr>
          <th className={styles.alignCenter}>#</th>
          <th>Jugador</th>
          <th>Tiempo</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {toptimes?.length > 0 ? (
          toptimes.map((e, i) => {
            const dateRecorded = dayjs.utc(e.dateRecorded).tz(timeZone);
            return (
              <tr key={i}>
                <th className={styles.alignCenter}>
                  {i === 0 ? (
                    <img
                      src="/places/1st.png"
                      alt="Top 1"
                      width={16}
                      height={16}
                    />
                  ) : i === 1 ? (
                    <img
                      src="/places/2nd.png"
                      alt="Top 2"
                      width={16}
                      height={16}
                    />
                  ) : i === 2 ? (
                    <img
                      src="/places/3rd.png"
                      alt="Top 3"
                      width={16}
                      height={16}
                    />
                  ) : (
                    i + 1
                  )}
                </th>
                <td>
                  {e.country && (
                    <Flag countryCode={e.country} width={18} height={12} />
                  )}
                  <Link key={e.playerID} href={`/players/${e.playerID}`}>          
                  <ColoredText text={e.name}/>
                  </Link>
                </td>
                <td>{msToTime(e.timeMs)}</td>
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
            <td colSpan={4}>No hay tiempos para este mapa.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ToptimesTable;
