import { useState } from 'react';

const classes = [
  { name: 'HIIT Cardio Burn', trainer: 'PT. Minh Tú', time: '06:00–07:00', days: 'T2,T4,T6', level: 'Trung Cấp', slots: 8, total: 15, color: 'bg-orange-500' },
  { name: 'Yoga Flow', trainer: 'PT. Lan Anh', time: '07:30–08:30', days: 'T3,T5,T7', level: 'Cơ Bản', slots: 5, total: 12, color: 'bg-emerald-500' },
  { name: 'Powerlifting', trainer: 'PT. Quốc Bảo', time: '17:00–18:30', days: 'T2,T3,T5', level: 'Nâng Cao', slots: 3, total: 8, color: 'bg-red-500' },
  { name: 'Zumba Dance', trainer: 'PT. Thu Hà', time: '19:00–20:00', days: 'T3,T6,CN', level: 'Cơ Bản', slots: 10, total: 20, color: 'bg-pink-500' },
  { name: 'Muay Thai', trainer: 'PT. Văn Khoa', time: '18:00–19:30', days: 'T2,T4,T7', level: 'Trung Cấp', slots: 6, total: 10, color: 'bg-amber-500' },
  { name: 'Body Pump', trainer: 'PT. Minh Tú', time: '07:00–08:00', days: 'T3,T5,CN', level: 'Cơ Bản', slots: 7, total: 15, color: 'bg-[#1565C0]' },
];

const plans = [
  { name: 'Cơ Bản', price: '499.000', period: '/tháng', features: ['Phòng tập 24/7', 'Tủ đựng đồ', 'Wifi tốc độ cao', 'Hướng dẫn cơ bản'], highlight: false, cta: 'Đăng Ký Ngay' },
  { name: 'Pro', price: '799.000', period: '/tháng', features: ['Tất cả gói Cơ Bản', '5 buổi PT/tháng', 'Tham gia lớp nhóm', 'Đánh giá sức khỏe', 'Dinh dưỡng cơ bản'], highlight: true, cta: 'Phổ Biến Nhất' },
  { name: 'Elite', price: '1.299.000', period: '/tháng', features: ['Tất cả gói Pro', 'PT không giới hạn', 'Spa & Sauna', 'Dinh dưỡng chuyên sâu', 'Ưu tiên đặt lịch'], highlight: false, cta: 'Đăng Ký Elite' },
];

const trainers = [
  { name: 'PT. Nguyễn Minh Tú', spec: 'HIIT & Strength', cert: 'ACE CPT', img: 'https://readdy.ai/api/search-image?query=professional%20male%20Vietnamese%20fitness%20personal%20trainer%20gym%20muscular%20athletic%20portrait%20confident%20dark%20background%20professional%20photography&width=300&height=300&seq=pt01&orientation=squarish' },
  { name: 'PT. Trần Lan Anh', spec: 'Yoga & Flexibility', cert: 'RYT 200', img: 'https://readdy.ai/api/search-image?query=professional%20female%20Vietnamese%20yoga%20fitness%20trainer%20gym%20athletic%20portrait%20confident%20clean%20studio%20background%20professional%20photography&width=300&height=300&seq=pt02&orientation=squarish' },
  { name: 'PT. Lê Quốc Bảo', spec: 'Powerlifting', cert: 'NSCA CSCS', img: 'https://readdy.ai/api/search-image?query=professional%20male%20Vietnamese%20powerlifting%20fitness%20trainer%20gym%20strong%20athletic%20portrait%20dark%20background%20professional%20photography&width=300&height=300&seq=pt03&orientation=squarish' },
];

