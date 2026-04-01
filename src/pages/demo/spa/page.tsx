import { useState } from 'react';

const services = [
  { id: 1, name: 'Chăm Sóc Da Mặt Cơ Bản', duration: '60 phút', price: 350000, image: 'https://readdy.ai/api/search-image?query=facial%20skin%20care%20treatment%20spa%20Vietnam%20beautiful%20woman%20relaxing%20luxury%20spa%20treatment%20table%20professional%20beauty%20wellness%20soft%20pink&width=400&height=300&seq=spa001&orientation=landscape', popular: false, desc: 'Làm sạch sâu, dưỡng ẩm, phục hồi da mệt mỏi sau ngày dài.' },
  { id: 2, name: 'Massage Đá Nóng Full Body', duration: '90 phút', price: 550000, image: 'https://readdy.ai/api/search-image?query=hot%20stone%20massage%20full%20body%20spa%20treatment%20Vietnam%20luxury%20relaxing%20wellness%20beauty%20soft%20lighting%20candles%20professional&width=400&height=300&seq=spa002&orientation=landscape', popular: true, desc: 'Đá núi lửa hàng triệu năm tuổi, tăng cường tuần hoàn, thư giãn cơ sâu.' },
  { id: 3, name: 'Detox Da Mặt Chuyên Sâu', duration: '90 phút', price: 650000, image: 'https://readdy.ai/api/search-image?query=deep%20cleansing%20facial%20detox%20treatment%20luxury%20spa%20Vietnam%20professional%20skin%20care%20beauty%20woman%20relaxing&width=400&height=300&seq=spa003&orientation=landscape', popular: true, desc: 'Loại bỏ độc tố, se khít lỗ chân lông, da sáng rõ sau 1 lần.' },
  { id: 4, name: 'Gói Cô Dâu Trọn Gói', duration: '3 giờ', price: 1500000, image: 'https://readdy.ai/api/search-image?query=bridal%20package%20spa%20treatment%20Vietnam%20luxury%20beauty%20care%20wedding%20preparation%20professional%20woman%20beautiful&width=400&height=300&seq=spa004&orientation=landscape', popular: false, desc: 'Trọn vẹn từ chăm sóc da, massage thư giãn đến tạo dáng tóc.' },
  { id: 5, name: 'Massage Thư Giãn 60 phút', duration: '60 phút', price: 280000, image: 'https://readdy.ai/api/search-image?query=relaxing%20body%20massage%20spa%20treatment%20Vietnam%20luxury%20wellness%20professional%20soft%20warm%20lighting%20candles&width=400&height=300&seq=spa005&orientation=landscape', popular: false, desc: 'Thư giãn toàn diện với tinh dầu thiên nhiên, giảm căng thẳng.' },
  { id: 6, name: 'Tắm Trắng Toàn Thân', duration: '75 phút', price: 450000, image: 'https://readdy.ai/api/search-image?query=body%20whitening%20treatment%20spa%20bath%20Vietnam%20luxury%20beauty%20skin%20care%20professional%20wellness%20center&width=400&height=300&seq=spa006&orientation=landscape', popular: false, desc: 'Công nghệ tắm trắng Hàn Quốc, da trắng sáng tự nhiên sau 3–5 buổi.' },
];

