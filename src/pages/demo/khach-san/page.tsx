import { useState } from 'react';

const rooms = [
  { id: 1, name: 'Phòng Deluxe View Vườn', price: 850000, image: 'https://readdy.ai/api/search-image?query=cozy%20deluxe%20hotel%20room%20garden%20view%20warm%20wooden%20interior%20clean%20modern%20Vietnamese%20luxury%20accommodation%20bed%20linens&width=600&height=400&seq=ks001&orientation=landscape', guests: 2, size: '32m²', amenities: ['WiFi Cao Tốc', 'TV 55"', 'Điều Hòa', 'Minibar'], badge: 'PHỔ BIẾN' },
  { id: 2, name: 'Phòng Superior View Hồ', price: 1150000, image: 'https://readdy.ai/api/search-image?query=superior%20hotel%20room%20lake%20view%20beautiful%20scenic%20panoramic%20window%20luxury%20Vietnamese%20resort%20accommodation%20modern%20elegant&width=600&height=400&seq=ks002&orientation=landscape', guests: 2, size: '40m²', amenities: ['WiFi Cao Tốc', 'TV 65"', 'Bồn Tắm', 'Ban Công'], badge: 'YÊU THÍCH' },
  { id: 3, name: 'Suite Gia Đình', price: 1850000, image: 'https://readdy.ai/api/search-image?query=spacious%20family%20suite%20hotel%20room%20luxury%20Vietnamese%20resort%20modern%20elegant%20interior%20two%20beds%20living%20area%20warm&width=600&height=400&seq=ks003&orientation=landscape', guests: 4, size: '65m²', amenities: ['WiFi', '2 Phòng Ngủ', 'Bếp Nhỏ', 'Phòng Khách'], badge: 'RỘNG NHẤT' },
];

const gallery = [
  { img: 'https://readdy.ai/api/search-image?query=beautiful%20Vietnamese%20boutique%20hotel%20exterior%20lush%20garden%20pool%20sunrise%20view%20professional%20photography%20landscape&width=600&height=400&seq=ksgal1&orientation=landscape', label: 'Khuôn viên' },
  { img: 'https://readdy.ai/api/search-image?query=cozy%20hotel%20breakfast%20buffet%20table%20morning%20light%20wooden%20rustic%20Vietnamese%20resort%20interior%20food%20photography&width=600&height=400&seq=ksgal2&orientation=landscape', label: 'Bữa sáng' },
  { img: 'https://readdy.ai/api/search-image?query=outdoor%20swimming%20pool%20boutique%20resort%20Dalat%20Vietnam%20tropical%20garden%20sunset%20romantic%20atmosphere%20infinity%20pool&width=600&height=400&seq=ksgal3&orientation=landscape', label: 'Hồ bơi' },
  { img: 'https://readdy.ai/api/search-image?query=luxury%20hotel%20room%20interior%20Vietnamese%20resort%20soft%20lighting%20elegant%20comfortable%20white%20bed%20decor%20premium&width=600&height=400&seq=ksgal4&orientation=landscape', label: 'Phòng nghỉ' },
  { img: 'https://readdy.ai/api/search-image?query=hotel%20spa%20massage%20room%20Vietnam%20luxury%20beauty%20treatment%20wellness%20candles%20tranquil%20serene%20atmosphere&width=600&height=400&seq=ksgal5&orientation=landscape', label: 'Spa' },
  { img: 'https://readdy.ai/api/search-image?query=restaurant%20dining%20area%20boutique%20hotel%20Vietnam%20elegant%20wooden%20interior%20warm%20lighting%20beautiful%20table%20setting%20fine&width=600&height=400&seq=ksgal6&orientation=landscape', label: 'Nhà hàng' },
  { img: 'https://readdy.ai/api/search-image?query=hotel%20outdoor%20garden%20fire%20pit%20bonfire%20evening%20misty%20Dalat%20Vietnam%20romantic%20seating%20cozy%20atmosphere&width=600&height=400&seq=ksgal7&orientation=landscape', label: 'Lửa trại' },
  { img: 'https://readdy.ai/api/search-image?query=hotel%20rooftop%20terrace%20panoramic%20view%20pine%20forest%20mountains%20Dalat%20Vietnam%20morning%20coffee%20sky&width=600&height=400&seq=ksgal8&orientation=landscape', label: 'Sân thượng' },
  { img: 'https://readdy.ai/api/search-image?query=boutique%20hotel%20lobby%20reception%20elegant%20warm%20wooden%20interior%20Vietnam%20cozy%20modern%20minimal%20decor%20artsy&width=600&height=400&seq=ksgal9&orientation=landscape', label: 'Sảnh' },
  { img: 'https://readdy.ai/api/search-image?query=hotel%20bathtub%20window%20view%20Dalat%20pine%20forest%20foggy%20mountains%20romantic%20luxury%20resort%20Vietnam%20soaking&width=600&height=400&seq=ksgal10&orientation=landscape', label: 'Bồn tắm view' },
  { img: 'https://readdy.ai/api/search-image?query=hotel%20cozy%20bar%20lounge%20area%20warm%20lighting%20Dalat%20Vietnam%20drinks%20cocktails%20evening%20wood%20shelves&width=600&height=400&seq=ksgal11&orientation=landscape', label: 'Bar & Lounge' },
  { img: 'https://readdy.ai/api/search-image?query=Vietnamese%20resort%20outdoor%20garden%20pathway%20stone%20lanterns%20flowers%20tropical%20plants%20evening%20romantic%20lighting&width=600&height=400&seq=ksgal12&orientation=landscape', label: 'Vườn đêm' },
];

