import { useState } from 'react';

const menuDrinks = [
  { id: 1, cat: 'Cà Phê', name: 'Cold Brew Phúc Long', price: 55000, image: 'https://readdy.ai/api/search-image?query=cold%20brew%20iced%20coffee%20Vietnamese%20cafe%20tall%20glass%20ice%20cubes%20dark%20espresso%20elegant%20professional%20food%20photography%20wooden%20table%20minimal%20background&width=500&height=360&seq=cafe_menu_01&orientation=landscape', hot: true },
  { id: 2, cat: 'Cà Phê', name: 'Cappuccino Ý', price: 65000, image: 'https://readdy.ai/api/search-image?query=cappuccino%20coffee%20cup%20beautiful%20latte%20art%20foam%20rosette%20warm%20brown%20tones%20ceramic%20mug%20cafe%20professional%20food%20photography%20minimal%20white%20background&width=500&height=360&seq=cafe_menu_02&orientation=landscape', hot: false },
  { id: 3, cat: 'Cà Phê', name: 'Bạc Xỉu Sữa Tươi', price: 45000, image: 'https://readdy.ai/api/search-image?query=Vietnamese%20bac%20xiu%20condensed%20milk%20iced%20coffee%20glass%20straw%20cafe%20drink%20professional%20food%20photography%20clean%20white%20marble%20background%20minimal&width=500&height=360&seq=cafe_menu_03&orientation=landscape', hot: true },
  { id: 4, cat: 'Trà & Nước', name: 'Trà Đào Cam Sả', price: 55000, image: 'https://readdy.ai/api/search-image?query=peach%20lemongrass%20iced%20tea%20Vietnamese%20cafe%20tall%20glass%20orange%20slices%20herbs%20beautiful%20food%20photography%20tropical%20fruity%20pastel%20background&width=500&height=360&seq=cafe_menu_04&orientation=landscape', hot: false },
  { id: 5, cat: 'Trà & Nước', name: 'Matcha Latte Nhật', price: 65000, image: 'https://readdy.ai/api/search-image?query=matcha%20green%20tea%20latte%20milk%20foam%20Japanese%20style%20beautiful%20glass%20drink%20cafe%20professional%20food%20photography%20clean%20light%20background%20minimal&width=500&height=360&seq=cafe_menu_05&orientation=landscape', hot: false },
  { id: 6, cat: 'Bánh & Ăn Nhẹ', name: 'Bánh Croissant Bơ', price: 40000, image: 'https://readdy.ai/api/search-image?query=butter%20croissant%20pastry%20breakfast%20cafe%20golden%20flaky%20baked%20fresh%20beautiful%20food%20photography%20minimal%20white%20plate%20wooden%20board&width=500&height=360&seq=cafe_menu_06&orientation=landscape', hot: false },
  { id: 7, cat: 'Bánh & Ăn Nhẹ', name: 'Cheesecake Dâu Tây', price: 55000, image: 'https://readdy.ai/api/search-image?query=strawberry%20cheesecake%20slice%20dessert%20cafe%20beautiful%20food%20photography%20elegant%20minimal%20white%20plate%20fresh%20berries%20cream&width=500&height=360&seq=cafe_menu_07&orientation=landscape', hot: true },
  { id: 8, cat: 'Đặc Biệt', name: 'The Brew Signature', price: 75000, image: 'https://readdy.ai/api/search-image?query=signature%20specialty%20coffee%20drink%20premium%20cafe%20beautiful%20glass%20artistic%20layered%20presentation%20food%20photography%20minimal%20dark%20background&width=500&height=360&seq=cafe_menu_08&orientation=landscape', hot: true },
  { id: 9, cat: 'Cà Phê', name: 'Espresso Tonic', price: 60000, image: 'https://readdy.ai/api/search-image?query=espresso%20tonic%20coffee%20cocktail%20glass%20ice%20bubbles%20modern%20cafe%20drink%20beautiful%20food%20photography%20minimal%20clean%20background&width=500&height=360&seq=cafe_menu_09&orientation=landscape', hot: false },
  { id: 10, cat: 'Trà & Nước', name: 'Trà Sữa Trân Châu', price: 45000, image: 'https://readdy.ai/api/search-image?query=bubble%20milk%20tea%20boba%20pearls%20Vietnamese%20cafe%20drink%20beautiful%20glass%20food%20photography%20minimal%20clean%20background&width=500&height=360&seq=cafe_menu_10&orientation=landscape', hot: false },
  { id: 11, cat: 'Bánh & Ăn Nhẹ', name: 'Tiramisu Ý', price: 65000, image: 'https://readdy.ai/api/search-image?query=tiramisu%20Italian%20dessert%20cafe%20beautiful%20food%20photography%20elegant%20minimal%20white%20plate%20cocoa%20powder%20cream%20layers&width=500&height=360&seq=cafe_menu_11&orientation=landscape', hot: false },
  { id: 12, cat: 'Đặc Biệt', name: 'Affogato Caramel', price: 55000, image: 'https://readdy.ai/api/search-image?query=affogato%20ice%20cream%20espresso%20caramel%20sauce%20beautiful%20glass%20cafe%20dessert%20food%20photography%20minimal%20elegant&width=500&height=360&seq=cafe_menu_12&orientation=landscape', hot: true },
];

