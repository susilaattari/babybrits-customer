import { NavLink } from 'react-router-dom';
import { ShoppingBag, ClipboardList, CreditCard } from 'lucide-react';

const navItems = [
  { to: '/', icon: ShoppingBag, label: 'Katalog', end: true, id: 'bottom-nav-katalog' },
  { to: '/sewa', icon: ClipboardList, label: 'Sewa Saya', id: 'bottom-nav-sewa' },
  { to: '/member', icon: CreditCard, label: 'Member', id: 'bottom-nav-member' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <div className="flex">
        {navItems.map(({ to, icon: Icon, label, end, id }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            id={id}
            className={({ isActive }) =>
              `bottom-nav-item flex-1 ${isActive ? 'active' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`relative transition-all duration-200 ${isActive ? 'scale-110' : ''}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-pink-500' : 'text-ink-300'}`} />
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-pink-500" />
                  )}
                </div>
                <span className={`text-[10px] font-semibold ${isActive ? 'text-pink-500' : 'text-ink-300'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
