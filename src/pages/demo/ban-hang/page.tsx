import { useState, useEffect } from 'react';

const products = [
  { id: 1, name: 'Áo Thun Oversize Premium', price: 299000, oldPrice: 450000, image: 'https://readdy.ai/api/search-image?query=stylish%20oversize%20white%20t-shirt%20fashion%20product%20clean%20white%20background%20modern%20Vietnamese%20youth%20clothing%20minimal&width=400&height=500&seq=bh001&orientation=portrait', tag: 'HOT', rating: 4.8, sold: 1240, badge: '-33%', cat: 'Áo' },
  { id: 2, name: 'Quần Jeans Slim Fit', price: 549000, oldPrice: 750000, image: 'https://readdy.ai/api/search-image?query=slim%20fit%20denim%20jeans%20product%20clean%20white%20background%20modern%20fashion%20Vietnamese%20youth%20clothing%20minimal&width=400&height=500&seq=bh002&orientation=portrait', tag: 'SALE', rating: 4.7, sold: 890, badge: '-27%', cat: 'Quần' },
  { id: 3, name: 'Váy Hoa Mùa Hè', price: 399000, oldPrice: 0, image: 'https://readdy.ai/api/search-image?query=floral%20summer%20dress%20product%20clean%20white%20background%20modern%20fashion%20Vietnamese%20women%20clothing%20minimal&width=400&height=500&seq=bh003&orientation=portrait', tag: 'MỚI', rating: 4.9, sold: 567, badge: '', cat: 'Váy' },
  { id: 4, name: 'Áo Khoác Bomber', price: 699000, oldPrice: 950000, image: 'https://readdy.ai/api/search-image?query=bomber%20jacket%20fashion%20product%20clean%20white%20background%20modern%20Vietnamese%20youth%20clothing%20minimal&width=400&height=500&seq=bh004&orientation=portrait', tag: 'SALE', rating: 4.6, sold: 423, badge: '-26%', cat: 'Áo' },
  { id: 5, name: 'Set Đồ Thể Thao', price: 459000, oldPrice: 0, image: 'https://readdy.ai/api/search-image?query=sport%20outfit%20set%20fashion%20product%20clean%20white%20background%20modern%20Vietnamese%20athletic%20clothing%20minimal&width=400&height=500&seq=bh005&orientation=portrait', tag: 'MỚI', rating: 4.8, sold: 312, badge: '', cat: 'Áo' },
  { id: 6, name: 'Túi Tote Canvas', price: 199000, oldPrice: 280000, image: 'https://readdy.ai/api/search-image?query=canvas%20tote%20bag%20fashion%20accessory%20product%20clean%20white%20background%20modern%20minimal%20Vietnamese%20style&width=400&height=500&seq=bh006&orientation=portrait', tag: 'HOT', rating: 4.9, sold: 1560, badge: '-29%', cat: 'Phụ Kiện' },
  { id: 7, name: 'Giày Sneaker Basic', price: 799000, oldPrice: 1100000, image: 'https://readdy.ai/api/search-image?query=white%20sneakers%20shoes%20product%20clean%20white%20background%20modern%20fashion%20minimal%20Vietnamese%20youth&width=400&height=500&seq=bh007&orientation=portrait', tag: 'SALE', rating: 4.7, sold: 734, badge: '-27%', cat: 'Giày & Túi' },
  { id: 8, name: 'Mũ Bucket Thêu', price: 159000, oldPrice: 0, image: 'https://readdy.ai/api/search-image?query=embroidered%20bucket%20hat%20accessory%20fashion%20product%20clean%20white%20background%20modern%20minimal%20Vietnamese%20youth&width=400&height=500&seq=bh008&orientation=portrait', tag: 'MỚI', rating: 4.5, sold: 891, badge: '', cat: 'Phụ Kiện' },
  { id: 9, name: 'Áo Sơ Mi Linen', price: 359000, oldPrice: 499000, image: 'https://readdy.ai/api/search-image?query=linen%20shirt%20fashion%20product%20clean%20white%20background%20modern%20Vietnamese%20men%20clothing%20minimal%20summer&width=400&height=500&seq=bh009&orientation=portrait', tag: 'SALE', rating: 4.6, sold: 645, badge: '-28%', cat: 'Áo' },
  { id: 10, name: 'Quần Short Kaki', price: 249000, oldPrice: 0, image: 'https://readdy.ai/api/search-image?query=kaki%20shorts%20fashion%20product%20clean%20white%20background%20modern%20Vietnamese%20men%20summer%20clothing%20minimal&width=400&height=500&seq=bh010&orientation=portrait', tag: 'MỚI', rating: 4.7, sold: 432, badge: '', cat: 'Quần' },
  { id: 11, name: 'Váy Maxi Boho', price: 499000, oldPrice: 699000, image: 'https://readdy.ai/api/search-image?query=boho%20maxi%20dress%20fashion%20product%20clean%20white%20background%20modern%20Vietnamese%20women%20summer%20clothing%20minimal&width=400&height=500&seq=bh011&orientation=portrait', tag: 'SALE', rating: 4.8, sold: 378, badge: '-29%', cat: 'Váy' },
  { id: 12, name: 'Balo Da Nữ', price: 599000, oldPrice: 0, image: 'https://readdy.ai/api/search-image?query=leather%20women%20backpack%20fashion%20product%20clean%20white%20background%20modern%20minimal%20Vietnamese%20style%20elegant&width=400&height=500&seq=bh012&orientation=portrait', tag: 'HOT', rating: 4.9, sold: 523, badge: '', cat: 'Giày & Túi' },
];