const gallery = [
  'https://readdy.ai/api/search-image?query=luxury%20spa%20interior%20Vietnam%20rose%20petals%20bathtub%20candles%20flowers%20elegant%20soft%20pink%20lighting%20serene%20atmosphere&width=400&height=300&seq=spagal1&orientation=landscape',
  'https://readdy.ai/api/search-image?query=spa%20treatment%20room%20Vietnam%20luxury%20massage%20table%20candles%20orchid%20flower%20zen%20minimal%20soft%20lighting&width=400&height=300&seq=spagal2&orientation=landscape',
  'https://readdy.ai/api/search-image?query=spa%20lounge%20waiting%20area%20Vietnam%20luxury%20comfortable%20interior%20elegant%20pastel%20tones%20sofa%20cushions&width=400&height=300&seq=spagal3&orientation=landscape',
  'https://readdy.ai/api/search-image?query=spa%20product%20display%20Vietnam%20luxury%20organic%20natural%20skincare%20beauty%20oil%20serum%20bottles%20elegant%20shelf&width=400&height=300&seq=spagal4&orientation=landscape',
  'https://readdy.ai/api/search-image?query=spa%20facial%20treatment%20close%20up%20Vietnam%20beautiful%20woman%20relaxing%20skin%20care%20mask%20professional%20beauty&width=400&height=300&seq=spagal5&orientation=landscape',
  'https://readdy.ai/api/search-image?query=hot%20stone%20spa%20massage%20Vietnam%20warm%20stones%20back%20treatment%20professional%20therapist%20wellness%20beautiful&width=400&height=300&seq=spagal6&orientation=landscape',
  'https://readdy.ai/api/search-image?query=spa%20herbal%20steam%20room%20Vietnam%20luxury%20detox%20wellness%20center%20warm%20mist%20wooden%20sauna&width=400&height=300&seq=spagal7&orientation=landscape',
  'https://readdy.ai/api/search-image?query=spa%20reception%20desk%20Vietnam%20luxury%20elegant%20minimal%20flowers%20warm%20wood%20marble%20counter%20beautiful%20interior&width=400&height=300&seq=spagal8&orientation=landscape',
];

const spaceImages = [
  { img: 'https://readdy.ai/api/search-image?query=luxury%20private%20treatment%20room%20spa%20Vietnam%20intimate%20cozy%20candles%20orchids%20dim%20elegant%20relaxation&width=600&height=400&seq=spaspace1&orientation=landscape', label: 'Phòng Trị Liệu VIP' },
  { img: 'https://readdy.ai/api/search-image?query=spa%20couple%20treatment%20room%20Vietnam%20romantic%20double%20massage%20table%20rose%20petals%20candles%20bathtub&width=600&height=400&seq=spaspace2&orientation=landscape', label: 'Phòng Đôi Lãng Mạn' },
  { img: 'https://readdy.ai/api/search-image?query=spa%20relaxation%20lounge%20pool%20Vietnam%20luxury%20elegant%20tiled%20water%20feature%20soft%20lighting%20indoor&width=600&height=400&seq=spaspace3&orientation=landscape', label: 'Bể Khoáng Nóng' },
  { img: 'https://readdy.ai/api/search-image?query=spa%20private%20garden%20outdoor%20treatment%20area%20Vietnam%20tropical%20plants%20natural%20sunlight%20zen%20atmosphere&width=600&height=400&seq=spaspace4&orientation=landscape', label: 'Khu Vườn Zen' },
];

const awards = [
  { icon: 'ri-award-fill', text: 'Top 10 Spa Hà Nội 2024 — VnExpress' },
  { icon: 'ri-medal-fill', text: 'Chứng nhận ISO 9001:2015' },
  { icon: 'ri-star-fill', text: '4.9/5 · 800+ đánh giá Google' },
  { icon: 'ri-shield-check-fill', text: 'Nguyên liệu thiên nhiên 100%' },
];

