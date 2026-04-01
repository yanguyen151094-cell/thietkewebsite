import { useRef, useState, useEffect } from 'react';

function useIntersection(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

const FORM_URL = 'https://readdy.ai/api/form/d75qvecbmgf2o8mm6rn0';

const INDUSTRIES_LIST = [
  "Bán hàng / Thương mại điện tử",
  "Khách sạn / Homestay",
  "Nhà hàng / Quán cafe",
  "Spa / Làm đẹp",
  "Giáo dục / Đào tạo",
  "Bất động sản",
  "Y tế / Sức khỏe",
  "Ô tô / Xe máy",
  "Xây dựng / Nội thất",
  "Công nghệ / IT",
  "Tài chính / Bảo hiểm",
  "Khác",
];

const NEEDS_LIST = [
  "Thiết kế website mới",
  "Chạy quảng cáo Facebook",
  "Chạy quảng cáo Google",
  "Chạy quảng cáo TikTok",
  "Cả thiết kế web & quảng cáo",
];

export default function ConsultationForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useIntersection(sectionRef as React.RefObject<Element>);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.length > 500) return;
    setStatus('sending');
    try {
      const form = e.currentTarget;
      const data = new URLSearchParams();
      data.append('name', (form.elements.namedItem('name') as HTMLInputElement).value);
      data.append('phone', (form.elements.namedItem('phone') as HTMLInputElement).value);
      data.append('industry', (form.elements.namedItem('industry') as HTMLSelectElement).value);
      data.append('need', (form.elements.namedItem('need') as HTMLSelectElement).value);
      data.append('message', (form.elements.namedItem('message') as HTMLTextAreaElement).value);
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="consultation" ref={sectionRef} className="section-padding bg-[#0F2B5B]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left info */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-[#00C2E0] text-xs font-bold uppercase tracking-widest mb-4 block">TƯ VẤN MIỄN PHÍ</span>
            <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-6 leading-tight">
              Nhận Tư Vấn<br /><span className="text-[#00C2E0]">Hoàn Toàn Miễn Phí</span>
            </h2>
            <p className="text-white/70 text-base mb-8 leading-relaxed">
              Điền form để được đội ngũ chuyên gia của chúng tôi liên hệ tư vấn giải pháp phù hợp nhất cho doanh nghiệp của bạn — hoàn toàn miễn phí, không ràng buộc.
            </p>
            <div className="space-y-5">
              {[
                { icon: 'ri-timer-line', title: 'Phản hồi trong 30 phút', desc: 'Đội ngũ tư vấn luôn sẵn sàng hỗ trợ bạn' },
                { icon: 'ri-shield-check-line', title: 'Tư vấn 100% miễn phí', desc: 'Không ràng buộc, không phí ẩn bất kỳ' },
                { icon: 'ri-award-line', title: '5+ năm kinh nghiệm', desc: 'Đội ngũ chuyên gia dày dặn kinh nghiệm' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-[#00C2E0]/20 rounded-xl">
                    <i className={`${item.icon} text-[#00C2E0] text-xl`}></i>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{item.title}</p>
                    <p className="text-white/50 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white rounded-2xl p-7 md:p-8">
              <h3 className="font-heading font-bold text-[#0F2B5B] text-xl mb-6">Đăng Ký Tư Vấn</h3>
              {status === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 flex items-center justify-center bg-[#00C2E0]/10 rounded-full mx-auto mb-4">
                    <i className="ri-check-double-line text-[#00C2E0] text-3xl"></i>
                  </div>
                  <h4 className="font-bold text-[#0F2B5B] text-lg mb-2">Đăng ký thành công!</h4>
                  <p className="text-slate-500 text-sm">Chúng tôi sẽ liên hệ với bạn trong vòng 30 phút. Cảm ơn bạn đã tin tưởng!</p>
                  <button onClick={() => setStatus('idle')} className="mt-4 text-[#00C2E0] text-sm font-medium cursor-pointer">Gửi thêm yêu cầu</button>
                </div>
              ) : (
                <form id="consultation-form" data-readdy-form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-slate-600 text-sm font-medium mb-1.5">Họ và tên *</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 text-sm font-medium mb-1.5">Số điện thoại *</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="0901 234 567"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 text-sm font-medium mb-1.5">Ngành nghề</label>
                    <select
                      name="industry"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 transition bg-white"
                    >
                      <option value="">-- Chọn ngành nghề --</option>
                      {INDUSTRIES_LIST.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 text-sm font-medium mb-1.5">Nhu cầu</label>
                    <select
                      name="need"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 transition bg-white"
                    >
                      <option value="">-- Chọn nhu cầu --</option>
                      {NEEDS_LIST.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 text-sm font-medium mb-1.5">
                      Mô tả thêm
                      <span className="text-slate-400 font-normal ml-2">({message.length}/500)</span>
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Mô tả ngắn về dự án hoặc yêu cầu của bạn..."
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C2E0]/20 transition resize-none ${message.length > 500 ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-[#00C2E0]'}`}
                    ></textarea>
                    {message.length > 500 && <p className="text-red-500 text-xs mt-1">Vui lòng nhập tối đa 500 ký tự</p>}
                  </div>
                  {status === 'error' && (
                    <p className="text-red-500 text-sm">Có lỗi xảy ra, vui lòng thử lại!</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'sending' || message.length > 500}
                    className="w-full bg-[#0F2B5B] hover:bg-[#00C2E0] disabled:opacity-60 text-white font-bold text-sm py-4 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    {status === 'sending' ? 'Đang gửi...' : 'Gửi Yêu Cầu Tư Vấn'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
