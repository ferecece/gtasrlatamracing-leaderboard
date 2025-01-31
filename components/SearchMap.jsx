import AsyncSelect from "react-select/async";
import { useRouter } from "next/router";
import useMaps from "hooks/useMaps";


const SearchMap = () => {
  const router = useRouter();
  const { maps, isError, isLoading } = useMaps();
  const isDarkMode = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const loadOptions = (inputValue, callback) => {
    callback(maps);
    console.log(inputValue);
    const filteredMaps = inputValue.trim().length > 0
      ? maps.filter((map) =>
          map.infoName.toLowerCase().includes(inputValue.trim().toLowerCase())
        )
      : maps;

    callback(filteredMaps);
  };
  const onMapSelect = (map) => {
    if (map?.resName) router.push(`/maps/${map.resName}`);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: isDarkMode
        ? state.isFocused
          ? "#333"
          : "#141414"
        : state.isFocused
        ? "#fbba72"
        : "#fafafa",
      borderColor: state.isFocused ? "#ffba08" : "#9A031E",
      color: isDarkMode ? "white" : "black",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 5px rgba(255, 186, 8, 0.5)" : "none",
      transition: "border-color 0.2s, background-color 0.2s",
    }),
    input: (base) => ({
      ...base,
      color: isDarkMode ? "white" : "#141414",
      "::placeholder": { color: "#a29c9b" },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#141414" : "#fafafa",
      borderRadius: "8px",
      marginTop: "5px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "#9A031E"
        : isFocused
        ? isDarkMode
          ? "#444"
          : "#fbba72"
        : isDarkMode
        ? "#141414"
        : "#ffffff",
      color: isSelected || isFocused ? "white" : "#141414",
      cursor: "pointer",
    }),
  };

  const darkModeStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#333" : "#141414",
      borderColor: state.isFocused ? "#ffba08" : "#9A031E",
      color: "white",
    }),
    input: (base) => ({
      ...base,
      color: "white",
      "::placeholder": {
        color: "#a29c9b",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#141414",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#9A031E" : isFocused ? "#444" : "#141414",
      color: "white",
    }),
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      getOptionLabel={(option) => option.infoName}
      getOptionValue={(option) => option.resName}
      onChange={onMapSelect}
      placeholder={
        isError
          ? "Error al cargar"
          : isLoading
          ? "Cargando..."
          : "Buscar mapa..."
      }
      isClearable
      styles={isDarkMode ? darkModeStyles : customStyles}
      noOptionsMessage={() => "No hay mapas disponibles"}
    />
  );
};

export default SearchMap;