const banners = [
  { img: 'https://readdy.ai/api/search-image?query=fashion%20summer%20collection%20banner%20young%20Vietnamese%20models%20colorful%20clothes%20outdoor%20sunny%20day%20modern%20trendy%20editorial%20photography&width=1400&height=500&seq=bhban1&orientation=landscape', title: 'BỘ SƯU TẬP HÈ 2025', sub: 'Giảm đến 40% toàn bộ sản phẩm mùa hè' },
  { img: 'https://readdy.ai/api/search-image?query=fashion%20accessories%20collection%20banner%20elegant%20jewelry%20bags%20shoes%20display%20modern%20minimal%20studio%20photography&width=1400&height=500&seq=bhban2&orientation=landscape', title: 'PHỤ KIỆN THỜI TRANG', sub: 'Mũ, túi, giày — phong cách của bạn' },
];

const testimonials = [
  { name: 'Nguyễn Thị Hương', text: 'Áo thun oversize chất vải cực đẹp, giá lại rẻ hơn Zara nhiều. Đã mua 3 lần rồi!', rating: 5, date: '20/04/2025' },
  { name: 'Trần Văn Minh', text: 'Giao hàng nhanh, đóng gói cẩn thận. Quần jeans slim fit vừa vặn hoàn hảo.', rating: 5, date: '18/04/2025' },
  { name: 'Lê Thị Lan', text: 'Váy hoa mùa hè xinh quá, mặc đi biển được luôn. Chất vải mát, không nhăn.', rating: 4, date: '15/04/2025' },
];

const categories = [
  { label: 'Tất Cả', icon: 'ri-layout-grid-line' },
  { label: 'Áo', icon: 'ri-t-shirt-line' },
  { label: 'Quần', icon: 'ri-scissors-cut-line' },
  { label: 'Váy', icon: 'ri-shirt-line' },
  { label: 'Giày & Túi', icon: 'ri-handbag-line' },
  { label: 'Phụ Kiện', icon: 'ri-star-line' },
];

const SALE_END = Date.now() + 4 * 3600 * 1000 + 22 * 60 * 1000;