export default function DemoSpa() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '' });
  const [bookDone, setBookDone] = useState(false);
  const [activeGallery, setActiveGallery] = useState<number | null>(null);

  const handleBook = () => {
    if (form.name && form.phone && form.date && form.time) setBookDone(true);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center">
              <i className="ri-leaf-line text-rose-500 text-base"></i>
            </div>
            <div>
              <div className="font-extrabold text-rose-800 text-base tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>LOTUS SPA</div>
              <div className="text-rose-300 text-[10px] font-medium tracking-widest">& BEAUTY CENTER · HÀ NỘI</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-rose-700/70">
            {['Dịch Vụ', 'Bảng Giá', 'Gallery', 'Về Chúng Tôi', 'Đặt Lịch'].map((item) => (
              <button key={item} className="cursor-pointer hover:text-rose-600 transition-colors font-medium">{item}</button>
            ))}
          </nav>
          <button onClick={() => setSelectedService(services[0])} className="flex items-center gap-1.5 bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer whitespace-nowrap hover:bg-rose-600 transition-colors">
            <i className="ri-calendar-check-line text-xs"></i>Đặt Lịch
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative h-[65vh] md:h-[75vh] overflow-hidden">
        <img src="https://readdy.ai/api/search-image?query=luxury%20spa%20wellness%20center%20interior%20beautiful%20Vietnamese%20spa%20relaxation%20room%20rose%20petals%20bathtub%20candles%20flowers%20elegant%20soft%20pink%20lighting%20serene%20atmosphere&width=1400&height=800&seq=spahero&orientation=landscape" alt="Lotus Spa" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#FDF8F5]"></div>
        <div className="absolute inset-0 bg-rose-900/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest">HÀ NỘI · 45 PHỐ HUẾ · HAI BÀ TRƯNG</span>
          <h1 className="text-3xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow" style={{ fontFamily: 'Georgia, serif' }}>
            Tái Sinh<br /><span className="text-rose-200">Vẻ Đẹp Tự Nhiên</span>
          </h1>
          <p className="text-white/80 text-base max-w-lg mb-8">Liệu pháp làm đẹp đỉnh cao — tinh hoa Đông Tây, phục hồi toàn diện cả thể xác lẫn tâm hồn</p>
          <div className="flex gap-3 flex-col sm:flex-row">
            <button onClick={() => setSelectedService(services[1])} className="bg-white text-rose-700 px-8 py-3.5 rounded-full font-extrabold cursor-pointer hover:bg-rose-50 transition-colors whitespace-nowrap text-sm">
              <i className="ri-calendar-check-line mr-1.5"></i>Đặt Lịch Ngay
            </button>
            <a href="tel:0901234567" className="border border-white/40 text-white px-8 py-3.5 rounded-full font-bold cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap text-sm">
              <i className="ri-phone-line mr-1.5"></i>0901 234 567
            </a>
          </div>
        </div>
      </div>

      {/* Awards / Trust */}
      <div className="bg-rose-600 py-4">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {awards.map((a) => (
            <div key={a.text} className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <i className={`${a.icon} text-rose-200 text-lg`}></i>
              </div>
              <span className="text-white text-xs font-medium leading-tight">{a.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="text-rose-400 text-xs font-bold tracking-widest">VỀ LOTUS SPA</span>
          <h2 className="text-2xl md:text-4xl font-black text-rose-900 mt-2 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Triết Lý Làm Đẹp<br />Từ Thiên Nhiên</h2>
          <p className="text-rose-800/60 text-sm leading-relaxed mb-4">Ra đời năm 2016, Lotus Spa theo đuổi triết lý làm đẹp bền vững — kết hợp tinh hoa thảo dược Việt Nam với công nghệ spa tiên tiến của Hàn Quốc và Nhật Bản.</p>
          <p className="text-rose-800/60 text-sm leading-relaxed mb-6">Mỗi liệu trình được cá nhân hóa, đội ngũ chuyên gia có chứng chỉ quốc tế đảm bảo trải nghiệm an toàn và hiệu quả nhất cho từng khách hàng.</p>
          <div className="flex gap-8">
            {[['8 Năm', 'Kinh Nghiệm'], ['15K+', 'Khách Hàng'], ['98%', 'Hài Lòng']].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-black text-rose-600">{n}</div>
                <div className="text-rose-400 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {gallery.map((img, i) => (
            <div key={i} onClick={() => setActiveGallery(i)} className={`rounded-xl overflow-hidden cursor-pointer group ${i < 4 ? 'col-span-2' : ''}`}>
              <img src={img} alt={`Gallery ${i+1}`} className="w-full h-28 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Space Images */}
      <div className="bg-rose-50 py-14">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="text-rose-400 text-xs font-bold tracking-widest">KHÔNG GIAN SPA</span>
            <h2 className="text-2xl md:text-4xl font-black text-rose-900 mt-2" style={{ fontFamily: 'Georgia, serif' }}>Tận hưởng không gian thư giãn</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {spaceImages.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl overflow-hidden border border-rose-100 hover:border-rose-300 hover:-translate-y-1 transition-all group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img src={s.img} alt={s.label} className="w-full h-44 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-rose-900 text-sm mb-1.5">{s.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-rose-50 py-14">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="text-rose-400 text-xs font-bold tracking-widest">DỊCH VỤ CAO CẤP</span>
            <h2 className="text-2xl md:text-4xl font-black text-rose-900 mt-2" style={{ fontFamily: 'Georgia, serif' }}>Trải Nghiệm Thư Giãn Đỉnh Cao</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {services.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl overflow-hidden border border-rose-100 hover:border-rose-300 hover:-translate-y-1 transition-all group cursor-pointer" onClick={() => setSelectedService(s)}>
                <div className="relative overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-44 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  {s.popular && <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">✨ PHỔ BIẾN</span>}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-rose-900 text-sm mb-1.5">{s.name}</h3>
                  <p className="text-rose-700/60 text-xs mb-3 leading-relaxed line-clamp-2">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-rose-400 text-xs">
                      <i className="ri-time-line"></i>{s.duration}
                    </div>
                    <span className="text-rose-600 font-black text-base">{s.price.toLocaleString()}đ</span>
                  </div>
                  <button className="mt-3 w-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold py-2 rounded-xl cursor-pointer transition-colors whitespace-nowrap">
                    <i className="ri-calendar-check-line mr-1"></i>Đặt Lịch Dịch Vụ Này
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-rose-900" style={{ fontFamily: 'Georgia, serif' }}>Khách Hàng Nói Gì Về Chúng Tôi</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { name: 'Chị Trần Thu Hà', text: 'Massage đá nóng cực kỳ thư giãn, sau buổi như người mới. Nhân viên chuyên nghiệp, không gian thơm dịu.', rating: 5, date: '15/03/2025' },
            { name: 'Chị Nguyễn Lan Anh', text: 'Gói cô dâu tuyệt vời! Da sáng mịn, chú rể khen mãi. Staff tận tình, giá cả hợp lý so với chất lượng.', rating: 5, date: '08/03/2025' },
            { name: 'Chị Lê Phương Mai', text: 'Đặt lịch online rất tiện. Detox da chuyên sâu làm da mình sáng hẳn chỉ sau 1 lần. Sẽ quay lại!', rating: 5, date: '01/03/2025' },
          ].map((t) => (
            <div key={t.name} className="bg-rose-50 rounded-xl p-5 border border-rose-100">
              <div className="text-rose-400 text-sm mb-3">{'★'.repeat(t.rating)}</div>
              <p className="text-rose-800/70 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-rose-900 text-sm">{t.name}</div>
                <div className="text-rose-300 text-xs">{t.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-0 md:p-4" onClick={() => { setSelectedService(null); setBookDone(false); setForm({ name: '', phone: '', date: '', time: '' }); }}>
          <div className="bg-white rounded-t-3xl md:rounded-3xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            {bookDone ? (
              <div className="text-center py-6">
                <i className="ri-checkbox-circle-fill text-5xl text-emerald-500 block mb-4"></i>
                <h3 className="font-black text-rose-900 text-xl mb-2">Đặt Lịch Thành Công!</h3>
                <p className="text-rose-600/60 text-sm mb-5">Chúng tôi sẽ xác nhận qua Zalo/SĐT trong 15 phút.</p>
                <button onClick={() => { setSelectedService(null); setBookDone(false); }} className="bg-rose-500 text-white font-bold px-8 py-2.5 rounded-full cursor-pointer">Đóng</button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-black text-rose-900 text-lg">Đặt Lịch Dịch Vụ</h3>
                    <p className="text-rose-400 text-sm">{selectedService.name} · {selectedService.price.toLocaleString()}đ</p>
                  </div>
                  <button onClick={() => setSelectedService(null)} className="text-rose-300 cursor-pointer hover:text-rose-500 w-8 h-8 flex items-center justify-center">
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
                <div className="space-y-3">
                  <input value={form.name} onChange={(e) => setForm(p => ({...p, name: e.target.value}))} placeholder="Họ tên của bạn" className="w-full border border-rose-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-rose-400 text-slate-800" />
                  <input value={form.phone} onChange={(e) => setForm(p => ({...p, phone: e.target.value}))} placeholder="Số điện thoại" className="w-full border border-rose-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-rose-400 text-slate-800" />
                  <input type="date" value={form.date} onChange={(e) => setForm(p => ({...p, date: e.target.value}))} className="w-full border border-rose-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-rose-400 cursor-pointer text-slate-800" />
                  <select value={form.time} onChange={(e) => setForm(p => ({...p, time: e.target.value}))} className="w-full border border-rose-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-rose-400 cursor-pointer text-slate-800 bg-white">
                    <option value="">-- Chọn giờ --</option>
                    {['08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="mt-4 p-3 bg-rose-50 rounded-xl text-xs text-rose-600">
                  <i className="ri-information-line mr-1"></i>
                  Xác nhận lịch qua Zalo/SĐT · Hủy miễn phí trước 2 giờ
                </div>
                <button onClick={handleBook} className="mt-4 w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl cursor-pointer transition-colors whitespace-nowrap">
                  <i className="ri-calendar-check-line mr-1.5"></i>Xác Nhận Đặt Lịch
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {activeGallery !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setActiveGallery(null)}>
          <img src={gallery[activeGallery]} alt="Gallery" className="max-w-2xl w-full max-h-[80vh] object-contain rounded-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <footer className="bg-rose-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-extrabold text-xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>LOTUS SPA</div>
            <p className="text-white/40 text-sm mb-3">Spa & Beauty Center cao cấp tại Hà Nội — tái sinh vẻ đẹp tự nhiên của bạn.</p>
            <div className="flex gap-3">
              {['ri-facebook-fill','ri-instagram-line','ri-youtube-line'].map((ic) => (
                <button key={ic} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-rose-500 cursor-pointer transition-colors"><i className={`${ic} text-sm`}></i></button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold text-sm mb-3 text-white/60">Dịch Vụ</div>
            <ul className="space-y-1.5 text-white/40 text-sm">
              {['Massage Đá Nóng', 'Detox Da Mặt', 'Tắm Trắng', 'Gói Cô Dâu'].map((s) => <li key={s} className="cursor-pointer hover:text-white transition-colors">{s}</li>)}
            </ul>
          </div>
          <div>
            <div className="font-bold text-sm mb-3 text-white/60">Thông Tin</div>
            <div className="space-y-1.5 text-white/40 text-sm">
              <div><i className="ri-map-pin-line mr-1.5"></i>45 Phố Huế, Hai Bà Trưng, Hà Nội</div>
              <div><i className="ri-phone-line mr-1.5"></i>0901 234 567</div>
              <div><i className="ri-time-line mr-1.5"></i>08:00 – 21:00 · Mỗi ngày trong tuần</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/20 text-xs">
          © 2025 Lotus Spa & Beauty Center · Thiết kế bởi <span className="text-[#00C2E0] font-semibold">WebPro Studio</span>
        </div>
      </footer>
    </div>
  );
}
