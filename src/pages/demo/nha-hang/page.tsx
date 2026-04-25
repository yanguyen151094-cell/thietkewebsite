import { useState } from 'react';

const menuItems = [
  { id: 1, cat: 'Khai Vị', name: 'Gỏi Cuốn Tôm Thịt (4 cuốn)', price: 65000, image: 'https://readdy.ai/api/search-image?query=Vietnamese%20fresh%20spring%20rolls%20goi%20cuon%20shrimp%20pork%20beautiful%20food%20photography%20restaurant%20dark%20background%20elegant%20plating%20garnish%20herbs&width=500&height=360&seq=nhr_menu_01&orientation=landscape', hot: true, desc: 'Tôm tươi, thịt heo luộc, rau thơm, bún, cuốn bánh tráng mỏng' },
  { id: 2, cat: 'Khai Vị', name: 'Chả Giò Hải Sản (6 cái)', price: 85000, image: 'https://readdy.ai/api/search-image?query=Vietnamese%20crispy%20fried%20spring%20rolls%20seafood%20golden%20crunchy%20beautiful%20food%20photography%20dark%20background%20elegant%20plating%20dipping%20sauce&width=500&height=360&seq=nhr_menu_02&orientation=landscape', hot: false, desc: 'Tôm, mực, cua, chiên giòn rụm với nước chấm đặc biệt' },
  { id: 3, cat: 'Món Chính', name: 'Bò Lúc Lắc Sốt Tiêu Đen', price: 195000, image: 'https://readdy.ai/api/search-image?query=Vietnamese%20shaking%20beef%20black%20pepper%20sauce%20sizzling%20cast%20iron%20pan%20beautiful%20food%20photography%20dark%20background%20elegant%20restaurant%20fine%20dining&width=500&height=360&seq=nhr_menu_03&orientation=landscape', hot: true, desc: 'Thịt bò Úc hảo hạng, sốt tiêu đen thượng hạng, ăn kèm cơm chiên bơ' },
  { id: 4, cat: 'Món Chính', name: 'Cá Hồi Áp Chảo Sốt Chanh Dây', price: 245000, image: 'https://readdy.ai/api/search-image?query=pan%20seared%20salmon%20fillet%20passion%20fruit%20sauce%20Vietnamese%20restaurant%20elegant%20food%20photography%20dark%20background%20fine%20dining%20plating%20vegetables&width=500&height=360&seq=nhr_menu_04&orientation=landscape', hot: false, desc: 'Cá hồi Na Uy tươi, sốt chanh dây nhiệt đới, ăn kèm rau củ nướng' },
  { id: 5, cat: 'Món Chính', name: 'Tôm Hùm Hấp Bia 500g', price: 850000, image: 'https://readdy.ai/api/search-image?query=steamed%20whole%20lobster%20beer%20Vietnamese%20restaurant%20luxury%20seafood%20food%20photography%20dark%20background%20elegant%20fine%20dining%20butter%20garlic%20lemon&width=500&height=360&seq=nhr_menu_05&orientation=landscape', hot: true, desc: 'Tôm hùm tươi sống, hấp bia Đức, bơ tỏi, chanh vàng' },
  { id: 6, cat: 'Tráng Miệng', name: 'Chè Ba Màu Đặc Biệt', price: 45000, image: 'https://readdy.ai/api/search-image?query=Vietnamese%20three%20color%20dessert%20layered%20glass%20beautiful%20food%20photography%20elegant%20dark%20background%20sweet%20coconut%20milk%20colorful&width=500&height=360&seq=nhr_menu_06&orientation=landscape', hot: false, desc: 'Đậu đỏ, đậu xanh, thạch pandan, nước cốt dừa thơm ngậy' },
];

const categories = ['Tất Cả', 'Khai Vị', 'Món Chính', 'Tráng Miệng', 'Đồ Uống'];

