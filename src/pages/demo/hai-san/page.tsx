import { useState } from 'react';

const menuItems = [
  { id: 1, cat: 'Tôm & Mực', name: 'Tôm Hùm Nướng Phô Mai', price: 850000, image: 'https://readdy.ai/api/search-image?query=grilled%20lobster%20with%20cheese%20butter%20Vietnamese%20seafood%20restaurant%20beautiful%20food%20photography%20dark%20elegant%20ocean%20background%20fresh%20premium&width=400&height=300&seq=hs01&orientation=landscape', badge: 'ĐẶC BIỆT', rating: 4.9 },
  { id: 2, cat: 'Tôm & Mực', name: 'Mực Nướng Sa Tế', price: 180000, image: 'https://readdy.ai/api/search-image?query=grilled%20squid%20satay%20Vietnamese%20seafood%20restaurant%20food%20photography%20dark%20background%20fresh%20ocean%20seafood%20platter%20sizzling&width=400&height=300&seq=hs02&orientation=landscape', badge: '', rating: 4.7 },
  { id: 3, cat: 'Cua & Ghẹ', name: 'Cua Biển Hấp Bia', price: 450000, image: 'https://readdy.ai/api/search-image?query=steamed%20sea%20crab%20Vietnamese%20seafood%20restaurant%20food%20photography%20dark%20elegant%20beautiful%20ocean%20crab%20steamed%20beer%20herbs&width=400&height=300&seq=hs03&orientation=landscape', badge: 'HOT', rating: 4.8 },
  { id: 4, cat: 'Cua & Ghẹ', name: 'Ghẹ Rang Me Chua Ngọt', price: 320000, image: 'https://readdy.ai/api/search-image?query=Vietnamese%20swimming%20crab%20tamarind%20sauce%20seafood%20restaurant%20beautiful%20food%20photography%20fresh%20stir%20fried%20ocean%20crab%20dark%20background&width=400&height=300&seq=hs04&orientation=landscape', badge: '', rating: 4.6 },
  { id: 5, cat: 'Cá & Tôm', name: 'Cá Hồi Sashimi Tươi', price: 280000, image: 'https://readdy.ai/api/search-image?query=salmon%20sashimi%20fresh%20Japanese%20Vietnamese%20seafood%20restaurant%20food%20photography%20dark%20elegant%20premium%20raw%20fish%20platter%20beautiful%20presentation&width=400&height=300&seq=hs05&orientation=landscape', badge: 'TƯƠI', rating: 4.9 },
  { id: 6, cat: 'Cá & Tôm', name: 'Tôm Sú Hấp Gừng', price: 220000, image: 'https://readdy.ai/api/search-image?query=steamed%20tiger%20prawns%20ginger%20Vietnamese%20seafood%20restaurant%20beautiful%20food%20photography%20fresh%20large%20prawns%20dark%20ocean%20background%20elegant&width=400&height=300&seq=hs06&orientation=landscape', badge: '', rating: 4.7 },
  { id: 7, cat: 'Lẩu Hải Sản', name: 'Lẩu Hải Sản Thái Chua Cay', price: 480000, image: 'https://readdy.ai/api/search-image?query=Thai%20seafood%20hot%20pot%20lau%20hai%20san%20Vietnamese%20restaurant%20food%20photography%20dark%20background%20spicy%20sour%20soup%20lobster%20shrimp%20crab&width=400&height=300&seq=hs07&orientation=landscape', badge: 'HOT', rating: 4.8 },
  { id: 8, cat: 'Lẩu Hải Sản', name: 'Lẩu Mực & Hàu Nướng', price: 380000, image: 'https://readdy.ai/api/search-image?query=seafood%20hotpot%20squid%20oyster%20Vietnamese%20restaurant%20food%20photography%20dark%20elegant%20fresh%20ocean%20seafood%20lau&width=400&height=300&seq=hs08&orientation=landscape', badge: '', rating: 4.5 },
];

const cats = ['Tất Cả', 'Tôm & Mực', 'Cua & Ghẹ', 'Cá & Tôm', 'Lẩu Hải Sản'];

