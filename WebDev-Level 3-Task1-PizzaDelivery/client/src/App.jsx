import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import Dashboard from './pages/user/Dashboard';
import PizzaBuilder from './pages/user/PizzaBuilder';
import OrderSummary from './pages/user/OrderSummary';
import OrderTracking from './pages/user/OrderTracking';
import OrderSuccess from './pages/user/OrderSuccess';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import AdminDashboard from './pages/admin/AdminDashboard';
import InventoryManagement from './pages/admin/InventoryManagement';
import OrderManagement from './pages/admin/OrderManagement';
import AdminManagement from './pages/admin/AdminManagement';
import AdminLayout from './components/layouts/AdminLayout';
import { AdminRoute, AuthProvider, ProtectedRoute } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ThemeToggle from './components/ThemeToggle';


const UserOnly = ({ children }) => <ProtectedRoute><div className="dashboard-theme">{children}<ThemeToggle /></div></ProtectedRoute>;
const AdminOnly = ({ children }) => <AdminRoute><div className="dashboard-theme">{children}<ThemeToggle /></div></AdminRoute>;
export default function App() { return <Router><AuthProvider><CartProvider><Toaster position="top-right"/><Routes><Route path="/" element={<Home/>}/><Route path="/register" element={<Register/>}/><Route path="/login" element={<Login/>}/><Route path="/forgot-password" element={<ForgotPassword/>}/><Route path="/reset-password/:token" element={<ResetPassword/>}/><Route path="/verify-email/:token" element={<VerifyEmail/>}/><Route path="/dashboard" element={<UserOnly><Dashboard/></UserOnly>}/><Route path="/build-pizza" element={<UserOnly><PizzaBuilder/></UserOnly>}/><Route path="/order-summary" element={<UserOnly><OrderSummary/></UserOnly>}/><Route path="/orders/:orderId" element={<UserOnly><OrderTracking/></UserOnly>}/><Route path="/orders/success/:orderId" element={<UserOnly><OrderSuccess/></UserOnly>}/><Route path="/builder" element={<Navigate to="/build-pizza" replace/>}/><Route path="/summary" element={<Navigate to="/order-summary" replace/>}/><Route path="/tracking/:orderId" element={<Navigate to="/orders/:orderId" replace/>}/><Route path="/admin/register" element={<AdminRegister/>}/><Route path="/admin/login" element={<AdminLogin/>}/><Route path="/admin" element={<AdminOnly><AdminLayout/></AdminOnly>}><Route index element={<Navigate to="dashboard" replace/>}/><Route path="dashboard" element={<AdminDashboard/>}/><Route path="inventory" element={<InventoryManagement/>}/><Route path="orders" element={<OrderManagement/>}/><Route path="admins" element={<AdminManagement/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes></CartProvider></AuthProvider></Router>; }
