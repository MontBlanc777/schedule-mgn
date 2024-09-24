import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
      <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          style={{
            fontWeight: currentPage === page ? 'bold' : 'normal',
            backgroundColor: currentPage === page ? '#ddd' : 'white'
          }}
        >
          {page}
        </button>
      ))}
      <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
