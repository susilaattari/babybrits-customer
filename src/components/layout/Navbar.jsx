import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Baby } from 'lucide-react';

export default function Navbar({ title, showBack = false, transparent = false }) {
  const navigate = useNavigate();

  return (
    <nav className={`navbar ${transparent ? 'bg-transparent border-transparent shadow-none' : ''}`}>
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            id="btn-navbar-back"
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-cream-100 text-ink-700 hover:bg-cream-200 transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-md shadow-pink-500/30">
            <Baby className="w-5 h-5 text-white" />
          </div>
        )}

        {title ? (
          <h1 className="text-base font-bold text-ink-900">{title}</h1>
        ) : (
          <div>
            <p className="text-sm font-extrabold gradient-text leading-none">Babybrits</p>
            <p className="text-[10px] text-ink-300 font-medium">Cilegon</p>
          </div>
        )}

        <div className="flex-1" />

        {!showBack && (
          <div className="text-right">
            <p className="text-[10px] text-ink-300 leading-none">Rental Bayi</p>
            <p className="text-[10px] font-semibold text-pink-500 leading-none">#1 di Cilegon</p>
          </div>
        )}
      </div>
    </nav>
  );
}
