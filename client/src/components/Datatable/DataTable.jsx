import { useEffect, useState } from "react";
import Paginator from "./Paginator";
import Loader from "../Common/Loader";

const SORT_ASC = "asc";
const SORT_DESC = "desc";

const DataTable = ({
  columns,
  fetchDataFromServer,
  actions,
  actionUrl,
  handleDelete,
  reload,
  searchable = true,
}) => {
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleSort = (column) => {
    if (column === sortColumn) {
      sortOrder === SORT_ASC ? setSortOrder(SORT_DESC) : setSortOrder(SORT_ASC);
    } else {
      setSortColumn(column);
      setSortOrder(SORT_ASC);
    }
  };

  const handleSearch = (query) => {
    // wait for 500ms after user stops typing
    setTimeout(() => {
      setSearch(query);
      setCurrentPage(1);
      setSortOrder(SORT_ASC);
      setSortColumn(columns[0]);
    }, 500);
  };

  const handlePerPage = (perPage) => {
    setCurrentPage(1);
    setPerPage(perPage);
  };

  const loaderStyle = { width: "4rem", height: "4rem" };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = {
        search,
        order_by: sortColumn,
        order_direction: sortOrder,
        per_page: perPage,
        page: currentPage,
      };

      const queryString = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");

      const response = await fetchDataFromServer(queryString);
      const data = response.data.data;

      setData(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        from: data.from,
        to: data.to,
        total: data.total,
      });

      setLoading(false);
    };

    fetchData();
  }, [perPage, sortColumn, sortOrder, search, currentPage, reload]);

  return (
    <div className="container mx-auto my-4">
      <div className="flex items-center justify-between bg-white border-b mb-2 border-gray-200">
        {/* Search input starts */}
        <div>
        {searchable && (
          <input
            className="rounded py-2 px-3 border border-gray-200 focus:outline-none focus:border-gray-500"
            placeholder="Search..."
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
          />
        )}
        </div>
        {/* Search input ends */}

        {/* Per page select starts */}
        <div>
          <label className="mt-2 me-2 text-gray-700">Per page:</label>
          <select
            className="border-none"
            value={perPage}
            onChange={(e) => handlePerPage(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        {/* Per page select ends */}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white border">
          <thead className="bg-white text-dark">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  onClick={() => handleSort(column)}
                  className="cursor-pointer py-2 px-4 text-left border-b border-gray-200"
                >
                  {column.toUpperCase().replace("_", " ")}
                  {column === sortColumn && (
                    <span className="ms-1">
                      {sortOrder === SORT_ASC ? (
                        <span>&#9650;</span>
                      ) : (
                        <span>&#9660;</span>
                      )}
                    </span>
                  )}
                </th>
              ))}

              {/* if action column */}
              {actions && <th className="border-b border-gray-200">Action</th>}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={columns.length} className="py-4">
                  <div className="flex justify-center">
                    <Loader style={loaderStyle} />
                  </div>
                </td>
              </tr>
            )}

            {!loading && data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-4">
                  <div className="flex justify-center">No items found</div>
                </td>
              </tr>
            ) : (
              data.map((d, index) => (
                <tr key={index} className="even:bg-gray-100 hover:bg-gray-100">
                  {columns.map((column) => (
                    <td key={column} className="py-2 px-4">
                      {d[column]}
                    </td>
                  ))}

                  {/* if action column */}
                  {actions && (
                    <td>
                      {actions.map((action, index) => (
                        <>
                          {action === "show" && (
                            <a
                              key={index}
                              href={`${actionUrl}/${d.id}`}
                              className="me-2 text-green-700"
                            >
                              {" "}
                              🔍{" "}
                            </a>
                          )}

                          {action === "edit" && (
                            <a
                              key={index}
                              href={`${actionUrl}/${d.id}/edit`}
                              className="me-2 text-blue-700"
                            >
                              {" "}
                              ✏️{" "}
                            </a>
                          )}

                          {action === "delete" && (
                            <span
                              key={index}
                              className="me-2 cursor-pointer text-red-700"
                              onClick={() => handleDelete(d.id)}
                            >
                              {" "}
                              🗑️{" "}
                            </span>
                          )}
                        </>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {data.length > 0 && !loading && (
        <div className="mt-2">
          <Paginator
            pagination={pagination}
            pageChanged={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;
