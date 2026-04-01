import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSiteContent } from '@/hooks/useSiteContent';

export default function HeroSection() {
  const content = getSiteContent();
  const { hero } = content;
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleCTAClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={hero.backgroundImage}
          alt="Hero background"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F2B5B]/90 via-[#0F2B5B]/80 to-[#0A1F4B]/85"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B5B] via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00C2E0]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 w-full pt-24 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-[#00C2E0] text-sm font-semibold px-4 py-2 rounded-full mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="w-2 h-2 bg-[#00C2E0] rounded-full inline-block"></span>
            {hero.badge}
          </div>

          {/* Main Title */}
          <h1
            className={`font-heading font-black text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-4 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {hero.title1}{' '}
            <span className="text-[#00C2E0]">{hero.title2}</span>
            <br />
            {hero.title3}
          </h1>

          {/* Subtitle */}
          <p
            className={`text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {hero.subtitle}
          </p>

          {/* Feature Pills */}
          <div
            className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {hero.pills.map((pill, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-sm px-4 py-2.5 rounded-full"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`${pill.icon} text-[#00C2E0] text-sm`}></i>
                </div>
                {pill.text}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <a
              href={`https://zalo.me/${hero.ctaZalo || '0901234567'}`}
              target="_blank"
              rel="nofollow"
              className="whitespace-nowrap bg-[#00C2E0] hover:bg-[#00A8C8] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-lg shadow-[#00C2E0]/30 cursor-pointer w-full sm:w-auto text-center"
            >
              {hero.ctaPrimary}
            </a>
            <Link
              to="/templates"
              className="whitespace-nowrap border-2 border-white/40 hover:border-white text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 cursor-pointer w-full sm:w-auto text-center"
            >
              {hero.ctaSecondary}
            </Link>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {hero.stats.map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 text-center">
                <p className="font-heading font-black text-2xl md:text-3xl text-[#00C2E0] mb-1">{stat.value}</p>
                <p className="text-white/60 text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-float">
        <p className="text-white/40 text-xs">Cuộn xuống</p>
        <i className="ri-arrow-down-line text-white/40 text-lg"></i>
      </div>
    </section>
  );
}
