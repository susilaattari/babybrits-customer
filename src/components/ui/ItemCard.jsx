import { useNavigate } from 'react-router-dom';
import { formatRupiah, statusKatalog, gambarEmoji } from '../../data/dummy';

const colorMap = {
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  amber:   'bg-amber-50 text-amber-600 border-amber-200',
  violet:  'bg-violet-50 text-violet-600 border-violet-200',
  gray:    'bg-gray-50 text-gray-500 border-gray-200',
};

export default function ItemCard({ item }) {
  const navigate = useNavigate();
  const status = statusKatalog[item.status] || { label: item.status, color: 'gray' };
  const colorClass = colorMap[status.color] || colorMap.gray;
  const isAvailable = item.status === 'available';

  return (
    <div
      id={`item-card-${item.sku}`}
      onClick={() => isAvailable && navigate(`/barang/${item.sku}`)}
      className={`card p-0 overflow-hidden transition-all duration-200 
        ${isAvailable ? 'hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]' : 'opacity-75 cursor-default'}`}
    >
      {/* Gambar/Emoji Placeholder */}
      <div className="relative h-36 bg-gradient-to-br from-pink-50 to-teal-50 flex items-center justify-center overflow-hidden">
        <span className="text-6xl select-none filter drop-shadow-sm">
          {gambarEmoji[item.gambarPlaceholder] || '📦'}
        </span>
        {/* Badge Status */}
        <div className={`absolute top-2.5 right-2.5 badge-status border text-[10px] ${colorClass}`}>
          <span className={`w-1.5 h-1.5 rounded-full inline-block ${
            item.status === 'available' ? 'bg-emerald-500' :
            item.status === 'rented' ? 'bg-amber-500' :
            'bg-violet-500'
          }`} />
          {status.label}
        </div>
        {/* Overlay jika tidak tersedia */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <p className="text-xs font-bold text-ink-500 bg-white/80 px-3 py-1 rounded-full border">
              {status.label}
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5">
        <p className="text-[10px] text-pink-400 font-semibold uppercase tracking-wider mb-0.5">{item.kategori}</p>
        <h3 className="text-sm font-bold text-ink-900 leading-snug mb-2">{item.nama}</h3>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-ink-300 mb-0.5">Mulai dari</p>
            <p className="text-base font-extrabold text-pink-500">{formatRupiah(item.harga2Mggu)}</p>
            <p className="text-[10px] text-ink-400">/ 2 minggu</p>
          </div>
          {isAvailable && (
            <div className="bg-pink-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-xl shadow-sm shadow-pink-500/30">
              Pesan →
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
