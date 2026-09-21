import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Upload, MapPin, Phone, User, Home, Check, AlertCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import StepIndicator from '../components/ui/StepIndicator';
import { formatRupiah, gambarEmoji } from '../data/dummy';

const STEPS = ['Identitas', 'Dokumen', 'Konfirmasi'];

export default function Registrasi() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [uploadedKtp, setUploadedKtp] = useState(false);
  const [uploadedKK, setUploadedKK] = useState(false);
  const [setujuDeposit, setSetujuDeposit] = useState(false);
  const [form, setForm] = useState({
    nama: '', noWA: '', alamat: '', sosmed: '',
  });

  // Jika tidak ada data item dari navigasi, fallback dummy
  const item = state?.item || { nama: 'Baby Bouncer Ingenuity', sku: 'BB-BCR-001', gambarPlaceholder: 'bouncer', kategori: 'Bouncer' };
  const labelDurasi = state?.labelDurasi || '2 Minggu';
  const harga = state?.harga || 75000;

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      // Submit → Konfirmasi
      navigate('/booking/konfirmasi', {
        state: { item, labelDurasi, harga, nama: form.nama || 'Pelanggan Baru' }
      });
    }
  };

  const canNext = () => {
    if (step === 0) return form.nama.trim() && form.noWA.trim() && form.alamat.trim();
    if (step === 1) return uploadedKtp && uploadedKK;
    if (step === 2) return setujuDeposit;
    return false;
  };

  return (
    <div className="animate-fade-in pb-32">
      <Navbar title="Form Pemesanan" showBack />
      <StepIndicator steps={STEPS} current={step} />
      <div className="h-px bg-cream-200" />

      {/* Step 1 — Identitas */}
      {step === 0 && (
        <div className="px-4 py-5 space-y-4 animate-slide-up">
          <div>
            <h2 className="text-base font-bold text-ink-900">Data Diri Anda</h2>
            <p className="text-xs text-ink-400 mt-0.5">Isi dengan data sesuai KTP yang akan diunggah</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="label-field">Nama Lengkap (sesuai KTP) *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
                <input
                  id="input-nama"
                  className="input-field pl-10"
                  placeholder="Contoh: Dewi Lestari"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="label-field">Nomor WhatsApp Aktif *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
                <input
                  id="input-wa"
                  type="tel"
                  className="input-field pl-10"
                  placeholder="08123456789"
                  value={form.noWA}
                  onChange={(e) => setForm({ ...form, noWA: e.target.value })}
                />
              </div>
              <p className="text-[10px] text-ink-300 mt-1">
                Nomor ini akan digunakan untuk konfirmasi booking via WhatsApp
              </p>
            </div>

            <div>
              <label className="label-field">Alamat Lengkap *</label>
              <div className="relative">
                <Home className="absolute left-3 top-3.5 w-4 h-4 text-ink-300" />
                <textarea
                  id="input-alamat"
                  className="input-field pl-10 resize-none"
                  rows={3}
                  placeholder="Jl. Nama Jalan No. XX, Kelurahan, Kecamatan, Cilegon"
                  value={form.alamat}
                  onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="label-field">Instagram / TikTok / Facebook (opsional)</label>
              <input
                id="input-sosmed"
                className="input-field"
                placeholder="@username_anda"
                value={form.sosmed}
                onChange={(e) => setForm({ ...form, sosmed: e.target.value })}
              />
            </div>

            {/* Pinpoint Peta */}
            <div>
              <label className="label-field">Pinpoint Alamat di Peta (opsional tapi disarankan)</label>
              <div className="h-32 rounded-2xl bg-teal-50 border-2 border-dashed border-teal-300 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-teal-100 transition-colors">
                <MapPin className="w-6 h-6 text-teal-500" />
                <p className="text-xs font-semibold text-teal-600">Ketuk untuk pilih lokasi di peta</p>
                <p className="text-[10px] text-teal-400">Membantu tim kami menemukan alamat Anda</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 — Dokumen */}
      {step === 1 && (
        <div className="px-4 py-5 space-y-4 animate-slide-up">
          <div>
            <h2 className="text-base font-bold text-ink-900">Upload Dokumen Identitas</h2>
            <p className="text-xs text-ink-400 mt-0.5">Diperlukan untuk verifikasi keamanan. Data disimpan terenkripsi.</p>
          </div>

          {/* Info privasi */}
          <div className="flex items-start gap-2.5 p-3.5 bg-blue-50 rounded-xl border border-blue-200">
            <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-700 leading-relaxed">
              Dokumen Anda disimpan aman dan hanya dapat diakses admin Babybrits yang berwenang. Sesuai UU PDP.
            </p>
          </div>

          {/* Upload KTP */}
          <div>
            <label className="label-field">Foto KTP (Suami / Istri) *</label>
            <div
              id="upload-ktp"
              className={`upload-area transition-all ${uploadedKtp ? 'border-emerald-400 bg-emerald-50' : ''}`}
              onClick={() => setUploadedKtp(true)}
            >
              {uploadedKtp ? (
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                    <Check className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-xs font-bold text-emerald-600">KTP berhasil diunggah</p>
                  <p className="text-[10px] text-emerald-500 mt-0.5">ktp_example.jpg · 1.2 MB</p>
                  <button className="text-[10px] text-ink-400 underline mt-1" onClick={(e) => { e.stopPropagation(); setUploadedKtp(false); }}>Ganti foto</button>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-pink-400" />
                  <p className="text-xs font-semibold text-ink-600">Ketuk untuk pilih foto KTP</p>
                  <p className="text-[10px] text-ink-400">JPG, PNG, atau PDF · Maks. 5MB</p>
                </>
              )}
            </div>
          </div>

          {/* Upload KK */}
          <div>
            <label className="label-field">Foto Kartu Keluarga / ID Card Karyawan *</label>
            <div
              id="upload-kk"
              className={`upload-area transition-all ${uploadedKK ? 'border-emerald-400 bg-emerald-50' : ''}`}
              onClick={() => setUploadedKK(true)}
            >
              {uploadedKK ? (
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                    <Check className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-xs font-bold text-emerald-600">KK berhasil diunggah</p>
                  <p className="text-[10px] text-emerald-500 mt-0.5">kk_example.jpg · 0.9 MB</p>
                  <button className="text-[10px] text-ink-400 underline mt-1" onClick={(e) => { e.stopPropagation(); setUploadedKK(false); }}>Ganti foto</button>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-pink-400" />
                  <p className="text-xs font-semibold text-ink-600">Ketuk untuk pilih foto KK</p>
                  <p className="text-[10px] text-ink-400">JPG, PNG, atau PDF · Maks. 5MB</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 3 — Konfirmasi Deposit */}
      {step === 2 && (
        <div className="px-4 py-5 space-y-4 animate-slide-up">
          <div>
            <h2 className="text-base font-bold text-ink-900">Ringkasan Pemesanan</h2>
            <p className="text-xs text-ink-400 mt-0.5">Cek kembali sebelum melanjutkan</p>
          </div>

          {/* Ringkasan Item */}
          <div className="card p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-50 to-teal-50 flex items-center justify-center text-3xl">
                {gambarEmoji[item.gambarPlaceholder] || '📦'}
              </div>
              <div>
                <p className="text-[10px] text-pink-400 font-semibold">{item.kategori}</p>
                <p className="text-sm font-bold text-ink-900">{item.nama}</p>
                <p className="text-xs text-ink-400">Durasi: {labelDurasi}</p>
              </div>
            </div>
            <div className="h-px bg-cream-200" />
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-500">Biaya Sewa</span>
                <span className="font-semibold text-ink-900">{formatRupiah(harga)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Deposit Jaminan</span>
                <span className="font-semibold text-teal-600">{formatRupiah(100000)}</span>
              </div>
              <div className="h-px bg-cream-200 my-1" />
              <div className="flex justify-between">
                <span className="font-bold text-ink-900">Total yang dibayar</span>
                <span className="font-extrabold text-pink-500 text-base">{formatRupiah(harga + 100000)}</span>
              </div>
            </div>
          </div>

          {/* Info Deposit */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <p className="text-xs font-bold text-amber-700">📋 Tentang Deposit Jaminan</p>
            <ul className="text-[11px] text-amber-700 space-y-1.5 list-none">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 mt-0.5">•</span>
                Deposit Rp 100.000 <strong>bukan biaya sewa</strong> — uang Anda akan dikembalikan
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 mt-0.5">•</span>
                Dikembalikan maks. <strong>H+3</strong> setelah barang diterima & diperiksa admin
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 mt-0.5">•</span>
                Dapat dipotong jika ada denda keterlambatan atau kerusakan barang
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 mt-0.5">•</span>
                Maks. <strong>3 barang aktif</strong> dengan 1 tanggungan deposit dalam 1 bulan
              </li>
            </ul>
          </div>

          {/* Checkbox Persetujuan */}
          <button
            id="checkbox-deposit"
            onClick={() => setSetujuDeposit(!setujuDeposit)}
            className={`w-full flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
              setujuDeposit ? 'border-emerald-400 bg-emerald-50' : 'border-cream-200 bg-white'
            }`}
          >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
              setujuDeposit ? 'border-emerald-500 bg-emerald-500' : 'border-cream-300'
            }`}>
              {setujuDeposit && <Check className="w-3 h-3 text-white" />}
            </div>
            <p className="text-xs text-ink-700 leading-relaxed">
              Saya menyetujui pembayaran <strong>deposit jaminan sebesar Rp 100.000</strong> dan memahami
              ketentuan pengembalian, pemotongan denda, serta batas sewa aktif Babybrits Cilegon.
            </p>
          </button>

          {/* Data Customer */}
          {form.nama && (
            <div className="card p-4 space-y-2">
              <p className="text-xs font-bold text-ink-500 uppercase tracking-wider">Data Pemesan</p>
              <div className="text-sm space-y-1">
                <div className="flex gap-2"><span className="text-ink-400 w-20">Nama</span><span className="font-semibold text-ink-900">{form.nama}</span></div>
                {form.noWA && <div className="flex gap-2"><span className="text-ink-400 w-20">WhatsApp</span><span className="font-semibold text-ink-900">{form.noWA}</span></div>}
                {form.alamat && <div className="flex gap-2"><span className="text-ink-400 w-20">Alamat</span><span className="text-ink-700 flex-1 text-xs">{form.alamat}</span></div>}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-white border-t border-cream-200 p-4 shadow-bottom-nav">
        <div className="flex gap-3">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="btn-outline py-3 flex-1">
              ← Kembali
            </button>
          )}
          <button
            id={`btn-step-${step}`}
            onClick={handleNext}
            disabled={!canNext()}
            className={`btn-brand flex-1 transition-opacity ${!canNext() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {step === STEPS.length - 1 ? '✨ Buat Booking' : 'Lanjutkan →'}
          </button>
        </div>
      </div>
    </div>
  );
}