const reviews = [
  { name: 'Hoàng Văn Nam', date: '15/06/2025', star: 5, text: 'Tôm hùm nướng phô mai ở đây ngon nhất Hà Nội! Hải sản tươi sống, phục vụ chuyên nghiệp.' },
  { name: 'Trần Thị Bích', date: '10/06/2025', star: 5, text: 'Cua biển hấp bia thơm ngon tuyệt vời. Không gian sang trọng, view biển rất đẹp.' },
  { name: 'Lê Minh Châu', date: '05/06/2025', star: 4, text: 'Lẩu hải sản đậm đà, rất nhiều hải sản tươi. Sẽ quay lại lần sau.' },
];

export default function DemoHaiSan() {
  const [activeCat, setActiveCat] = useState('Tất Cả');
  const [order, setOrder] = useState<Record<number, number>>({});
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [tableForm, setTableForm] = useState({ name: '', phone: '', date: '', guests: '2', time: '' });
  const [showBook, setShowBook] = useState(false);
  const [booked, setBooked] = useState(false);

  const filtered = activeCat === 'Tất Cả' ? menuItems : menuItems.filter(m => m.cat === activeCat);
  const totalItems = Object.values(order).reduce((a, b) => a + b, 0);
  const totalPrice = menuItems.reduce((s, m) => s + (order[m.id] || 0) * m.price, 0);
  const addItem = (id: number) => setOrder(p => ({ ...p, [id]: (p[id] || 0) + 1 }));
  const removeItem = (id: number) => setOrder(p => { const n = { ...p }; if (n[id] > 0) n[id]--; return n; });

  return (
    <div className="min-h-screen" style={{ background: '#071520', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ background: 'rgba(7,21,32,0.95)', borderBottom: '1px solid rgba(6,182,212,0.2)' }} className="sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#0284c7,#06b6d4)' }}>
              <i className="ri-anchor-line text-white text-lg"></i>
            </div>
            <div>
              <div className="font-extrabold text-white text-base tracking-wider">ĐẠI DƯƠNG</div>
              <div className="text-[10px] font-bold tracking-widest" style={{ color: '#06b6d4' }}>RESTAURANT & SEAFOOD TƯƠI SỐNG</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {['Thực Đơn', 'Đặt Bàn', 'Về Chúng Tôi', 'Liên Hệ'].map(n => (
              <button key={n} className="cursor-pointer hover:text-white transition-colors whitespace-nowrap" style={{}}>{n}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => totalItems > 0 && setShowOrderSummary(true)} className="relative cursor-pointer">
              <div className="flex items-center gap-1.5 border border-cyan-500/40 text-cyan-400 text-xs font-semibold px-3 py-2 rounded-full">
                <i className="ri-shopping-basket-line"></i>
                {totalItems > 0 ? `${totalItems} món` : 'Giỏ'}
              </div>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">{totalItems}</span>}
            </button>
            <button onClick={() => setShowBook(true)} className="flex items-center gap-1.5 text-white text-xs font-bold px-4 py-2.5 rounded-full cursor-pointer whitespace-nowrap" style={{ background: 'linear-gradient(90deg,#0284c7,#06b6d4)' }}>
              <i className="ri-calendar-check-line"></i>Đặt Bàn
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: '65vh' }}>
        <img src="https://readdy.ai/api/search-image?query=Vietnamese%20seafood%20restaurant%20interior%20dark%20ocean%20teal%20atmosphere%20fresh%20seafood%20display%20tanks%20lobster%20crab%20shrimp%20aquarium%20dim%20lighting%20elegant%20coastal%20dining%20Vietnam&width=1400&height=900&seq=hsHero&orientation=landscape" alt="Đại Dương Seafood" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(7,21,32,0.85) 30%, rgba(7,21,32,0.3) 100%)' }}></div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,21,32,0.9) 0%, transparent 60%)' }}></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 mb-5">
              {[1,2,3,4,5].map(s => <i key={s} className="ri-star-fill text-yellow-400 text-sm"></i>)}
              <span className="text-white/60 text-xs ml-1">Nhà Hàng 5 Sao · Hà Nội</span>
            </div>
            <h1 className="font-black text-white leading-tight mb-4 max-w-xl" style={{ fontSize: 'clamp(1.8rem,5vw,3.5rem)', fontFamily: 'Georgia, serif' }}>
              Hải Sản Tươi Sống<br /><span style={{ color: '#06b6d4' }}>Từ Đại Dương</span><br />Đến Bàn Ăn
            </h1>
            <p className="text-sm max-w-md mb-8" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.7' }}>Hải sản sống nhập hàng ngày — tôm hùm, cua biển, mực tươi. Không gian sang trọng, phục vụ tận tâm.</p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <a href="#menu" className="flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-full cursor-pointer transition-all whitespace-nowrap text-sm" style={{ background: 'linear-gradient(90deg,#0284c7,#06b6d4)' }}>
                <i className="ri-restaurant-line"></i>Xem Thực Đơn
              </a>
              <button onClick={() => setShowBook(true)} className="border text-white font-bold px-8 py-3.5 rounded-full cursor-pointer hover:bg-white/10 transition-all whitespace-nowrap text-sm" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
                <i className="ri-calendar-line mr-1.5"></i>Đặt Bàn Ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div style={{ background: 'linear-gradient(90deg,#0284c7,#0891b2)', padding: '12px 0' }}>
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-white text-sm font-medium">
          <span><i className="ri-time-line mr-1.5"></i>10:00 – 22:00 · 7 ngày/tuần</span>
          <span><i className="ri-map-pin-line mr-1.5"></i>45 Lý Tự Trọng, Q.1, TP.HCM</span>
          <span><i className="ri-award-fill mr-1.5"></i>Top 10 Nhà Hàng Hải Sản 2024</span>
          <span><i className="ri-group-line mr-1.5"></i>Sức chứa 200 khách</span>
        </div>
      </div>

      {/* Specialty banner */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { img: 'https://readdy.ai/api/search-image?query=fresh%20live%20lobster%20tank%20seafood%20restaurant%20Vietnamese%20premium%20aquarium%20close%20up%20beautiful&width=300&height=200&seq=hs_sp1&orientation=landscape', label: 'Tôm Hùm Sống' },
          { img: 'https://readdy.ai/api/search-image?query=fresh%20live%20sea%20crab%20Vietnamese%20seafood%20restaurant%20tank%20aquarium%20premium%20beautiful&width=300&height=200&seq=hs_sp2&orientation=landscape', label: 'Cua Biển Sống' },
          { img: 'https://readdy.ai/api/search-image?query=fresh%20oysters%20clams%20seafood%20display%20on%20ice%20Vietnamese%20restaurant%20premium%20ocean&width=300&height=200&seq=hs_sp3&orientation=landscape', label: 'Hàu & Sò Tươi' },
          { img: 'https://readdy.ai/api/search-image?query=fresh%20prawns%20tiger%20shrimp%20Vietnamese%20seafood%20restaurant%20display%20ice%20fresh%20ocean%20premium&width=300&height=200&seq=hs_sp4&orientation=landscape', label: 'Tôm Sú Sống' },
        ].map(item => (
          <div key={item.label} className="relative rounded-xl overflow-hidden cursor-pointer group">
            <img src={item.img} alt={item.label} className="w-full h-28 md:h-36 object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(to top, rgba(7,21,32,0.85) 0%, transparent 60%)' }}></div>
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="text-white font-bold text-xs">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div id="menu" className="max-w-6xl mx-auto px-4 md:px-6 pb-10">
        <div className="text-center mb-8">
          <span className="text-xs font-bold tracking-widest" style={{ color: '#06b6d4' }}>THỰC ĐƠN</span>
          <h2 className="font-black text-white mt-2 text-2xl md:text-3xl" style={{ fontFamily: 'Georgia, serif' }}>Hải Sản Tươi Sống Mỗi Ngày</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 justify-center">
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition-all flex-shrink-0`} style={activeCat === cat ? { background: 'linear-gradient(90deg,#0284c7,#06b6d4)', color: 'white' } : { border: '1px solid rgba(6,182,212,0.3)', color: 'rgba(255,255,255,0.6)' }}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="rounded-2xl overflow-hidden border transition-all group cursor-pointer hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(6,182,212,0.15)' }}>
              <div className="relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-36 md:h-44 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                {item.badge && <span className="absolute top-2 left-2 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: item.badge === 'TƯƠI' ? '#059669' : item.badge === 'ĐẶC BIỆT' ? '#7C3AED' : '#DC2626' }}>{item.badge}</span>}
              </div>
              <div className="p-3">
                <span className="text-[10px]" style={{ color: 'rgba(6,182,212,0.7)' }}>{item.cat}</span>
                <h3 className="text-white font-semibold text-xs mt-0.5 mb-2 leading-tight">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-black text-sm" style={{ color: '#06b6d4' }}>{item.price.toLocaleString()}đ</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <i className="ri-star-fill text-yellow-400 text-[10px]"></i>
                      <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {order[item.id] > 0 && (
                      <>
                        <button onClick={() => removeItem(item.id)} className="w-6 h-6 flex items-center justify-center rounded-full border cursor-pointer" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}><i className="ri-subtract-line text-xs"></i></button>
                        <span className="text-white text-xs font-bold w-4 text-center">{order[item.id]}</span>
                      </>
                    )}
                    <button onClick={() => addItem(item.id)} className="w-7 h-7 flex items-center justify-center rounded-full text-white cursor-pointer" style={{ background: 'linear-gradient(135deg,#0284c7,#06b6d4)' }}><i className="ri-add-line text-sm"></i></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="border-t border-y py-12" style={{ borderColor: 'rgba(6,182,212,0.1)', background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold tracking-widest" style={{ color: '#06b6d4' }}>VỀ CHÚNG TÔI</span>
            <h2 className="font-black text-white mt-2 mb-4 text-2xl md:text-3xl" style={{ fontFamily: 'Georgia, serif' }}>
              20 Năm Truyền Thống<br />Hải Sản Tươi Ngon
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>Đại Dương Restaurant ra đời năm 2004 — chuyên cung cấp hải sản sống nhập trực tiếp từ Vũng Tàu, Phú Quốc và Quảng Ninh mỗi sáng sớm.</p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>Đội ngũ đầu bếp 15+ năm kinh nghiệm với các kỹ thuật chế biến hải sản đặc trưng miền Nam — giữ trọn vị tươi ngon tự nhiên.</p>
            <div className="grid grid-cols-3 gap-4">
              {[['20+', 'Năm'], ['100+', 'Món'], ['50K+', 'Khách']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-black text-2xl" style={{ color: '#06b6d4' }}>{n}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              'https://readdy.ai/api/search-image?query=seafood%20restaurant%20kitchen%20chef%20preparing%20fresh%20seafood%20Vietnamese%20professional%20cooking%20dark%20elegant&width=400&height=300&seq=hsab1&orientation=landscape',
              'https://readdy.ai/api/search-image?query=fresh%20seafood%20display%20on%20ice%20restaurant%20Vietnamese%20premium%20lobster%20crab%20shrimp%20beautiful%20ocean&width=400&height=300&seq=hsab2&orientation=landscape',
              'https://readdy.ai/api/search-image?query=Vietnamese%20seafood%20restaurant%20dining%20room%20elegant%20ocean%20dark%20atmosphere%20table%20setting%20beautiful&width=400&height=300&seq=hsab3&orientation=landscape',
              'https://readdy.ai/api/search-image?query=seafood%20dish%20plating%20Vietnamese%20restaurant%20premium%20beautiful%20food%20photography%20lobster%20fish%20prawn%20elegant&width=400&height=300&seq=hsab4&orientation=landscape',
            ].map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <img src={img} alt="" className="w-full h-32 object-cover object-center hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-8">
          <span className="text-xs font-bold tracking-widest" style={{ color: '#06b6d4' }}>ĐÁNH GIÁ KHÁCH HÀNG</span>
          <h2 className="font-black text-white mt-2 text-2xl" style={{ fontFamily: 'Georgia, serif' }}>Khách Hàng Nói Gì?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {reviews.map(r => (
            <div key={r.name} className="rounded-2xl p-5 border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(6,182,212,0.15)' }}>
              <div className="flex gap-0.5 mb-3">
                {Array.from({length: r.star}).map((_, i) => <i key={i} className="ri-star-fill text-yellow-400 text-xs"></i>)}
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>"{r.text}"</p>
              <div>
                <div className="text-white font-bold text-xs">{r.name}</div>
                <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{r.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      {showOrderSummary && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end md:items-center justify-center p-0 md:p-4" onClick={() => setShowOrderSummary(false)}>
          <div className="rounded-t-2xl md:rounded-2xl p-6 w-full max-w-md" style={{ background: '#0B2030', border: '1px solid rgba(6,182,212,0.2)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">Đơn Hàng</h3>
              <button onClick={() => setShowOrderSummary(false)} className="cursor-pointer" style={{ color: 'rgba(255,255,255,0.4)' }}><i className="ri-close-line text-xl"></i></button>
            </div>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {menuItems.filter(m => order[m.id] > 0).map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>{item.name} x{order[item.id]}</span>
                  <span className="font-semibold" style={{ color: '#06b6d4' }}>{(item.price * order[item.id]).toLocaleString()}đ</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 mb-4 flex justify-between" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <span className="text-white font-bold">Tổng</span>
              <span className="font-black text-lg" style={{ color: '#06b6d4' }}>{totalPrice.toLocaleString()}đ</span>
            </div>
            <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-white font-black py-3 rounded-xl cursor-pointer w-full" style={{ background: 'linear-gradient(90deg,#0284c7,#06b6d4)' }}>
              <i className="ri-message-2-fill"></i>Đặt Qua Zalo
            </a>
          </div>
        </div>
      )}

      {/* Book Table Modal */}
      {showBook && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => { setShowBook(false); setBooked(false); }}>
          <div className="rounded-2xl p-6 max-w-sm w-full" style={{ background: '#0B2030', border: '1px solid rgba(6,182,212,0.3)' }} onClick={e => e.stopPropagation()}>
            {booked ? (
              <div className="text-center py-4">
                <i className="ri-checkbox-circle-fill text-5xl text-cyan-400 block mb-3"></i>
                <h3 className="text-white font-black text-xl mb-2">Đặt Bàn Thành Công!</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Nhà hàng sẽ xác nhận qua SĐT trong 15 phút.</p>
                <button onClick={() => { setShowBook(false); setBooked(false); }} className="mt-4 text-white font-bold px-8 py-2.5 rounded-xl cursor-pointer" style={{ background: 'linear-gradient(90deg,#0284c7,#06b6d4)' }}>Đóng</button>
              </div>
            ) : (
              <>
                <h3 className="text-white font-black text-lg mb-4">Đặt Bàn Trước</h3>
                <div className="space-y-3">
                  <input value={tableForm.name} onChange={e => setTableForm(p => ({...p, name: e.target.value}))} placeholder="Họ và tên" className="w-full rounded-xl px-4 py-2.5 text-sm outline-none text-white placeholder:text-white/30" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(6,182,212,0.2)' }} />
                  <input value={tableForm.phone} onChange={e => setTableForm(p => ({...p, phone: e.target.value}))} placeholder="Số điện thoại" className="w-full rounded-xl px-4 py-2.5 text-sm outline-none text-white placeholder:text-white/30" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(6,182,212,0.2)' }} />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="date" value={tableForm.date} onChange={e => setTableForm(p => ({...p, date: e.target.value}))} className="rounded-xl px-3 py-2.5 text-sm outline-none text-white cursor-pointer" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(6,182,212,0.2)' }} />
                    <select value={tableForm.time} onChange={e => setTableForm(p => ({...p, time: e.target.value}))} className="rounded-xl px-3 py-2.5 text-sm outline-none text-white cursor-pointer" style={{ background: '#0B2030', border: '1px solid rgba(6,182,212,0.2)' }}>
                      <option value="">Giờ ăn</option>
                      {['11:00','12:00','13:00','17:00','18:00','19:00','20:00'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <select value={tableForm.guests} onChange={e => setTableForm(p => ({...p, guests: e.target.value}))} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none text-white cursor-pointer" style={{ background: '#0B2030', border: '1px solid rgba(6,182,212,0.2)' }}>
                    {['1','2','3','4','5','6','7','8','10+'].map(n => <option key={n}>{n} người</option>)}
                  </select>
                </div>
                <button onClick={() => tableForm.name && tableForm.phone && setBooked(true)} className="mt-4 w-full text-white font-bold py-3 rounded-xl cursor-pointer" style={{ background: 'linear-gradient(90deg,#0284c7,#06b6d4)' }}>
                  Xác Nhận Đặt Bàn
                </button>
                <button onClick={() => setShowBook(false)} className="w-full mt-2 text-sm cursor-pointer py-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Đóng</button>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="border-t py-8 text-center" style={{ background: '#050F18', borderColor: 'rgba(6,182,212,0.1)' }}>
        <div className="font-extrabold text-white text-xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>ĐẠI DƯƠNG RESTAURANT</div>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>© 2025 Đại Dương Seafood · Thiết kế bởi <span style={{ color: '#00C2E0', fontWeight: 600 }}>WebPro Studio</span></p>
      </footer>
    </div>
  );
}
