import { useState } from 'react';
import { getSiteContent } from '@/hooks/useSiteContent';

export default function QuickContact() {
  const [expanded, setExpanded] = useState(false);
  const content = getSiteContent();

  return (
    <div className="fixed bottom-0 right-0 z-50">
      {/* Desktop: Always-visible side bar */}
      <div className="hidden md:flex flex-col items-end absolute bottom-24 right-0 gap-0">
        <a
          href={`https://zalo.me/${content.contact.zalo}`}
          target="_blank"
          rel="nofollow"
          title="Chat Zalo"
          className="group flex items-center bg-[#0068FF] text-white rounded-l-xl overflow-hidden transition-all duration-300 h-12"
          style={{ width: 48 }}
          onMouseEnter={(e) => (e.currentTarget.style.width = '140px')}
          onMouseLeave={(e) => (e.currentTarget.style.width = '48px')}
        >
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
            <i className="ri-message-2-fill text-xl"></i>
          </div>
          <span className="text-xs font-bold whitespace-nowrap pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Chat Zalo</span>
        </a>
        <a
          href={`tel:${content.contact.phone}`}
          title="Gọi điện"
          className="group flex items-center bg-emerald-500 text-white rounded-l-xl overflow-hidden transition-all duration-300 h-12 mt-1"
          style={{ width: 48 }}
          onMouseEnter={(e) => (e.currentTarget.style.width = '140px')}
          onMouseLeave={(e) => (e.currentTarget.style.width = '48px')}
        >
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
            <i className="ri-phone-fill text-xl"></i>
          </div>
          <span className="text-xs font-bold whitespace-nowrap pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">{content.contact.phone}</span>
        </a>
        <a
          href={content.contact.facebook}
          target="_blank"
          rel="nofollow"
          title="Facebook"
          className="group flex items-center bg-[#1877F2] text-white rounded-l-xl overflow-hidden transition-all duration-300 h-12 mt-1"
          style={{ width: 48 }}
          onMouseEnter={(e) => (e.currentTarget.style.width = '140px')}
          onMouseLeave={(e) => (e.currentTarget.style.width = '48px')}
        >
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
            <i className="ri-facebook-fill text-xl"></i>
          </div>
          <span className="text-xs font-bold whitespace-nowrap pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Facebook</span>
        </a>
      </div>

      {/* Buttons column: expanded menu + small mobile shortcuts + main FAB */}
      <div className="flex flex-col items-end gap-2 p-4">
        {/* Expanded popup menu (all devices, when FAB clicked) */}
        {expanded && (
          <div className="flex flex-col gap-2">
            <a
              href={`tel:${content.contact.phone}`}
              className="flex items-center gap-2 bg-white border border-slate-100 rounded-full px-4 py-2.5 text-slate-700 text-sm font-semibold whitespace-nowrap cursor-pointer hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-phone-fill text-emerald-500 text-base"></i>
              </div>
              {content.contact.phone}
            </a>
            <a
              href={`https://zalo.me/${content.contact.zalo}`}
              target="_blank"
              rel="nofollow"
              className="flex items-center gap-2 bg-white border border-slate-100 rounded-full px-4 py-2.5 text-slate-700 text-sm font-semibold whitespace-nowrap cursor-pointer hover:bg-[#0068FF]/10 hover:text-[#0068FF] hover:border-[#0068FF]/20 transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-message-2-fill text-[#0068FF] text-base"></i>
              </div>
              Chat Zalo
            </a>
            <a
              href={content.contact.facebook}
              target="_blank"
              rel="nofollow"
              className="flex items-center gap-2 bg-white border border-slate-100 rounded-full px-4 py-2.5 text-slate-700 text-sm font-semibold whitespace-nowrap cursor-pointer hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:border-[#1877F2]/20 transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-facebook-fill text-[#1877F2] text-base"></i>
              </div>
              Facebook
            </a>
            <a
              href="https://zalo.me/0901234567"
              target="_blank"
              rel="nofollow"
              className="flex items-center gap-2 bg-[#00C2E0] rounded-full px-4 py-2.5 text-white text-sm font-bold whitespace-nowrap cursor-pointer hover:bg-[#00A8C8] transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-calendar-check-line text-base"></i>
              </div>
              Tư Vấn Miễn Phí
            </a>
          </div>
        )}

        {/* Mobile quick-access small buttons (visible only on mobile, always shown) */}
        {!expanded && (
          <div className="md:hidden flex flex-col gap-2">
            <a
              href={`tel:${content.contact.phone}`}
              title="Gọi Ngay"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-500 text-white cursor-pointer active:scale-95 transition-transform"
            >
              <i className="ri-phone-fill text-sm"></i>
            </a>
            <a
              href={`https://zalo.me/${content.contact.zalo}`}
              target="_blank"
              rel="nofollow"
              title="Chat Zalo"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0068FF] text-white cursor-pointer active:scale-95 transition-transform"
            >
              <i className="ri-message-2-fill text-sm"></i>
            </a>
            <a
              href={content.contact.facebook}
              target="_blank"
              rel="nofollow"
              title="Facebook"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1877F2] text-white cursor-pointer active:scale-95 transition-transform"
            >
              <i className="ri-facebook-fill text-sm"></i>
            </a>
          </div>
        )}

        {/* Main FAB (chat/support) */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-12 h-12 flex items-center justify-center bg-[#0F2B5B] hover:bg-[#00C2E0] rounded-full cursor-pointer transition-all duration-300"
          aria-label="Liên hệ"
        >
          <i className={`text-white text-lg transition-transform duration-300 ${expanded ? 'ri-close-line' : 'ri-customer-service-2-line'}`}></i>
        </button>
      </div>
    </div>
  );
}
