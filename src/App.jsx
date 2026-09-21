import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/layout/BottomNav';
import Katalog from './pages/Katalog';
import DetailBarang from './pages/DetailBarang';
import Registrasi from './pages/Registrasi';
import KonfirmasiBooking from './pages/KonfirmasiBooking';
import DashboardSewa from './pages/DashboardSewa';
import MemberCard from './pages/MemberCard';

// Halaman yang tidak menampilkan BottomNav
const NO_BOTTOM_NAV = ['/barang/', '/booking/registrasi', '/booking/konfirmasi'];

function Layout({ children }) {
  const showNav = !NO_BOTTOM_NAV.some(p => window.location.pathname.startsWith(p));
  return (
    <>
      {children}
      {showNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Katalog />} />
          <Route path="/barang/:sku" element={<DetailBarang />} />
          <Route path="/booking/registrasi" element={<Registrasi />} />
          <Route path="/booking/konfirmasi" element={<KonfirmasiBooking />} />
          <Route path="/sewa" element={<DashboardSewa />} />
          <Route path="/member" element={<MemberCard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
