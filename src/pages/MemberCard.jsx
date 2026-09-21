import { useState } from 'react';
import { Copy, CheckCircle, Share2, Baby, MessageCircle, QrCode } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { sewaDummy, ADMIN_WA } from '../data/dummy';

// Simulasi QR Code visual
function QRCodeVisual({ size = 140 }) {
  const cols = 14;
  // Pattern QR code yang deterministic
  const pattern = [
    1,1,1,1,1,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,1,0,1,0,0,0,0,1,
    1,0,1,1,1,0,1,0,0,1,1,0,1,1,
    1,0,1,1,1,0,1,0,1,0,1,1,0,1,
    1,0,1,1,1,0,1,0,0,1,0,0,1,1,
    1,0,0,0,0,0,1,0,1,1,0,1,1,0,
    1,1,1,1,1,1,1,0,1,0,1,0,1,1,
    0,0,0,0,0,0,0,0,0,1,1,0,0,0,
    1,1,0,1,1,0,1,1,1,0,1,1,1,0,
    0,1,0,0,1,1,0,1,0,1,0,0,0,1,
    1,0,1,1,1,0,1,0,1,1,0,1,1,0,
    0,1,1,0,0,1,0,0,1,0,1,0,0,1,
    1,1,1,1,1,0,1,1,0,1,0,1,1,0,
    1,0,0,0,0,0,0,0,1,0,1,0,0,1,
  ];
  const cellSize = size / cols;
  return (
    <div
      className="bg-white p-3 rounded-2xl shadow-inner"
      style={{ display: 'inline-block', lineHeight: 0 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gap: 0 }}>
        {pattern.map((cell, i) => (
          <div
            key={i}
            style={{ width: cellSize, height: cellSize, backgroundColor: cell ? '#1a1a2e' : 'transparent' }}
          />
        ))}
      </div>
    </div>
  );
}

export default function MemberCard() {
  const { member } = sewaDummy;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(member.memberCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in pb-28">
      <Navbar title="Kartu Member" />

      <div className="px-4 pt-5 space-y-5">
        {/* Card Visual */}
        <div className="animate-slide-up">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/20">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-brand" />
            {/* Dekorasi lingkaran */}
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10" />
            <div className="absolute -right-4 top-16 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute left-8 top-4 w-16 h-16 rounded-full bg-white/5" />

            {/* Card Content */}
            <div className="relative p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Baby className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-extrabold text-sm leading-none">Babybrits Cilegon</p>
                  <p className="text-white/70 text-[11px] mt-0.5">Member Card · Digital</p>
                </div>
                <div className="ml-auto">
                  <div className="bg-white/20 rounded-lg px-2 py-1">
                    <p className="text-white/90 text-[10px] font-bold">MEMBER</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="flex items-end justify-between gap-4">
                <div className="flex-1">
                  <p className="text-white/60 text-[10px] mb-1 uppercase tracking-wider">Nama Member</p>
                  <p className="text-white font-extrabold text-xl leading-tight">{member.nama}</p>
                  <p className="text-white/70 text-[11px] font-mono mt-2">{member.memberCode}</p>
                  <p className="text-white/50 text-[10px] mt-1">Bergabung: {member.tglDaftar}</p>
                </div>
                {/* QR */}
                <div className="flex-shrink-0">
                  <QRCodeVisual size={90} />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-4 border-t border-white/20 flex items-center justify-between">
                <p className="text-white/60 text-[10px]">
                  Branded · Safe · Save 🍼
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i < member.slotAktif ? 'bg-white' : 'bg-white/30'}`}
                    />
                  ))}
                  <p className="text-white/50 text-[10px] ml-1">{member.slotAktif}/3 slot</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kode Member & Salin */}
        <div className="card p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] text-ink-400 font-medium mb-0.5">Kode Member Anda</p>
            <p className="text-base font-extrabold text-ink-900 font-mono">{member.memberCode}</p>
          </div>
          <button
            id="btn-copy-member"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              copied ? 'bg-emerald-100 text-emerald-600' : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
            }`}
          >
            {copied ? <><CheckCircle className="w-4 h-4" /> Disalin!</> : <><Copy className="w-4 h-4" /> Salin Kode</>}
          </button>
        </div>

        {/* QR Besar */}
        <div className="card p-5 flex flex-col items-center gap-3">
          <p className="text-sm font-bold text-ink-900">Scan QR untuk Repeat Order</p>
          <QRCodeVisual size={160} />
          <p className="text-xs text-ink-400 text-center leading-relaxed">
            Tunjukkan QR code ini ke admin saat repeat order.<br />
            <strong className="text-ink-700">Tidak perlu isi ulang form identitas.</strong>
          </p>
        </div>

        {/* Info Keuntungan Member */}
        <div className="space-y-2">
          <p className="text-sm font-bold text-ink-900">Keuntungan Member 🎁</p>
          {[
            { emoji: '⚡', title: 'Repeat Order Lebih Cepat', desc: 'Tidak perlu isi ulang form identitas. Cukup scan kartu atau sebut nomor WA.' },
            { emoji: '🔒', title: 'Data Aman Tersimpan', desc: 'Dokumen KTP & KK Anda disimpan aman dan terenkripsi sesuai UU PDP.' },
            { emoji: '📱', title: 'Notifikasi H-3 Otomatis', desc: 'Kami ingatkan 3 hari sebelum sewa berakhir via WhatsApp.' },
            { emoji: '💰', title: 'Deposit Mudah', desc: 'Deposit tidak perlu dibayar ulang selama masih ada sewa aktif.' },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="card p-4 flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{emoji}</span>
              <div>
                <p className="text-xs font-bold text-ink-900">{title}</p>
                <p className="text-[11px] text-ink-400 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hubungi Admin */}
        <div className="card p-4">
          <p className="text-xs font-bold text-ink-900 mb-2">Ada pertanyaan?</p>
          <p className="text-[11px] text-ink-500 mb-3">Hubungi admin Babybrits Cilegon via WhatsApp</p>
          <a
            href={`https://wa.me/${ADMIN_WA}?text=Halo%20Admin%20Babybrits%20Cilegon%20%F0%9F%91%8B%0A%0AMember%3A%20${member.memberCode}%0ANama%3A%20${member.nama}%0A%0AIngin%20bertanya...`}
            target="_blank"
            rel="noreferrer"
            id="btn-hubungi-admin"
          >
            <div className="btn-wa rounded-xl py-2.5 text-sm">
              <MessageCircle className="w-4 h-4" /> Hubungi Admin via WhatsApp
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
