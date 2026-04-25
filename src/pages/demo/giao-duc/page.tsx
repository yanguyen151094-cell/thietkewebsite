import { useState } from 'react';

const courses = [
  { id: 1, name: 'Tiếng Anh Giao Tiếp Cơ Bản', level: 'Sơ Cấp', duration: '3 tháng', sessions: '3 buổi/tuần', price: 2500000, students: 1240, image: 'https://readdy.ai/api/search-image?query=English%20speaking%20class%20students%20group%20Vietnam%20modern%20classroom%20whiteboard%20clean%20professional%20learning%20environment&width=400&height=280&seq=edu01&orientation=landscape', tag: 'PHỔ BIẾN' },
  { id: 2, name: 'IELTS Intensive 6.5+', level: 'Trung Cấp', duration: '4 tháng', sessions: '4 buổi/tuần', price: 4200000, students: 890, image: 'https://readdy.ai/api/search-image?query=IELTS%20exam%20preparation%20class%20Vietnam%20students%20studying%20books%20test%20preparation%20focused%20learning%20environment&width=400&height=280&seq=edu02&orientation=landscape', tag: 'HOT' },
  { id: 3, name: 'Business English', level: 'Nâng Cao', duration: '3 tháng', sessions: '2 buổi/tuần', price: 3800000, students: 560, image: 'https://readdy.ai/api/search-image?query=business%20English%20class%20Vietnamese%20professionals%20office%20corporate%20training%20workshop%20presentation%20modern%20room&width=400&height=280&seq=edu03&orientation=landscape', tag: 'MỚI' },
  { id: 4, name: 'Tiếng Anh Cho Trẻ Em (6–12)', level: 'Thiếu Nhi', duration: '6 tháng', sessions: '3 buổi/tuần', price: 1800000, students: 2340, image: 'https://readdy.ai/api/search-image?query=children%20English%20class%20Vietnam%20kids%20happy%20learning%20colorful%20classroom%20fun%20interactive%20young%20students%20teacher&width=400&height=280&seq=edu04&orientation=landscape', tag: 'PHỔ BIẾN' },
  { id: 5, name: 'TOEIC 750+', level: 'Trung Cấp', duration: '2 tháng', sessions: '5 buổi/tuần', price: 2900000, students: 1100, image: 'https://readdy.ai/api/search-image?query=TOEIC%20preparation%20exam%20class%20Vietnam%20students%20corporate%20workforce%20English%20test%20certification%20focused&width=400&height=280&seq=edu05&orientation=landscape', tag: 'HOT' },
  { id: 6, name: 'Tiếng Anh Học Thuật', level: 'Cao Cấp', duration: '3 tháng', sessions: '3 buổi/tuần', price: 3500000, students: 420, image: 'https://readdy.ai/api/search-image?query=academic%20English%20class%20Vietnamese%20university%20students%20research%20writing%20reading%20advanced%20level%20professional&width=400&height=280&seq=edu06&orientation=landscape', tag: '' },
  { id: 7, name: 'Tiếng Anh Du Lịch', level: 'Sơ Cấp', duration: '1 tháng', sessions: '3 buổi/tuần', price: 1500000, students: 780, image: 'https://readdy.ai/api/search-image?query=travel%20English%20class%20Vietnam%20students%20learning%20airport%20hotel%20vocabulary%20modern%20classroom%20interactive&width=400&height=280&seq=edu07&orientation=landscape', tag: 'MỚI' },
  { id: 8, name: 'Tiếng Anh Phỏng Vấn', level: 'Nâng Cao', duration: '1 tháng', sessions: '2 buổi/tuần', price: 2200000, students: 650, image: 'https://readdy.ai/api/search-image?query=job%20interview%20English%20class%20Vietnam%20professionals%20practicing%20modern%20office%20role%20play%20confident&width=400&height=280&seq=edu08&orientation=landscape', tag: 'HOT' },
];

