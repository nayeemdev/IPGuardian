import AppLayout from "components/Layouts/AppLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IpAddressService } from "services/IpAddressService";

const IpAddressShow = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    LoadDetails();
  }, []);

  const LoadDetails = async () => {
    setLoading(true);
    const response = await IpAddressService.get(params.id);
    setData(response.data.data);
    setLoading(false);
  };

  return (
    <AppLayout
      header={
        <>
          <div className="flex justify-between">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
              IP Address Show
            </h2>
            <a
              href="/ip-addresses"
              className="px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase"
            >
              {" "}
              Back to list{" "}
            </a>
          </div>
        </>
      }
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center pt-6 sm:pt-0">
          <div className="w-full sm:max-w-md mt-6 px-6 py-6 bg-white shadow overflow-hidden sm:rounded-lg">
            {loading && <p>Loading...</p>}
            {!loading && data && (
              <>
                <div className="py-3">
                  <span className="font-bold">IP:</span> {data.ip_address}
                </div>
                <div className="py-3">
                  <span className="font-bold">Label:</span> {data.label}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default IpAddressShow;