const gallery = [
  'https://readdy.ai/api/search-image?query=upscale%20Vietnamese%20restaurant%20interior%20dark%20elegant%20warm%20lighting%20luxurious%20atmosphere%20wooden%20decor%20lanterns%20ambient%20mood%20fine%20dining%20night&width=600&height=400&seq=nhr_gal_01&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Vietnamese%20fine%20dining%20restaurant%20table%20setting%20elegant%20flowers%20candles%20dark%20atmosphere%20romantic%20dinner%20couples%20evening&width=600&height=400&seq=nhr_gal_02&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Vietnamese%20restaurant%20professional%20chef%20cooking%20open%20kitchen%20fine%20dining%20modern%20stainless%20steel%20brigade&width=600&height=400&seq=nhr_gal_03&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Vietnamese%20restaurant%20outdoor%20terrace%20garden%20seating%20evening%20lights%20romantic%20warm%20atmosphere%20dining%20al%20fresco&width=600&height=400&seq=nhr_gal_04&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Vietnamese%20restaurant%20bar%20counter%20cocktails%20drinks%20elegant%20dark%20wood%20shelves%20ambient%20bottle%20display%20bartender&width=600&height=400&seq=nhr_gal_05&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Vietnamese%20restaurant%20private%20VIP%20dining%20room%20elegant%20table%20setting%20dark%20luxury%20red%20candles%20exclusive%20curtains&width=600&height=400&seq=nhr_gal_06&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Vietnamese%20fine%20dining%20dessert%20plating%20artistic%20presentation%20dark%20background%20gold%20leaf%20chocolate%20mousse&width=600&height=400&seq=nhr_gal_07&orientation=landscape',
];

const chefImages = [
  { img: 'https://readdy.ai/api/search-image?query=professional%20Vietnamese%20male%20chef%20portrait%20kitchen%20restaurant%20white%20uniform%20confident%20proud%20award%20winning%20culinary%20expert&width=400&height=400&seq=nhr_chef_01&orientation=squarish', name: 'Chef Nguyễn Thanh Bình', role: 'Bếp Trưởng' },
  { img: 'https://readdy.ai/api/search-image?query=female%20Vietnamese%20chef%20portrait%20restaurant%20kitchen%20elegant%20professional%20white%20uniform%20skilled%20culinary%20expert%20smiling&width=400&height=400&seq=nhr_chef_02&orientation=squarish', name: 'Chef Lê Thị Hương', role: 'Bếp Phó' },
  { img: 'https://readdy.ai/api/search-image?query=male%20pastry%20chef%20portrait%20Vietnam%20restaurant%20dessert%20specialist%20elegant%20white%20uniform%20professional%20holding%20cake&width=400&height=400&seq=nhr_chef_03&orientation=squarish', name: 'Chef Trần Minh Khoa', role: 'Bếp Bánh' },
];