const teachers = [
  { name: 'Ms. Sarah Johnson', origin: 'Người Mỹ Bản Ngữ', cert: 'CELTA · 8 năm', img: 'https://readdy.ai/api/search-image?query=professional%20American%20female%20English%20teacher%20portrait%20friendly%20warm%20smile%20clean%20white%20background%20education%20teaching%20photography&width=300&height=300&seq=tc01&orientation=squarish' },
  { name: 'Mr. David Thompson', origin: 'Người Anh Bản Ngữ', cert: 'DELTA · 12 năm', img: 'https://readdy.ai/api/search-image?query=professional%20British%20male%20English%20teacher%20portrait%20friendly%20confident%20clean%20background%20education%20teaching%20photography&width=300&height=300&seq=tc02&orientation=squarish' },
  { name: 'Th.S Nguyễn Lan Hương', origin: 'Giảng Viên ĐH', cert: 'MA TESOL · 10 năm', img: 'https://readdy.ai/api/search-image?query=professional%20Vietnamese%20female%20English%20teacher%20lecturer%20university%20portrait%20friendly%20clean%20background%20education%20photography&width=300&height=300&seq=tc03&orientation=squarish' },
  { name: 'Mr. James Wilson', origin: 'Người Úc Bản Ngữ', cert: 'TESOL · 6 năm', img: 'https://readdy.ai/api/search-image?query=professional%20Australian%20male%20English%20teacher%20portrait%20friendly%20warm%20smile%20clean%20background%20education%20photography&width=300&height=300&seq=tc04&orientation=squarish' },
];

const testimonials = [
  { name: 'Nguyễn Thị Hương', text: 'Học IELTS ở đây 4 tháng, đạt 7.0! Giáo viên bản ngữ rất tận tình, lộ trình rõ ràng.', rating: 5, course: 'IELTS Intensive' },
  { name: 'Trần Văn Minh', text: 'Con mình 8 tuổi, học tiếng Anh thiếu nhi rất vui. Bé tự tin giao tiếp sau 3 tháng.', rating: 5, course: 'Tiếng Anh Thiếu Nhi' },
  { name: 'Lê Thị Lan', text: 'Business English giúp mình tự tin đàm phán với đối tác nước ngoài. Rất đáng đầu tư!', rating: 5, course: 'Business English' },
];

const faqs = [
  { q: 'Học thử miễn phí như thế nào?', a: 'Bạn đăng ký form trên web, chúng tôi sắp xếp 1 buổi học thử miễn phí với giáo viên bản ngữ. Không ràng buộc, không phí ẩn.' },
  { q: 'Lớp học có bao nhiêu học viên?', a: 'Lớp nhóm tối đa 12 học viên để đảm bảo tương tác. Có lớp 1-1 riêng theo yêu cầu.' },
  { q: 'Có cam kết đầu ra không?', a: 'Có! IELTS cam kết 6.5+, TOEIC cam kết 750+. Nếu không đạt, học lại miễn phí.' },
  { q: 'Thời gian học linh hoạt không?', a: 'Có lịch sáng, chiều, tối và cuối tuần. Bạn chọn khung giờ phù hợp nhất.' },
];

const levels = ['Tất Cả', 'Sơ Cấp', 'Trung Cấp', 'Nâng Cao', 'Thiếu Nhi', 'Cao Cấp'];

