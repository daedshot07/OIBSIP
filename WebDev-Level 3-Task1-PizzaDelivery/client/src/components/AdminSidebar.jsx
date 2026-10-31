import { NavLink } from 'react-router-dom';
import mainLogo from '../assets/logo.jpg';
import { LayoutDashboard, ListChecks, Package, Users, LogOut, X } from 'lucide-react';

const links = [{ to: '/admin/dashboard', label: 'Dashboard', Icon: LayoutDashboard }, { to: '/admin/inventory', label: 'Inventory', Icon: Package }, { to: '/admin/orders', label: 'Orders', Icon: ListChecks }, { to: '/admin/admins', label: 'Admins', Icon: Users }];

export default function AdminSidebar({ admin, open, onClose, onLogout }) {
  return <aside className={`ops-sidebar ${open ? 'is-open' : ''}`} aria-label="Admin navigation"><div className="ops-brand-row"><div className="ops-brand flex items-center gap-2"><img src={mainLogo} alt="PizzaDev Logo" className="h-8 w-auto rounded object-contain max-h-[32px] " /></div><button className="ops-close" onClick={onClose} aria-label="Close navigation"><X size={18} /></button></div><nav className="ops-nav">{links.map(({ to, label, Icon }) => <NavLink key={to} to={to} onClick={onClose}>{({ isActive }) => <><Icon size={16} />{label}{isActive && <span className="ops-nav__active" />}</>}</NavLink>)}</nav><div className="ops-profile"><div className="ops-profile__avatar">{(admin?.name || admin?.email || 'A').slice(0, 1).toUpperCase()}</div><div><strong>{admin?.name || 'Administrator'}</strong><small>{admin?.email || 'Admin account'}</small></div></div><button className="ops-logout" onClick={onLogout}><LogOut size={16} />Logout</button></aside>;
}
