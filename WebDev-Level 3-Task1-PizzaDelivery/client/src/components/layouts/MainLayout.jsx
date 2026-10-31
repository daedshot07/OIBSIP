import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function MainLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
            🍕 PizzaDev
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/builder" className="text-secondary hover:text-primary transition font-medium">Build Pizza</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-secondary hover:text-primary transition font-medium">Dashboard</Link>
                <div className="flex items-center gap-4">
                  <span className="text-text-light text-sm">Hi, {user.name}</span>
                  <button onClick={handleLogout} className="text-red-500 hover:text-red-700 transition font-medium">Logout</button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-secondary hover:text-primary transition font-medium">Login</Link>
                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded font-medium hover:bg-primary-dark transition">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} PizzaDev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
