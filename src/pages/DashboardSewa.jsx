import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, RotateCcw, MessageCircle, AlertTriangle, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { sewaDummy, formatRupiah, hitungHariSisa, gambarEmoji, ADMIN_WA } from '../data/dummy';

function CountdownBadge({ hariSisa }) {
  if (hariSisa < 0) return (
    <div className="flex items-center gap-1 px-2.5 py-1 bg-red-100 rounded-full">
      <AlertTriangle className="w-3 h-3 text-red-500" />
      <span className="text-[10px] font-bold text-red-600">{Math.abs(hariSisa)} hari terlambat!</span>
    </div>
  );
  if (hariSisa <= 3) return (
    <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 rounded-full animate-pulse-slow">
      <Clock className="w-3 h-3 text-amber-600" />
      <span className="text-[10px] font-bold text-amber-700">H-{hariSisa} · Segera habis!</span>
    </div>
  );
  return (
    <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-100 rounded-full">
      <CheckCircle className="w-3 h-3 text-emerald-600" />
      <span className="text-[10px] font-bold text-emerald-700">{hariSisa} hari lagi</span>
    </div>
  );
}

export default function DashboardSewa() {
  const navigate = useNavigate();
  const { member, aktif, riwayat } = sewaDummy;
  const [showPerpanjangId, setShowPerpanjangId] = useState(null);
  const [showKembalikanId, setShowKembalikanId] = useState(null);

  const buildWaLink = (sewa, aksi) => {
    const pesan = aksi === 'perpanjang'
      ? `Halo Admin Babybrits Cilegon 👋\n\nSaya ingin *perpanjang sewa*:\n📋 Booking: ${sewa.bookingId}\n👤 ${member.nama}\n📦 ${sewa.item.nama}\n⏱ Durasi tambahan: ...\n\nMohon konfirmasinya. Terima kasih! 🙏`
      : `Halo Admin Babybrits Cilegon 👋\n\nSaya ingin *mengembalikan barang*:\n📋 Booking: ${sewa.bookingId}\n👤 ${member.nama}\n📦 ${sewa.item.nama}\n📅 Tanggal jatuh tempo: ${sewa.tglJatuhTempo}\n\nMohon diatur jadwalnya. Terima kasih! 🙏`;
    return `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(pesan)}`;
  };

  return (
    <div className="animate-fade-in pb-28">
      <Navbar title="Sewa Saya" />

      {/* Info Member */}
      <div className="bg-gradient-brand px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs font-medium">Selamat datang kembali 👋</p>
            <p className="text-white font-extrabold text-base">{member.nama}</p>
            <p className="text-white/70 text-xs font-mono">{member.memberCode}</p>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-[10px]">Slot Aktif</p>
            <p className="text-white font-extrabold text-2xl">{member.slotAktif}<span className="text-white/60 text-sm font-normal">/3</span></p>
          </div>
        </div>
        {/* Slot bar */}
        <div className="flex gap-1.5 mt-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all ${i < member.slotAktif ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
        <p className="text-white/60 text-[10px] mt-1">{3 - member.slotAktif} slot tersisa untuk sewa baru</p>
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* Sewa Aktif */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-ink-900">Sewa Aktif</h2>
            <span className="text-[10px] bg-pink-100 text-pink-600 font-bold px-2.5 py-1 rounded-full">
              {aktif.length} aktif
            </span>
          </div>

          {aktif.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-sm font-semibold text-ink-700">Tidak ada sewa aktif</p>
              <p className="text-xs text-ink-400 mt-1 mb-4">Yuk sewa perlengkapan bayi favoritmu!</p>
              <button onClick={() => navigate('/')} className="btn-brand">
                Lihat Katalog <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            aktif.map((sewa) => {
              const hariSisa = hitungHariSisa(sewa.tglJatuhTempo);
              const totalHari = sewa.durasi === '1 Bulan' ? 30 : 14;
              const hariTerpakai = totalHari - hariSisa;
              const persen = Math.min(Math.max((hariTerpakai / totalHari) * 100, 0), 100);
              const isOverdue = hariSisa < 0;

              return (
                <div key={sewa.id} className={`card overflow-hidden ${isOverdue ? 'border-red-300' : ''}`}>
                  {/* Header */}
                  <div className={`px-4 py-3 flex items-center justify-between ${isOverdue ? 'bg-red-50' : 'bg-gradient-to-r from-pink-50 to-teal-50'}`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm">
                        {gambarEmoji[sewa.item.gambarPlaceholder] || '📦'}
                      </div>
                      <div>
                        <p className="text-[10px] text-pink-500 font-semibold">{sewa.item.kategori}</p>
                        <p className="text-sm font-bold text-ink-900">{sewa.item.nama}</p>
                        <p className="text-[10px] font-mono text-ink-400">{sewa.item.sku}</p>
                      </div>
                    </div>
                    <CountdownBadge hariSisa={hariSisa} />
                  </div>

                  {/* Detail */}
                  <div className="px-4 py-3 space-y-3">
                    {/* Tanggal */}
                    <div className="flex justify-between text-xs">
                      <div>
                        <p className="text-ink-400">Mulai</p>
                        <p className="font-semibold text-ink-900">{sewa.tglMulai}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-ink-400">Durasi</p>
                        <p className="font-bold text-pink-500">{sewa.durasi}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-ink-400">Jatuh Tempo</p>
                        <p className={`font-semibold ${isOverdue ? 'text-red-500' : 'text-ink-900'}`}>{sewa.tglJatuhTempo}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-[10px] text-ink-400 mb-1">
                        <span>Progres sewa</span>
                        <span>{Math.round(persen)}% terpakai</span>
                      </div>
                      <div className="bg-cream-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isOverdue ? 'bg-red-400' : persen >= 80 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                          style={{ width: `${persen}%` }}
                        />
                      </div>
                    </div>

                    {/* Info Terlambat */}
                    {isOverdue && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-bold text-red-700">Status: TERLAMBAT</p>
                          <p className="text-[10px] text-red-600 mt-0.5">
                            Denda: {formatRupiah(Math.abs(hariSisa) * sewa.dendaHarian)} ({Math.abs(hariSisa)} hari × {formatRupiah(sewa.dendaHarian)}/hari)
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Perpanjang Expandable */}
                    {showPerpanjangId === sewa.id && (
                      <div className="bg-pink-50 border border-pink-200 rounded-xl p-3 space-y-2 animate-fade-in">
                        <p className="text-xs font-bold text-pink-700">Pilih Durasi Perpanjangan</p>
                        <div className="grid grid-cols-2 gap-2">
                          {['2 Minggu', '1 Bulan'].map((d) => (
                            <a key={d} href={buildWaLink(sewa, 'perpanjang')} target="_blank" rel="noreferrer">
                              <div className="bg-white border-2 border-pink-300 rounded-xl p-3 text-center cursor-pointer hover:bg-pink-50 transition-colors active:scale-95">
                                <p className="text-xs font-bold text-pink-600">{d}</p>
                                <p className="text-[10px] text-ink-400 mt-0.5">Konfirmasi via WA</p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <button onClick={() => setShowPerpanjangId(null)} className="text-[10px] text-ink-400 w-full text-center">Batal</button>
                      </div>
                    )}

                    {/* Kembalikan Expandable */}
                    {showKembalikanId === sewa.id && (
                      <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 space-y-2 animate-fade-in">
                        <p className="text-xs font-bold text-teal-700">Konfirmasi Pengembalian</p>
                        <p className="text-[11px] text-teal-600">
                          Tim kami akan menghubungi Anda untuk mengatur jadwal pengambilan/pengembalian barang.
                        </p>
                        <a href={buildWaLink(sewa, 'kembalikan')} target="_blank" rel="noreferrer">
                          <div className="btn-wa text-xs py-2.5 rounded-xl">
                            <MessageCircle className="w-4 h-4" /> Jadwalkan Pengembalian via WA
                          </div>
                        </a>
                        <button onClick={() => setShowKembalikanId(null)} className="text-[10px] text-ink-400 w-full text-center">Batal</button>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {showPerpanjangId !== sewa.id && showKembalikanId !== sewa.id && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          id={`btn-perpanjang-${sewa.id}`}
                          onClick={() => setShowPerpanjangId(sewa.id)}
                          className="btn-small bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Perpanjang
                        </button>
                        <button
                          id={`btn-kembalikan-${sewa.id}`}
                          onClick={() => setShowKembalikanId(sewa.id)}
                          className="btn-small bg-teal-50 text-teal-600 border border-teal-200 hover:bg-teal-100"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Kembalikan
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Riwayat */}
        {riwayat.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-ink-900 mb-3">Riwayat Sewa</h2>
            <div className="space-y-2">
              {riwayat.map((sewa) => (
                <div key={sewa.id} className="card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
                    🛒
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink-900">{sewa.item.nama}</p>
                    <p className="text-[10px] text-ink-400">{sewa.durasi} · {sewa.tglMulai} – {sewa.tglJatuhTempo}</p>
                  </div>
                  <div className="text-right">
                    <span className="badge-status bg-emerald-100 text-emerald-600 text-[10px]">Selesai ✓</span>
                    <p className="text-xs font-bold text-ink-700 mt-1">{formatRupiah(sewa.hargaTotal)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tombol Sewa Baru */}
        <button onClick={() => navigate('/')} className="btn-brand">
          + Sewa Barang Baru <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