export default function DemoNhaHang() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tất Cả');
  const [order, setOrder] = useState<Record<number, number>>({});
  const [showOrder, setShowOrder] = useState(false);
  const [activeItem, setActiveItem] = useState<typeof menuItems[0] | null>(null);
  const [showReserve, setShowReserve] = useState(false);
  const [resForm, setResForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2' });
  const [resDone, setResDone] = useState(false);

  const filteredItems = activeCategory === 'Tất Cả' ? menuItems : menuItems.filter((i) => i.cat === activeCategory);
  const totalItems = Object.values(order).reduce((a, b) => a + b, 0);
  const totalPrice = menuItems.reduce((sum, item) => sum + (order[item.id] || 0) * item.price, 0);

  const addItem = (id: number) => setOrder((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeItem = (id: number) => setOrder((prev) => { const next = { ...prev }; if (next[id] > 0) next[id]--; return next; });

  return (
    <div className="min-h-screen bg-[#0D1117] font-sans">
      {/* Header */}
      <header className="bg-[#0D1117]/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div>
            <div className="font-extrabold text-white text-lg tracking-wide" style={{ fontFamily: 'serif' }}>SAIGON HOUSE</div>
            <div className="text-amber-400 text-[10px] font-semibold tracking-widest">RESTAURANT & FINE DINING ★★★★★</div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-white/60">
            {['Thực Đơn', 'Đặt Bàn', 'Về Chúng Tôi', 'Gallery', 'Liên Hệ'].map((item) => (
              <button key={item} className="cursor-pointer hover:text-amber-400 transition-colors">{item}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => totalItems > 0 && setShowOrder(true)} className="relative cursor-pointer">
              <div className="flex items-center gap-1.5 border border-amber-400/40 text-amber-400 text-xs font-semibold px-3 py-2 rounded-full">
                <i className="ri-shopping-basket-line"></i>
                {totalItems > 0 ? `${totalItems} món` : 'Giỏ'}
              </div>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center">{totalItems}</span>}
            </button>
            <button onClick={() => setShowReserve(true)} className="hidden md:flex items-center gap-1.5 bg-amber-400 text-black text-xs font-bold px-4 py-2 rounded-full cursor-pointer whitespace-nowrap hover:bg-amber-300 transition-colors">
              <i className="ri-calendar-check-line text-xs"></i>Đặt Bàn
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-9 h-9 flex items-center justify-center text-white/60">
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-2 bg-[#0D1117]">
            {['Thực Đơn', 'Đặt Bàn', 'Về Chúng Tôi', 'Gallery', 'Liên Hệ'].map((item) => (
              <button key={item} className="block w-full text-left text-sm text-white/60 py-1 cursor-pointer hover:text-amber-400">{item}</button>
            ))}
            <button onClick={() => setShowReserve(true)} className="w-full bg-amber-400 text-black text-xs font-bold px-4 py-2 rounded-full cursor-pointer mt-2">
              <i className="ri-calendar-check-line text-xs"></i>Đặt Bàn
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <div className="relative h-[65vh] overflow-hidden">
        <img src="https://readdy.ai/api/search-image?query=upscale%20Vietnamese%20restaurant%20interior%20dark%20elegant%20warm%20lighting%20luxurious%20atmosphere%20wooden%20decor%20lanterns%20ambient%20mood%20fine%20dining%20night&width=1400&height=800&seq=nhhero&orientation=landscape" alt="Saigon House" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0D1117]"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest">TP. HỒ CHÍ MINH · 123 LÝ TỰ TRỌNG Q.1</span>
          <h1 className="text-3xl md:text-6xl font-black text-white mb-4 leading-tight" style={{ fontFamily: 'serif' }}>Hương Vị<br /><span className="text-amber-400">Truyền Thống</span></h1>
          <p className="text-white/70 text-base max-w-lg mb-8">Trải nghiệm ẩm thực Việt Nam đích thực — nơi mỗi món ăn là một câu chuyện về quê hương</p>
          <div className="flex gap-3 flex-col sm:flex-row">
            <button onClick={() => setShowReserve(true)} className="bg-amber-400 text-black px-8 py-3.5 rounded-full font-extrabold cursor-pointer hover:bg-amber-300 transition-colors whitespace-nowrap text-sm">
              <i className="ri-calendar-check-line mr-1.5"></i>Đặt Bàn Ngay
            </button>
            <button className="border border-white/30 text-white px-8 py-3.5 rounded-full font-bold cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap text-sm">
              Xem Thực Đơn
            </button>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-amber-400">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex flex-wrap justify-center gap-6 md:gap-12 text-black text-sm font-semibold">
          <span><i className="ri-time-line mr-1.5"></i>10:00 – 22:30 (T2–CN)</span>
          <span><i className="ri-map-pin-line mr-1.5"></i>123 Lý Tự Trọng, Q.1, TP.HCM</span>
          <span><i className="ri-phone-line mr-1.5"></i>0901 234 567</span>
          <span><i className="ri-star-fill mr-1"></i>4.9 · 1.2K đánh giá</span>
        </div>
      </div>

      {/* About */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="text-amber-400 text-xs font-bold tracking-widest">VỀ SAIGON HOUSE</span>
          <h2 className="text-2xl md:text-4xl font-black text-white mt-2 mb-4" style={{ fontFamily: 'serif' }}>Câu Chuyện<br />Từ Mảnh Đất Sài Gòn</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">Thành lập từ 2010, Saigon House mang đến trải nghiệm ẩm thực Việt Nam đỉnh cao — kết hợp hài hòa giữa công thức nấu ăn truyền thống gia đình và kỹ thuật bếp Pháp hiện đại.</p>
          <p className="text-white/60 text-sm leading-relaxed mb-6">Đội ngũ đầu bếp của chúng tôi học tập từ các nhà hàng 5 sao Hà Nội, TP.HCM và Singapore, mang đến những hương vị chuẩn xác nhất của văn hóa ẩm thực ba miền.</p>
          <div className="flex gap-8">
            {[['15+', 'Năm Kinh Nghiệm'], ['30+', 'Đầu Bếp Chuyên Nghiệp'], ['200+', 'Chỗ Ngồi']].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-black text-amber-400">{n}</div>
                <div className="text-white/40 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {gallery.slice(0, 6).map((img, i) => (
            <div key={i} className={`rounded-xl overflow-hidden ${i === 0 ? 'col-span-2 row-span-1' : ''}`}>
              <img src={img} alt={`Gallery ${i+1}`} className="w-full h-36 object-cover object-top hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        <div className="text-center mb-8">
          <span className="text-amber-400 text-xs font-bold tracking-widest">THỰC ĐƠN ĐẶC SẮC</span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2" style={{ fontFamily: 'serif' }}>Tinh Túy Ẩm Thực Việt</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 justify-center">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${activeCategory === cat ? 'bg-amber-400 text-black' : 'border border-white/20 text-white/60 hover:border-amber-400/50 hover:text-white'}`}>{cat}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all group cursor-pointer" onClick={() => setActiveItem(item)}>
              <div className="relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-44 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                {item.hot && <span className="absolute top-2 left-2 bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full">🔥 HOT</span>}
                <span className="absolute top-2 right-2 bg-black/60 text-white/80 text-[10px] px-2 py-0.5 rounded-full">{item.cat}</span>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1 leading-tight">{item.name}</h3>
                <p className="text-white/40 text-xs mb-3 line-clamp-2">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-black text-base">{item.price.toLocaleString()}đ</span>
                  <div className="flex items-center gap-1.5">
                    {order[item.id] > 0 && (
                      <>
                        <button onClick={(e) => { e.stopPropagation(); removeItem(item.id); }} className="w-7 h-7 flex items-center justify-center rounded-full border border-white/20 text-white cursor-pointer hover:bg-white/10">
                          <i className="ri-subtract-line text-sm"></i>
                        </button>
                        <span className="text-white font-bold text-sm w-5 text-center">{order[item.id]}</span>
                      </>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); addItem(item.id); }} className="w-7 h-7 flex items-center justify-center rounded-full bg-amber-400 text-black cursor-pointer hover:bg-amber-300">
                      <i className="ri-add-line text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chef Team */}
      <div className="bg-white/5 border-t border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <span className="text-amber-400 text-xs font-bold tracking-widest">ĐỘI NGŨ BẾP</span>
            <h2 className="text-2xl font-black text-white mt-2" style={{ fontFamily: 'serif' }}>Những Bàn Tay Tài Hoa</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {chefImages.map((chef) => (
              <div key={chef.name} className="text-center">
                <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 border-2 border-amber-400/30">
                  <img src={chef.img} alt={chef.name} className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="text-white font-bold text-sm">{chef.name}</h3>
                <p className="text-amber-400 text-xs mt-0.5">{chef.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Popup */}
      {showOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center p-0 md:p-4" onClick={() => setShowOrder(false)}>
          <div className="bg-[#1A1F2E] border border-white/10 rounded-t-2xl md:rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">Đơn Của Bạn</h3>
              <button onClick={() => setShowOrder(false)} className="text-white/40 cursor-pointer"><i className="ri-close-line text-xl"></i></button>
            </div>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {menuItems.filter((i) => order[i.id] > 0).map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm gap-2">
                  <span className="text-white/80 truncate">{item.name} x{order[item.id]}</span>
                  <span className="text-amber-400 font-semibold whitespace-nowrap">{(item.price * order[item.id]).toLocaleString()}đ</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-3 mb-4 flex justify-between">
              <span className="text-white font-bold">Tổng Cộng</span>
              <span className="text-amber-400 font-black text-lg">{totalPrice.toLocaleString()}đ</span>
            </div>
            <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-amber-400 text-black font-black py-3 rounded-xl cursor-pointer hover:bg-amber-300 transition-colors w-full">
              <i className="ri-message-2-fill"></i>Gửi Đơn Qua Zalo
            </a>
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setActiveItem(null)}>
          <div className="bg-[#1A1F2E] rounded-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img src={activeItem.image} alt={activeItem.name} className="w-full h-52 object-cover object-top" />
            <div className="p-5">
              <span className="bg-amber-400/20 text-amber-400 text-xs font-bold px-2 py-1 rounded-full">{activeItem.cat}</span>
              <h3 className="text-white font-black text-xl mt-3 mb-2">{activeItem.name}</h3>
              <p className="text-white/60 text-sm mb-4">{activeItem.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-black text-2xl">{activeItem.price.toLocaleString()}đ</span>
                <button onClick={() => { addItem(activeItem.id); setActiveItem(null); }} className="flex items-center gap-2 bg-amber-400 text-black font-bold px-5 py-2.5 rounded-xl cursor-pointer hover:bg-amber-300">
                  <i className="ri-add-line"></i>Thêm vào Đơn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Modal */}
      {showReserve && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowReserve(false)}>
          <div className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            {resDone ? (
              <div className="text-center py-4">
                <i className="ri-checkbox-circle-fill text-5xl text-emerald-400 block mb-3"></i>
                <h3 className="text-white font-black text-xl mb-2">Đặt Bàn Thành Công!</h3>
                <p className="text-white/50 text-sm">Nhân viên sẽ xác nhận qua SĐT trong 15 phút.</p>
                <button onClick={() => { setShowReserve(false); setResDone(false); }} className="mt-4 bg-amber-400 text-black font-bold px-6 py-2 rounded-full cursor-pointer">Đóng</button>
              </div>
            ) : (
              <>
                <h3 className="text-white font-black text-lg mb-4">Đặt Bàn Trực Tuyến</h3>
                <div className="space-y-3">
                  <input value={resForm.name} onChange={(e) => setResForm(p => ({...p, name: e.target.value}))} placeholder="Họ tên" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 placeholder:text-white/30" />
                  <input value={resForm.phone} onChange={(e) => setResForm(p => ({...p, phone: e.target.value}))} placeholder="Số điện thoại" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 placeholder:text-white/30" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="date" value={resForm.date} onChange={(e) => setResForm(p => ({...p, date: e.target.value}))} className="bg-[#0D1520] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-amber-400 cursor-pointer" />
                    <select value={resForm.time} onChange={(e) => setResForm(p => ({...p, time: e.target.value}))} className="bg-[#0D1520] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-amber-400 cursor-pointer">
                      <option value="">-- Giờ --</option>
                      {['11:00','11:30','12:00','12:30','18:00','18:30','19:00','19:30','20:00'].map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <select value={resForm.guests} onChange={(e) => setResForm(p => ({...p, guests: e.target.value}))} className="w-full bg-[#0D1520] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 cursor-pointer">
                    {['1','2','3','4','5','6','7','8+'].map((n) => <option key={n}>{n} người</option>)}
                  </select>
                </div>
                <button onClick={() => resForm.name && resForm.phone && resForm.date && resForm.time && setResDone(true)} className="mt-4 w-full bg-amber-400 text-black font-black py-3 rounded-xl cursor-pointer hover:bg-amber-300 transition-colors">
                  Xác Nhận Đặt Bàn
                </button>
                <button onClick={() => setShowReserve(false)} className="w-full mt-2 text-white/30 text-sm cursor-pointer">Đóng</button>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="bg-[#080B10] border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-white font-extrabold text-xl mb-2" style={{ fontFamily: 'serif' }}>SAIGON HOUSE</div>
            <p className="text-white/40 text-sm mb-3">Nhà hàng fine dining Việt Nam — hương vị truyền thống, không gian đẳng cấp.</p>
          </div>
          <div>
            <div className="text-white/60 font-bold text-sm mb-3">Giờ Phục Vụ</div>
            <div className="space-y-1 text-white/40 text-sm">
              <div>Thứ 2 – Thứ 6: 10:00 – 22:30</div>
              <div>Thứ 7 – CN: 09:00 – 23:00</div>
              <div className="text-amber-400 font-medium">Đặt bàn khuyến khích trước 1 ngày</div>
            </div>
          </div>
          <div>
            <div className="text-white/60 font-bold text-sm mb-3">Liên Hệ</div>
            <div className="space-y-1 text-white/40 text-sm">
              <div><i className="ri-map-pin-line mr-1.5"></i>123 Lý Tự Trọng, Q.1, TP.HCM</div>
              <div><i className="ri-phone-line mr-1.5"></i>0901 234 567</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 mt-8 pt-6 text-center text-white/20 text-xs">
          © 2025 Saigon House Restaurant · Thiết kế bởi <span className="text-[#00C2E0] font-semibold">WebPro Studio</span>
        </div>
      </footer>
    </div>
  );
}
