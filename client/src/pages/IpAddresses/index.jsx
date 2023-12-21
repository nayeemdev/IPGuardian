import AppLayout from "components/Layouts/AppLayout";
import DataTable from "components/Datatable/Datatable";
import SessionMessage from "components/Common/SessionMessage";
import { IpAddressService } from "../../services/IpAddressService";

const IpAddresses = () => {
  const getData = async (queryString) => {
    return IpAddressService.getAll(queryString);
  };

  return (
    <AppLayout
      header={
        <>
          <div className="flex justify-between">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
              IP Address List
            </h2>
            <a
              href="/ip-addresses/create"
              className="px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase"
            >
              {" "}
              Create New Record{" "}
            </a>
          </div>
        </>
      }
    >
      <div className="py-12 max-w-7xl mx-auto">
        <SessionMessage className="mb-4" status={status} />
        <DataTable
          fetchDataFromServer={getData}
          columns={["id", "ip_address", "label", "created_at"]}
          actions={["show", "edit"]}
          actionUrl="/ip-addresses"
        ></DataTable>
      </div>
    </AppLayout>
  );
};

export default IpAddresses;
