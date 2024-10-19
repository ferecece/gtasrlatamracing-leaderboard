import AsyncSelect from 'react-select/async';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const SearchMap = () => {
  const [selectedMap, setSelectedMap] = useState(null);
  const router = useRouter();
  const { data: allMaps, error, isLoading } = useSWR('/api/maps', fetcher);

  const filterMaps = (inputValue) => {
    if (!inputValue) return allMaps || [];
    return allMaps?.filter((map) =>
      map.infoName.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    const filteredMaps = filterMaps(inputValue);
    callback(filteredMaps);
  };

  const onMapSelect = (map) => {
    setSelectedMap(map?.resName);
    if (map) router.push(`/maps/${map.resName}`);
  };

  const usePrefersDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    useEffect(() => {
      const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(matchMedia.matches);
  
      const handleChange = (e) => setIsDarkMode(e.matches);
      matchMedia.addEventListener('change', handleChange);
  
      return () => matchMedia.removeEventListener('change', handleChange);
    }, []);
  
    return isDarkMode;
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#fbba72' : '#fafafa',
      borderColor: state.isFocused ? '#ffba08' : '#9A031E',
      color: state.isFocused ? 'black' : '#141414',
      borderRadius: '8px',
      boxShadow: state.isFocused ? '0 0 5px rgba(255, 186, 8, 0.5)' : 'none',
      transition: 'border-color 0.2s, background-color 0.2s',
    }),
    input: (base) => ({
      ...base,
      color: '#141414',
      '::placeholder': {
        color: '#a29c9b',
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#fafafa',
      borderRadius: '8px',
      marginTop: '5px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? '#9A031E'
        : isFocused
        ? '#fbba72'
        : '#ffffff',
      color: isSelected || isFocused ? 'white' : '#141414',
      cursor: 'pointer',
    }),
  };
  
  const darkModeStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#333' : '#141414',
      borderColor: state.isFocused ? '#ffba08' : '#9A031E',
      color: 'white',
    }),
    input: (base) => ({
      ...base,
      color: 'white',
      '::placeholder': {
        color: '#a29c9b',
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#141414',
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? '#9A031E' : isFocused ? '#444' : '#141414',
      color: 'white',
    }),
  };


  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        getOptionLabel={(option) => option.infoName}
        getOptionValue={(option) => option.resName}
        onChange={onMapSelect}
        value={selectedMap}
        placeholder={error ? 'Error al cargar' : isLoading ? 'Cargando...' : 'Buscar mapa...'}
        isClearable
        classNamePrefix="react-select"
        styles={usePrefersDarkMode() ? darkModeStyles : customStyles}
        noOptionsMessage={() => 'No hay mapas disponibles'}
      />
    </div>
  );
};

export default SearchMap;
