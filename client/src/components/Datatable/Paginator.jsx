import { useEffect, useState } from "react";

const OFFSET = 4;

const Paginator = ({ pagination, pageChanged }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const setPaginationPages = () => {
      let pages = [];
      const { last_page, current_page, to } = pagination;
      if (!to) return [];
      let fromPage = current_page - OFFSET;
      if (fromPage < 1) fromPage = 1;
      let toPage = fromPage + OFFSET * 2;
      if (toPage >= last_page) {
        toPage = last_page;
      }
      for (let page = fromPage; page <= toPage; page++) {
        pages.push(page);
      }
      setPageNumbers(pages);
    };

    setPaginationPages();
  }, [pagination]);

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing {pagination.from} - {pagination.to} of {pagination.total}{" "}
          entries
        </p>
      </div>
      <div className="flex justify-between items-center space-x-2">
        <button
          onClick={() => pageChanged(1)}
          disabled={pagination.current_page === 1}
          className="px-2 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-500 focus:outline-none focus:bg-gray-200"
        >
          First
        </button>
        <button
          onClick={() => pageChanged(pagination.current_page - 1)}
          disabled={pagination.current_page === 1}
          className="px-2 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-500 focus:outline-none focus:bg-gray-200"
        >
          Previous
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => pageChanged(pageNumber)}
            className={`px-2 py-1 text-sm font-medium rounded-md focus:outline-none hidden sm:block ${
              pageNumber === pagination.current_page
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => pageChanged(pagination.current_page + 1)}
          disabled={pagination.current_page === pagination.last_page}
          className="px-2 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-500 focus:outline-none focus:bg-gray-200"
        >
          Next
        </button>
        <button
          onClick={() => pageChanged(pagination.last_page)}
          disabled={pagination.current_page === pagination.last_page}
          className="px-2 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-500 focus:outline-none focus:bg-gray-200"
        >
          Last
        </button>
      </div>
    </nav>
  );
};

export default Paginator;
