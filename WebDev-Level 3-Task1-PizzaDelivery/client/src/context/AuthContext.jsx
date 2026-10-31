/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { adminService } from '../services/adminService';

export const AuthContext = createContext(null);
const readJson = (key) => { try { return JSON.parse(localStorage.getItem(key) || sessionStorage.getItem(key) || 'null'); } catch { return null; } };

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => readJson('userInfo') || readJson('sessionUserInfo'));
  const [currentAdmin, setCurrentAdmin] = useState(() => readJson('adminInfo'));
  const [userToken, setUserToken] = useState(() => localStorage.getItem('userToken') || sessionStorage.getItem('userToken'));
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('adminToken'));
  const [loading] = useState(false);
  const loginUser = async (email, password, remember = false) => { const data = await authService.login({ email, password }); const storage = remember ? localStorage : sessionStorage; storage.setItem('sessionUserInfo', JSON.stringify(data.user || data)); if (data.token) { storage.setItem('userToken', data.token); setUserToken(data.token); } setCurrentUser(data.user || data); return data; };
  const register = (payload) => authService.register(payload);
  const loginAdmin = async (email, password) => { const data = await adminService.login({ email, password }); localStorage.setItem('adminInfo', JSON.stringify(data.admin || data)); if (data.token) { localStorage.setItem('adminToken', data.token); setAdminToken(data.token); } setCurrentAdmin(data.admin || data); return data; };
  const logoutUser = () => { ['userInfo', 'sessionUserInfo', 'userToken'].forEach((key) => { localStorage.removeItem(key); sessionStorage.removeItem(key); }); setCurrentUser(null); setUserToken(null); };
  const logoutAdmin = () => { localStorage.removeItem('adminInfo'); localStorage.removeItem('adminToken'); setCurrentAdmin(null); setAdminToken(null); };
  const value = useMemo(() => ({ currentUser, currentAdmin, userToken, adminToken, user: currentUser, admin: currentAdmin, loading, role: currentAdmin ? 'admin' : currentUser ? 'user' : null, isAuthenticated: Boolean(currentUser || currentAdmin), loginUser, loginAdmin, register, adminRegister: adminService.register, logoutUser, logoutAdmin, login: loginUser, adminLogin: loginAdmin, logout: logoutUser, adminLogout: logoutAdmin }), [currentUser, currentAdmin, userToken, adminToken, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function ProtectedRoute({ children }) { const { currentUser, loading } = useContext(AuthContext); if (loading) return <div className="route-loading">Loading your workspace…</div>; return currentUser ? children : <Navigate to="/login" replace />; }
export function AdminRoute({ children }) { const { currentAdmin, loading } = useContext(AuthContext); if (loading) return <div className="route-loading">Securing operations portal…</div>; return currentAdmin ? children : <Navigate to="/admin/login" replace />; }