export default function DemoGym() {
  const [showReg, setShowReg] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [regForm, setRegForm] = useState({ name: '', phone: '', plan: '' });
  const [regDone, setRegDone] = useState(false);
  const [activeClass, setActiveClass] = useState<typeof classes[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans">
      {/* Header */}
      <header className="bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
              <i className="ri-boxing-line text-white text-lg"></i>
            </div>
            <div>
              <div className="font-extrabold text-white text-base tracking-wider">IRON CORE GYM</div>
              <div className="text-orange-400 text-[10px] font-semibold tracking-widest">FITNESS & TRAINING CENTER</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-white/60">
            {['Lịch Lớp', 'Gói Tập', 'HLV', 'Tiện Ích', 'Liên Hệ'].map(n => (
              <button key={n} className="cursor-pointer hover:text-orange-400 transition-colors">{n}</button>
            ))}
          </nav>
          <button onClick={() => setShowReg(true)} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer whitespace-nowrap transition-colors">
            <i className="ri-vip-crown-line"></i>Đăng Ký Thành Viên
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <img src="https://readdy.ai/api/search-image?query=modern%20gym%20fitness%20center%20interior%20dark%20dramatic%20lighting%20equipment%20weights%20machines%20athlete%20workout%20energy%20Vietnamese%20gym%20professional%20photography&width=1400&height=800&seq=gymhero&orientation=landscape" alt="Iron Core Gym" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-[#0A0A0A]/30"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>TP.HCM · 3 CƠ SỞ · MỞ CỬA 24/7
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 max-w-xl">
              FORGED BY<br /><span className="text-orange-500">IRON. BUILT</span><br />FOR GLORY.
            </h1>
            <p className="text-white/60 text-base max-w-md mb-8">Cơ sở vật chất đỉnh cao · Huấn luyện viên quốc tế · Lớp nhóm đa dạng. Bắt đầu hành trình của bạn ngay hôm nay!</p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <button onClick={() => setShowReg(true)} className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-3.5 rounded-xl font-extrabold cursor-pointer transition-colors whitespace-nowrap text-sm">
                DÙNG THỬ MIỄN PHÍ 7 NGÀY
              </button>
              <button className="border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap text-sm">
                Xem Lớp Học
              </button>
            </div>
            <div className="flex gap-8 mt-8">
              {[['5.000+', 'Thành Viên'], ['50+', 'Lớp/Tuần'], ['30+', 'HLV Chuyên Nghiệp']].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-black text-orange-500">{n}</div>
                  <div className="text-white/40 text-xs">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Class Schedule */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14">
        <div className="text-center mb-8">
          <span className="text-orange-500 text-xs font-bold tracking-widest">LỊCH LỚP HỌC</span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2">Đa Dạng Lớp Nhóm · 7 Ngày/Tuần</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {classes.map(cls => (
            <div key={cls.name} onClick={() => setActiveClass(cls)} className="bg-[#111111] border border-white/10 rounded-2xl p-5 hover:border-orange-500/40 transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className={`${cls.color} text-white text-xs font-bold px-2.5 py-1 rounded-lg`}>{cls.level}</div>
                <span className="text-white/40 text-xs">{cls.slots}/{cls.total} chỗ còn</span>
              </div>
              <h3 className="text-white font-black text-base mb-1 group-hover:text-orange-400 transition-colors">{cls.name}</h3>
              <div className="text-white/50 text-xs space-y-1">
                <div><i className="ri-user-line mr-1.5"></i>{cls.trainer}</div>
                <div><i className="ri-time-line mr-1.5"></i>{cls.time}</div>
                <div><i className="ri-calendar-line mr-1.5"></i>{cls.days}</div>
              </div>
              <div className="mt-3 w-full bg-white/10 rounded-full h-1.5">
                <div className={`${cls.color} h-1.5 rounded-full`} style={{ width: `${(1 - cls.slots/cls.total) * 100}%` }}></div>
              </div>
              <button className="mt-3 w-full border border-white/20 text-white/60 text-xs py-2 rounded-xl cursor-pointer hover:border-orange-500 hover:text-orange-400 transition-all whitespace-nowrap">Đăng Ký Lớp</button>
            </div>
          ))}
        </div>
      </div>

      {/* Membership Plans */}
      <div className="bg-[#111111] border-y border-white/5 py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="text-orange-500 text-xs font-bold tracking-widest">GÓI THÀNH VIÊN</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">Chọn Gói Phù Hợp Với Bạn</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {plans.map(plan => (
              <div key={plan.name} className={`rounded-2xl p-6 border transition-all ${plan.highlight ? 'bg-orange-500 border-orange-400' : 'bg-[#1A1A1A] border-white/10 hover:border-orange-500/40'}`}>
                {plan.highlight && <div className="text-black text-xs font-extrabold bg-white px-3 py-1 rounded-full w-fit mb-3">⭐ PHỔ BIẾN NHẤT</div>}
                <h3 className={`font-black text-xl mb-1 ${plan.highlight ? 'text-black' : 'text-white'}`}>{plan.name}</h3>
                <div className={`font-black text-3xl mb-4 ${plan.highlight ? 'text-black' : 'text-orange-500'}`}>
                  {plan.price}<span className="text-sm font-medium opacity-70">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-black/80' : 'text-white/60'}`}>
                      <i className={`ri-check-line ${plan.highlight ? 'text-black' : 'text-orange-500'}`}></i>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => { setSelectedPlan(plan.name); setShowReg(true); }} className={`w-full py-3 rounded-xl font-bold cursor-pointer transition-colors whitespace-nowrap text-sm ${plan.highlight ? 'bg-black text-orange-400 hover:bg-black/80' : 'bg-orange-500 text-white hover:bg-orange-400'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trainers */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14">
        <div className="text-center mb-10">
          <span className="text-orange-500 text-xs font-bold tracking-widest">HUẤN LUYỆN VIÊN</span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2">Đội Ngũ Chuyên Gia Quốc Tế</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {trainers.map(t => (
            <div key={t.name} className="bg-[#111111] rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/40 transition-all group">
              <div className="relative overflow-hidden h-52">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-white font-black text-base">{t.name}</h3>
                  <p className="text-orange-400 text-xs">{t.spec}</p>
                </div>
              </div>
              <div className="px-4 py-3">
                <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2.5 py-1 rounded-full">{t.cert}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class Detail Modal */}
      {activeClass && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setActiveClass(null)}>
          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className={`${activeClass.color} text-white text-xs font-bold px-2.5 py-1 rounded-lg w-fit mb-3`}>{activeClass.level}</div>
            <h3 className="text-white font-black text-xl mb-4">{activeClass.name}</h3>
            <div className="space-y-2 text-white/60 text-sm mb-5">
              <div><i className="ri-user-line mr-2 text-orange-400"></i>{activeClass.trainer}</div>
              <div><i className="ri-time-line mr-2 text-orange-400"></i>{activeClass.time}</div>
              <div><i className="ri-calendar-line mr-2 text-orange-400"></i>{activeClass.days}</div>
              <div><i className="ri-group-line mr-2 text-orange-400"></i>{activeClass.slots} chỗ còn trống / {activeClass.total} tổng</div>
            </div>
            <button onClick={() => { setActiveClass(null); setShowReg(true); }} className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl cursor-pointer hover:bg-orange-400 transition-colors mb-2">
              Đăng Ký Lớp Này
            </button>
            <button onClick={() => setActiveClass(null)} className="w-full text-white/30 text-sm cursor-pointer py-1">Đóng</button>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showReg && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => { setShowReg(false); setRegDone(false); }}>
          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            {regDone ? (
              <div className="text-center py-4">
                <i className="ri-checkbox-circle-fill text-5xl text-orange-500 block mb-3"></i>
                <h3 className="text-white font-black text-xl mb-2">Đăng Ký Thành Công!</h3>
                <p className="text-white/50 text-sm">HLV sẽ liên hệ bạn trong 30 phút để xác nhận lịch tập thử.</p>
                <button onClick={() => { setShowReg(false); setRegDone(false); }} className="mt-4 bg-orange-500 text-white font-bold px-8 py-2.5 rounded-xl cursor-pointer">Đóng</button>
              </div>
            ) : (
              <>
                <h3 className="text-white font-black text-lg mb-1">Đăng Ký Thành Viên</h3>
                <p className="text-white/40 text-xs mb-4">Tập thử 7 ngày miễn phí · Không ràng buộc</p>
                <div className="space-y-3">
                  <input value={regForm.name} onChange={e => setRegForm(p => ({...p, name: e.target.value}))} placeholder="Họ và tên" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-orange-500 placeholder:text-white/30" />
                  <input value={regForm.phone} onChange={e => setRegForm(p => ({...p, phone: e.target.value}))} placeholder="Số điện thoại" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-orange-500 placeholder:text-white/30" />
                  <select value={selectedPlan || regForm.plan} onChange={e => setRegForm(p => ({...p, plan: e.target.value}))} className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-orange-500 cursor-pointer">
                    <option value="">-- Chọn gói tập --</option>
                    {plans.map(p => <option key={p.name}>{p.name} — {p.price}{p.period}</option>)}
                  </select>
                </div>
                <button onClick={() => regForm.name && regForm.phone && setRegDone(true)} className="mt-4 w-full bg-orange-500 hover:bg-orange-400 text-white font-extrabold py-3 rounded-xl cursor-pointer transition-colors">
                  BẮT ĐẦU HÀNH TRÌNH
                </button>
                <button onClick={() => setShowReg(false)} className="w-full mt-2 text-white/30 text-sm cursor-pointer py-1">Đóng</button>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="bg-[#050505] border-t border-white/5 py-8 text-center">
        <div className="text-white font-extrabold text-xl mb-2">IRON CORE GYM</div>
        <p className="text-white/20 text-xs">© 2025 Iron Core Gym · Thiết kế bởi <span className="text-[#00C2E0] font-semibold">WebPro Studio</span></p>
      </footer>
    </div>
  );
}
