import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, MessageCircle, Clock, ChevronRight, Share2, Copy } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { formatRupiah, ADMIN_WA, gambarEmoji } from '../data/dummy';

export default function KonfirmasiBooking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const item = state?.item || { nama: 'Baby Bouncer Ingenuity', sku: 'BB-BCR-001', gambarPlaceholder: 'bouncer', kategori: 'Bouncer' };
  const labelDurasi = state?.labelDurasi || '2 Minggu';
  const harga = state?.harga || 75000;
  const nama = state?.nama || 'Pelanggan';

  // Generate nomor booking dummy
  const noBooking = 'BK-202609-019';

  const pesanWA = encodeURIComponent(
    `Halo Admin Babybrits Cilegon 👋\n\nSaya ingin konfirmasi sewa untuk:\n📋 Kode Booking: *${noBooking}*\n👤 Atas nama: *${nama}*\n📦 Barang: *${item.nama}*\n⏱ Durasi: *${labelDurasi}*\n\nMohon konfirmasinya ya. Terima kasih! 🙏`
  );
  const linkWA = `https://wa.me/${ADMIN_WA}?text=${pesanWA}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(noBooking).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in pb-8">
      <Navbar title="Booking Berhasil" showBack />

      {/* Sukses Hero */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 pt-8 pb-6 text-center">
        <div className="animate-bounce-in inline-block mb-4">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
        </div>
        <h1 className="text-xl font-extrabold text-ink-900 mb-1">Booking Dibuat! 🎉</h1>
        <p className="text-sm text-ink-500">
          Hei <strong>{nama}</strong>, booking Anda sudah tercatat. Segera klaim via WhatsApp!
        </p>
      </div>

      <div className="px-4 pt-2 space-y-4">
        {/* Nomor Booking */}
        <div className="card p-5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 to-teal-50/80" />
          <div className="relative">
            <p className="text-xs text-ink-500 font-medium mb-2">Nomor Booking Anda</p>
            <div className="flex items-center justify-center gap-3 mb-1">
              <p className="text-3xl font-extrabold gradient-text tracking-wider">{noBooking}</p>
            </div>
            <button
              id="btn-copy-booking"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 mx-auto text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                copied ? 'bg-emerald-100 text-emerald-600' : 'bg-cream-100 text-ink-500 hover:bg-cream-200'
              }`}
            >
              {copied ? <><CheckCircle className="w-3 h-3" /> Disalin!</> : <><Copy className="w-3 h-3" /> Salin kode</>}
            </button>
          </div>
        </div>

        {/* Ringkasan Pesanan */}
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-50 to-teal-50 flex items-center justify-center text-2xl flex-shrink-0">
              {gambarEmoji[item.gambarPlaceholder] || '📦'}
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-pink-400 font-semibold">{item.kategori}</p>
              <p className="text-sm font-bold text-ink-900">{item.nama}</p>
              <p className="text-xs text-ink-400">Durasi: {labelDurasi} · {formatRupiah(harga + 100000)}</p>
            </div>
          </div>
        </div>

        {/* Peringatan 24 Jam */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-800 mb-1">⚠️ Penting! Hangus dalam 24 Jam</p>
              <p className="text-[11px] text-amber-700 leading-relaxed">
                Booking ini akan <strong>otomatis hangus</strong> jika belum dikonfirmasi via WhatsApp
                dalam <strong>24 jam</strong> sejak dibuat. Segera klaim sekarang!
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="flex-1 bg-amber-200 rounded-full h-1.5">
                  <div className="bg-amber-500 h-full rounded-full w-full animate-pulse-slow" />
                </div>
                <span className="text-[10px] text-amber-700 font-bold flex-shrink-0">24:00:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Utama WA */}
        <a href={linkWA} target="_blank" rel="noreferrer" id="btn-klaim-wa">
          <div className="btn-wa">
            <MessageCircle className="w-5 h-5" />
            <span>Klaim Booking via WhatsApp</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </div>
        </a>

        {/* Pesan WA Preview */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
          <p className="text-[10px] font-bold text-emerald-700 mb-2 uppercase tracking-wider">Preview Pesan WA</p>
          <div className="bg-white rounded-xl p-3 border border-emerald-100 text-[11px] text-ink-700 leading-relaxed whitespace-pre-line font-mono">
{`Halo Admin Babybrits Cilegon 👋

Saya ingin konfirmasi sewa untuk:
📋 Kode Booking: ${noBooking}
👤 Atas nama: ${nama}
📦 Barang: ${item.nama}
⏱ Durasi: ${labelDurasi}

Mohon konfirmasinya ya. Terima kasih! 🙏`}
          </div>
        </div>

        {/* Langkah Selanjutnya */}
        <div className="card p-4 space-y-3">
          <p className="text-xs font-bold text-ink-700 uppercase tracking-wider">Apa yang terjadi selanjutnya?</p>
          {[
            { num: '1', text: 'Kirim pesan WA ke Admin Babybrits dengan kode booking Anda', color: 'bg-pink-100 text-pink-600' },
            { num: '2', text: 'Admin memverifikasi data & dokumen identitas Anda', color: 'bg-teal-100 text-teal-600' },
            { num: '3', text: 'Admin mengkonfirmasi booking dan memberi info pengiriman/pickup', color: 'bg-emerald-100 text-emerald-600' },
            { num: '4', text: 'Bayar sewa + deposit saat barang diserahkan', color: 'bg-amber-100 text-amber-600' },
          ].map(({ num, text, color }) => (
            <div key={num} className="flex items-start gap-3">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${color}`}>{num}</span>
              <p className="text-xs text-ink-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Status */}
        <button
          id="btn-lihat-status"
          onClick={() => navigate('/sewa')}
          className="btn-outline"
        >
          Lihat Status Sewa Saya
        </button>
      </div>
    </div>
  );
}
