import useSWR from 'swr';
import Flag from '@components/icons/Flag';
import styles from '@styles/Home.module.css';
import Link from 'next/link';
import ColoredText from '@components/ColoredText';
import ShimmerLoader from '@components/ShimmerLoader';
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ITEMS_PER_PAGE = 10;

const PlayersTable = () => {
  const [page, setPage] = useState(0);

  const { data: topPlayers, error, isLoading } = useSWR('/api/players', fetcher, {
    refreshInterval: 10000,
  });

  const paginatedPlayers = topPlayers
    ? topPlayers?.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
    : [];

  const totalPages = topPlayers ? Math.ceil(topPlayers.length / ITEMS_PER_PAGE) : 0;

  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  return (
    <div>
      <table className={styles.table}>
        <caption className={styles.caption}>
          <h4>Ranking de Jugadores</h4>
        </caption>
        <thead>
          <tr>
            <th className={styles.alignCenter} style={{ width: '70px' }}>#</th>
            <th>Nombre</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <ShimmerLoader rows={ITEMS_PER_PAGE} columns={3} />
          ) : error ? (
            <tr>
              <td colSpan={3}>Error al obtener jugadores.</td>
            </tr>
          ) : paginatedPlayers.length > 0 ? (
            paginatedPlayers.map((player) => (
              <tr key={player.rank}>
                <th className={styles.alignCenter}>
                  {player.rank === 1 ? (
                    <img src="/places/1st.png" alt="Top 1" width={16} height={16} />
                  ) : player.rank === 2 ? (
                    <img src="/places/2nd.png" alt="Top 2" width={16} height={16} />
                  ) : player.rank === 3 ? (
                    <img src="/places/3rd.png" alt="Top 3" width={16} height={16} />
                  ) : (
                    player.rank
                  )}
                </th>
                <td>
                  {player.country && (
                    <Flag countryCode={player.country} width={18} height={12} />
                  )}
                  <Link key={player.id} href={`/players/${player.id}`}>
                  <ColoredText text={player.name} />
                  </Link>
                </td>
                <td>{player.points}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No hay jugadores.</td>
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

export default PlayersTable;