const gallery = [
  'https://readdy.ai/api/search-image?query=cozy%20specialty%20coffee%20shop%20interior%20Vietnam%20warm%20brown%20wooden%20tones%20barista%20making%20coffee%20beautiful%20atmosphere%20soft%20lighting%20elegant%20minimal%20cafe%20ambiance%20morning%20light&width=600&height=400&seq=cafe_gal_01&orientation=landscape',
  'https://readdy.ai/api/search-image?query=coffee%20shop%20latte%20art%20close%20up%20beautiful%20cappuccino%20rosetta%20foam%20art%20ceramic%20cup%20warm%20tones%20professional%20food%20photography&width=600&height=400&seq=cafe_gal_02&orientation=landscape',
  'https://readdy.ai/api/search-image?query=cafe%20outdoor%20seating%20terrace%20Vietnam%20warm%20afternoon%20sunlight%20wooden%20tables%20plants%20cozy%20atmosphere%20beautiful&width=600&height=400&seq=cafe_gal_03&orientation=landscape',
  'https://readdy.ai/api/search-image?query=coffee%20beans%20roasting%20machine%20specialty%20cafe%20Vietnam%20warm%20brown%20tones%20professional%20photography%20close%20up&width=600&height=400&seq=cafe_gal_04&orientation=landscape',
  'https://readdy.ai/api/search-image?query=cafe%20pastry%20display%20case%20croissants%20cakes%20desserts%20beautiful%20warm%20lighting%20glass%20shelves%20elegant%20minimal&width=600&height=400&seq=cafe_gal_05&orientation=landscape',
  'https://readdy.ai/api/search-image?query=cafe%20bar%20counter%20espresso%20machine%20professional%20barista%20working%20warm%20lighting%20Vietnam%20beautiful%20atmosphere&width=600&height=400&seq=cafe_gal_06&orientation=landscape',
];

const cats = ['Tất Cả', 'Cà Phê', 'Trà & Nước', 'Bánh & Ăn Nhẹ', 'Đặc Biệt'];

const branches = [
  { name: 'Chi Nhánh Hoàn Kiếm', addr: '12 Hàng Gai, Hoàn Kiếm, Hà Nội', hours: '07:00 – 22:00', img: 'https://readdy.ai/api/search-image?query=coffee%20shop%20storefront%20Vietnam%20old%20quarter%20Hanoi%20street%20view%20warm%20evening%20lights%20cozy%20entrance%20beautiful&width=400&height=280&seq=cafe_br1&orientation=landscape' },
  { name: 'Chi Nhánh Ba Đình', addr: '45 Đội Cấn, Ba Đình, Hà Nội', hours: '07:00 – 22:00', img: 'https://readdy.ai/api/search-image?query=modern%20coffee%20shop%20exterior%20Vietnam%20urban%20street%20clean%20facade%20glass%20windows%20warm%20lighting%20beautiful&width=400&height=280&seq=cafe_br2&orientation=landscape' },
  { name: 'Chi Nhánh Cầu Giấy', addr: '88 Xuân Thủy, Cầu Giấy, Hà Nội', hours: '07:30 – 22:30', img: 'https://readdy.ai/api/search-image?query=cozy%20coffee%20shop%20corner%20Vietnam%20modern%20interior%20plants%20warm%20lighting%20comfortable%20seating%20beautiful&width=400&height=280&seq=cafe_br3&orientation=landscape' },
];

