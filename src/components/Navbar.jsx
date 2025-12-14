import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full py-6 px-8 flex justify-between items-center max-w-7xl mx-auto absolute top-0 left-0 right-0 z-50">
      
      {/* --- 1. LOGO (Tetap di aliran normal/kiri) --- */}
      {/* Tambahkan z-10 relative agar tidak tertutup jika layar mengecil */}
      <div className="text-2xl md:text-3xl font-black tracking-tighter text-white font-heading relative z-10">
        PUSH <span className="text-white">ID</span>
      </div>

      {/* --- 2. MENU LINKS (Absolute Center) --- */}
      {/* - absolute: Copot dari aliran normal flexbox.
         - left-1/2: Geser tepi kiri elemen ke 50% layar.
         - -translate-x-1/2: Geser balik elemen sebesar 50% lebarnya sendiri agar pas tengah.
      */}
      <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
        <Link href="/" className="text-white font-bold hover:text-indigo-400 transition-colors">
          Home
        </Link>
        <Link href="/about" className="text-slate-300 font-bold hover:text-indigo-400 transition-colors">
          About
        </Link>
        <Link href="/lobby" className="text-slate-300 font-bold hover:text-indigo-400 transition-colors">
          Find Team
        </Link>
      </div>

      {/* --- 3. MOBILE MENU BUTTON --- */}
      {/* Tetap justify-between yang akan mendorong ini ke kanan di mode mobile */}
      <div className="md:hidden text-white text-2xl cursor-pointer">☰</div>
      
      {/* (Opsional) DUMMY DIV UNTUK DESKTOP */}
      {/* Jika nanti Anda mau nambah tombol Login di kanan, taruh disini biar seimbang */}
      {/* <div className="hidden md:block w-[100px]"></div> */}

    </nav>
  );
}