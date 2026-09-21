import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import BottomNav from './components/layout/BottomNav';
import Katalog from './pages/Katalog';
import DetailBarang from './pages/DetailBarang';
import Registrasi from './pages/Registrasi';
import KonfirmasiBooking from './pages/KonfirmasiBooking';
import DashboardSewa from './pages/DashboardSewa';
import MemberCard from './pages/MemberCard';

function Layout({ children }) {
  const location = useLocation();
  // Sembunyikan BottomNav pada halaman detail barang dan alur checkout/booking
  const hideBottomNav =
    location.pathname.startsWith('/barang') ||
    location.pathname.startsWith('/booking');

  return (
    <>
      {children}
      {!hideBottomNav && <BottomNav />}
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
