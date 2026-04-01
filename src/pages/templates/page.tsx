import { useState, useEffect } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import QuickContact from '@/components/feature/QuickContact';
import TemplatePreviewModal from '@/pages/templates/components/TemplatePreviewModal';
import { WEB_TEMPLATES, TEMPLATE_CATEGORIES, WebTemplate } from '@/mocks/templates';

export default function TemplatesPage() {
  const [category, setCategory] = useState('Tất Cả');
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<WebTemplate | null>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
    document.title = '50+ Mẫu Website Chuyên Nghiệp | Xem Demo Ngay | WebPro Studio';
  }, []);

  const filtered = WEB_TEMPLATES.filter((tpl) => {
    const matchCat = category === 'Tất Cả' || tpl.category === category;
    const matchSearch =
      !search ||
      tpl.name.toLowerCase().includes(search.toLowerCase()) ||
      tpl.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOrder = (name: string) => {
    setPreviewTemplate(null);
  };

  const handleOpenPreview = (e: React.MouseEvent, tpl: WebTemplate) => {
    e.preventDefault();
    setPreviewTemplate(tpl);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onOrder={handleOrder}
      />

      {/* Page Header */}
      <section className="bg-[#0F2B5B] pt-24 md:pt-28 pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <span className="text-[#00C2E0] text-xs font-bold uppercase tracking-widest mb-3 block">
            KHO MẪU WEBSITE
          </span>
          <h1 className="font-heading font-black text-2xl md:text-5xl text-white mb-3 md:mb-4">
            50+ Mẫu Website<br />
            <span className="text-[#00C2E0]">Chuyên Nghiệp & Đẹp Mắt</span>
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mb-6 md:mb-8">
            Thư viện mẫu website đa dạng cho mọi ngành nghề. Nhấn <strong className="text-white">Xem Demo</strong> để xem trực tiếp!
          </p>
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm mẫu website..."
              className="w-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/40 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#00C2E0] pr-12"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
              <i className="ri-search-line text-white/50"></i>
            </div>
          </div>

          {/* Stats on mobile */}
          <div className="grid grid-cols-3 gap-3 mt-6 md:hidden">
            {[
              { value: '50+', label: 'Mẫu đẹp' },
              { value: '18+', label: 'Ngành nghề' },
              { value: '100%', label: 'Mobile OK' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl py-2">
                <p className="text-[#00C2E0] font-black text-lg font-heading">{s.value}</p>
                <p className="text-white/60 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter — sticky, horizontally scrollable on mobile */}
      <div className="bg-white border-b border-slate-100 sticky top-14 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {TEMPLATE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 whitespace-nowrap px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  category === cat
                    ? 'bg-[#0F2B5B] text-white'
                    : 'bg-[#F0F9FF] text-slate-600 hover:bg-[#E0F4FF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <section className="py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <i className="ri-search-line text-slate-300 text-5xl block mb-3"></i>
              <p className="text-slate-400">Không tìm thấy mẫu phù hợp</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-400 text-xs md:text-sm">{filtered.length} mẫu website</p>
                <p className="text-slate-400 text-xs hidden sm:block">Nhấn <strong>Xem Demo</strong> để preview trực tiếp</p>
              </div>
              {/* 2 cols on mobile, 3 on desktop */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {filtered.map((tpl, i) => (
                  <div
                    key={tpl.id}
                    className={`group bg-white rounded-xl md:rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    {/* Image Area */}
                    <div className="relative h-36 md:h-56 overflow-hidden">
                      <img
                        src={tpl.image}
                        alt={tpl.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay on hover (desktop) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => handleOpenPreview(e, tpl)}
                          className="bg-white text-[#0F2B5B] text-xs font-bold px-3 py-2 rounded-full cursor-pointer hover:bg-[#F0F9FF] whitespace-nowrap"
                        >
                          <i className="ri-eye-line mr-1"></i>Demo
                        </button>
                        <a
                          href="https://zalo.me/0901234567"
                          target="_blank"
                          rel="nofollow"
                          className="bg-[#00C2E0] text-white text-xs font-bold px-3 py-2 rounded-full cursor-pointer hover:bg-[#00A8C8] whitespace-nowrap"
                        >
                          <i className="ri-message-2-fill mr-1"></i>Đặt Làm
                        </a>
                      </div>
                      {/* Badge */}
                      {tpl.badge && (
                        <div
                          className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-lg"
                          style={{ backgroundColor: tpl.badgeColor, fontSize: '10px' }}
                        >
                          {tpl.badge}
                        </div>
                      )}
                    </div>

                    {/* Card Info */}
                    <div className="p-3 md:p-5">
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h3 className="font-heading font-bold text-[#0F2B5B] text-xs md:text-base leading-tight">
                          {tpl.name}
                        </h3>
                        <span className="flex-shrink-0 text-[10px] md:text-xs bg-[#F0F9FF] text-[#00C2E0] px-1.5 py-0.5 rounded-lg font-medium hidden sm:block">
                          {tpl.category}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2 hidden sm:block">
                        {tpl.description}
                      </p>
                      {/* Action Buttons */}
                      <div className="flex gap-1.5 md:gap-2">
                        <button
                          onClick={(e) => handleOpenPreview(e, tpl)}
                          className="flex-1 text-center border border-[#00C2E0] text-[#00C2E0] text-xs font-semibold py-2 md:py-2.5 rounded-lg md:rounded-xl cursor-pointer hover:bg-[#00C2E0] hover:text-white transition-colors whitespace-nowrap"
                        >
                          <i className="ri-eye-line mr-0.5 md:mr-1"></i>
                          <span>Demo</span>
                        </button>
                        <a
                          href="https://zalo.me/0901234567"
                          target="_blank"
                          rel="nofollow"
                          className="flex-1 text-center bg-[#0F2B5B] text-white text-xs font-semibold py-2 md:py-2.5 rounded-lg md:rounded-xl cursor-pointer hover:bg-[#00C2E0] transition-colors whitespace-nowrap"
                        >
                          <i className="ri-add-line mr-0.5 md:mr-1"></i>
                          <span className="hidden sm:inline">Đặt Làm</span>
                          <span className="sm:hidden">Đặt</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-br from-[#0F2B5B] to-[#1a3d7c] py-12 md:py-16 mx-3 md:mx-6 mb-6 rounded-2xl">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading font-black text-xl md:text-4xl text-white mb-3 md:mb-4">
            Chưa Tìm Được Mẫu Ưng Ý?
          </h2>
          <p className="text-white/70 text-sm md:text-base mb-5 md:mb-6">
            Chúng tôi thiết kế website 100% theo yêu cầu riêng của bạn!
          </p>
          <a
            href="https://zalo.me/0901234567"
            target="_blank"
            rel="nofollow"
            className="inline-flex items-center gap-2 bg-[#00C2E0] hover:bg-[#00A8C8] text-white font-bold text-sm px-6 md:px-8 py-3.5 md:py-4 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-message-2-fill"></i>
            Tư Vấn Zalo Miễn Phí
          </a>
        </div>
      </section>

      <Footer />
      <QuickContact />
    </div>
  );
}