export default function DemoBanHang() {
  const [cart, setCart] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Tất Cả');
  const [addedId, setAddedId] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState({ h: 4, m: 22, s: 0 });
  const [showCart, setShowCart] = useState(false);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      const diff = Math.max(0, SALE_END - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(p => (p + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, []);

  const handleAdd = (id: number) => {
    setCart(c => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const toggleWish = (id: number) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const pad = (n: number) => String(n).padStart(2, '0');

  const filtered = activeCategory === 'Tất Cả' ? products : products.filter(p => p.cat === activeCategory);

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top Promo Bar */}
      <div className="bg-rose-600 text-white text-center text-xs py-2 font-medium tracking-wide">
        🔥 SALE HÈ 2025 — Giảm đến 40% · Freeship đơn từ 299K · Đổi trả 30 ngày
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-rose-600 rounded-lg flex items-center justify-center">
              <i className="ri-shopping-bag-2-fill text-white text-base"></i>
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-base leading-tight">FASHIONISTA</div>
              <div className="text-rose-500 text-[10px] font-semibold tracking-widest">STORE</div>
            </div>
          </div>

          <nav className="hidden md:flex gap-5 text-sm text-slate-600 flex-1 justify-center">
            {['Trang Chủ', 'Sản Phẩm', 'Sale', 'Xu Hướng', 'Lookbook'].map((n) => (
              <button key={n} className="cursor-pointer hover:text-rose-600 font-medium transition-colors whitespace-nowrap">{n}</button>
            ))}
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0 ml-auto md:ml-0">
            <div className="hidden md:flex items-center border border-slate-200 rounded-full px-3 py-1.5 gap-2 w-48">
              <i className="ri-search-line text-slate-400 text-sm"></i>
              <input placeholder="Tìm sản phẩm..." className="text-xs outline-none flex-1 text-sm" readOnly />
            </div>
            <button className="relative cursor-pointer">
              <div className="w-9 h-9 flex items-center justify-center">
                <i className="ri-heart-line text-slate-600 text-xl"></i>
              </div>
              {wishlist.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wishlist.length}</span>}
            </button>
            <button onClick={() => setShowCart(true)} className="relative cursor-pointer">
              <div className="w-9 h-9 flex items-center justify-center">
                <i className="ri-shopping-cart-2-line text-slate-700 text-xl"></i>
              </div>
              {cart > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cart}</span>}
            </button>
            <button className="hidden md:flex items-center gap-1 bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-full cursor-pointer whitespace-nowrap">
              <i className="ri-user-line text-xs"></i>Đăng Nhập
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-9 h-9 flex items-center justify-center">
              <i className="ri-menu-line text-slate-700 text-xl"></i>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-slate-100 px-4 py-3 space-y-2 bg-white">
            {['Trang Chủ', 'Sản Phẩm', 'Sale', 'Xu Hướng', 'Lookbook'].map((n) => (
              <button key={n} className="block w-full text-left text-sm text-slate-600 py-1 cursor-pointer">{n}</button>
            ))}
          </div>
        )}
      </header>

      {/* Banner Carousel */}
      <div className="relative overflow-hidden h-[280px] md:h-[420px]">
        {banners.map((b, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === bannerIdx ? 'opacity-100' : 'opacity-0'}`}>
            <img src={b.img} alt={b.title} className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
                <div className="max-w-md">
                  <span className="inline-block bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">SALE HÈ 2025</span>
                  <h2 className="text-2xl md:text-4xl font-black text-white mb-2">{b.title}</h2>
                  <p className="text-white/80 text-sm md:text-base mb-4">{b.sub}</p>
                  <button className="bg-white text-rose-600 px-6 py-2.5 rounded-full font-bold text-sm cursor-pointer hover:bg-rose-50 transition-colors whitespace-nowrap">
                    Mua Ngay <i className="ri-arrow-right-line ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setBannerIdx(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === bannerIdx ? 'bg-white w-6' : 'bg-white/50'}`} />
          ))}
        </div>
      </div>

      {/* Flash Sale Bar */}
      <div className="bg-slate-900 py-4">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-rose-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-lg tracking-wider">⚡ FLASH SALE</span>
            <span className="text-white text-sm font-semibold">Kết thúc sau:</span>
          </div>
          <div className="flex items-center gap-2">
            {[pad(timeLeft.h), pad(timeLeft.m), pad(timeLeft.s)].map((val, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="bg-rose-600 text-white font-black text-xl w-12 h-12 flex items-center justify-center rounded-xl">{val}</div>
                {idx < 2 && <span className="text-white font-black text-xl">:</span>}
              </div>
            ))}
          </div>
          <button className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-5 py-2 rounded-full cursor-pointer whitespace-nowrap transition-colors">
            Xem Flash Sale <i className="ri-arrow-right-line ml-1"></i>
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-rose-50 border-y border-rose-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: 'ri-truck-line', title: 'Freeship Đơn 299K', sub: 'Giao hàng toàn quốc' },
            { icon: 'ri-loop-left-line', title: 'Đổi Trả 30 Ngày', sub: 'Không cần lý do' },
            { icon: 'ri-shield-check-line', title: 'Hàng Chính Hãng', sub: 'Cam kết 100%' },
            { icon: 'ri-customer-service-2-line', title: 'Hỗ Trợ 24/7', sub: 'Chat Zalo tức thì' },
          ].map((b) => (
            <div key={b.title} className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-rose-100 rounded-xl flex-shrink-0">
                <i className={`${b.icon} text-rose-600 text-lg`}></i>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">{b.title}</div>
                <div className="text-xs text-slate-500">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-all flex-shrink-0 ${activeCategory === cat.label ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600'}`}
            >
              <i className={`${cat.icon} text-sm`}></i>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 pb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">Sản Phẩm Nổi Bật <span className="text-slate-400 text-sm font-normal">({filtered.length} sản phẩm)</span></h2>
          <select className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-600 cursor-pointer outline-none bg-white">
            <option>Phổ Biến Nhất</option>
            <option>Mới Nhất</option>
            <option>Giá Tăng Dần</option>
            <option>Giá Giảm Dần</option>
          </select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
          {filtered.map((product) => (
            <div key={product.id} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-rose-200 transition-all cursor-pointer">
              <div className="relative overflow-hidden bg-slate-50">
                <img src={product.image} alt={product.name} className="w-full h-44 md:h-56 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">{product.badge}</span>
                )}
                <button
                  onClick={() => toggleWish(product.id)}
                  className={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full transition-all cursor-pointer ${wishlist.includes(product.id) ? 'bg-rose-600 text-white' : 'bg-white/80 text-slate-500 hover:bg-rose-50'}`}
                >
                  <i className={`${wishlist.includes(product.id) ? 'ri-heart-fill' : 'ri-heart-line'} text-sm`}></i>
                </button>
                <span className={`absolute bottom-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${product.tag === 'SALE' ? 'bg-rose-600' : product.tag === 'HOT' ? 'bg-orange-500' : 'bg-emerald-500'}`}>
                  {product.tag}
                </span>
                <button
                  onClick={() => handleAdd(product.id)}
                  className={`absolute bottom-2 right-2 ${addedId === product.id ? 'bg-emerald-500' : 'bg-white hover:bg-rose-600 hover:text-white'} w-8 h-8 flex items-center justify-center rounded-full text-slate-700 transition-all cursor-pointer`}
                >
                  <i className={`text-sm ${addedId === product.id ? 'ri-check-line text-white' : 'ri-shopping-cart-2-line'}`}></i>
                </button>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[#F59E0B] text-xs">★</span>
                  <span className="text-xs text-slate-600">{product.rating}</span>
                  <span className="text-slate-300 text-xs ml-1">· {product.sold.toLocaleString()} đã bán</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2 leading-tight line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-rose-600 font-bold text-sm">{product.price.toLocaleString()}đ</span>
                  {product.oldPrice > 0 && <span className="text-slate-400 text-xs line-through">{product.oldPrice.toLocaleString()}đ</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="border-2 border-rose-200 text-rose-600 px-8 py-3 rounded-full font-semibold cursor-pointer hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all text-sm whitespace-nowrap">
            Xem Tất Cả Sản Phẩm <i className="ri-arrow-right-line ml-1"></i>
          </button>
        </div>
      </main>

      {/* Testimonials */}
      <div className="bg-rose-50 py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-center text-lg font-bold text-slate-900 mb-6">Khách Hàng Nói Gì?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-5 border border-rose-100">
                <div className="text-[#F59E0B] text-sm mb-2">{'★'.repeat(t.rating)}</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 text-sm">{t.name}</span>
                  <span className="text-slate-400 text-xs">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Showcase */}
      <div className="bg-slate-50 border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <p className="text-center text-slate-400 text-xs font-semibold tracking-widest mb-5">CÁC THƯƠNG HIỆU HỢP TÁC</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center">
            {['ZARA', 'H&M', 'UNIQLO', 'MANGO', 'PULL&BEAR', 'BERSHKA'].map((brand) => (
              <span key={brand} className="text-slate-300 font-extrabold text-lg tracking-widest cursor-pointer hover:text-slate-500 transition-colors">{brand}</span>
            ))}
          </div>
        </div>
      </div>

      {/* App Download Banner */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 py-10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="text-white">
            <h3 className="text-2xl font-black mb-2">Tải App — Mua Sắm Tiện Hơn!</h3>
            <p className="text-white/80 text-sm">Nhận ngay voucher 50K khi đặt đơn đầu tiên qua ứng dụng.</p>
          </div>
          <div className="flex gap-3 flex-col sm:flex-row">
            <button className="flex items-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-xl font-bold text-sm cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap">
              <i className="ri-apple-fill text-lg"></i>App Store
            </button>
            <button className="flex items-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-xl font-bold text-sm cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap">
              <i className="ri-google-play-fill text-lg text-emerald-600"></i>Google Play
            </button>
          </div>
        </div>
      </div>

      {/* Cart Popup */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-0 md:p-4" onClick={() => setShowCart(false)}>
          <div className="bg-white rounded-t-2xl md:rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-lg">Giỏ Hàng ({cart})</h3>
              <button onClick={() => setShowCart(false)} className="text-slate-400 cursor-pointer"><i className="ri-close-line text-xl"></i></button>
            </div>
            <p className="text-slate-500 text-sm text-center py-8">Giỏ hàng của bạn đang có {cart} sản phẩm</p>
            <button className="w-full bg-rose-600 text-white font-bold py-3 rounded-xl cursor-pointer hover:bg-rose-700 transition-colors whitespace-nowrap">
              Thanh Toán Ngay
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="font-extrabold text-lg mb-3">FASHIONISTA</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">Thời trang trẻ trung, phong cách hiện đại. Giao hàng toàn quốc, đổi trả miễn phí 30 ngày.</p>
            <div className="flex gap-3">
              {['ri-facebook-fill', 'ri-instagram-line', 'ri-tiktok-fill'].map((icon) => (
                <button key={icon} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-rose-600 cursor-pointer transition-colors">
                  <i className={`${icon} text-sm`}></i>
                </button>
              ))}
            </div>
          </div>
          {[
            { title: 'Sản Phẩm', items: ['Áo Thun', 'Quần Jeans', 'Váy', 'Phụ Kiện'] },
            { title: 'Hỗ Trợ', items: ['Chính Sách Đổi Trả', 'Vận Chuyển', 'FAQs', 'Liên Hệ'] },
            { title: 'Thông Tin', items: ['Về Chúng Tôi', 'Blog Thời Trang', 'Tuyển Dụng', 'Cộng Tác Viên'] },
          ].map((col) => (
            <div key={col.title}>
              <div className="font-bold text-sm mb-3">{col.title}</div>
              <ul className="space-y-2">
                {col.items.map((item) => <li key={item} className="text-slate-400 text-sm cursor-pointer hover:text-white transition-colors">{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 py-4 text-center text-slate-500 text-xs">
          © 2025 FASHIONISTA STORE · Thiết kế bởi <span className="text-[#00C2E0] font-semibold">WebPro Studio</span>
        </div>
      </footer>
    </div>
  );
}