import React from "react";

function Pagination({ page, onPageChange, total, limit }) {
  const totalPages = Math.ceil(total / limit);

  const handlePrevClick = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex w-full justify-between mx-auto mt-8">
      <button
        onClick={handlePrevClick}
        className={`flex items-center justify-center px-4 h-10 text-base font-medium ${
          page === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        } bg-white border border-gray-300 rounded-lg`}
        disabled={page === 1}
      >
        Previous
      </button>

      <button
        onClick={handleNextClick}
        className={`flex items-center justify-center px-4 h-10 ms-3 text-base font-medium ${
          page >= totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        } bg-white border border-gray-300 rounded-lg`}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
