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

export default function WebServicesSection() {
  const content = getSiteContent();
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useIntersection(sectionRef as React.RefObject<Element>);
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="web-services" ref={sectionRef} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#00C2E0] text-xs font-bold uppercase tracking-widest mb-3 block">DỊCH VỤ THIẾT KẾ</span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-[#0F2B5B] mb-4">
            Website <span className="text-[#00C2E0]">Chuyên Nghiệp</span><br />Cho Mọi Ngành
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            Thiết kế website chuẩn SEO, tốc độ nhanh, tối ưu chuyển đổi — mang lại khách hàng thực sự cho doanh nghiệp của bạn.
          </p>
        </div>

        {/* Benefits bar */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: 'ri-search-eye-line', text: 'SEO Chuẩn Google' },
            { icon: 'ri-speed-line', text: 'Tốc Độ Nhanh' },
            { icon: 'ri-smartphone-line', text: 'Responsive Mobile' },
            { icon: 'ri-shield-check-line', text: 'Bảo Mật SSL' },
            { icon: 'ri-bar-chart-2-line', text: 'Tối Ưu Chuyển Đổi' },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2 bg-[#F0F9FF] text-[#0F2B5B] text-sm font-medium px-4 py-2 rounded-full">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={`${b.icon} text-[#00C2E0]`}></i>
              </div>
              {b.text}
            </div>
          ))}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.webServices.map((svc, i) => (
            <div
              key={svc.id}
              className={`group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => setActive(active === svc.id ? null : svc.id)}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B5B]/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-9 h-9 flex items-center justify-center bg-[#00C2E0] rounded-xl">
                    <i className={`${svc.icon} text-white text-lg`}></i>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-[#0F2B5B] text-lg mb-2">{svc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{svc.description}</p>
                <ul className="space-y-1.5">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-check-line text-[#00C2E0]"></i>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://zalo.me/${content.contact.zalo}`}
                  target="_blank"
                  rel="nofollow"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-5 w-full flex items-center justify-center gap-2 border border-[#00C2E0] text-[#00C2E0] hover:bg-[#00C2E0] hover:text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  Tư Vấn Ngay
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-message-2-line text-sm"></i>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
