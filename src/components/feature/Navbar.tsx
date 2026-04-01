import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSiteContent } from '@/hooks/useSiteContent';

const NAV_LINKS = [
  { label: 'Trang Chủ', href: '/' },
  { label: 'Kho Mẫu Website', href: '/templates' },
  { label: 'Thiết Kế Web', href: '/#web-services' },
  { label: 'Chạy Quảng Cáo', href: '/#ad-services' },
  { label: 'Bảng Giá', href: '/#pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Liên Hệ', href: '/#consultation' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const content = getSiteContent();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      {/* Subtle dark gradient when transparent — helps logo text stand out against bright hero */}
      {!scrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none"></div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
          <img
            src={content.settings.logoUrl}
            alt={content.settings.siteName}
            className="h-8 md:h-10 w-auto object-contain"
          />
          <div className="flex flex-col leading-none">
            <span
              className={`font-heading font-black text-sm md:text-base tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-[#0F2B5B]' : 'text-white drop-shadow-sm'
              }`}
            >
              WebPro
            </span>
            <span
              className={`font-heading font-black text-sm md:text-base tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-[#007A9A]' : 'text-[#5EEAD4] drop-shadow-sm'
              }`}
            >
              Studio
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith('/#')) {
                  e.preventDefault();
                  handleAnchorClick(link.href);
                }
              }}
              className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                scrolled ? 'text-slate-700 hover:text-[#00C2E0]' : 'text-white/90 hover:text-[#00C2E0]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://zalo.me/0901234567"
            target="_blank"
            rel="nofollow"
            className="whitespace-nowrap bg-[#00C2E0] hover:bg-[#00A8C8] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer"
          >
            Tư Vấn Miễn Phí
          </a>
          <Link
            to="/admin"
            className={`whitespace-nowrap text-sm font-medium transition-colors cursor-pointer ${scrolled ? 'text-slate-500 hover:text-slate-700' : 'text-white/60 hover:text-white'}`}
          >
            <i className="ri-settings-3-line text-base"></i>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer ${scrolled ? 'text-slate-700' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-3-line'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith('/#')) {
                  e.preventDefault();
                  handleAnchorClick(link.href);
                } else {
                  setMenuOpen(false);
                }
              }}
              className="text-slate-700 font-medium py-1.5 text-sm cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#consultation"
            onClick={(e) => { e.preventDefault(); handleAnchorClick('/#consultation'); }}
            className="whitespace-nowrap bg-[#00C2E0] text-white text-sm font-semibold px-4 py-2.5 rounded-full text-center cursor-pointer"
          >
            Tư Vấn Miễn Phí
          </a>
        </div>
      )}
    </header>
  );
}
