import { Table, Skeleton, Paper, Text, Group, useMantineTheme } from '@mantine/core';
import Link from "next/link";
import { msToTime } from "@lib/utils";
import dayjs from "@lib/dayjsConfig";
import Flag from "@components/icons/Flag";
import ColoredText from "@components/ColoredText";
import Image from "next/image";
import useRecent from "hooks/useRecent";

const RecentToptimesTable = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const theme = useMantineTheme();
  const { toptimes, isError, isLoading } = useRecent();

  return (
    <Paper withBorder radius="md" p="md" shadow="sm" style={{ maxWidth: 700, margin: '0 auto', overflowX: 'auto' }}>
      <Text size="xl" fw={700} align="center" mb="md">Tiempos Recientes</Text>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <Table
          striped
          highlightOnHover
          withColumnBorders
          style={{ width: '100%', minWidth: 600, tableLayout: 'fixed' }}
        >
          <thead>
            <tr>
              <th style={{ width: 50, textAlign: 'center', background: theme.colors[theme.primaryColor][7], color: 'white' }}>#</th>
              <th style={{ minWidth: 120, maxWidth: 220, width: 180, background: theme.colors[theme.primaryColor][7], color: 'white' }}>Jugador</th>
              <th style={{ width: 90, background: theme.colors[theme.primaryColor][7], color: 'white' }}>Tiempo</th>
              <th style={{ minWidth: 120, maxWidth: 220, width: 180, background: theme.colors[theme.primaryColor][7], color: 'white' }}>Mapa</th>
              <th style={{ width: 120, background: theme.colors[theme.primaryColor][7], color: 'white' }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx}>
                  <td><Skeleton height={22} /></td>
                  <td><Skeleton height={22} /></td>
                  <td><Skeleton height={22} /></td>
                  <td><Skeleton height={22} /></td>
                  <td><Skeleton height={22} /></td>
                </tr>
              ))
            ) : toptimes.length > 0 ? (
              toptimes.map((toptime, i) => {
                const dateRecorded = dayjs(toptime.recordedAtMs).tz(timeZone);
                return (
                  <tr key={i}>
                    <td style={{ textAlign: 'center' }}>
                      {toptime.position === 1 ? (
                        <Image src="/places/1st.png" alt="Top 1" width={16} height={16} />
                      ) : toptime.position === 2 ? (
                        <Image src="/places/2nd.png" alt="Top 2" width={16} height={16} />
                      ) : toptime.position === 3 ? (
                        <Image src="/places/3rd.png" alt="Top 3" width={16} height={16} />
                      ) : (
                        toptime.position
                      )}
                    </td>
                    <td style={{ maxWidth: 220, minWidth: 120, width: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <Group spacing="xs">
                        {toptime.player.country && (
                          <Flag countryCode={toptime.player.country} width={18} height={12} />
                        )}
                        <Link href={`/players/${toptime.player.id}`} style={{ textDecoration: 'none' }}>
                          <ColoredText text={toptime.player.name} />
                        </Link>
                      </Group>
                    </td>
                    <td>{msToTime(toptime.timeMs)}</td>
                    <td style={{ maxWidth: 220, minWidth: 120, width: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <Link href={`/maps/${toptime.map.resName}`} style={{ textDecoration: 'none' }}>
                        {toptime.map.infoName}
                      </Link>
                    </td>
                    <td style={{ width: 120 }}>
                      <span title={dateRecorded.format("DD/MM/YYYY HH:mm:ss")}>{dateRecorded.fromNow()}</span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>
                  <Text c={isError ? 'red' : 'dimmed'}>
                    {isError ? 'Ocurrió un error al obtener los tiempos.' : 'No hay tiempos recientes.'}
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Paper>
  );
};

export default RecentToptimesTable;