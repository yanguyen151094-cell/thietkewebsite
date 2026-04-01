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

export default function TestimonialsSection() {
  const content = getSiteContent();
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useIntersection(sectionRef as React.RefObject<Element>);
  const [activeIdx, setActiveIdx] = useState(0);
  const active = content.testimonials[activeIdx];

  const prev = () => setActiveIdx((i) => (i - 1 + content.testimonials.length) % content.testimonials.length);
  const next = () => setActiveIdx((i) => (i + 1) % content.testimonials.length);

  return (
    <section id="testimonials" ref={sectionRef} className="section-padding bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#00C2E0] text-xs font-bold uppercase tracking-widest mb-3 block">KHÁCH HÀNG NÓI GÌ</span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-[#0F2B5B] mb-4">
            Hơn <span className="text-[#00C2E0]">500+</span> Doanh Nghiệp<br />Tin Tưởng Lựa Chọn
          </h2>
        </div>

        {/* Client Logos */}
        <div className={`flex flex-wrap justify-center items-center gap-6 mb-14 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {content.clientLogos.map((cl) => (
            <div key={cl.id} className="bg-white border border-slate-100 rounded-xl px-5 py-3 hover:shadow-md transition-shadow">
              <img src={cl.logo} alt={cl.name} className="h-10 w-24 object-contain" />
            </div>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className={`bg-white rounded-3xl overflow-hidden transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left - Image */}
            <div className="lg:col-span-2 relative min-h-72 lg:min-h-full">
              <img
                src={active.avatar}
                alt={active.name}
                className="w-full h-full object-cover object-top min-h-72"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 hidden lg:block"></div>
            </div>

            {/* Right - Quote */}
            <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <div key={i} className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-star-fill text-[#F59E0B] text-lg"></i>
                  </div>
                ))}
              </div>
              <div className="relative mb-6">
                <span className="absolute -top-4 -left-2 text-7xl text-[#00C2E0]/15 font-serif leading-none select-none">&ldquo;</span>
                <p className="text-slate-600 text-lg leading-relaxed italic relative z-10 pt-2">
                  {active.text}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-heading font-bold text-[#0F2B5B] text-base">{active.name}</p>
                  <p className="text-slate-400 text-sm">{active.company}</p>
                </div>
              </div>
              {/* Navigation */}
              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={prev}
                  className="w-11 h-11 flex items-center justify-center border border-slate-200 rounded-full hover:border-[#00C2E0] hover:text-[#00C2E0] transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-left-line text-lg"></i>
                </button>
                <button
                  onClick={next}
                  className="w-11 h-11 flex items-center justify-center bg-[#0F2B5B] text-white rounded-full hover:bg-[#00C2E0] transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-right-line text-lg"></i>
                </button>
                <span className="text-slate-400 text-sm ml-2">{activeIdx + 1} / {content.testimonials.length}</span>
                <div className="flex gap-1.5 ml-auto">
                  {content.testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`rounded-full transition-all cursor-pointer ${i === activeIdx ? 'w-6 h-2 bg-[#00C2E0]' : 'w-2 h-2 bg-slate-200'}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
