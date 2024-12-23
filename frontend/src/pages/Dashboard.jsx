import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';

function Dashboard() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-black to-gray-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;