const aroundDalat = [
  { img: 'https://readdy.ai/api/search-image?query=Dalat%20flower%20garden%20valley%20colorful%20blooming%20flowers%20Vietnam%20tourist%20attraction%20beautiful%20landscape%20valley&width=600&height=400&seq=ksaround1&orientation=landscape', name: 'Vườn Hoa Đà Lạt', dist: '2.5 km', icon: 'ri-plant-line' },
  { img: 'https://readdy.ai/api/search-image?query=Xuan%20Huong%20Lake%20Dalat%20Vietnam%20peaceful%20morning%20mist%20reflection%20beautiful%20scenic%20swan%20boats&width=600&height=400&seq=ksaround2&orientation=landscape', name: 'Hồ Xuân Hương', dist: '3 km', icon: 'ri-water-flash-line' },
  { img: 'https://readdy.ai/api/search-image?query=cable%20car%20Robin%20Hill%20Dalat%20Vietnam%20panoramic%20aerial%20view%20pine%20forest%20mountain%20green%20lush&width=600&height=400&seq=ksaround3&orientation=landscape', name: 'Cáp Treo Robin', dist: '4 km', icon: 'ri-riding-line' },
  { img: 'https://readdy.ai/api/search-image?query=Dalat%20night%20market%20Vietnam%20street%20food%20stalls%20lanterns%20evening%20colorful%20bustling%20vendors%20flowers&width=600&height=400&seq=ksaround4&orientation=landscape', name: 'Chợ Đêm Đà Lạt', dist: '3.5 km', icon: 'ri-store-2-line' },
];

const features = [
  { icon: 'ri-wifi-line', title: 'WiFi Tốc Độ Cao', desc: 'Kết nối ổn định 1Gbps toàn khu' },
  { icon: 'ri-drop-line', title: 'Hồ Bơi Riêng', desc: 'View đồi thông, mở cửa 6:00–21:00' },
  { icon: 'ri-restaurant-line', title: 'Bữa Sáng 5★', desc: 'Buffet Việt–Âu miễn phí mỗi ngày' },
  { icon: 'ri-car-line', title: 'Đưa Đón Sân Bay', desc: 'Liên hệ để đặt trước, miễn phí 2 chiều' },
  { icon: 'ri-heart-pulse-line', title: 'Spa & Massage', desc: 'Liệu pháp thư giãn cao cấp tại chỗ' },
  { icon: 'ri-riding-line', title: 'Thuê Xe Đạp', desc: 'Khám phá Đà Lạt, miễn phí cho khách' },
];

const faqs = [
  { q: 'Check-in & Check-out lúc mấy giờ?', a: 'Check-in từ 14:00, Check-out trước 12:00. Early check-in và late check-out có thể sắp xếp theo yêu cầu.' },
  { q: 'Có bãi đỗ xe không?', a: 'Có bãi đỗ xe miễn phí cho tất cả khách lưu trú, sức chứa 30 xe ô tô.' },
  { q: 'Có nhận thú cưng không?', a: 'Chúng tôi không nhận thú cưng để đảm bảo vệ sinh cho tất cả khách hàng.' },
  { q: 'Bữa sáng có tính phí không?', a: 'Bữa sáng miễn phí cho tất cả phòng khi đặt trực tiếp. Phòng đặt qua ứng dụng thứ 3 không bao gồm.' },
];

