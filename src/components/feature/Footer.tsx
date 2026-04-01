import { Link } from 'react-router-dom';
import { getSiteContent } from '@/hooks/useSiteContent';

const FOOTER_LINKS = {
  services: [
    { label: 'Thiết Kế Website', href: '/#web-services' },
    { label: 'Quảng Cáo Facebook', href: '/#ad-services' },
    { label: 'Quảng Cáo Google', href: '/#ad-services' },
    { label: 'Quảng Cáo TikTok', href: '/#ad-services' },
    { label: 'Kho Mẫu Website', href: '/templates' },
  ],
  company: [
    { label: 'Về Chúng Tôi', href: '/' },
    { label: 'Dự Án Đã Làm', href: '/#testimonials' },
    { label: 'Bảng Giá', href: '/#pricing' },
    { label: 'Liên Hệ', href: '/#consultation' },
  ],
};

export default function Footer() {
  const content = getSiteContent();

  return (
    <footer className="bg-[#0A1F4B] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={content.settings.logoUrl} alt={content.settings.siteName} className="h-12 w-auto object-contain mb-4" />
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Đối tác tin cậy cho hơn 500+ doanh nghiệp Việt Nam trong lĩnh vực thiết kế website và chạy quảng cáo hiệu quả.
            </p>
            <div className="flex items-center gap-3">
              <a href={content.contact.facebook} rel="nofollow" target="_blank" className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-[#00C2E0] rounded-full transition-colors cursor-pointer">
                <i className="ri-facebook-fill text-sm"></i>
              </a>
              <a href={`https://zalo.me/${content.contact.zalo}`} rel="nofollow" target="_blank" className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-[#00C2E0] rounded-full transition-colors cursor-pointer">
                <i className="ri-message-2-fill text-sm"></i>
              </a>
              <a href={`mailto:${content.contact.email}`} className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-[#00C2E0] rounded-full transition-colors cursor-pointer">
                <i className="ri-mail-fill text-sm"></i>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-700 text-sm uppercase tracking-widest text-white/40 mb-5">Dịch Vụ</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/70 hover:text-[#00C2E0] text-sm transition-colors cursor-pointer">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-700 text-sm uppercase tracking-widest text-white/40 mb-5">Công Ty</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/70 hover:text-[#00C2E0] text-sm transition-colors cursor-pointer">{l.label}</a>
                </li>
              ))}
              <li>
                <Link to="/admin" className="text-white/70 hover:text-[#00C2E0] text-sm transition-colors cursor-pointer">Quản Trị Viên</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-700 text-sm uppercase tracking-widest text-white/40 mb-5">Liên Hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-phone-fill text-[#00C2E0] text-sm"></i>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Hotline</p>
                  <a href={`tel:${content.contact.phone}`} className="text-white text-sm font-semibold cursor-pointer">{content.contact.phone}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-mail-fill text-[#00C2E0] text-sm"></i>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Email</p>
                  <a href={`mailto:${content.contact.email}`} className="text-white text-sm cursor-pointer">{content.contact.email}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-map-pin-fill text-[#00C2E0] text-sm"></i>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Địa chỉ</p>
                  <p className="text-white text-sm">{content.contact.address}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">© 2026 {content.settings.siteName}. Bảo lưu mọi quyền.</p>
          <p className="text-white/40 text-xs">Thiết kế website chuyên nghiệp | Chạy quảng cáo hiệu quả</p>
        </div>
      </div>
    </footer>
  );
}
