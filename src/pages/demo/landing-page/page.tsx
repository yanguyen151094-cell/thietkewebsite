import { useState } from 'react';

const platforms = [
  {
    name: 'Facebook Ads', icon: 'ri-facebook-fill', color: '#1877F2',
    features: ['Target hành vi mua hàng chính xác', 'Retargeting thông minh', 'Video & Carousel & Collection Ads', 'Lookalike Audience 1–10%'],
    stat: 'ROI trung bình x3.2 lần',
  },
  {
    name: 'Google Ads', icon: 'ri-google-fill', color: '#EA4335',
    features: ['Search — đúng lúc khách cần', 'Google Shopping', 'Display Network toàn cầu', 'YouTube Pre-roll Ads'],
    stat: 'CPC thấp hơn đối thủ 40%',
  },
  {
    name: 'TikTok Ads', icon: 'ri-tiktok-fill', color: '#FF0050',
    features: ['TopView & Brand Takeover', 'In-Feed Video Ads', 'Spark Ads từ nội dung thật', 'Tiếp cận 20M+ người Việt'],
    stat: 'Reach tăng 5x với ngân sách cũ',
  },
];

const cases = [
  { biz: 'Spa Ánh Dương', result: 'Tháng đầu 87 khách mới', before: '12 khách/tháng', after: '87 khách/tháng', platform: 'Facebook Ads', img: 'https://readdy.ai/api/search-image?query=spa%20beauty%20center%20Vietnam%20modern%20luxury%20interior%20branding%20professional%20photography&width=400&height=280&seq=cs001&orientation=landscape' },
  { biz: 'Shop Giày Online', result: 'Đơn hàng tăng 4.8x', before: '50 đơn/ngày', after: '240 đơn/ngày', platform: 'TikTok + Facebook', img: 'https://readdy.ai/api/search-image?query=online%20fashion%20shoe%20store%20Vietnam%20e-commerce%20modern%20branding%20photography&width=400&height=280&seq=cs002&orientation=landscape' },
  { biz: 'Homestay Đà Lạt', result: 'Booking trực tiếp x4', before: '80% qua OTA', after: '70% trực tiếp', platform: 'Google Ads', img: 'https://readdy.ai/api/search-image?query=boutique%20homestay%20Dalat%20Vietnam%20booking%20direct%20marketing%20photography&width=400&height=280&seq=cs003&orientation=landscape' },
];

const testimonials = [
  { name: 'Chị Nguyễn Thị Lan', biz: 'Spa Ánh Dương', text: 'AdsPro giúp spa của tôi tăng từ 12 khách/tháng lên 87 khách chỉ trong tháng đầu. ROI x4.5!', rating: 5 },
  { name: 'Anh Trần Văn Hùng', biz: 'Shop Giày Online', text: 'Chạy TikTok + Facebook Ads, đơn hàng tăng gần 5 lần. Chi phí quảng cáo giảm 30% so với tự chạy.', rating: 5 },
  { name: 'Chị Lê Thị Hoa', biz: 'Homestay Đà Lạt', text: 'Từ 80% booking qua OTA, giờ 70% khách đặt trực tiếp. Lợi nhuận tăng đáng kể!', rating: 5 },
];

const faqs = [
  { q: 'Ngân sách tối thiểu để chạy quảng cáo là bao nhiêu?', a: 'Chúng tôi nhận quản lý từ 5 triệu/tháng trở lên. Tuy nhiên để thấy kết quả rõ ràng, khuyến nghị ngân sách từ 10–20 triệu/tháng.' },
  { q: 'Bao lâu thì thấy kết quả?', a: 'Thông thường sau 2–4 tuần đầu chạy tối ưu, bạn sẽ thấy leads đổ về. Tháng thứ 2–3 là lúc hệ thống ổn định và ROI tăng mạnh.' },
  { q: 'Tôi có phải cung cấp nội dung/hình ảnh không?', a: 'Không bắt buộc. Đội creative của chúng tôi có thể sản xuất toàn bộ nội dung quảng cáo, ảnh, video cho bạn.' },
  { q: 'Hợp đồng tối thiểu bao lâu?', a: 'Cam kết tối thiểu 3 tháng để đủ thời gian tối ưu và thấy kết quả rõ ràng. Không ràng buộc dài hạn.' },
];

