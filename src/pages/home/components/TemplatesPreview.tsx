import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WEB_TEMPLATES } from '@/mocks/templates';

function useIntersection(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

export default function TemplatesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useIntersection(sectionRef as React.RefObject<Element>);
  const previews = WEB_TEMPLATES.slice(0, 6);

  return (
    <section id="templates-preview" ref={sectionRef} className="section-padding bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className={`flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="text-[#00C2E0] text-xs font-bold uppercase tracking-widest mb-3 block">KHO MẪU WEBSITE</span>
            <h2 className="font-heading font-black text-3xl md:text-5xl text-[#0F2B5B]">
              50+ Mẫu Website<br /><span className="text-[#00C2E0]">Sẵn Sàng Triển Khai</span>
            </h2>
          </div>
          <Link
            to="/templates"
            className="whitespace-nowrap flex items-center gap-2 border-2 border-[#0F2B5B] text-[#0F2B5B] hover:bg-[#0F2B5B] hover:text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer"
          >
            Xem Tất Cả Mẫu
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-line"></i>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previews.map((tpl, i) => (
            <div
              key={tpl.id}
              className={`group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:-translate-y-1 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={tpl.image}
                  alt={tpl.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {tpl.badge && (
                  <div
                    className="absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{ backgroundColor: tpl.badgeColor }}
                  >
                    {tpl.badge}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <a
                    href={tpl.demoUrl}
                    className="flex-1 text-center bg-white text-[#0F2B5B] text-xs font-semibold py-2 rounded-lg cursor-pointer hover:bg-[#F0F9FF] whitespace-nowrap"
                  >
                    Xem Demo
                  </a>
                  <a
                    href="#consultation"
                    onClick={(e) => { e.preventDefault(); document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="flex-1 text-center bg-[#00C2E0] text-white text-xs font-semibold py-2 rounded-lg cursor-pointer hover:bg-[#00A8C8] whitespace-nowrap"
                  >
                    Đặt Làm Website
                  </a>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-[#0F2B5B] text-base mb-1">{tpl.name}</h3>
                <p className="text-slate-400 text-xs">{tpl.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
