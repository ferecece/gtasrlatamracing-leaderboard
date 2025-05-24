import { Paper, Text, useMantineTheme } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
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

  // Definimos las columnas para el DataTable
  const columns = [
    {
      accessor: 'position',
      title: '#',
      width: 50,
      textAlign: 'center',
      render: (record) => {
        const position = record.position;
        if (position === 1) {
          return (
            <Image
              src="/places/1st.png"
              alt="Top 1"
              width={16}
              height={16}
            />
          );
        } else if (position === 2) {
          return (
            <Image
              src="/places/2nd.png"
              alt="Top 2"
              width={16}
              height={16}
            />
          );
        } else if (position === 3) {
          return (
            <Image
              src="/places/3rd.png"
              alt="Top 3"
              width={16}
              height={16}
            />
          );
        }
        return position;
      },
    },
    {
      accessor: 'player',
      title: 'Jugador',
      width: 180,
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Flag countryCode={record.player.country} size={16} />
          <Link href={`/players/${record.player.id}`} legacyBehavior>
            <a>
              <ColoredText skin={record.player.skin}>{record.player.name}</ColoredText>
            </a>
          </Link>
        </div>
      ),
    },
    {
      accessor: 'timeMs',
      title: 'Tiempo',
      width: 90,
      render: (record) => msToTime(record.timeMs),
    },
    {
      accessor: 'map',
      title: 'Mapa',
      width: 180,
      render: (record) => (
        <Link href={`/maps/${record.map.resName}`} legacyBehavior>
          <a>{record.map.infoName}</a>
        </Link>
      ),
    },
    {
      accessor: 'recordedAtMs',
      title: 'Fecha',
      width: 120,
      render: (record) => {
        const dateRecorded = dayjs(record.recordedAtMs).tz(timeZone);
        return (
          <span title={dateRecorded.format("DD/MM/YYYY HH:mm:ss")}>
            {dateRecorded.fromNow()}
          </span>
        );
      },
    },
  ];

  return (
    <Paper withBorder radius="md" p="md" shadow="sm" style={{ maxWidth: 700, margin: '0 auto' }}>
      <Text size="xl" fw={700} align="center" mb="md">Tiempos Recientes</Text>
      
      <DataTable
        withTableBorder
        borderRadius="md"
        striped
        highlightOnHover
        minHeight={150}
        columns={columns}
        records={toptimes}
        fetching={isLoading}
        noRecordsText={isError ? "Ocurrió un error al obtener los tiempos." : "No hay tiempos recientes."}
        noRecordsIcon={null}
        idAccessor="id"
        sx={{
          '& thead tr th': {
            backgroundColor: theme.colors[theme.primaryColor][7],
            color: 'white',
          },
        }}
      />
    </Paper>
  );
};

export default RecentToptimesTable;