export default function DemoLandingPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', note: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#05070F] font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-[#05070F]/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-white font-extrabold text-lg">
            <span className="text-[#00E5FF]">ADS</span>PRO VIỆT
          </div>
          <nav className="hidden md:flex gap-6 text-white/60 text-sm">
            {['Dịch Vụ', 'Case Study', 'FAQ', 'Liên Hệ'].map((n) => (
              <button key={n} className="cursor-pointer hover:text-white transition-colors">{n}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="tel:0901234567" className="hidden md:flex items-center gap-1.5 bg-[#00E5FF] text-black text-xs font-extrabold px-4 py-2 rounded-full cursor-pointer whitespace-nowrap hover:bg-cyan-300 transition-colors">
              <i className="ri-phone-fill text-xs"></i>0901 234 567
            </a>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-9 h-9 flex items-center justify-center text-white/60">
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-2 bg-[#05070F]">
            {['Dịch Vụ', 'Case Study', 'FAQ', 'Liên Hệ'].map(n => (
              <button key={n} className="block w-full text-left text-sm text-white/60 py-1 cursor-pointer hover:text-white">{n}</button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://readdy.ai/api/search-image?query=digital%20marketing%20agency%20abstract%20technology%20background%20dark%20blue%20neon%20grid%20futuristic%20data%20analytics%20visual%20modern%20professional&width=1400&height=900&seq=lphero&orientation=landscape" alt="AdsPro" className="w-full h-full object-cover object-center opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070F] via-transparent to-[#05070F]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center pt-20">
          <div className="inline-flex items-center gap-2 bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse"></span>
            AGENCY QUẢNG CÁO #1 VIỆT NAM · 500+ DOANH NGHIỆP
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Tăng 300% Doanh Thu<br />
            <span className="text-[#00E5FF]">Chỉ Trong 90 Ngày</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-10">
            Chúng tôi đã giúp 500+ doanh nghiệp Việt Nam tăng trưởng vượt bậc qua Facebook Ads, Google Ads và TikTok Ads. <strong className="text-white">Kết quả thật — cam kết đo lường được.</strong>
          </p>
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto mb-12">
            {[['340%', 'Tăng Doanh Thu TB'], ['2.5X', 'ROI Trung Bình'], ['90%', 'Giảm Chi Phí/Lead']].map(([m, l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl md:text-4xl font-black text-[#00E5FF]">{m}</div>
                <div className="text-white text-xs font-semibold mt-1">{l}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center flex-col sm:flex-row">
            <a href="#form" className="bg-[#00E5FF] text-black px-8 py-3.5 rounded-full font-extrabold cursor-pointer hover:bg-cyan-300 transition-colors whitespace-nowrap text-sm">
              <i className="ri-gift-line mr-1.5"></i>Nhận Tư Vấn Miễn Phí
            </a>
            <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="border border-white/20 text-white px-8 py-3.5 rounded-full font-bold cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap text-sm">
              <i className="ri-message-2-fill mr-1.5"></i>Chat Zalo Ngay
            </a>
          </div>
        </div>
      </div>

      {/* Platforms */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-white">Đa Nền Tảng — Tối Ưu Chuyển Đổi</h2>
          <p className="text-white/40 text-sm mt-2">Chiến lược phù hợp cho từng loại hình kinh doanh</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {platforms.map((s) => (
            <div key={s.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl" style={{ backgroundColor: s.color + '20' }}>
                  <i className={`${s.icon} text-2xl`} style={{ color: s.color }}></i>
                </div>
                <div>
                  <span className="text-white font-bold text-sm block">{s.name}</span>
                  <span className="text-[#00E5FF] text-xs">{s.stat}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-white/60 text-xs">
                    <i className="ri-checkbox-circle-fill text-[#00E5FF] text-sm mt-0.5 flex-shrink-0"></i>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div className="bg-white/3 border-y border-white/5 py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-white">Case Study Thực Tế</h2>
            <p className="text-white/40 text-sm mt-2">Kết quả thật từ khách hàng thật — không phóng đại</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {cases.map((c) => (
              <div key={c.biz} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                <img src={c.img} alt={c.biz} className="w-full h-40 object-cover object-top" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-bold text-sm">{c.biz}</span>
                    <span className="bg-[#00E5FF]/10 text-[#00E5FF] text-[10px] font-bold px-2 py-0.5 rounded-full">{c.platform}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-red-500/10 rounded-lg p-2 text-center">
                      <div className="text-red-400 text-[10px] font-bold">Trước</div>
                      <div className="text-white text-xs font-semibold mt-0.5">{c.before}</div>
                    </div>
                    <div className="bg-emerald-500/10 rounded-lg p-2 text-center">
                      <div className="text-emerald-400 text-[10px] font-bold">Sau</div>
                      <div className="text-white text-xs font-semibold mt-0.5">{c.after}</div>
                    </div>
                  </div>
                  <p className="text-[#00E5FF] text-xs font-bold">{c.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white">Khách Hàng Nói Gì?</h2>
          <p className="text-white/40 text-sm mt-2">Phản hồi từ doanh nghiệp đã hợp tác với AdsPro</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {testimonials.map(t => (
            <div key={t.name} className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="text-[#00E5FF] text-sm mb-2">{'★'.repeat(t.rating)}</div>
              <p className="text-white/60 text-sm leading-relaxed mb-3">"{t.text}"</p>
              <div>
                <span className="text-white font-semibold text-sm">{t.name}</span>
                <span className="text-white/40 text-xs ml-2">— {t.biz}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 py-14">
        <h2 className="text-center text-2xl font-black text-white mb-8">Câu Hỏi Thường Gặp</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-white/5 transition-colors">
                <span className="text-white font-semibold text-sm">{faq.q}</span>
                <i className={`${openFaq === i ? 'ri-subtract-line' : 'ri-add-line'} text-[#00E5FF] flex-shrink-0 ml-2`}></i>
              </button>
              {openFaq === i && <div className="px-5 pb-4 text-white/50 text-sm leading-relaxed border-t border-white/5">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div id="form" className="max-w-xl mx-auto px-4 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white">Nhận Tư Vấn Miễn Phí</h2>
          <p className="text-white/40 text-sm mt-2">Điền form — nhận phân tích & đề xuất chiến dịch trong 24h</p>
        </div>
        {submitted ? (
          <div className="bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-2xl p-8 text-center">
            <i className="ri-checkbox-circle-fill text-5xl text-[#00E5FF] mb-4 block"></i>
            <h3 className="text-white font-bold text-lg mb-2">Đăng Ký Thành Công!</h3>
            <p className="text-white/60 text-sm">Chuyên gia sẽ liên hệ trong vòng 30 phút (giờ hành chính).</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-white/60 text-xs font-semibold block mb-1.5 uppercase tracking-wide">Họ Tên *</label>
              <input name="name" value={formData.name} onChange={handleChange} required placeholder="Nguyễn Văn A" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#00E5FF]/50 placeholder:text-white/20" />
            </div>
            <div>
              <label className="text-white/60 text-xs font-semibold block mb-1.5 uppercase tracking-wide">Số Điện Thoại *</label>
              <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="0901 234 567" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#00E5FF]/50 placeholder:text-white/20" />
            </div>
            <div>
              <label className="text-white/60 text-xs font-semibold block mb-1.5 uppercase tracking-wide">Nền Tảng Quan Tâm</label>
              <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-[#0D1520] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#00E5FF]/50 cursor-pointer">
                <option value="">-- Chọn nền tảng --</option>
                <option>Facebook Ads</option>
                <option>Google Ads</option>
                <option>TikTok Ads</option>
                <option>Tất cả nền tảng</option>
              </select>
            </div>
            <div>
              <label className="text-white/60 text-xs font-semibold block mb-1.5 uppercase tracking-wide">Mô Tả Ngắn (tùy chọn)</label>
              <textarea name="note" value={formData.note} onChange={handleChange} rows={3} maxLength={500} placeholder="Lĩnh vực kinh doanh, mục tiêu, ngân sách dự kiến..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#00E5FF]/50 placeholder:text-white/20 resize-none" />
            </div>
            <button type="submit" className="w-full bg-[#00E5FF] text-black font-extrabold py-3.5 rounded-xl cursor-pointer hover:bg-cyan-300 transition-colors text-sm">
              Gửi Đăng Ký — Hoàn Toàn Miễn Phí
            </button>
          </form>
        )}
      </div>

      <footer className="border-t border-white/5 py-8 text-center">
        <div className="text-white font-extrabold text-lg mb-1"><span className="text-[#00E5FF]">ADS</span>PRO VIỆT</div>
        <p className="text-white/20 text-xs">© 2025 AdsPro Việt · Thiết kế bởi <span className="text-[#00C2E0] font-semibold">WebPro Studio</span></p>
      </footer>
    </div>
  );
}