export default function DemoGiaoDuc() {
  const [activeLevel, setActiveLevel] = useState('Tất Cả');
  const [showEnroll, setShowEnroll] = useState<typeof courses[0] | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [done, setDone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filtered = activeLevel === 'Tất Cả' ? courses : courses.filter(c => c.level === activeLevel);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1E40AF] rounded-xl flex items-center justify-center">
              <i className="ri-graduation-cap-fill text-white text-lg"></i>
            </div>
            <div>
              <div className="font-extrabold text-[#1E3A8A] text-base">ENGLISH PLUS</div>
              <div className="text-[#3B82F6] text-[10px] font-semibold tracking-widest">TRUNG TÂM TIẾNG ANH · HÀ NỘI</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-slate-600">
            {['Khóa Học', 'Giáo Viên', 'Lịch Khai Giảng', 'Học Phí', 'Liên Hệ'].map(n => (
              <button key={n} className="cursor-pointer hover:text-[#3B82F6] transition-colors">{n}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowEnroll(courses[0])} className="hidden md:flex items-center gap-1.5 bg-[#1E40AF] text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer whitespace-nowrap hover:bg-[#1D4ED8] transition-colors">
              <i className="ri-user-add-line"></i>Đăng Ký Học Thử
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-9 h-9 flex items-center justify-center text-slate-600">
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-slate-100 px-4 py-3 space-y-2 bg-white">
            {['Khóa Học', 'Giáo Viên', 'Lịch Khai Giảng', 'Học Phí', 'Liên Hệ'].map(n => (
              <button key={n} className="block w-full text-left text-sm text-slate-600 py-1 cursor-pointer hover:text-[#3B82F6]">{n}</button>
            ))}
            <button onClick={() => setShowEnroll(courses[0])} className="w-full bg-[#1E40AF] text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer mt-2">
              Đăng Ký Học Thử
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <img src="https://readdy.ai/api/search-image?query=modern%20English%20language%20center%20Vietnam%20happy%20students%20classroom%20whiteboard%20bright%20clean%20colorful%20learning%20environment%20cheerful%20education%20center%20professional&width=1400&height=800&seq=eduhero&orientation=landscape" alt="English Plus" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/80 via-[#1E3A8A]/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5">
              <i className="ri-award-line text-[#93C5FD]"></i>ĐỐI TÁC CAMBRIDGE · IELTS IDP · TOIEC
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 max-w-xl">
              Chinh Phục<br /><span className="text-[#93C5FD]">Tiếng Anh</span><br />Đỉnh Cao
            </h1>
            <p className="text-white/75 text-base max-w-md mb-8">Giáo viên bản ngữ · Lộ trình học cá nhân hóa · Cam kết đầu ra. 15.000+ học viên tin tưởng!</p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <button onClick={() => setShowEnroll(courses[0])} className="bg-[#3B82F6] text-white px-7 py-3.5 rounded-xl font-extrabold cursor-pointer hover:bg-[#2563EB] transition-colors whitespace-nowrap text-sm">
                <i className="ri-play-circle-line mr-1.5"></i>Học Thử Miễn Phí
              </button>
              <button className="border border-white/30 text-white px-7 py-3.5 rounded-xl font-bold cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap text-sm">
                Tư Vấn Lộ Trình
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Stats */}
      <div className="bg-[#1E40AF] py-5">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[['15.000+', 'Học Viên'], ['98%', 'Đạt Mục Tiêu'], ['100%', 'GV Bản Ngữ'], ['12 Năm', 'Kinh Nghiệm']].map(([n, l]) => (
            <div key={l}>
              <div className="text-2xl font-black text-white">{n}</div>
              <div className="text-white/60 text-xs mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Courses */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14">
        <div className="text-center mb-8">
          <span className="text-[#3B82F6] text-xs font-bold tracking-widest">KHÓA HỌC</span>
          <h2 className="text-2xl md:text-4xl font-black text-[#1E3A8A] mt-2">Đa Dạng Chương Trình</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 justify-center">
          {levels.map(l => (
            <button key={l} onClick={() => setActiveLevel(l)} className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${activeLevel === l ? 'bg-[#1E40AF] text-white' : 'bg-slate-100 text-slate-600 hover:bg-[#EFF6FF] hover:text-[#3B82F6]'}`}>{l}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {filtered.map(c => (
            <div key={c.id} className="border border-slate-100 rounded-2xl overflow-hidden hover:border-[#93C5FD] hover:-translate-y-1 transition-all group cursor-pointer" onClick={() => setShowEnroll(c)}>
              <div className="relative overflow-hidden">
                <img src={c.image} alt={c.name} className="w-full h-44 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                {c.tag && <span className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2.5 py-1 rounded-full ${c.tag === 'HOT' ? 'bg-red-500' : c.tag === 'MỚI' ? 'bg-emerald-500' : 'bg-[#1E40AF]'}`}>{c.tag}</span>}
                <span className="absolute top-2 right-2 bg-white/90 text-[#1E40AF] text-[10px] font-bold px-2 py-0.5 rounded-full">{c.level}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#1E3A8A] text-sm mb-2 leading-tight">{c.name}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-slate-500 text-xs">
                  <span><i className="ri-time-line mr-1"></i>{c.duration}</span>
                  <span><i className="ri-calendar-line mr-1"></i>{c.sessions}</span>
                  <span><i className="ri-group-line mr-1"></i>{c.students.toLocaleString()} học viên</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#1E40AF] font-black text-base">{c.price.toLocaleString()}đ</span>
                  <button className="bg-[#EFF6FF] text-[#3B82F6] text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#1E40AF] hover:text-white transition-colors whitespace-nowrap">Đăng Ký</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teachers */}
      <div className="bg-[#EFF6FF] py-14">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="text-[#3B82F6] text-xs font-bold tracking-widest">ĐỘI NGŨ GIÁO VIÊN</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#1E3A8A] mt-2">Người Bản Ngữ & Chuyên Gia TESOL</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {teachers.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-5 text-center border border-blue-100 hover:-translate-y-1 transition-all">
                <div className="w-24 h-24 mx-auto mb-3 rounded-2xl overflow-hidden">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="font-bold text-[#1E3A8A] text-sm mb-1">{t.name}</h3>
                <p className="text-[#3B82F6] text-xs font-medium">{t.origin}</p>
                <p className="text-slate-400 text-xs mt-1">{t.cert}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14">
        <div className="text-center mb-8">
          <span className="text-[#3B82F6] text-xs font-bold tracking-widest">HỌC VIÊN NÓI GÌ?</span>
          <h2 className="text-2xl font-black text-[#1E3A8A] mt-2">Kết Quả Thật Từ Học Viên Thật</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {testimonials.map(t => (
            <div key={t.name} className="bg-[#EFF6FF] rounded-2xl p-5 border border-blue-100">
              <div className="text-[#F59E0B] text-sm mb-2">{'★'.repeat(t.rating)}</div>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#1E3A8A] text-sm">{t.name}</span>
                  <span className="text-[#3B82F6] text-xs ml-2">{t.course}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-[#F8FAFC] py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <span className="text-[#3B82F6] text-xs font-bold tracking-widest">CÂU HỎI THƯỜNG GẶP</span>
            <h2 className="text-2xl font-black text-[#1E3A8A] mt-2">Bạn Thắc Mắc Gì?</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-[#1E3A8A] text-sm">{faq.q}</span>
                  <i className={`${openFaq === i ? 'ri-subtract-line' : 'ri-add-line'} text-[#3B82F6] flex-shrink-0 ml-2`}></i>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-slate-500 text-sm leading-relaxed border-t border-slate-100">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enroll Modal */}
      {showEnroll && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => { setShowEnroll(null); setDone(false); }}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            {done ? (
              <div className="text-center py-4">
                <i className="ri-checkbox-circle-fill text-5xl text-emerald-500 block mb-3"></i>
                <h3 className="font-black text-[#1E3A8A] text-xl mb-2">Đăng Ký Thành Công!</h3>
                <p className="text-slate-500 text-sm">Tư vấn viên sẽ liên hệ bạn trong 30 phút để sắp xếp lịch học thử.</p>
                <button onClick={() => { setShowEnroll(null); setDone(false); }} className="mt-4 bg-[#1E40AF] text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer">Đóng</button>
              </div>
            ) : (
              <>
                <h3 className="font-black text-[#1E3A8A] text-lg mb-1">Đăng Ký Học Thử</h3>
                <p className="text-[#3B82F6] text-sm mb-4">{showEnroll.name}</p>
                <div className="space-y-3">
                  <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="Họ và tên" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#3B82F6] text-slate-800" />
                  <input value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} placeholder="Số điện thoại" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#3B82F6] text-slate-800" />
                  <input value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} placeholder="Email (tùy chọn)" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#3B82F6] text-slate-800" />
                </div>
                <div className="mt-3 p-3 bg-[#EFF6FF] rounded-xl text-xs text-[#3B82F6]">
                  <i className="ri-gift-line mr-1"></i>Học thử 1 buổi miễn phí · Không ràng buộc
                </div>
                <button onClick={() => form.name && form.phone && setDone(true)} className="mt-4 w-full bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold py-3 rounded-xl cursor-pointer transition-colors whitespace-nowrap">
                  <i className="ri-play-circle-line mr-1.5"></i>Đăng Ký Học Thử Ngay
                </button>
                <button onClick={() => setShowEnroll(null)} className="w-full mt-2 text-slate-400 text-sm cursor-pointer">Đóng</button>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="bg-[#1E3A8A] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <div className="font-extrabold text-xl mb-2">ENGLISH PLUS CENTER</div>
          <p className="text-white/40 text-sm mb-1">25 Trần Phú, Ba Đình, Hà Nội · Hotline: 0901 234 567</p>
          <p className="text-white/20 text-xs">© 2025 English Plus · Thiết kế bởi <span className="text-[#00C2E0] font-semibold">WebPro Studio</span></p>
        </div>
      </footer>
    </div>
  );
}