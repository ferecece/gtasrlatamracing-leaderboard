import Flag from "@components/icons/Flag";
import Link from "next/link";
import ColoredText from "@components/ColoredText";
import { useState } from "react";
import usePlayers from "hooks/usePlayers";
import Image from "next/image";
import { Table, Pagination, Text, Skeleton, Group, useMantineTheme, Paper, Transition } from '@mantine/core';

const ITEMS_PER_PAGE = 10;
const PlayersTable = () => {
  const [page, setPage] = useState(0);
  const theme = useMantineTheme();

  const { players, isError, isLoading } = usePlayers();

  const paginatedPlayers = players.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(players.length / ITEMS_PER_PAGE);
  const handlePageChange = (p) => setPage(p - 1);

  return (
    <Paper withBorder radius="md" p="md" shadow="sm" style={{
      maxWidth: 520,
      margin: "0 auto",
      overflowX: 'auto',
      //borderColor: theme.colors.gray[7],
      borderWidth: 2,
      borderStyle: 'solid',
      borderRadius: theme.radius.md,

    }}>
      <Text size="xl" fw={700} align="center" mb="md">Ranking Global</Text>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <Table
          striped
          highlightOnHover
          withColumnBorders
          style={{
            width: "100%",
            minWidth: 400,
            tableLayout: "fixed",
            borderRadius: theme.radius.md,
            overflow: 'hidden'
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 70, background: theme.colors[theme.primaryColor][7] }}>#</th>
              <th
                style={{
                  minWidth: 120,
                  maxWidth: 270,
                  width: 220,
                  background: theme.colors[theme.primaryColor][7]
                }}
              >
                Nombre
              </th>
              <th style={{ width: 90, background: theme.colors[theme.primaryColor][7] }}>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                <tr key={idx}>
                  <td><Skeleton height={24} width="100%" radius="sm" /></td>
                  <td><Skeleton height={24} width="100%" radius="sm" /></td>
                  <td><Skeleton height={24} width="100%" radius="sm" /></td>
                </tr>
              ))
            ) : paginatedPlayers.length > 0 ? (
              paginatedPlayers.map((player, idx) => (
                <Transition
                  key={player.rank}
                  mounted={true}
                  transition="fade"
                  duration={4000}
                  timingFunction="ease"
                  delay={idx * 80}
                >
                  {(styles) => (
                    <tr style={styles}>
                      <td style={{ textAlign: 'center' }}>
                        {player.rank === 1 ? (
                          <Image src="/places/1st.png" width={16} height={16} alt="Top 1" />
                        ) : player.rank === 2 ? (
                          <Image src="/places/2nd.png" width={16} height={16} alt="Top 2" />
                        ) : player.rank === 3 ? (
                          <Image src="/places/3rd.png" width={16} height={16} alt="Top 3" />
                        ) : (
                          player.rank
                        )}
                      </td>
                      <td style={{ maxWidth: 270, minWidth: 120, width: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <Group spacing="xs">
                          <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: 18,
                            height: 12,
                            justifyContent: 'center'
                          }}>
                            {player.country ? (
                              <Flag countryCode={player.country} width={18} height={12} />
                            ) : null}
                          </span>
                          <Link key={player.id} href={`/players/${player.id}`} style={{ textDecoration: 'none' }}>
                            <ColoredText text={player.name} />
                          </Link>
                        </Group>
                      </td>
                      <td style={{ textAlign: 'center' }}>{player.points}</td>
                    </tr>
                  )}
                </Transition>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center' }}>
                  <Text c={isError ? 'red' : 'dimmed'}>
                    {isError ? 'Ocurrió un error al obtener los jugadores.' : 'No hay jugadores.'}
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Group position="apart" mt="md">
        <Pagination
          page={page + 1}
          onChange={handlePageChange}
          total={totalPages}
          color={theme.colors[theme.primaryColor][7]}
          radius={theme.radius.md}
        />
      </Group>
    </Paper>
  );
};

export default PlayersTable;
