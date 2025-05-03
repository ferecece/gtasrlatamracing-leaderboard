import { useState } from "react";
import { Autocomplete, Loader, Group, Text, useMantineTheme } from "@mantine/core";
import { IconSearch, IconFlag, IconUser, IconClock, IconListNumbers, IconAlertCircle, IconRefresh } from "@tabler/icons-react";
import { useRouter } from "next/router";
import useMaps from "hooks/useMaps";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const raceTypeNames = {
  R: "Race",
  SR: "Speedrun",
  DD: "Destruction Derby",
  TW: "Teamwork",
  MG: "Minigame",
  F: "Footrace",
  RANDOM: "Randomizer"
};

const SearchMap = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const { maps, isLoading, isError } = useMaps(search);

  const data = maps.map((map) => ({
    value: map.resName,
    label: map.infoName,
    map,
  }));

  return (
    <Autocomplete
      placeholder={
        "Buscar mapa..."
      }
      error={isError
        ? (
          <Text size="sm" c={theme.colors.red[2]}>{isError}</Text>
        )
        : false
      }
      styles={{
        input: {
          borderColor: isError ? theme.colors.red[2] : undefined,
          color: isError ? theme.colors.red[2] : undefined,
          borderRadius: theme.radius.md,
        },
        dropdown: {
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.dark ? theme.colors.dark[8] : theme.white,
          boxShadow: theme.shadows.md,
        },
        item: {
          borderRadius: theme.radius.sm,
          padding: '8px 12px',
          '&[data-hovered]': {
            backgroundColor: theme.colors.red[0],
          },
        },
      }}
      value={selected ? selected.label : search}
      onChange={(val) => {
        setSearch(val);
        setSelected(null);
      }}
      data={data}
      limit={10}
      rightSection={
        isError ? (
          <IconAlertCircle size={18} color="var(--mantine-color-red-3)" />
        ) : isLoading ? (
          <Loader size="xs" color="red.3"/>
        ) : (
          <IconSearch size={18}  color="var(--mantine-color-red-3)"/>
        )
      }
      onOptionSubmit={(val) => {
        const selectedOption = data.find((d) => d.value === val);
        if (selectedOption) {
          setSelected(selectedOption);
          router.push(`/maps/${selectedOption.value}`);
        }
      }}
      renderOption={({ option }) => {
        const map = option.map;
        return (
          <Group gap="xs" align="flex-start" wrap="nowrap">
            <div style={{ flex: 1 }}>
              <Text fw={700} size="sm">
                {map.infoName}
              </Text>
              <Group gap={8} mt={2}>
                <Group gap={4}>
                  <IconFlag size={12} />
                  <Text size="xs">{raceTypeNames[map.raceType] || raceTypeNames["RANDOM"]}</Text>
                </Group>
                <Group gap={4}>
                  <IconUser size={12} />
                  <Text size="xs">{map.author}</Text>
                </Group>
                <Group gap={4}>
                  <IconRefresh size={12} />
                  <Text size="xs">{map.playedCount}</Text>
                </Group>
                {map.lastTimePlayed && (
                  <Group gap={4}>
                    <IconClock size={12} />
                    <Text size="xs">{dayjs(map.lastTimePlayed).fromNow()}</Text>
                  </Group>
                )}
              </Group>
            </div>
          </Group>
        );
      }}
    />
  );
};

export default SearchMap;
