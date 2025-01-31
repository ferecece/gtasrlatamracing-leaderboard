import Flag from "@components/icons/Flag";
import styles from "@styles/PlayerPage.module.css";
import ColoredText from "@components/ColoredText";
import Spinner from "@components/Spinner";
import SkinImage from "./icons/SkinImage";
import dayjs from "@lib/dayjsConfig";
import Image from "next/image";

const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const SkeletonLoader = () => (
  <div className={`${styles.infoCard} ${styles.skeletonCard}`}>
    <div className={styles.skeletonHeader}>
      <div className={styles.skeletonFlag}></div>
      <div className={styles.skeletonText} style={{ width: "40%" }}></div>
    </div>
    <div className={styles.skeletonSkin}></div>

    <div className={`row ${styles.infoContent}`}>
      <div className={`col lg-10 md-5 ${styles.pointsInfo}`}>
        <div>
          <div className={styles.skeletonText} style={{ width: "60%" }}></div>
          <div className={styles.skeletonText} style={{ width: "30%" }}></div>
        </div>
        <div>
          <div className={styles.skeletonText} style={{ width: "60%" }}></div>
          <div className={styles.skeletonText} style={{ width: "30%" }}></div>
        </div>
        <div>
          <div className={styles.skeletonText} style={{ width: "60%" }}></div>
          <div className={styles.skeletonText} style={{ width: "50%" }}></div>
        </div>
      </div>

      <div className={`col lg-10 md-5 ${styles.tops}`}>
        <div className={styles.skeletonText} style={{ width: "20px", height: "20px" }}></div>
        <div className={styles.skeletonText} style={{ width: "20px", height: "20px" }}></div>
        <div className={styles.skeletonText} style={{ width: "20px", height: "20px" }}></div>
      </div>
    </div>
  </div>
);

const PlayerInfo = ({ player, isLoading }) => {
  if (isLoading) return <SkeletonLoader />;
  if (!player) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Spinner />
      </div>
    );
  }

  const lastOnline =
    player.lastOnlineMs === "online"
      ? "En línea"
      : dayjs.utc(player.lastOnlineMs)
          .tz(clientTimeZone)
          .fromNow();

  return (
    <div className={styles.infoCard}>
      <h2 style={{ margin: "0 0 16px 0" }}>
        <Flag countryCode={player.country ?? ""} width={24} height={16} />
        <ColoredText text={player?.name || ""} />
      </h2>
      {player.skinId && <SkinImage skinID={player.skinId} />}

      <div className={`row ${styles.infoContent}`}>
        <div className={`col lg-10 md-5 ${styles.pointsInfo}`}>
          <div>
            <h2 className={styles.infoName}>Puntos</h2>
            <p>{player.points || 0}</p>
          </div>
          <div>
            <h2 className={styles.infoName}>Ranking</h2>
            <p>{player.ranking || "-"}</p>
          </div>
          <div>
            <h2 className={styles.infoName}>Última vez</h2>
            <p>{lastOnline}</p>
          </div>
        </div>

        <div className={`col lg-10 md-5 ${styles.tops}`}>
          <p>
            <Image src="/places/1st.png" width={24} height={24} alt="Top 1" />{" "}
            {player.timeRanks?.firstPlaceCount}
          </p>
          <p>
            <Image src="/places/2nd.png" width={24} height={24} alt="Top 2" />{" "}
            {player.timeRanks?.secondPlaceCount}
          </p>
          <p>
            <Image src="/places/3rd.png" width={24} height={24} alt="Top 3" />{" "}
            {player.timeRanks?.thirdPlaceCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;