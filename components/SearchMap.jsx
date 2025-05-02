import { useState } from "react";
import { Autocomplete, Loader, Group, Text, useMantineTheme } from "@mantine/core";
import { IconSearch, IconFlag, IconUser, IconClock, IconListNumbers } from "@tabler/icons-react";
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
        isError
          ? "Error al cargar"
          : isLoading
            ? "Cargando..."
            : "Buscar mapa..."
      }
      value={selected ? selected.label : search}
      onChange={(val) => {
        setSearch(val);
        setSelected(null);
      }}
      data={data}
      limit={10}
      rightSection={isLoading ? <Loader size="xs" /> : <IconSearch size={18} />}
      nothingFound="No hay mapas disponibles"
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
              <Text fw={500} size="sm">
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
                  <IconListNumbers size={12} />
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
