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

export default function IndustriesSection() {
  const content = getSiteContent();
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useIntersection(sectionRef as React.RefObject<Element>);

  return (
    <section id="industries" ref={sectionRef} className="section-padding bg-[#0F2B5B]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#00C2E0] text-xs font-bold uppercase tracking-widest mb-3 block">LĨNH VỰC HOẠT ĐỘNG</span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-4">
            Chúng Tôi Phục Vụ<br /><span className="text-[#00C2E0]">Mọi Ngành Nghề</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-base">
            Kinh nghiệm đa dạng từ hàng trăm dự án, đảm bảo giải pháp phù hợp với đặc thù từng lĩnh vực.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {content.industries.map((industry, i) => (
            <div
              key={industry.id}
              className={`group flex flex-col items-center gap-3 p-5 bg-white/5 hover:bg-[#00C2E0]/20 border border-white/10 hover:border-[#00C2E0]/50 rounded-2xl transition-all duration-300 cursor-pointer ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl transition-colors duration-300"
                style={{ backgroundColor: `${industry.color}30` }}
              >
                <i className={`${industry.icon} text-2xl`} style={{ color: industry.color }}></i>
              </div>
              <p className="text-white/80 group-hover:text-white text-xs font-medium text-center leading-tight">{industry.name}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className={`mt-14 bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <h3 className="font-heading font-bold text-white text-xl mb-2">Lĩnh vực của bạn không có trong danh sách?</h3>
            <p className="text-white/60 text-sm">Liên hệ với chúng tôi — chúng tôi sẵn sàng tư vấn giải pháp phù hợp nhất!</p>
          </div>
          <a
            href="https://zalo.me/0901234567"
            target="_blank"
            rel="nofollow"
            className="inline-flex items-center gap-2 bg-[#00C2E0] hover:bg-[#00A8C8] text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-message-2-line"></i>
            Tư Vấn Ngay Qua Zalo
          </a>
        </div>
      </div>
    </section>
  );
}
