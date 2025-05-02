import { useState, useMemo } from "react";
import { Combobox, useCombobox, TextInput, Loader, Group, ActionIcon } from "@mantine/core";
import { useRouter } from "next/router";
import useMaps from "hooks/useMaps";
import { IconSearch } from "@tabler/icons-react";

const SearchMap = () => {
  const router = useRouter();
  const { maps, isError, isLoading } = useMaps();
  const [search, setSearch] = useState("");
  const combobox = useCombobox();

  const filteredMaps = useMemo(() => {
    if (!maps) return [];
    if (!search.trim()) return maps;
    return maps.filter((map) =>
      map.infoName.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [maps, search]);

  const handleSelect = (resName) => {
    if (resName) router.push(`/maps/${resName}`);
  };

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleSelect}
      withinPortal={false}
    >
      <Combobox.Target>
        <TextInput
          placeholder={
            isError
              ? "Error al cargar"
              : isLoading
              ? "Cargando..."
              : "Buscar mapa..."
          }
          value={search}
          onChange={(event) => {
            setSearch(event.currentTarget.value);
            combobox.openDropdown();
          }}
          rightSection={
            isLoading ? (
              <Loader size="xs" />
            ) : (
              <ActionIcon
                variant="subtle"
                aria-label="Buscar"
                onClick={() => {
                  if (filteredMaps.length > 0) {
                    router.push(`/maps/${filteredMaps[0].resName}`);
                  }
                }}
                disabled={filteredMaps.length === 0}
              >
                <IconSearch size={18} />
              </ActionIcon>
            )
          }
          disabled={isError}
          data-autofocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && filteredMaps.length > 0) {
              router.push(`/maps/${filteredMaps[0].resName}`);
            }
          }}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          {filteredMaps.length === 0 ? (
            <Combobox.Empty>No hay mapas disponibles</Combobox.Empty>
          ) : (
            filteredMaps.map((map) => (
              <Combobox.Option key={map.resName} value={map.resName}>
                <Group gap="xs">
                  <span>{map.infoName}</span>
                  <span style={{ color: "#888", fontSize: 12 }}>
                    ({map.resName})
                  </span>
                </Group>
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SearchMap;
