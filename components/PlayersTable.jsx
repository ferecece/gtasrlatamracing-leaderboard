import Flag from "@components/icons/Flag";
import Link from "next/link";
import ColoredText from "@components/ColoredText";
import { useState } from "react";
import usePlayers from "hooks/usePlayers";
import Image from "next/image";
import { Text, useMantineTheme, Paper } from '@mantine/core';
import { DataTable } from 'mantine-datatable';

const ITEMS_PER_PAGE = 10;
const PlayersTable = () => {
  const [page, setPage] = useState(1);
  const theme = useMantineTheme();

  const { players, isError, isLoading } = usePlayers();

  const totalRecords = players.length;

  // Definimos las columnas para el DataTable
  const columns = [
    {
      accessor: 'position',
      title: '#',
      width: 70,
      textAlign: 'center',
      render: (record) => record.position,
    },
    {
      accessor: 'name',
      title: 'Nombre',
      width: 220,
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {record.country && <Flag countryCode={record.country} size={16} />}
          <Link href={`/players/${record.id}`} legacyBehavior>
            <a>
              <ColoredText skin={record.skin}>{record.name}</ColoredText>
            </a>
          </Link>
        </div>
      ),
    },
    {
      accessor: 'points',
      title: 'Puntos',
      width: 90,
      textAlign: 'right',
      render: (record) => record.points,
    },
  ];

  return (
    <Paper withBorder radius="md" p="md" shadow="sm" style={{
      maxWidth: 520,
      margin: "0 auto",
    }}>
      <Text size="xl" fw={700} align="center" mb="md">Ranking Global</Text>
      
      <DataTable
        withTableBorder
        borderRadius="md"
        striped
        highlightOnHover
        minHeight={150}
        columns={columns}
        records={players}
        fetching={isLoading}
        noRecordsText={isError ? "Ocurrió un error al obtener los jugadores." : "No hay jugadores."}
        noRecordsIcon={null}
        idAccessor="id"
        page={page}
        onPageChange={setPage}
        totalRecords={totalRecords}
        recordsPerPage={ITEMS_PER_PAGE}
        paginationActiveBackgroundColor={theme.colors[theme.primaryColor][7]}
        paginationSize="md"
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

export default PlayersTable;
