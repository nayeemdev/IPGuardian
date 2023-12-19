import AppLayout from "components/Layouts/AppLayout";

const Dashboard = () => {
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <div className="py-12">
        <h1>Dashboard</h1>
      </div>
    </AppLayout>
  );
};

export default Dashboard;