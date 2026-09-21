import { useState } from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import ItemCard from '../components/ui/ItemCard';
import { katalogBarang, KATEGORI } from '../data/dummy';

export default function Katalog() {
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [search, setSearch] = useState('');

  const filtered = katalogBarang.filter((item) => {
    const matchKat = filterKategori === 'Semua' || item.kategori === filterKategori;
    const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase()) ||
                        item.kategori.toLowerCase().includes(search.toLowerCase());
    return matchKat && matchSearch;
  });

  const tersedia = katalogBarang.filter(i => i.status === 'available').length;

  return (
    <div className="animate-fade-in">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative bg-gradient-brand px-4 pt-5 pb-8 overflow-hidden">
        {/* Lingkaran dekoratif */}
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute -right-2 top-8 w-20 h-20 rounded-full bg-white/10" />
        <div className="absolute -left-4 bottom-0 w-24 h-24 rounded-full bg-white/10" />
        <div className="relative">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-white/80" />
            <p className="text-white/80 text-xs font-medium">Rental #1 di Cilegon</p>
          </div>
          <h2 className="text-2xl font-extrabold text-white leading-tight mb-1">
            Branded, Safe<br />and Save 🍼
          </h2>
          <p className="text-white/80 text-xs leading-relaxed mb-4 max-w-xs">
            {tersedia} unit tersedia sekarang · Sewa 2 minggu atau 1 bulan · Deposit Rp 100.000
          </p>
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input
              id="katalog-search"
              type="text"
              placeholder="Cari stroller, bouncer, mainan..."
              className="w-full bg-white rounded-xl pl-10 pr-4 py-3 text-sm text-ink-900 placeholder-ink-300
                         focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filter Chip */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar -mt-0 border-b border-cream-100">
        {KATEGORI.map((k) => (
          <button
            key={k}
            id={`filter-${k}`}
            onClick={() => setFilterKategori(k)}
            className={`chip ${filterKategori === k ? 'chip-active' : 'chip-inactive'}`}
          >
            {k}
          </button>
        ))}
      </div>

      {/* Hasil & Grid */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-ink-400 font-medium">
            <span className="text-ink-900 font-bold">{filtered.length}</span> produk ditemukan
            {filterKategori !== 'Semua' && ` dalam "${filterKategori}"`}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-3">🔍</p>
            <p className="text-sm font-semibold text-ink-700">Produk tidak ditemukan</p>
            <p className="text-xs text-ink-300 mt-1">Coba kata kunci lain atau ubah filter kategori</p>
            <button onClick={() => { setSearch(''); setFilterKategori('Semua'); }}
              className="mt-4 text-sm text-pink-500 font-semibold underline">
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Info Deposit */}
      <div className="mx-4 mb-4 p-4 rounded-2xl bg-teal-50 border border-teal-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🛡️</span>
          <div>
            <p className="text-xs font-bold text-teal-700 mb-0.5">Deposit Jaminan Rp 100.000</p>
            <p className="text-xs text-teal-600 leading-relaxed">
              Dikembalikan maksimal H+3 setelah barang diperiksa & berstatus normal.
              Deposit bukan biaya sewa — uang Anda aman bersama kami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
