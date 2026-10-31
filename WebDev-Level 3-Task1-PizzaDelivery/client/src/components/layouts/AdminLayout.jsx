import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AdminSidebar from '../AdminSidebar';
import AdminHeader from '../AdminHeader';
import '../../styles/admin.css';

const titles = {
  '/admin/dashboard': 'Dashboard',
  '/admin/inventory': 'Inventory',
  '/admin/orders': 'Orders',
  '/admin/admins': 'Admins',
};

export default function AdminLayout() {
  const { currentAdmin, logoutAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const logout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="ops-shell">
      <AdminSidebar
        admin={currentAdmin}
        open={open}
        onClose={() => setOpen(false)}
        onLogout={logout}
      />
      <main className="ops-content">
        <AdminHeader
          title={titles[location.pathname] || 'Operations'}
          admin={currentAdmin}
          onMenu={() => setOpen(true)}
          onLogout={logout}
        />
        <Outlet />
      </main>
    </div>
  );
}
