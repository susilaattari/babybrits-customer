import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, ChevronRight, Star } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { katalogBarang, formatRupiah, gambarEmoji } from '../data/dummy';

export default function DetailBarang() {
  const { sku } = useParams();
  const navigate = useNavigate();
  const item = katalogBarang.find(i => i.sku === sku);
  const [durasi, setDurasi] = useState('2_minggu');

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <p className="text-4xl">😕</p>
        <p className="text-sm text-ink-500">Barang tidak ditemukan</p>
        <button onClick={() => navigate('/')} className="text-pink-500 font-semibold text-sm">← Kembali ke Katalog</button>
      </div>
    );
  }

  const hargaDipilih = durasi === '2_minggu' ? item.harga2Mggu : item.harga1Bln;
  const labelDurasi = durasi === '2_minggu' ? '2 Minggu' : '1 Bulan';

  const handlePesan = () => {
    navigate('/booking/registrasi', {
      state: { item, durasi, harga: hargaDipilih, labelDurasi }
    });
  };

  return (
    <div className="animate-fade-in pb-48">
      <Navbar title={item.nama} showBack />

      {/* Hero Gambar */}
      <div className="relative h-52 bg-gradient-to-br from-pink-50 via-cream-100 to-teal-50 flex items-center justify-center overflow-hidden">
        <div className="absolute -left-12 -bottom-8 w-40 h-40 rounded-full bg-pink-100/50" />
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-teal-100/50" />
        <span className="text-9xl relative filter drop-shadow-md select-none">
          {gambarEmoji[item.gambarPlaceholder] || '📦'}
        </span>
        {/* Badge kondisi */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="text-[10px] font-bold bg-white/90 text-ink-700 px-2 py-1 rounded-full border border-cream-200 shadow-sm">
            {item.kondisi}
          </span>
          <span className="text-[10px] font-bold bg-white/90 text-ink-700 px-2 py-1 rounded-full border border-cream-200 shadow-sm">
            Sejak {item.tahun}
          </span>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Info Barang */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
              {item.kategori}
            </span>
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
              <span className="text-[10px] text-ink-400 ml-1">(Barang Terpilih)</span>
            </div>
          </div>
          <h1 className="text-xl font-extrabold text-ink-900 leading-tight">{item.nama}</h1>
          <p className="text-xs text-ink-400 mt-1 leading-relaxed">{item.deskripsi}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-cream-200" />

        {/* Pilih Durasi */}
        <div>
          <p className="text-sm font-bold text-ink-900 mb-3">Pilih Durasi Sewa</p>
          <div className="grid grid-cols-2 gap-3">
            {/* 2 Minggu */}
            <button
              id="durasi-2minggu"
              onClick={() => setDurasi('2_minggu')}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.97] ${
                durasi === '2_minggu'
                  ? 'border-pink-500 bg-pink-50 shadow-md shadow-pink-500/20'
                  : 'border-cream-200 bg-white hover:border-pink-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs font-bold mb-1 ${durasi === '2_minggu' ? 'text-pink-500' : 'text-ink-500'}`}>2 Minggu</p>
                  <p className={`text-xl font-extrabold ${durasi === '2_minggu' ? 'text-pink-600' : 'text-ink-900'}`}>
                    {formatRupiah(item.harga2Mggu)}
                  </p>
                  <p className="text-[10px] text-ink-400 mt-0.5">14 hari sewa</p>
                </div>
                {durasi === '2_minggu' && (
                  <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </button>

            {/* 1 Bulan */}
            <button
              id="durasi-1bulan"
              onClick={() => setDurasi('1_bulan')}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.97] relative overflow-hidden ${
                durasi === '1_bulan'
                  ? 'border-pink-500 bg-pink-50 shadow-md shadow-pink-500/20'
                  : 'border-cream-200 bg-white hover:border-pink-300'
              }`}
            >
              {/* Best Value Badge */}
              <div className="absolute -top-0 -right-0 bg-teal-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl-lg">
                HEMAT
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs font-bold mb-1 ${durasi === '1_bulan' ? 'text-pink-500' : 'text-ink-500'}`}>1 Bulan</p>
                  <p className={`text-xl font-extrabold ${durasi === '1_bulan' ? 'text-pink-600' : 'text-ink-900'}`}>
                    {formatRupiah(item.harga1Bln)}
                  </p>
                  <p className="text-[10px] text-ink-400 mt-0.5">30 hari sewa</p>
                </div>
                {durasi === '1_bulan' && (
                  <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Fitur */}
        <div>
          <p className="text-sm font-bold text-ink-900 mb-2">Spesifikasi & Fitur</p>
          <div className="grid grid-cols-2 gap-2">
            {item.fitur.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-ink-600">
                <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-emerald-600" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Info Deposit */}
        <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-teal-700">+ Deposit Jaminan Rp 100.000</p>
            <p className="text-[10px] text-teal-600 mt-0.5">
              Dikembalikan maksimal H+3 setelah barang kembali & berstatus normal. Bukan biaya sewa.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-white border-t border-cream-200 p-4 shadow-bottom-nav">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] text-ink-400">Total yang dibayar</p>
            <p className="text-xl font-extrabold text-ink-900">
              {formatRupiah(hargaDipilih + 100000)}
            </p>
            <p className="text-[10px] text-ink-400">(Sewa {labelDurasi} + Deposit Rp 100.000)</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-ink-400">Sewa</p>
            <p className="text-base font-bold text-pink-500">{labelDurasi}</p>
          </div>
        </div>
        <button id="btn-pesan-sekarang" onClick={handlePesan} className="btn-brand">
          Pesan Sekarang <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