const reviews = [
  { name: 'Nguyễn Văn Hùng', text: 'Cold Brew ở đây ngon nhất Hà Nội! Không gian yên tĩnh, rất thích hợp để làm việc.', rating: 5, date: '20/04/2025' },
  { name: 'Trần Thị Mai', text: 'Bánh croissant giòn rụm, bơ thơm. Matcha latte đậm vị, không bị ngọt quá.', rating: 5, date: '18/04/2025' },
  { name: 'Lê Minh Tuấn', text: 'Nhân viên thân thiện, phục vụ nhanh. Loyalty card tích điểm rất tiện lợi.', rating: 4, date: '15/04/2025' },
];

export default function DemoCafe() {
  const [activeCat, setActiveCat] = useState('Tất Cả');
  const [cart, setCart] = useState<Record<number, number>>({});
  const [showCart, setShowCart] = useState(false);
  const [loyalty, setLoyalty] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filtered = activeCat === 'Tất Cả' ? menuDrinks : menuDrinks.filter(d => d.cat === activeCat);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = menuDrinks.reduce((s, d) => s + (cart[d.id] || 0) * d.price, 0);
  const addItem = (id: number) => setCart(p => ({ ...p, [id]: (p[id] || 0) + 1 }));
  const removeItem = (id: number) => setCart(p => { const n = { ...p }; if (n[id] > 0) n[id]--; return n; });

  return (
    <div className="min-h-screen bg-[#1A0F0A] font-sans">
      {/* Header */}
      <header className="bg-[#1A0F0A]/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-700 flex items-center justify-center flex-shrink-0">
              <i className="ri-cup-line text-amber-200 text-base"></i>
            </div>
            <div>
              <div className="font-extrabold text-white text-base tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>THE BREW CO.</div>
              <div className="text-amber-500 text-[10px] tracking-widest font-medium">SPECIALTY COFFEE · HÀ NỘI</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-white/60">
            {['Thực Đơn', 'Chi Nhánh', 'Loyalty', 'Về Chúng Tôi'].map(n => (
              <button key={n} className="cursor-pointer hover:text-amber-400 transition-colors">{n}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => totalItems > 0 && setShowCart(true)} className="relative cursor-pointer">
              <div className="flex items-center gap-1.5 border border-amber-700/50 text-amber-400 text-xs font-semibold px-3 py-2 rounded-full">
                <i className="ri-shopping-bag-line"></i>
                {totalItems > 0 ? `${totalItems} ly` : 'Order'}
              </div>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">{totalItems}</span>}
            </button>
            <a href="tel:0901234567" className="hidden md:flex items-center gap-1.5 bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer whitespace-nowrap hover:bg-amber-500 transition-colors">
              <i className="ri-phone-fill text-xs"></i>Đặt Chỗ
            </a>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-9 h-9 flex items-center justify-center text-white/60">
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-2 bg-[#1A0F0A]">
            {['Thực Đơn', 'Chi Nhánh', 'Loyalty', 'Về Chúng Tôi'].map(n => (
              <button key={n} className="block w-full text-left text-sm text-white/60 py-1 cursor-pointer hover:text-amber-400">{n}</button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <div className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <img src="https://readdy.ai/api/search-image?query=cozy%20specialty%20coffee%20shop%20interior%20Vietnam%20warm%20brown%20wooden%20tones%20barista%20making%20coffee%20beautiful%20atmosphere%20soft%20lighting%20elegant%20minimal%20cafe%20ambiance%20morning%20light&width=1400&height=800&seq=cafe_hero_main&orientation=landscape" alt="The Brew Co." className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A]/40 via-[#1A0F0A]/10 to-[#1A0F0A]"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="inline-block bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest">3 CHI NHÁNH · HÀ NỘI</span>
          <h1 className="text-3xl md:text-6xl font-black text-white mb-4 drop-shadow" style={{ fontFamily: 'Georgia, serif' }}>
            Hương Vị<br /><span className="text-amber-400">Thuần Khiết</span>
          </h1>
          <p className="text-white/70 text-base max-w-lg mb-8">Specialty coffee rang xay tươi mỗi ngày — không gian yên tĩnh để làm việc, gặp gỡ và tận hưởng.</p>
          <div className="flex gap-3 flex-col sm:flex-row">
            <a href="#menu" className="bg-amber-600 text-white px-8 py-3.5 rounded-full font-extrabold cursor-pointer hover:bg-amber-500 transition-colors whitespace-nowrap text-sm">
              <i className="ri-cup-line mr-1.5"></i>Xem Thực Đơn
            </a>
            <button onClick={() => setLoyalty(true)} className="border border-white/30 text-white px-8 py-3.5 rounded-full font-bold cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap text-sm">
              <i className="ri-vip-crown-line mr-1.5"></i>Loyalty Card
            </button>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-amber-700 py-3">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-amber-100 text-sm font-medium">
          <span><i className="ri-time-line mr-1.5"></i>07:00 – 22:30 · Mở cửa mỗi ngày</span>
          <span><i className="ri-map-pin-line mr-1.5"></i>3 Chi Nhánh tại Hà Nội</span>
          <span><i className="ri-truck-line mr-1.5"></i>Giao Hàng Grab · Baemin</span>
          <span><i className="ri-star-fill mr-1"></i>4.8 · 2.1K đánh giá</span>
        </div>
      </div>

      {/* About */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="grid grid-cols-3 gap-3">
          {[
            'https://readdy.ai/api/search-image?query=barista%20hands%20making%20pour%20over%20coffee%20Vietnamese%20cafe%20beautiful%20close%20up%20professional%20photography%20warm%20tones%20wooden%20counter&width=500&height=360&seq=cafe_about_01&orientation=landscape',
            'https://readdy.ai/api/search-image?query=coffee%20beans%20roasting%20specialty%20single%20origin%20Vietnam%20beautiful%20macro%20photography%20warm%20brown%20tones%20dark%20background&width=500&height=360&seq=cafe_about_02&orientation=landscape',
            'https://readdy.ai/api/search-image?query=cozy%20cafe%20corner%20seat%20wooden%20table%20window%20light%20Vietnam%20coffee%20shop%20interior%20minimal%20warm%20afternoon&width=500&height=360&seq=cafe_about_03&orientation=landscape',
          ].map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden">
              <img src={img} alt="" className="w-full h-36 object-cover object-center hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
        <div>
          <span className="text-amber-500 text-xs font-bold tracking-widest">CÂU CHUYỆN CỦA CHÚNG TÔI</span>
          <h2 className="text-2xl md:text-4xl font-black text-white mt-2 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Từ Hạt Cà Phê<br />Đến Ly Trà</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4">The Brew Co. ra đời từ tình yêu với những hạt cà phê Arabica Đắk Lắk và Cầu Đất — mỗi ly đều được pha chế thủ công, đảm bảo hương vị thuần khiết nhất.</p>
          <p className="text-white/50 text-sm leading-relaxed mb-6">Không gian thiết kế theo phong cách Industrial Vintage — nơi bạn có thể làm việc, đọc sách hoặc chỉ đơn giản là tận hưởng sự tĩnh lặng.</p>
          <div className="grid grid-cols-3 gap-4">
            {[['5+', 'Năm'], ['50+', 'Thực Đơn'], ['2.1K+', 'Đánh Giá']].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-black text-amber-400">{n}</div>
                <div className="text-white/40 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white/5 border-t border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-6">
            <span className="text-amber-500 text-xs font-bold tracking-widest">KHÔNG GIAN</span>
            <h2 className="text-2xl font-black text-white mt-2" style={{ fontFamily: 'Georgia, serif' }}>Khám Phá The Brew Co.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((img, i) => (
              <div key={i} className={`rounded-xl overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-1' : ''}`}>
                <img src={img} alt={`Gallery ${i+1}`} className="w-full h-40 md:h-48 object-cover object-center hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu */}
      <div id="menu" className="max-w-6xl mx-auto px-4 md:px-6 pb-10">
        <div className="text-center mb-8">
          <span className="text-amber-500 text-xs font-bold tracking-widest">THỰC ĐƠN</span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2" style={{ fontFamily: 'Georgia, serif' }}>Đặc Sản Của Chúng Tôi</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 justify-center">
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${activeCat === cat ? 'bg-amber-600 text-white' : 'border border-white/20 text-white/60 hover:border-amber-500/50 hover:text-white'}`}>{cat}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-600/40 transition-all group cursor-pointer">
              <div className="relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-44 object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                {item.hot && <span className="absolute top-2 left-2 bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full">☕ HOT</span>}
              </div>
              <div className="p-3">
                <span className="text-white/40 text-[10px]">{item.cat}</span>
                <h3 className="text-white font-semibold text-sm mt-0.5 mb-2">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-black text-sm">{item.price.toLocaleString()}đ</span>
                  <div className="flex items-center gap-1">
                    {cart[item.id] > 0 && (
                      <>
                        <button onClick={() => removeItem(item.id)} className="w-6 h-6 flex items-center justify-center rounded-full border border-white/20 text-white cursor-pointer"><i className="ri-subtract-line text-xs"></i></button>
                        <span className="text-white text-xs font-bold w-4 text-center">{cart[item.id]}</span>
                      </>
                    )}
                    <button onClick={() => addItem(item.id)} className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-600 text-white cursor-pointer hover:bg-amber-500"><i className="ri-add-line text-xs"></i></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white/5 border-t border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-6">
            <span className="text-amber-500 text-xs font-bold tracking-widest">ĐÁNH GIÁ</span>
            <h2 className="text-2xl font-black text-white mt-2" style={{ fontFamily: 'Georgia, serif' }}>Khách Hàng Nói Gì?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {reviews.map(r => (
              <div key={r.name} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="text-amber-400 text-sm mb-2">{'★'.repeat(r.rating)}</div>
                <p className="text-white/60 text-sm leading-relaxed mb-3">"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">{r.name}</span>
                  <span className="text-white/30 text-xs">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Branches */}
      <div className="bg-white/5 border-t border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl font-black text-white mb-8" style={{ fontFamily: 'Georgia, serif' }}>Hệ Thống Chi Nhánh</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {branches.map(b => (
              <div key={b.name} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-amber-600/40 transition-all">
                <img src={b.img} alt={b.name} className="w-full h-36 object-cover object-center" />
                <div className="p-5">
                  <div className="w-10 h-10 flex items-center justify-center bg-amber-700/30 rounded-xl mb-3">
                    <i className="ri-store-2-line text-amber-400 text-lg"></i>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{b.name}</h3>
                  <p className="text-white/40 text-xs mb-1"><i className="ri-map-pin-line mr-1"></i>{b.addr}</p>
                  <p className="text-amber-400 text-xs font-medium"><i className="ri-time-line mr-1"></i>{b.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loyalty Popup */}
      {loyalty && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setLoyalty(false)}>
          <div className="bg-[#2A1A0F] border border-amber-700/40 rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-4">
              <i className="ri-vip-crown-fill text-5xl text-amber-400 block mb-3"></i>
              <h3 className="text-white font-black text-xl mb-2">The Brew Loyalty</h3>
              <p className="text-white/50 text-sm">Tích điểm mỗi lần mua — đổi thức uống miễn phí!</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[['1 ly', '1 điểm'], ['10 điểm', '1 ly miễn phí'], ['Sinh nhật', 'Uống miễn phí']].map(([k, v]) => (
                <div key={k} className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-amber-400 font-bold text-sm">{k}</div>
                  <div className="text-white/40 text-[10px] mt-0.5">{v}</div>
                </div>
              ))}
            </div>
            <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-amber-600 text-white font-bold py-3 rounded-xl cursor-pointer hover:bg-amber-500 transition-colors w-full mb-2">
              <i className="ri-message-2-fill"></i>Đăng Ký Qua Zalo
            </a>
            <button onClick={() => setLoyalty(false)} className="w-full text-white/30 text-sm cursor-pointer py-1">Đóng</button>
          </div>
        </div>
      )}

      {/* Order Cart */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center p-0 md:p-4" onClick={() => setShowCart(false)}>
          <div className="bg-[#2A1A0F] border border-amber-700/30 rounded-t-2xl md:rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">Đơn Order</h3>
              <button onClick={() => setShowCart(false)} className="text-white/40 cursor-pointer"><i className="ri-close-line text-xl"></i></button>
            </div>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {menuDrinks.filter(d => cart[d.id] > 0).map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-white/80">{item.name} x{cart[item.id]}</span>
                  <span className="text-amber-400 font-semibold">{(item.price * cart[item.id]).toLocaleString()}đ</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-3 mb-4 flex justify-between">
              <span className="text-white font-bold">Tổng</span>
              <span className="text-amber-400 font-black text-lg">{totalPrice.toLocaleString()}đ</span>
            </div>
            <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-amber-600 text-white font-black py-3 rounded-xl cursor-pointer hover:bg-amber-500 transition-colors w-full">
              <i className="ri-message-2-fill"></i>Gửi Đơn Qua Zalo
            </a>
          </div>
        </div>
      )}

      <footer className="bg-[#0D0806] border-t border-white/5 py-8 text-center">
        <div className="text-white font-extrabold text-xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>THE BREW CO.</div>
        <p className="text-white/20 text-xs">© 2025 The Brew Co. · Thiết kế bởi <span className="text-[#00C2E0] font-semibold">WebPro Studio</span></p>
      </footer>
    </div>
  );
}