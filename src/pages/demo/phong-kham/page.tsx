import { useState } from 'react';

const doctors = [
  { name: 'BS. Nguyễn Văn Minh', spec: 'Nội Khoa Tổng Quát', exp: '15 năm', img: 'https://readdy.ai/api/search-image?query=professional%20Vietnamese%20male%20doctor%20portrait%20white%20coat%20stethoscope%20confident%20friendly%20clean%20hospital%20background%20medical%20professional%20photography&width=300&height=300&seq=bs01&orientation=squarish' },
  { name: 'BS. Trần Thị Lan', spec: 'Nhi Khoa', exp: '12 năm', img: 'https://readdy.ai/api/search-image?query=professional%20Vietnamese%20female%20doctor%20portrait%20white%20coat%20friendly%20warm%20smile%20pediatrician%20clean%20hospital%20background%20medical%20photography&width=300&height=300&seq=bs02&orientation=squarish' },
  { name: 'BS. Lê Quang Hải', spec: 'Da Liễu & Thẩm Mỹ', exp: '10 năm', img: 'https://readdy.ai/api/search-image?query=professional%20Vietnamese%20male%20dermatologist%20doctor%20portrait%20white%20coat%20clean%20medical%20background%20confident%20professional%20photography&width=300&height=300&seq=bs03&orientation=squarish' },
  { name: 'BS. Phạm Thu Hương', spec: 'Sản Phụ Khoa', exp: '14 năm', img: 'https://readdy.ai/api/search-image?query=professional%20Vietnamese%20female%20gynecologist%20doctor%20portrait%20white%20coat%20friendly%20warm%20hospital%20background%20medical%20professional%20photography&width=300&height=300&seq=bs04&orientation=squarish' },
];

const services = [
  { icon: 'ri-heart-pulse-line', name: 'Khám Tổng Quát', price: 'Từ 300.000đ', desc: 'Kiểm tra sức khỏe toàn diện, xét nghiệm máu, siêu âm.' },
  { icon: 'ri-lungs-line', name: 'Nội Khoa', price: 'Từ 250.000đ', desc: 'Điều trị các bệnh mãn tính, tiểu đường, huyết áp, tim mạch.' },
  { icon: 'ri-user-heart-line', name: 'Nhi Khoa', price: 'Từ 250.000đ', desc: 'Chăm sóc sức khỏe trẻ em từ sơ sinh đến 15 tuổi.' },
  { icon: 'ri-shield-flash-line', name: 'Tiêm Chủng', price: 'Từ 150.000đ', desc: 'Vaccine đầy đủ, nhập khẩu chính hãng, cho mọi lứa tuổi.' },
  { icon: 'ri-test-tube-line', name: 'Xét Nghiệm', price: 'Từ 200.000đ', desc: 'Xét nghiệm máu, nước tiểu, vi sinh trong 2–4 giờ.' },
  { icon: 'ri-microscope-line', name: 'Da Liễu', price: 'Từ 300.000đ', desc: 'Điều trị mụn, nám, sẹo, các bệnh da liễu thường gặp.' },
];

