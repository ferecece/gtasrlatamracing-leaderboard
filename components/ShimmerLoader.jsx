import React from 'react';
import styles from '@styles/ShimmerLoader.module.css';

const ShimmerLoader = ({ rows = 5, columns = 5 }) => {
  const shimmerRows = Array.from({ length: rows });
  const shimmerColumns = Array.from({ length: columns }); 

  return (
    <>
      {shimmerRows.map((_, rowIndex) => (
        <tr key={rowIndex}>
          {shimmerColumns.map((_, colIndex) => (
            <td key={colIndex}>
              <div className={styles.shimmer} style={{ width: '100%' }}></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default ShimmerLoader;