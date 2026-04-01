import { useState, useEffect } from 'react';

const products = [
  { id: 1, cat: 'Điện Thoại', name: 'iPhone 16 Pro Max 256GB', price: 32990000, oldPrice: 36990000, image: 'https://readdy.ai/api/search-image?query=iPhone%2016%20Pro%20Max%20smartphone%20modern%20premium%20product%20clean%20white%20background%20professional%20tech%20photography%20minimal&width=400&height=400&seq=dt01&orientation=squarish', badge: '-11%', rating: 4.9, sold: 2340 },
  { id: 2, cat: 'Điện Thoại', name: 'Samsung Galaxy S25 Ultra', price: 29990000, oldPrice: 34990000, image: 'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S25%20Ultra%20Android%20smartphone%20premium%20product%20clean%20white%20background%20professional%20tech%20photography&width=400&height=400&seq=dt02&orientation=squarish', badge: '-14%', rating: 4.8, sold: 1890 },
  { id: 3, cat: 'Laptop', name: 'MacBook Air M3 15 inch', price: 34990000, oldPrice: 37990000, image: 'https://readdy.ai/api/search-image?query=MacBook%20Air%20laptop%20Apple%20premium%20product%20clean%20white%20background%20professional%20photography%20minimal%20tech%20sleek&width=400&height=400&seq=dt03&orientation=squarish', badge: '-8%', rating: 4.9, sold: 876 },
  { id: 4, cat: 'Laptop', name: 'Dell XPS 15 i9 RTX 4070', price: 42990000, oldPrice: 0, image: 'https://readdy.ai/api/search-image?query=Dell%20XPS%2015%20laptop%20gaming%20premium%20product%20clean%20background%20professional%20tech%20photography%20minimal&width=400&height=400&seq=dt04&orientation=squarish', badge: '', rating: 4.7, sold: 432 },
  { id: 5, cat: 'Tai Nghe', name: 'AirPods Pro 2nd Gen', price: 5990000, oldPrice: 6990000, image: 'https://readdy.ai/api/search-image?query=AirPods%20Pro%20wireless%20earbuds%20Apple%20premium%20product%20clean%20white%20background%20professional%20photography%20minimal%20tech&width=400&height=400&seq=dt05&orientation=squarish', badge: '-14%', rating: 4.8, sold: 3210 },
  { id: 6, cat: 'Phụ Kiện', name: 'Bàn Phím Cơ Keychron K8', price: 2490000, oldPrice: 2990000, image: 'https://readdy.ai/api/search-image?query=Keychron%20K8%20mechanical%20keyboard%20product%20clean%20white%20background%20professional%20photography%20minimal%20tech%20RGB&width=400&height=400&seq=dt06&orientation=squarish', badge: '-17%', rating: 4.6, sold: 1560 },
  { id: 7, cat: 'Màn Hình', name: 'LG UltraWide 34" Curved', price: 9990000, oldPrice: 12990000, image: 'https://readdy.ai/api/search-image?query=LG%20UltraWide%20curved%20monitor%2034%20inch%20product%20clean%20white%20background%20professional%20photography%20minimal%20tech&width=400&height=400&seq=dt07&orientation=squarish', badge: '-23%', rating: 4.7, sold: 654 },
  { id: 8, cat: 'Tablet', name: 'iPad Air M2 11 inch', price: 16990000, oldPrice: 18990000, image: 'https://readdy.ai/api/search-image?query=iPad%20Air%20M2%20tablet%20Apple%20premium%20product%20clean%20white%20background%20professional%20photography%20minimal%20tech&width=400&height=400&seq=dt08&orientation=squarish', badge: '-11%', rating: 4.8, sold: 1120 },
];

const cats = ['Tất Cả', 'Điện Thoại', 'Laptop', 'Tablet', 'Tai Nghe', 'Màn Hình', 'Phụ Kiện'];
const SALE_END = Date.now() + 2 * 3600000 + 45 * 60000;
const brands = ['Apple', 'Samsung', 'Dell', 'Lenovo', 'Sony', 'LG', 'Asus', 'MSI'];

