import { useRef, useState, useEffect } from 'react';
import { getSiteContent } from '@/hooks/useSiteContent';

function useIntersection(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

export default function PricingSection() {
  const content = getSiteContent();
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useIntersection(sectionRef as React.RefObject<Element>);
  const [tab, setTab] = useState<'web' | 'ads'>('web');
  const plans = tab === 'web' ? content.pricing.web : content.pricing.ads;

  const handleConsult = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(`https://zalo.me/0901234567`, '_blank');
  };

  return (
    <section id="pricing" ref={sectionRef} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#00C2E0] text-xs font-bold uppercase tracking-widest mb-3 block">BẢNG GIÁ DỊCH VỤ</span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-[#0F2B5B] mb-4">
            Minh Bạch - Rõ Ràng<br /><span className="text-[#00C2E0]">Không Phát Sinh Chi Phí</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            Lựa chọn gói dịch vụ phù hợp với quy mô và ngân sách doanh nghiệp của bạn.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className={`flex justify-center mb-10 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex bg-[#F0F9FF] rounded-full p-1">
            {(['web', 'ads'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  tab === t ? 'bg-[#0F2B5B] text-white shadow' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t === 'web' ? '🌐 Thiết Kế Website' : '📢 Chạy Quảng Cáo'}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 ${
                plan.highlight
                  ? 'bg-[#0F2B5B] text-white shadow-2xl scale-105'
                  : 'bg-white border border-slate-200'
              } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {plan.highlight && 'badge' in plan && plan.badge && (
                <div className="bg-[#00C2E0] text-white text-xs font-bold text-center py-2 tracking-wider uppercase">
                  ✦ {plan.badge}
                </div>
              )}
              <div className="p-7 flex flex-col flex-1">
                <h3 className={`font-heading font-bold text-xl mb-1 ${plan.highlight ? 'text-white' : 'text-[#0F2B5B]'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className={`font-heading font-black text-4xl ${plan.highlight ? 'text-[#00C2E0]' : 'text-[#0F2B5B]'}`}>
                    {plan.price}đ
                  </span>
                  <span className={`text-sm ${plan.highlight ? 'text-white/60' : 'text-slate-400'}`}>{plan.period}</span>
                </div>

                <div className="flex-1 space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className={`ri-checkbox-circle-fill text-base ${plan.highlight ? 'text-[#00C2E0]' : 'text-[#00C2E0]'}`}></i>
                      </div>
                      <span className={`text-sm ${plan.highlight ? 'text-white/85' : 'text-slate-600'}`}>{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className={`ri-close-circle-line text-base ${plan.highlight ? 'text-white/30' : 'text-slate-300'}`}></i>
                      </div>
                      <span className={`text-sm ${plan.highlight ? 'text-white/40' : 'text-slate-400'}`}>{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#consultation"
                  onClick={handleConsult}
                  className={`w-full text-center font-bold text-sm py-3.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    plan.highlight
                      ? 'bg-[#00C2E0] hover:bg-[#00A8C8] text-white'
                      : 'border-2 border-[#0F2B5B] text-[#0F2B5B] hover:bg-[#0F2B5B] hover:text-white'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className={`text-center text-slate-400 text-xs mt-6 transition-all duration-700 delay-400 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          * Giá trên chưa bao gồm VAT. Liên hệ để nhận báo giá chi tiết và ưu đãi đặc biệt.
        </p>
      </div>
    </section>
  );
}
