import { Menu, LogOut } from 'lucide-react';

export default function AdminHeader({ title = 'Operations workspace', admin, onMenu, onLogout }) {
  return <header className="ops-header"><button className="ops-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button><div><span className="ops-header__eyebrow">Pizza Delivery Admin</span><strong>{title}</strong></div><div className="ops-header__account"><span>{admin?.name || admin?.email || 'Administrator'}</span><button onClick={onLogout} aria-label="Logout"><LogOut size={16} /></button></div></header>;
}
