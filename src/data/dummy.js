// ============================================================
// DATA DUMMY — Babybrits Customer Portal
// ============================================================

// ---- Katalog Barang ----
export const katalogBarang = [
  {
    id: 1, sku: "BB-BCR-001",
    nama: "Baby Bouncer Ingenuity",
    kategori: "Bouncer",
    deskripsi: "Bouncer bayi ergonomis dengan getaran lembut, cocok untuk bayi 0–6 bulan. Dilengkapi mainan gantung dan sabuk pengaman 3 titik.",
    harga2Mggu: 75000, harga1Bln: 120000,
    status: "available",
    kondisi: "Baru", tahun: 2024,
    fitur: ["Getaran 5 kecepatan", "Dapat dilipat", "Washable seat pad", "Berat maks. 9 kg"],
    gambarPlaceholder: "bouncer",
  },
  {
    id: 2, sku: "BB-STR-001",
    nama: "Stroller Babyelle S300",
    kategori: "Stroller",
    deskripsi: "Stroller premium lipat satu tangan dengan suspensi 4 roda. Nyaman untuk bayi 0–36 bulan. Dilengkapi kanopi besar dan keranjang bawah.",
    harga2Mggu: 120000, harga1Bln: 200000,
    status: "rented",
    kondisi: "Baru", tahun: 2023,
    fitur: ["Lipat 1 tangan", "Suspensi 4 roda", "Kanopi besar", "Kapasitas 15 kg"],
    gambarPlaceholder: "stroller",
  },
  {
    id: 3, sku: "BB-STR-002",
    nama: "Stroller Chicco Echo",
    kategori: "Stroller",
    deskripsi: "Stroller ringan dan kompak dari Chicco. Ideal untuk jalan-jalan, mudah dilipat dan dibawa.",
    harga2Mggu: 100000, harga1Bln: 175000,
    status: "available",
    kondisi: "Baru", tahun: 2024,
    fitur: ["Berat hanya 7 kg", "Sandaran bisa recline", "Sabuk 5 titik", "Kapasitas 15 kg"],
    gambarPlaceholder: "stroller",
  },
  {
    id: 4, sku: "BB-BWK-001",
    nama: "Baby Walker Chicco",
    kategori: "Walker",
    deskripsi: "Baby walker adjustable untuk bayi mulai belajar berjalan. Meja mainan interaktif di depan.",
    harga2Mggu: 60000, harga1Bln: 100000,
    status: "maintenance",
    kondisi: "Second", tahun: 2022,
    fitur: ["Tinggi adjustable", "Roda anti-selip", "Meja mainan", "Lipat untuk penyimpanan"],
    gambarPlaceholder: "walker",
  },
  {
    id: 5, sku: "BB-HCR-001",
    nama: "High Chair Joie Mimzy",
    kategori: "High Chair",
    deskripsi: "Kursi makan bayi modern yang bisa disesuaikan tingginya. Cocok untuk bayi 6 bulan ke atas.",
    harga2Mggu: 80000, harga1Bln: 135000,
    status: "available",
    kondisi: "Baru", tahun: 2024,
    fitur: ["Tinggi adjustable 6 posisi", "Sandaran recline", "Nampan mudah lepas", "Berat maks. 15 kg"],
    gambarPlaceholder: "highchair",
  },
  {
    id: 6, sku: "BB-BED-001",
    nama: "Baby Box / Ranjang Bayi",
    kategori: "Ranjang",
    deskripsi: "Ranjang bayi kokoh dengan pagar pengaman. Ukuran standar dengan kasur busa nyaman.",
    harga2Mggu: 90000, harga1Bln: 150000,
    status: "available",
    kondisi: "Baru", tahun: 2025,
    fitur: ["Pagar pengaman tinggi", "Kasur busa standar", "Anti-formaldehyde", "Kapasitas 20 kg"],
    gambarPlaceholder: "ranjang",
  },
  {
    id: 7, sku: "BB-MPN-001",
    nama: "Mainan Piano Fisher-Price",
    kategori: "Mainan",
    deskripsi: "Piano edukatif warna-warni untuk bayi. Menghasilkan 5 jenis suara dan musik. Aman untuk bayi 6 bulan+.",
    harga2Mggu: 40000, harga1Bln: 65000,
    status: "available",
    kondisi: "Baru", tahun: 2023,
    fitur: ["5 mode musik", "Lampu warna-warni", "Material food-grade", "Baterai AA"],
    gambarPlaceholder: "mainan",
  },
  {
    id: 8, sku: "BB-PMP-001",
    nama: "Pompa ASI Spectra S2",
    kategori: "Pompa ASI",
    deskripsi: "Pompa ASI elektrik double pump hospital-grade. Tenang, kuat, dan nyaman untuk ibu menyusui.",
    harga2Mggu: 100000, harga1Bln: 170000,
    status: "available",
    kondisi: "Second", tahun: 2021,
    fitur: ["Double pump", "Level hisap adjustable", "Suara senyap <46dB", "Termasuk botol & selang"],
    gambarPlaceholder: "pompa",
  },
];

export const KATEGORI = ["Semua", "Stroller", "Bouncer", "Walker", "High Chair", "Ranjang", "Mainan", "Pompa ASI"];

// ---- Data Sewa Aktif Customer ----
export const sewaDummy = {
  member: {
    memberCode: "BB-MBR-2024-001",
    nama: "Dewi Lestari",
    noWA: "6281234567890",
    slotAktif: 1,
    tglDaftar: "2024-03-15",
  },
  aktif: [
    {
      id: "TRX-001",
      bookingId: "BK-202609-018",
      item: { nama: "Baby Bouncer Ingenuity", sku: "BB-BCR-001", kategori: "Bouncer", gambarPlaceholder: "bouncer" },
      durasi: "1 Bulan",
      tglMulai: "2026-09-20",
      tglJatuhTempo: "2026-10-20",
      hargaTotal: 120000,
      deposit: 100000,
      status: "active",
      dendaHarian: 5000,
    },
  ],
  riwayat: [
    {
      id: "TRX-000",
      bookingId: "BK-202608-005",
      item: { nama: "Stroller Babyelle S300", sku: "BB-STR-001", kategori: "Stroller" },
      durasi: "2 Minggu",
      tglMulai: "2026-08-01",
      tglJatuhTempo: "2026-08-15",
      hargaTotal: 120000,
      deposit: 100000,
      status: "completed",
    },
  ],
};

// ---- Helper ----
export const formatRupiah = (angka) =>
  "Rp " + angka.toLocaleString("id-ID");

export const hitungHariSisa = (tglJatuhTempo) => {
  const today = new Date("2026-09-21");
  const due = new Date(tglJatuhTempo);
  return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
};

export const statusKatalog = {
  available: { label: "Tersedia", color: "emerald" },
  rented: { label: "Sedang Disewa", color: "amber" },
  maintenance: { label: "Sedang Dicuci", color: "violet" },
  retired: { label: "Tidak Tersedia", color: "gray" },
};

export const gambarEmoji = {
  bouncer: "🪑",
  stroller: "🛒",
  walker: "🚶",
  highchair: "🪑",
  ranjang: "🛏️",
  mainan: "🎹",
  pompa: "🍼",
};

export const ADMIN_WA = "6289614072349";