export default function DemoDienTu() {
  const [activeCat, setActiveCat] = useState('Tất Cả');
  const [cart, setCart] = useState(0);
  const [added, setAdded] = useState<number | null>(null);
  const [time, setTime] = useState({ h: 2, m: 45, s: 0 });
  const [compareIds, setCompareIds] = useState<number[]>([]);

  useEffect(() => {
    const t = setInterval(() => {
      const diff = Math.max(0, SALE_END - Date.now());
      setTime({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const filtered = activeCat === 'Tất Cả' ? products : products.filter(p => p.cat === activeCat);
  const pad = (n: number) => String(n).padStart(2, '0');
  const addCart = (id: number) => { setCart(c => c + 1); setAdded(id); setTimeout(() => setAdded(null), 1200); };
  const toggleCompare = (id: number) => setCompareIds(p => p.includes(id) ? p.filter(x => x !== id) : p.length < 3 ? [...p, id] : p);

  return (
    <div className="min-h-screen bg-[#0A0E1A] font-sans">
      {/* Promo bar */}
      <div className="bg-[#1565C0] text-white text-center text-xs py-2 font-medium">
        🎁 Flash Sale cuối tuần — Giảm đến 25% · Freeship đơn 500K · Bảo hành 12 tháng
      </div>

      {/* Header */}
      <header className="bg-[#0A0E1A]/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-[#1565C0] rounded-xl flex items-center justify-center">
              <i className="ri-cpu-line text-white text-lg"></i>
            </div>
            <div>
              <div className="font-extrabold text-white text-base">TECHZONE</div>
              <div className="text-[#4FC3F7] text-[10px] font-semibold tracking-widest">ELECTRONICS STORE</div>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md items-center border border-white/10 rounded-xl px-3 py-2 gap-2 bg-white/5">
            <i className="ri-search-line text-white/40 text-sm"></i>
            <input placeholder="Tìm điện thoại, laptop, tai nghe..." className="text-xs outline-none flex-1 bg-transparent text-white placeholder:text-white/30 text-sm" readOnly />
          </div>

          <div className="flex items-center gap-2 ml-auto md:ml-0 flex-shrink-0">
            <button className="hidden md:flex items-center gap-1.5 text-white/60 hover:text-white text-xs cursor-pointer transition-colors whitespace-nowrap">
              <i className="ri-map-pin-line text-sm"></i>Cửa Hàng
            </button>
            <button className="relative cursor-pointer">
              <div className="w-9 h-9 flex items-center justify-center">
                <i className="ri-shopping-cart-2-line text-white text-xl"></i>
              </div>
              {cart > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#1565C0] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cart}</span>}
            </button>
            <button className="hidden md:flex items-center gap-1 bg-[#1565C0] hover:bg-[#1976D2] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer whitespace-nowrap transition-colors">
              <i className="ri-user-line text-xs"></i>Đăng Nhập
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <img src="https://readdy.ai/api/search-image?query=modern%20electronics%20tech%20store%20hero%20banner%20dark%20background%20iPhone%20laptop%20Samsung%20Apple%20products%20showcase%20neon%20blue%20accent%20modern%20minimal%20Vietnam%20technology&width=1400&height=600&seq=dthero&orientation=landscape" alt="TechZone" className="w-full h-[50vh] md:h-[60vh] object-cover object-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/60 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <span className="inline-flex items-center gap-2 bg-[#1565C0]/20 border border-[#4FC3F7]/30 text-[#4FC3F7] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 bg-[#4FC3F7] rounded-full animate-pulse"></span>HỆ THỐNG 50+ CỬA HÀNG TOÀN QUỐC
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 max-w-xl">
              Công Nghệ<br /><span className="text-[#4FC3F7]">Đỉnh Cao</span><br />Giá Tốt Nhất
            </h1>
            <p className="text-white/60 text-base mb-6 max-w-md">Chính hãng 100% · Bảo hành 12 tháng · Trả góp 0% lãi suất</p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <button className="bg-[#1565C0] hover:bg-[#1976D2] text-white px-7 py-3 rounded-xl font-bold cursor-pointer transition-colors whitespace-nowrap text-sm">
                Mua Ngay <i className="ri-arrow-right-line ml-1"></i>
              </button>
              <button className="border border-white/20 text-white px-7 py-3 rounded-xl font-bold cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap text-sm">
                Trả Góp 0%
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sale */}
      <div className="bg-gradient-to-r from-[#C62828] to-[#E53935] py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-white text-[#C62828] text-xs font-extrabold px-3 py-1.5 rounded-lg">⚡ FLASH SALE</span>
            <span className="text-white text-sm font-semibold">Kết thúc sau:</span>
          </div>
          <div className="flex items-center gap-2">
            {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
              <>
                <div key={i} className="bg-white/20 text-white font-black text-xl w-12 h-12 flex items-center justify-center rounded-xl">{v}</div>
                {i < 2 && <span className="text-white font-black text-xl">:</span>}
              </>
            ))}
          </div>
          <div className="text-white/80 text-xs">Giảm thêm 5% khi order qua app</div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-[#0F1629] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: 'ri-shield-check-line', t: 'Hàng Chính Hãng 100%', s: 'Cam kết, hoàn tiền nếu giả' },
            { icon: 'ri-loop-left-line', t: 'Đổi Trả 30 Ngày', s: 'Lỗi 1 đổi 1 trong 12 tháng' },
            { icon: 'ri-truck-line', t: 'Giao Hàng Nhanh', s: '2h nội thành, toàn quốc 24h' },
            { icon: 'ri-bank-card-line', t: 'Trả Góp 0%', s: '6–12–24 tháng không lãi' },
          ].map(b => (
            <div key={b.t} className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center bg-[#1565C0]/20 rounded-xl flex-shrink-0">
                <i className={`${b.icon} text-[#4FC3F7] text-lg`}></i>
              </div>
              <div>
                <div className="text-white text-xs font-bold">{b.t}</div>
                <div className="text-white/40 text-[10px]">{b.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-5">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${activeCat === cat ? 'bg-[#1565C0] text-white' : 'bg-white/5 border border-white/10 text-white/60 hover:border-[#4FC3F7]/40 hover:text-white'}`}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Products */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 pb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-base">Sản Phẩm <span className="text-white/40 text-sm font-normal">({filtered.length} sản phẩm)</span></h2>
          {compareIds.length > 0 && (
            <button className="flex items-center gap-2 bg-[#1565C0] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer">
              <i className="ri-bar-chart-grouped-line"></i>So Sánh ({compareIds.length})
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {filtered.map(p => (
            <div key={p.id} className="bg-[#0F1629] border border-white/10 rounded-2xl overflow-hidden hover:border-[#4FC3F7]/30 transition-all group cursor-pointer">
              <div className="relative bg-[#1A2035] p-3">
                <img src={p.image} alt={p.name} className="w-full h-36 md:h-44 object-contain group-hover:scale-105 transition-transform duration-500" />
                {p.badge && <span className="absolute top-2 left-2 bg-[#C62828] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-lg">{p.badge}</span>}
                <button
                  onClick={() => toggleCompare(p.id)}
                  className={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-all ${compareIds.includes(p.id) ? 'bg-[#1565C0] text-white' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}
                >
                  <i className="ri-bar-chart-line text-xs"></i>
                </button>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[#F59E0B] text-xs">★</span>
                  <span className="text-white/50 text-[10px]">{p.rating} · {p.sold.toLocaleString()} đã bán</span>
                </div>
                <h3 className="text-white font-semibold text-xs mb-2 line-clamp-2 leading-tight">{p.name}</h3>
                <div className="flex items-end gap-1.5 mb-3 flex-wrap">
                  <span className="text-[#4FC3F7] font-black text-sm">{p.price.toLocaleString()}đ</span>
                  {p.oldPrice > 0 && <span className="text-white/30 text-xs line-through">{p.oldPrice.toLocaleString()}đ</span>}
                </div>
                <button onClick={() => addCart(p.id)} className={`w-full py-2 rounded-xl text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${added === p.id ? 'bg-emerald-600 text-white' : 'bg-[#1565C0] hover:bg-[#1976D2] text-white'}`}>
                  {added === p.id ? <><i className="ri-check-line mr-1"></i>Đã Thêm</> : <><i className="ri-shopping-cart-2-line mr-1"></i>Thêm Vào Giỏ</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Brands */}
      <div className="bg-[#0F1629] border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <p className="text-center text-white/30 text-xs font-semibold tracking-widest mb-5">THƯƠNG HIỆU CHÍNH HÃNG</p>
          <div className="flex flex-wrap justify-center gap-5 md:gap-10">
            {brands.map(b => (
              <span key={b} className="text-white/20 font-extrabold text-lg tracking-widest cursor-pointer hover:text-white/60 transition-colors">{b}</span>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-[#070A12] border-t border-white/5 py-8 text-center">
        <div className="text-white font-extrabold text-xl mb-2">TECHZONE</div>
        <p className="text-white/20 text-xs">© 2025 TechZone Electronics · Thiết kế bởi <span className="text-[#00C2E0] font-semibold">WebPro Studio</span></p>
      </footer>
    </div>
  );
}
