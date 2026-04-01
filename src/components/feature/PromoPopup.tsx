import { useState, useEffect } from 'react';

const STORAGE_KEY = 'webpro_promo_shown';

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(STORAGE_KEY, '1');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible || countdown <= 0) return;
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [visible, countdown]);

  const handleClose = () => setVisible(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.phone) return;
    setLoading(true);

    const body = new URLSearchParams();
    body.append('name', formData.name);
    body.append('phone', formData.phone);

    try {
      await fetch('https://readdy.ai/api/form/d75ubq54hjod66j2egq0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
    } catch {
      // silent
    } finally {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setVisible(false), 2500);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div
        className="relative z-10 bg-white rounded-2xl overflow-hidden w-full max-w-md animate-popup"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'popupIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards' }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/30 rounded-full text-white cursor-pointer transition-colors"
        >
          <i className="ri-close-line text-base"></i>
        </button>

        {/* Top Banner */}
        <div className="relative h-40 overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=special%20offer%20discount%20promotion%20banner%20modern%20digital%20marketing%20Vietnamese%20business%20website%20gift%20voucher%20warm%20orange%20gold%20color%20vibrant%20background%20abstract&width=800&height=320&seq=promo001&orientation=landscape"
            alt="Ưu đãi đặc biệt"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="inline-flex items-center gap-2 bg-[#FF6B35] text-white text-xs font-extrabold px-4 py-1.5 rounded-full mb-3 tracking-widest">
              <i className="ri-gift-line"></i>
              ƯU ĐÃI ĐẶC BIỆT
            </div>
            <h2 className="text-white text-2xl font-black leading-tight drop-shadow">
              Tặng Ngay<br />
              <span className="text-[#FFD700]">Tư Vấn Miễn Phí</span>
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-4">
                <i className="ri-checkbox-circle-fill text-4xl text-emerald-500"></i>
              </div>
              <h3 className="text-slate-800 font-black text-xl mb-2">Đăng Ký Thành Công!</h3>
              <p className="text-slate-500 text-sm">Chuyên gia WebPro Studio sẽ liên hệ bạn trong <strong className="text-[#0F2B5B]">30 phút</strong>.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                  Để lại số điện thoại — nhận <strong className="text-[#0F2B5B]">tư vấn thiết kế website miễn phí</strong> + báo giá chi tiết trong ngày hôm nay!
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { icon: 'ri-timer-flash-line', text: 'Phản hồi trong 30 phút' },
                  { icon: 'ri-money-dollar-circle-line', text: 'Báo giá miễn phí' },
                  { icon: 'ri-shield-check-line', text: 'Cam kết chất lượng' },
                ].map((b) => (
                  <div key={b.text} className="bg-[#F0F9FF] rounded-xl p-2.5 text-center">
                    <div className="w-6 h-6 flex items-center justify-center mx-auto mb-1">
                      <i className={`${b.icon} text-[#00C2E0] text-lg`}></i>
                    </div>
                    <p className="text-slate-600 text-[10px] font-medium leading-tight">{b.text}</p>
                  </div>
                ))}
              </div>

              <form
                data-readdy-form
                onSubmit={handleSubmit}
                className="space-y-3"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Họ và tên của bạn"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 text-slate-800"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="Số điện thoại *"
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 text-slate-800"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] hover:from-[#e55a25] hover:to-[#e07a35] text-white font-extrabold py-3.5 rounded-xl cursor-pointer transition-all whitespace-nowrap text-sm disabled:opacity-70"
                >
                  {loading
                    ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>Đang gửi...</span>
                    : <span className="flex items-center justify-center gap-2"><i className="ri-gift-line"></i>Nhận Tư Vấn Miễn Phí Ngay</span>
                  }
                </button>
              </form>

              <button
                onClick={handleClose}
                className="w-full text-center text-slate-400 text-xs mt-3 cursor-pointer hover:text-slate-500 transition-colors"
              >
                {countdown > 0 ? `Bỏ qua sau ${countdown}s` : 'Bỏ qua'}
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
