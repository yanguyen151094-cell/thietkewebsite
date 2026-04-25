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
  { id: 9, cat: 'Điện Thoại', name: 'Xiaomi 14 Ultra', price: 19990000, oldPrice: 22990000, image: 'https://readdy.ai/api/search-image?query=Xiaomi%2014%20Ultra%20smartphone%20premium%20product%20clean%20white%20background%20professional%20tech%20photography%20minimal&width=400&height=400&seq=dt09&orientation=squarish', badge: '-13%', rating: 4.7, sold: 890 },
  { id: 10, cat: 'Laptop', name: 'Asus ROG Strix G16', price: 38990000, oldPrice: 42990000, image: 'https://readdy.ai/api/search-image?query=Asus%20ROG%20gaming%20laptop%20product%20clean%20white%20background%20professional%20tech%20photography%20minimal%20RGB&width=400&height=400&seq=dt10&orientation=squarish', badge: '-9%', rating: 4.8, sold: 567 },
  { id: 11, cat: 'Tai Nghe', name: 'Sony WH-1000XM5', price: 7990000, oldPrice: 9990000, image: 'https://readdy.ai/api/search-image?query=Sony%20WH-1000XM5%20wireless%20headphones%20premium%20product%20clean%20white%20background%20professional%20tech%20photography%20minimal&width=400&height=400&seq=dt11&orientation=squarish', badge: '-20%', rating: 4.9, sold: 2340 },
  { id: 12, cat: 'Phụ Kiện', name: 'Chuột Logitech MX Master 3S', price: 1890000, oldPrice: 2490000, image: 'https://readdy.ai/api/search-image?query=Logitech%20MX%20Master%203S%20mouse%20premium%20product%20clean%20white%20background%20professional%20tech%20photography%20minimal&width=400&height=400&seq=dt12&orientation=squarish', badge: '-24%', rating: 4.8, sold: 1870 },
];

const banners = [
  { img: 'https://readdy.ai/api/search-image?query=modern%20electronics%20tech%20store%20hero%20banner%20dark%20background%20iPhone%20laptop%20Samsung%20Apple%20products%20showcase%20neon%20blue%20accent%20modern%20minimal%20Vietnam%20technology&width=1400&height=500&seq=dtban1&orientation=landscape', title: 'CÔNG NGHỆ ĐỈNH CAO', sub: 'iPhone 16 Pro Max · MacBook M3 · Galaxy S25' },
  { img: 'https://readdy.ai/api/search-image?query=gaming%20setup%20RGB%20lights%20dark%20room%20modern%20tech%20equipment%20laptop%20monitor%20keyboard%20headset%20professional%20photography&width=1400&height=500&seq=dtban2&orientation=landscape', title: 'GAMING GEAR', sub: 'Laptop gaming · Màn hình 240Hz · Tai nghe surround' },
];

const testimonials = [
  { name: 'Phạm Văn Đức', text: 'Mua iPhone 16 Pro Max ở đây, giá tốt hơn Thế Giới Di Động 2 triệu. Giao hàng nhanh, đóng hộp cẩn thận.', rating: 5, date: '20/04/2025' },
  { name: 'Nguyễn Thị Hoa', text: 'MacBook Air M3 chính hãng, bảo hành 12 tháng đầy đủ. Nhân viên tư vấn nhiệt tình, hỗ trợ cài đặt miễn phí.', rating: 5, date: '18/04/2025' },
  { name: 'Trần Minh Quân', text: 'Tai nghe Sony WH-1000XM5 chống ồn cực đỉnh. Giá sale rẻ hơn nhiều so với các shop khác.', rating: 4, date: '15/04/2025' },
];

const cats = ['Tất Cả', 'Điện Thoại', 'Laptop', 'Tablet', 'Tai Nghe', 'Màn Hình', 'Phụ Kiện'];
const SALE_END = Date.now() + 2 * 3600000 + 45 * 60000;
const brands = ['Apple', 'Samsung', 'Dell', 'Lenovo', 'Sony', 'LG', 'Asus', 'MSI', 'Xiaomi', 'Logitech'];

