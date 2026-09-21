import { useState, useEffect } from 'react';
import { Download, X, Share, PlusSquare, Sparkles } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export default function InstallPrompt() {
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePWA();
  const [dismissed, setDismissed] = useState(true);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Cek jika pengguna sudah pernah menutup banner di sesi ini
    const isDismissed = sessionStorage.getItem('babybrits_pwa_dismissed') === 'true';
    if (!isDismissed && !isInstalled && (isInstallable || isIOS)) {
      setDismissed(false);
    }
  }, [isInstallable, isInstalled, isIOS]);

  const handleDismiss = () => {
    setDismissed(true);
    setShowIosGuide(false);
    sessionStorage.setItem('babybrits_pwa_dismissed', 'true');
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      await promptInstall();
    } else if (isIOS) {
      setShowIosGuide(true);
    }
  };

  // Jangan tampilkan jika sudah terinstal atau ditutup
  if (isInstalled || dismissed || (!isInstallable && !isIOS)) {
    return null;
  }

  return (
    <>
      {/* Banner PWA Mobile */}
      <aside aria-label="Instalasi Aplikasi Babybrits" className="sticky top-0 z-40 px-3 pt-2 pb-1 bg-gradient-to-r from-pink-500/10 via-teal-500/10 to-pink-500/10 backdrop-blur-md border-b border-pink-200">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-md border border-cream-200 flex items-center justify-between gap-3">
          {/* App Icon */}
          <div className="w-11 h-11 rounded-xl bg-gradient-brand p-0.5 flex-shrink-0 shadow-sm overflow-hidden">
            <img src="/icon-192.png" alt="Babybrits Logo" className="w-full h-full object-cover rounded-[10px]" />
          </div>

          {/* Text Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-extrabold text-ink-900 truncate">Pasang Babybrits</span>
              <Sparkles className="w-3 h-3 text-pink-500 flex-shrink-0" />
            </div>
            <p className="text-[10px] text-ink-500 leading-tight truncate">
              {isIOS ? 'Tambah ke Layar Utama iPhone' : 'Akses instan seperti aplikasi native'}
            </p>
          </div>

          {/* Action CTA */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              id="btn-install-pwa"
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 bg-gradient-brand text-white font-bold text-xs px-3 py-2 rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all"
            >
              {isIOS ? <Share className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{isIOS ? 'Pasang' : 'Install'}</span>
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 text-ink-300 hover:text-ink-600 rounded-lg transition-colors"
              title="Tutup banner"
              aria-label="Tutup banner instalasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Modal Panduan iOS */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-cream-200 animate-slide-up space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/icon-192.png" alt="Logo" className="w-8 h-8 rounded-lg shadow-sm" />
                <h3 className="text-sm font-bold text-ink-900">Cara Pasang di iOS (Safari)</h3>
              </div>
              <button onClick={() => setShowIosGuide(false)} className="p-1 text-ink-300 hover:text-ink-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-ink-700">
              <div className="flex items-start gap-3 p-3 bg-cream-50 rounded-2xl border border-cream-200">
                <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  1
                </div>
                <p>
                  Ketuk tombol <strong>Bagikan (Share)</strong> di baris navigasi bawah browser Safari:
                  <span className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 bg-white rounded border border-cream-300 font-medium">
                    <Share className="w-3.5 h-3.5 text-blue-500" /> Share
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-teal-50 rounded-2xl border border-teal-200">
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  2
                </div>
                <p>
                  Scroll ke bawah lalu pilih menu:
                  <span className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 bg-white rounded border border-cream-300 font-medium text-ink-900">
                    <PlusSquare className="w-3.5 h-3.5 text-ink-700" /> Tambah ke Layar Utama
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  3
                </div>
                <p>
                  Ketuk <strong>Tambah (Add)</strong> di sudut kanan atas. Ikon Babybrits akan muncul di layar utama iPhone Anda! 🎉
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              className="btn-brand py-3 text-xs w-full"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}