export default function DemoKhachSan() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [activeTab, setActiveTab] = useState('rooms');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showBook, setShowBook] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: "'Lora', serif" }}>
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-stone-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div>
            <div className="font-extrabold text-stone-800 text-lg tracking-wide">DALAT KEYVILLA</div>
            <div className="text-emerald-600 text-[10px] font-semibold tracking-widest uppercase">Boutique Homestay ★★★★</div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-stone-600" style={{ fontFamily: 'sans-serif' }}>
            {['Phòng & Giá', 'Tiện Ích', 'Địa Điểm', 'Blog', 'Liên Hệ'].map((item) => (
              <button key={item} className="cursor-pointer hover:text-emerald-600 transition-colors">{item}</button>
            ))}
          </nav>
          <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer whitespace-nowrap hover:bg-emerald-700 transition-colors">
            <i className="ri-message-2-fill text-xs"></i>Đặt Phòng Zalo
          </a>
        </div>
      </header>

      {/* Hero */}
      <div className="relative h-[65vh] md:h-[80vh] overflow-hidden">
        <img src="https://readdy.ai/api/search-image?query=beautiful%20boutique%20homestay%20Dalat%20Vietnam%20pine%20forest%20mountain%20scenic%20panoramic%20aerial%20view%20cozy%20wooden%20villa%20sunrise%20misty%20morning%20lush%20green&width=1400&height=800&seq=kshero&orientation=landscape" alt="Dalat KeyVilla" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/60"></div>
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-14 text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-4 py-2 rounded-full mb-5">
            <i className="ri-map-pin-line"></i>ĐÀ LẠT, LÂM ĐỒNG · VIỆT NAM
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 drop-shadow-lg">Nghỉ Dưỡng Giữa<br /><span className="text-emerald-300">Rừng Thông Đà Lạt</span></h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto">Tận hưởng không gian yên bình, view đồi thông thơ mộng cùng dịch vụ chuẩn 4 sao</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-0">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-t-2xl px-4 md:px-8 py-4 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1.5 uppercase tracking-wide">Nhận Phòng</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-800 outline-none focus:border-emerald-400 cursor-pointer" />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1.5 uppercase tracking-wide">Trả Phòng</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-800 outline-none focus:border-emerald-400 cursor-pointer" />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1.5 uppercase tracking-wide">Số Khách</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-400 cursor-pointer">
                  {[1,2,3,4,5,6].map((n) => <option key={n}>{n} Khách</option>)}
                </select>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-bold cursor-pointer whitespace-nowrap transition-colors">
                Kiểm Tra Phòng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-emerald-600 py-5" style={{ fontFamily: 'sans-serif' }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[['500+', 'Lượt Đánh Giá'], ['4.9/5', 'Điểm Hài Lòng'], ['3 Năm', 'Hoạt Động'], ['100%', 'Hàng Chính Hãng']].map(([n, l]) => (
            <div key={l}>
              <div className="text-2xl font-black text-white">{n}</div>
              <div className="text-emerald-100 text-xs mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8" style={{ fontFamily: 'sans-serif' }}>
        <div className="flex gap-1 bg-stone-100 rounded-xl p-1 w-fit overflow-x-auto">
          {[['rooms','Phòng & Giá'],['facilities','Tiện Ích'],['gallery','Gallery'],['around','Xung Quanh'],['reviews','Đánh Giá'],['faq','FAQ']].map(([key,label]) => (
            <button key={key} onClick={() => setActiveTab(key)} className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all whitespace-nowrap ${activeTab === key ? 'bg-white text-emerald-700' : 'text-stone-500 hover:text-stone-700'}`}>{label}</button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8" style={{ fontFamily: 'sans-serif' }}>
        {activeTab === 'rooms' && (
          <div className="space-y-5">
            {rooms.map((room) => (
              <div key={room.id} className="border border-stone-100 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:border-emerald-200 transition-all">
                <div className="relative md:w-72 flex-shrink-0">
                  <img src={room.image} alt={room.name} className="w-full h-52 md:h-full object-cover object-top" />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">{room.badge}</span>
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-800 mb-1">{room.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
                      <span><i className="ri-user-line mr-1"></i>{room.guests} khách</span>
                      <span><i className="ri-layout-4-line mr-1"></i>{room.size}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((a) => (
                        <span key={a} className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">{a}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                    <div>
                      <span className="text-2xl font-black text-emerald-600">{room.price.toLocaleString()}đ</span>
                      <span className="text-stone-400 text-xs ml-1">/đêm · bao gồm bữa sáng</span>
                    </div>
                    <button onClick={() => setShowBook(room.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl cursor-pointer whitespace-nowrap transition-colors">
                      Đặt Ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-emerald-50 rounded-2xl p-5 flex gap-4 items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-xl flex-shrink-0">
                  <i className={`${f.icon} text-2xl text-emerald-600`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 text-sm mb-1">{f.title}</h3>
                  <p className="text-stone-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'gallery' && (
          <>
            <p className="text-stone-400 text-xs mb-4"><i className="ri-image-line mr-1"></i>{gallery.length} ảnh · Nhấn để phóng to</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.map((item, i) => (
                <div key={i} onClick={() => setLightbox(i)} className="rounded-xl overflow-hidden group cursor-pointer relative">
                  <img src={item.img} alt={item.label} className="w-full h-40 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-2">
                    <span className="text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-0.5 rounded-full">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'around' && (
          <div>
            <p className="text-stone-500 text-sm mb-6">Những điểm tham quan nổi tiếng gần DALAT KEYVILLA — đi bộ hoặc thuê xe đạp miễn phí từ khách sạn.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {aroundDalat.map((place) => (
                <div key={place.name} className="rounded-2xl overflow-hidden border border-stone-100 group cursor-pointer hover:border-emerald-200 transition-all">
                  <div className="relative overflow-hidden">
                    <img src={place.img} alt={place.name} className="w-full h-44 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 right-3 bg-white/90 text-stone-700 text-[10px] font-bold px-2 py-1 rounded-full"><i className="ri-map-pin-2-line mr-0.5"></i>{place.dist}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 flex items-center justify-center bg-emerald-50 rounded-lg flex-shrink-0">
                        <i className={`${place.icon} text-emerald-600 text-sm`}></i>
                      </div>
                      <h3 className="font-bold text-stone-800 text-sm">{place.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Map embed */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-stone-100">
              <div className="bg-stone-50 px-5 py-3 border-b border-stone-100 flex items-center gap-2">
                <i className="ri-map-2-line text-emerald-600"></i>
                <span className="font-semibold text-stone-700 text-sm">Vị trí DALAT KEYVILLA</span>
                <span className="text-stone-400 text-xs ml-auto">123 Đường Hoa Hồng, P.4, Đà Lạt</span>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15717.49577090565!2d108.43333999!3d11.9404192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112d7d8f90bab%3A0x7c5f78e0c3bf8af3!2sDa%20Lat%2C%20Lam%20Dong%2C%20Vietnam!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="300"
                loading="lazy"
                className="border-0 block"
              ></iframe>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 bg-emerald-50 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6 mb-2">
              <div className="text-center">
                <div className="text-5xl font-black text-emerald-600">4.9</div>
                <div className="text-[#F59E0B] text-xl mt-1">★★★★★</div>
                <div className="text-stone-500 text-xs mt-1">512 đánh giá</div>
              </div>
              <div className="flex-1 space-y-2 w-full">
                {[['Vị trí', 95], ['Sạch sẽ', 98], ['Phục vụ', 97], ['Tiện nghi', 93]].map(([label, pct]) => (
                  <div key={label as string} className="flex items-center gap-3">
                    <span className="text-xs text-stone-500 w-16">{label}</span>
                    <div className="flex-1 bg-stone-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-stone-600">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            {[
              { name: 'Nguyễn Thị Mai', rating: 5, text: 'Phòng sạch, view đẹp tuyệt vời! Nhân viên thân thiện và nhiệt tình. Nhất định sẽ quay lại!', date: '15/03/2025' },
              { name: 'Trần Văn Hùng', rating: 5, text: 'Không gian yên tĩnh, thoáng mát. Bữa sáng ngon. Đặt phòng qua Zalo rất nhanh!', date: '10/03/2025' },
              { name: 'Lê Thị Hoa', rating: 5, text: 'Homestay đẹp, vị trí thuận tiện. Sương mù buổi sáng rất thơ mộng. Recommend!', date: '05/03/2025' },
              { name: 'Phạm Minh Tuấn', rating: 5, text: 'Suite gia đình rộng, đủ tiện nghi cho cả nhà 4 người. Phục vụ rất chu đáo!', date: '01/03/2025' },
            ].map((r) => (
              <div key={r.name} className="bg-stone-50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700 text-sm">{r.name[0]}</div>
                    <div>
                      <div className="font-semibold text-stone-800 text-sm">{r.name}</div>
                      <div className="text-stone-400 text-xs">{r.date}</div>
                    </div>
                  </div>
                  <div className="text-[#F59E0B] text-sm">{'★'.repeat(r.rating)}</div>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed italic">"{r.text}"</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="max-w-2xl space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-stone-200 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-stone-50 transition-colors">
                  <span className="font-semibold text-stone-800 text-sm">{faq.q}</span>
                  <i className={`${openFaq === i ? 'ri-subtract-line' : 'ri-add-line'} text-stone-400 flex-shrink-0 ml-2`}></i>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-stone-500 text-sm leading-relaxed border-t border-stone-100 bg-stone-50">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={gallery[lightbox].img} alt={gallery[lightbox].label} className="w-full max-h-[80vh] object-contain rounded-xl" />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm font-medium">{gallery[lightbox].label} · {lightbox + 1}/{gallery.length}</div>
            <button onClick={() => setLightbox((lightbox - 1 + gallery.length) % gallery.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white cursor-pointer transition-colors">
              <i className="ri-arrow-left-line"></i>
            </button>
            <button onClick={() => setLightbox((lightbox + 1) % gallery.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white cursor-pointer transition-colors">
              <i className="ri-arrow-right-line"></i>
            </button>
            <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white cursor-pointer"><i className="ri-close-line"></i></button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBook !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowBook(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-stone-800 text-lg mb-2">Đặt Phòng Nhanh</h3>
            <p className="text-stone-500 text-sm mb-4">Liên hệ Zalo để nhận ưu đãi đặt phòng trực tiếp và hỗ trợ ngay lập tức!</p>
            <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-3 rounded-xl cursor-pointer hover:bg-emerald-700 transition-colors w-full mb-2">
              <i className="ri-message-2-fill"></i>Chat Zalo Ngay
            </a>
            <a href="tel:0901234567" className="flex items-center justify-center gap-2 border border-stone-200 text-stone-600 font-semibold py-2.5 rounded-xl cursor-pointer hover:bg-stone-50 transition-colors w-full text-sm">
              <i className="ri-phone-line"></i>Gọi: 0901 234 567
            </a>
            <button onClick={() => setShowBook(null)} className="w-full mt-2 py-2 text-stone-400 text-sm cursor-pointer">Đóng</button>
          </div>
        </div>
      )}

      <footer className="bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8" style={{ fontFamily: 'sans-serif' }}>
          <div>
            <div className="font-extrabold text-xl mb-2">DALAT KEYVILLA</div>
            <p className="text-stone-400 text-sm mb-3">Homestay boutique 4 sao giữa rừng thông Đà Lạt — nơi thiên nhiên và tiện nghi hòa quyện.</p>
            <div className="flex gap-3">
              {['ri-facebook-fill','ri-instagram-line','ri-youtube-line'].map((ic) => (
                <button key={ic} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-600 cursor-pointer transition-colors"><i className={`${ic} text-sm`}></i></button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold text-sm mb-3">Liên Hệ</div>
            <div className="space-y-2 text-stone-400 text-sm">
              <div><i className="ri-map-pin-line mr-2"></i>123 Đường Hoa Hồng, P.4, Đà Lạt</div>
              <div><i className="ri-phone-line mr-2"></i>0901 234 567</div>
              <div><i className="ri-mail-line mr-2"></i>info@dalatkeyvilla.vn</div>
              <div><i className="ri-time-line mr-2"></i>Check-in: 14:00 · Check-out: 12:00</div>
            </div>
          </div>
          <div>
            <div className="font-bold text-sm mb-3">Khuyến Mãi</div>
            <div className="bg-emerald-600/20 border border-emerald-600/30 rounded-xl p-4">
              <p className="text-emerald-300 text-sm font-semibold mb-1">Ưu đãi tháng 4</p>
              <p className="text-stone-400 text-xs">Đặt phòng trực tiếp qua Zalo — giảm 15% + bữa sáng miễn phí!</p>
            </div>
          </div>
        </div>
        <div className="border-t border-stone-800 py-4 text-center text-stone-500 text-xs">
          © 2025 DaLat KeyVilla · Thiết kế bởi <span className="text-[#00C2E0] font-semibold">WebPro Studio</span>
        </div>
      </footer>
    </div>
  );
}
