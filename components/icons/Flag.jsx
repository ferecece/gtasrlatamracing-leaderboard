import Flag from 'react-world-flags';

const CountryFlag = ({ countryCode, width = 18, height = 12 }) => (
  <div style={{ display: 'inline-block', marginRight: '5px' }}>
    <Flag code={countryCode.toUpperCase()} style={{ width, height, borderRadius: '2px' }} />
  </div>
);

export default CountryFlag;
