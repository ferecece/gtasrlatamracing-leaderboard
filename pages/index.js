import Head from "next/head";
import { Container, Grid, Stack, Paper, Title, Text } from "@mantine/core";
//import styles from "@styles/Home.module.css";
import RecentToptimesTable from "@components/RecentToptimesTable";
import PlayersTable from "@components/PlayersTable";
import SearchMap from "@components/SearchMap";

export default function Home() {
  return (
    <>
      <Head>
        <title>GTA Speedrun LATAM Racing</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Consulta los tiempos más rápidos del servidor MTA:SA y compite por el primer lugar."
        />
        <meta
          name="keywords"
          content="GTA Speedrun LATAM Racing, Ranking Global, Bienvenid@, Tiempos Recientes, Nombre, Puntos, Jugador, Tiempo, Mapa, Fecha"
        />
        <meta
          property="og:title"
          content="GTA Speedrun LATAM Racing Leaderboard"
        />
        <meta
          property="og:description"
          content="Consulta los tiempos más rápidos del servidor MTA:SA y compite por el primer lugar."
        />
        <meta property="og:url" content="https://mta.gtaspeedrun.lat/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Container size="lg" py="md">
        <Stack spacing="lg">
        <SearchMap />
          <Grid gutter="lg">
            <Grid.Col xs={12} md={6}>
              <PlayersTable />
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              <RecentToptimesTable />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </>
  );
}
