import Link from 'next/link';
import {
  Box,
  Text,
  Button,
  Container,
  Flex,
  Tooltip,
  Skeleton
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconServer, IconUsers, IconMap2 } from '@tabler/icons-react';
import useServer from 'hooks/useServer';

const Header = () => {
  const { server, isError, isLoading } = useServer();
  const iconSize = 24;
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Box
      component="header"
      style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        height: isMobile ? 'auto' : '54px',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '8px 0' : 0,
      }}
    >
      <Container size="lg" w="100%">
        <Flex
          justify="space-between"
          align="center"
          direction={isMobile ? 'column' : 'row'}
          gap={isMobile ? 8 : 0}
        >
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Text fw={700} size="sm" color="white" align={isMobile ? 'center' : 'left'} style={{
              whiteSpace: isMobile ? 'normal' : 'nowrap',
              width: isMobile ? '100%' : 'auto',
              overflow: 'hidden',
              textOverflow: isMobile ? 'clip' : 'ellipsis',
            }}>
              GTA Speedrun LATAM Racing
            </Text>
          </Link>

          <Flex
            align="center"
            gap={isMobile ? 8 : 12}
            direction={isMobile ? 'column' : 'row'}
            style={{ width: isMobile ? '100%' : 'auto' }}
          >
            <Tooltip label="Conectarse al servidor" withArrow position="bottom">
              <Button
                disabled={isError}
                component="a"
                href="mtasa://sv.gtaspeedrun.lat:36129"
                variant="subtle"
                color="red.3"
                size="compact-xs"
                style={{
                  padding: '0 6px',
                  height: '22px',
                  width: isMobile ? '100%' : 'auto',
                  cursor: isMobile ? 'not-allowed' : 'pointer',
                }}
                leftSection={<IconServer size={iconSize} stroke={1.5} />}
              >
                {isLoading ? (
                  <Skeleton height={12} width={235} radius="sm" />
                ) : (
                  <Text span size="xs" style={{ minWidth: 80, textAlign: 'center' }}>
                    {isError ? "Offline" : "mtasa://sv.gtaspeedrun.lat:36129"}
                  </Text>
                )}
              </Button>
            </Tooltip>
            <Flex align="center" gap={3}>
              <IconMap2 size={iconSize} stroke={1.5} color="var(--mantine-color-blue-3)" />
              {isLoading ? (
                <Skeleton height={12} width={80} radius="sm" />
              ) : (
                <Text size={isMobile ? "sm" : "md"} style={{ minWidth: 80, textAlign: 'center' }}>
                  {isError ? "Desconocido" : server.map}
                </Text>
              )}
            </Flex>
            <Flex align="center" gap={3}>
              <IconUsers size={iconSize} stroke={1.5} color="var(--mantine-color-green-3)" />
              {isLoading ? (
                <Skeleton height={12} width={40} radius="sm" />
              ) : (
                <Text size={isMobile ? "sm" : "md"} style={{ minWidth: 40, textAlign: 'center' }}>
                  {isError ? "0/32" : `${server.players}/${server.max_players}`}
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header; 