export default function DemoPhongKham() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', time: '' });
  const [booked, setBooked] = useState(false);
  const [showBook, setShowBook] = useState(false);

  const handleBook = () => {
    if (form.name && form.phone && form.date) setBooked(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0284C7] rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="ri-hospital-line text-white text-lg"></i>
            </div>
            <div>
              <div className="font-extrabold text-[#0C4A6E] text-base">MEDPLUS CLINIC</div>
              <div className="text-[#0284C7] text-[10px] font-semibold tracking-widest">PHÒNG KHÁM ĐA KHOA · TP.HCM</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-slate-600">
            {['Trang Chủ', 'Dịch Vụ', 'Đội Ngũ BS', 'Đặt Lịch', 'Liên Hệ'].map(n => (
              <button key={n} className="cursor-pointer hover:text-[#0284C7] transition-colors">{n}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowBook(true)} className="hidden md:flex items-center gap-1.5 bg-[#0284C7] text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer whitespace-nowrap hover:bg-[#0369A1] transition-colors">
              <i className="ri-calendar-check-line"></i>Đặt Lịch Khám
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-9 h-9 flex items-center justify-center text-[#0284C7]">
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-slate-100 px-4 py-3 space-y-2 bg-white">
            {['Trang Chủ', 'Dịch Vụ', 'Đội Ngũ BS', 'Đặt Lịch', 'Liên Hệ'].map(n => (
              <button key={n} className="block w-full text-left text-sm text-slate-600 py-1 cursor-pointer hover:text-[#0284C7]">{n}</button>
            ))}
            <button onClick={() => setShowBook(true)} className="w-full bg-[#0284C7] text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer mt-2">
              <i className="ri-calendar-check-line"></i>Đặt Lịch Khám
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <img src="https://readdy.ai/api/search-image?query=modern%20medical%20clinic%20hospital%20interior%20clean%20bright%20white%20professional%20Vietnamese%20healthcare%20waiting%20room%20doctor%20patient%20care%20trustworthy&width=1400&height=800&seq=pkhero&orientation=landscape" alt="MedPlus Clinic" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C4A6E]/80 via-[#0C4A6E]/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5">
              <i className="ri-award-fill text-[#7DD3FC]"></i>ĐƯỢC BỘ Y TẾ CẤP PHÉP · 20 NĂM UY TÍN
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 max-w-xl">
              Chăm Sóc<br /><span className="text-[#7DD3FC]">Sức Khỏe</span><br />Của Bạn
            </h1>
            <p className="text-white/75 text-base max-w-md mb-8">Đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm — khám và điều trị toàn diện, thiết bị hiện đại nhất.</p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <button onClick={() => setShowBook(true)} className="bg-[#0284C7] text-white px-7 py-3.5 rounded-xl font-bold cursor-pointer hover:bg-[#0369A1] transition-colors whitespace-nowrap text-sm">
                <i className="ri-calendar-check-line mr-1.5"></i>Đặt Lịch Khám Ngay
              </button>
              <a href="tel:0901234567" className="border border-white/30 text-white px-7 py-3.5 rounded-xl font-bold cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap text-sm">
                <i className="ri-phone-line mr-1.5"></i>Hotline 24/7
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-[#0284C7] py-4">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: 'ri-award-fill', t: 'Bộ Y Tế Cấp Phép', s: 'Giấy phép số 1234/BYT' },
            { icon: 'ri-user-star-line', t: '50+ Bác Sĩ Chuyên Khoa', s: 'Kinh nghiệm 10–20 năm' },
            { icon: 'ri-time-line', t: 'Khám 7 Ngày/Tuần', s: '07:00 – 20:00 · Không nghỉ lễ' },
            { icon: 'ri-heart-fill', t: '30.000+ Bệnh Nhân', s: 'Tin tưởng điều trị tại đây' },
          ].map(b => (
            <div key={b.t} className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                <i className={`${b.icon} text-white/80 text-xl`}></i>
              </div>
              <div>
                <div className="text-white text-xs font-bold">{b.t}</div>
                <div className="text-white/60 text-[10px]">{b.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14">
        <div className="text-center mb-10">
          <span className="text-[#0284C7] text-xs font-bold tracking-widest">CHUYÊN KHOA</span>
          <h2 className="text-2xl md:text-4xl font-black text-[#0C4A6E] mt-2">Dịch Vụ Khám Chữa Bệnh</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {services.map(s => (
            <div key={s.name} className="border border-slate-100 rounded-2xl p-5 hover:border-[#0284C7]/30 hover:-translate-y-1 transition-all group cursor-pointer">
              <div className="w-12 h-12 flex items-center justify-center bg-[#E0F2FE] rounded-xl mb-4 group-hover:bg-[#BAE6FD] transition-colors">
                <i className={`${s.icon} text-2xl text-[#0284C7]`}></i>
              </div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-[#0C4A6E] text-sm">{s.name}</h3>
                <span className="text-[#0284C7] font-bold text-xs whitespace-nowrap ml-2">{s.price}</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              <button onClick={() => setShowBook(true)} className="mt-4 w-full text-center text-[#0284C7] text-xs font-semibold border border-[#BAE6FD] py-2 rounded-xl cursor-pointer hover:bg-[#E0F2FE] transition-colors whitespace-nowrap">
                Đặt Lịch Khám Dịch Vụ Này
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Doctors */}
      <div className="bg-[#F0F9FF] py-14">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="text-[#0284C7] text-xs font-bold tracking-widest">ĐỘI NGŨ BÁC SĨ</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#0C4A6E] mt-2">Chuyên Gia Y Tế Hàng Đầu</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {doctors.map(d => (
              <div key={d.name} className="bg-white rounded-2xl p-5 text-center hover:-translate-y-1 transition-all border border-slate-100">
                <div className="w-20 h-20 mx-auto mb-3 rounded-2xl overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="font-bold text-[#0C4A6E] text-sm mb-1">{d.name}</h3>
                <p className="text-[#0284C7] text-xs font-medium">{d.spec}</p>
                <p className="text-slate-400 text-xs mt-1">Kinh nghiệm: {d.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 py-14 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#0C4A6E] mb-3">Đặt Lịch Khám Dễ Dàng</h2>
        <p className="text-slate-500 text-sm mb-6">Đặt lịch online — nhận xác nhận trong 15 phút · Không chờ đợi!</p>
        <button onClick={() => setShowBook(true)} className="inline-flex items-center gap-2 bg-[#0284C7] text-white font-bold px-8 py-4 rounded-xl cursor-pointer hover:bg-[#0369A1] transition-colors whitespace-nowrap">
          <i className="ri-calendar-check-line"></i>Đặt Lịch Khám Ngay — Miễn Phí
        </button>
      </div>

      {/* Book Modal */}
      {showBook && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => { setShowBook(false); setBooked(false); }}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            {booked ? (
              <div className="text-center py-4">
                <i className="ri-checkbox-circle-fill text-5xl text-emerald-500 block mb-3"></i>
                <h3 className="font-black text-[#0C4A6E] text-xl mb-2">Đặt Lịch Thành Công!</h3>
                <p className="text-slate-500 text-sm">Phòng khám sẽ xác nhận qua SĐT trong 15 phút.</p>
                <button onClick={() => { setShowBook(false); setBooked(false); }} className="mt-4 bg-[#0284C7] text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer">Đóng</button>
              </div>
            ) : (
              <>
                <h3 className="font-black text-[#0C4A6E] text-lg mb-4">Đặt Lịch Khám</h3>
                <div className="space-y-3">
                  <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="Họ tên bệnh nhân" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0284C7] text-slate-800" />
                  <input value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} placeholder="Số điện thoại liên lạc" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0284C7] text-slate-800" />
                  <select value={form.service} onChange={e => setForm(p => ({...p, service: e.target.value}))} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0284C7] cursor-pointer bg-white text-slate-800">
                    <option value="">-- Chọn chuyên khoa --</option>
                    {services.map(s => <option key={s.name}>{s.name}</option>)}
                  </select>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="date" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0284C7] cursor-pointer text-slate-800" />
                    <select value={form.time} onChange={e => setForm(p => ({...p, time: e.target.value}))} className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0284C7] cursor-pointer bg-white text-slate-800">
                      <option value="">Giờ khám</option>
                      {['07:30','08:00','08:30','09:00','09:30','10:00','14:00','14:30','15:00','15:30'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={handleBook} className="mt-4 w-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold py-3 rounded-xl cursor-pointer transition-colors whitespace-nowrap">
                  Xác Nhận Đặt Lịch
                </button>
                <button onClick={() => setShowBook(false)} className="w-full mt-2 text-slate-400 text-sm cursor-pointer">Đóng</button>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="bg-[#0C4A6E] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <div className="font-extrabold text-xl mb-2">MEDPLUS CLINIC</div>
          <p className="text-white/40 text-sm mb-2">123 Đinh Tiên Hoàng, Q.1, TP. Hồ Chí Minh · Hotline: 1900 1234</p>
          <p className="text-white/20 text-xs">© 2025 MedPlus Clinic · Thiết kế bởi <span className="text-[#00C2E0] font-semibold">WebPro Studio</span></p>
        </div>
      </footer>
    </div>
  );
}
