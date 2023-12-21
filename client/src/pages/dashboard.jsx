import AppLayout from "components/Layouts/AppLayout";
import { DashboardService } from "../services/DashboardService";
import { NavLink } from "react-router-dom";
import useSWR from "swr";
import Loader from "../components/Common/Loader";

const Dashboard = () => {
  const { data: dashboardData, error } = useSWR(
    "/dashboard",
    DashboardService.get
  );
  
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <div className="py-12">
        {error && (
          <div className="flex justify-center items-center h-screen">
            <div>Error loading dashboard data</div>
          </div>
        )}
        {!dashboardData && (
          <Loader />
        )}
        {dashboardData && (
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-center gap-4">
            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-4">
              <h1 className="text-3xl">Welcome back!</h1>
              <p className="text-lg mb-2">
                You have {dashboardData.data.data.ip_count} IP listed.
              </p>
              <NavLink
                className="hover:text-gray-200 bg-black text-white px-4 me-2 py-2 rounded-md mt-4"
                to="/ip-addresses"
              >
                See list
              </NavLink>
              <NavLink
                className="hover:text-gray-200 bg-black text-white px-4 py-2 rounded-md mt-4"
                to="/ip-addresses/create"
              >
                Create new
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
