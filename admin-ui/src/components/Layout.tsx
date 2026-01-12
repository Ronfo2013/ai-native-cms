import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import {
  LayoutDashboard,
  FileText,
  File,
  Users,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react';

export function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold">AI CMS</h1>
          </div>

          <nav className="space-y-2">
            <NavLink to="/" icon={<LayoutDashboard size={20} />}>
              Dashboard
            </NavLink>
            <NavLink to="/posts" icon={<FileText size={20} />}>
              Posts
            </NavLink>
            <NavLink to="/pages" icon={<File size={20} />}>
              Pages
            </NavLink>
            <NavLink to="/users" icon={<Users size={20} />}>
              Users
            </NavLink>
            <NavLink to="/settings" icon={<Settings size={20} />}>
              Settings
            </NavLink>
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{user?.username}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

function NavLink({
  to,
  icon,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