export default function DemoDienTu() {
  const [activeCat, setActiveCat] = useState('Tất Cả');
  const [cart, setCart] = useState(0);
  const [added, setAdded] = useState<number | null>(null);
  const [time, setTime] = useState({ h: 2, m: 45, s: 0 });
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      const diff = Math.max(0, SALE_END - Date.now());
      setTime({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(p => (p + 1) % banners.length), 5000);
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
            <button onClick={() => setShowCart(true)} className="relative cursor-pointer">
              <div className="w-9 h-9 flex items-center justify-center">
                <i className="ri-shopping-cart-2-line text-white text-xl"></i>
              </div>
              {cart > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#1565C0] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cart}</span>}
            </button>
            <button className="hidden md:flex items-center gap-1 bg-[#1565C0] hover:bg-[#1976D2] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer whitespace-nowrap transition-colors">
              <i className="ri-user-line text-xs"></i>Đăng Nhập
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-9 h-9 flex items-center justify-center text-white/60">
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-2 bg-[#0A0E1A]">
            {['Trang Chủ', 'Sản Phẩm', 'Flash Sale', 'Cửa Hàng', 'Hỗ Trợ'].map(n => (
              <button key={n} className="block w-full text-left text-sm text-white/60 py-1 cursor-pointer hover:text-white">{n}</button>
            ))}
          </div>
        )}
      </header>

      {/* Banner Carousel */}
      <div className="relative overflow-hidden h-[280px] md:h-[420px]">
        {banners.map((b, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === bannerIdx ? 'opacity-100' : 'opacity-0'}`}>
            <img src={b.img} alt={b.title} className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/60 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
                <div className="max-w-md">
                  <span className="inline-flex items-center gap-2 bg-[#1565C0]/20 border border-[#4FC3F7]/30 text-[#4FC3F7] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                    <span className="w-2 h-2 bg-[#4FC3F7] rounded-full animate-pulse"></span>HỆ THỐNG 50+ CỬA HÀNG
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black text-white mb-2">{b.title}</h2>
                  <p className="text-white/60 text-sm md:text-base mb-4">{b.sub}</p>
                  <button className="bg-[#1565C0] text-white px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer hover:bg-[#1976D2] transition-colors whitespace-nowrap">
                    Mua Ngay <i className="ri-arrow-right-line ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setBannerIdx(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === bannerIdx ? 'bg-[#4FC3F7] w-6' : 'bg-white/30'}`} />
          ))}
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
              <div key={i} className="flex items-center gap-2">
                <div className="bg-white/20 text-white font-black text-xl w-12 h-12 flex items-center justify-center rounded-xl">{v}</div>
                {i < 2 && <span className="text-white font-black text-xl">:</span>}
              </div>
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

      {/* Testimonials */}
      <div className="bg-[#0F1629] border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-center text-lg font-bold text-white mb-6">Khách Hàng Nói Gì?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="text-[#F59E0B] text-sm mb-2">{'★'.repeat(t.rating)}</div>
                <p className="text-white/60 text-sm leading-relaxed mb-3">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">{t.name}</span>
                  <span className="text-white/30 text-xs">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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

      {/* Cart Popup */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-0 md:p-4" onClick={() => setShowCart(false)}>
          <div className="bg-[#0F1629] border border-white/10 rounded-t-2xl md:rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">Giỏ Hàng ({cart})</h3>
              <button onClick={() => setShowCart(false)} className="text-white/40 cursor-pointer"><i className="ri-close-line text-xl"></i></button>
            </div>
            <p className="text-white/50 text-sm text-center py-8">Giỏ hàng của bạn đang có {cart} sản phẩm</p>
            <button className="w-full bg-[#1565C0] text-white font-bold py-3 rounded-xl cursor-pointer hover:bg-[#1976D2] transition-colors whitespace-nowrap">
              Thanh Toán Ngay
            </button>
          </div>
        </div>
      )}

      <footer className="bg-[#070A12] border-t border-white/5 py-8 text-center">
        <div className="text-white font-extrabold text-xl mb-2">TECHZONE</div>
        <p className="text-white/20 text-xs">© 2025 TechZone Electronics · Thiết kế bởi <span className="text-[#00C2E0] font-semibold">WebPro Studio</span></p>
      </footer>
    </div>
  );
}