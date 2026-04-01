import { lazy, Suspense, useEffect, useState, useRef, useCallback } from 'react';
import { WebTemplate } from '@/mocks/templates';

const DemoBanHang = lazy(() => import('@/pages/demo/ban-hang/page'));
const DemoKhachSan = lazy(() => import('@/pages/demo/khach-san/page'));
const DemoNhaHang = lazy(() => import('@/pages/demo/nha-hang/page'));
const DemoCongTy = lazy(() => import('@/pages/demo/cong-ty/page'));
const DemoLandingPage = lazy(() => import('@/pages/demo/landing-page/page'));
const DemoSpa = lazy(() => import('@/pages/demo/spa/page'));
const DemoCafe = lazy(() => import('@/pages/demo/cafe/page'));
const DemoDienTu = lazy(() => import('@/pages/demo/dien-tu/page'));
const DemoPhongKham = lazy(() => import('@/pages/demo/phong-kham/page'));
const DemoGym = lazy(() => import('@/pages/demo/gym/page'));
const DemoGiaoDuc = lazy(() => import('@/pages/demo/giao-duc/page'));
const DemoHaiSan = lazy(() => import('@/pages/demo/hai-san/page'));

const DEMO_MAP: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  '/demo/ban-hang': DemoBanHang,
  '/demo/khach-san': DemoKhachSan,
  '/demo/nha-hang': DemoNhaHang,
  '/demo/cong-ty': DemoCongTy,
  '/demo/landing-page': DemoLandingPage,
  '/demo/spa': DemoSpa,
  '/demo/cafe': DemoCafe,
  '/demo/dien-tu': DemoDienTu,
  '/demo/phong-kham': DemoPhongKham,
  '/demo/gym': DemoGym,
  '/demo/giao-duc': DemoGiaoDuc,
  '/demo/hai-san': DemoHaiSan,
};

interface Props {
  template: WebTemplate | null;
  onClose: () => void;
  onOrder: (name: string) => void;
}

export default function TemplatePreviewModal({ template, onClose, onOrder }: Props) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isExternal = Boolean(template?.demoUrl?.startsWith('http'));
  const isInternalDemo = Boolean(template?.demoUrl?.startsWith('/demo'));
  const DemoComponent = template?.demoUrl ? DEMO_MAP[template.demoUrl] : undefined;

  const getShareUrl = () => {
    if (!template) return '';
    return isExternal
      ? template.demoUrl
      : `${window.location.origin}${template.demoUrl}`;
  };

  const handleShare = async () => {
    if (!template) return;
    const shareUrl = getShareUrl();
    const shareData = {
      title: `${template.name} – WebPro Studio`,
      text: `Xem thử mẫu website "${template.name}" tại WebPro Studio!`,
      url: shareUrl,
    };
    try {
      if (typeof navigator.share === 'function' && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      // user cancelled or not supported, fallback below
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const el = document.createElement('textarea');
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleFullscreen = useCallback(async () => {
    if (!modalRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await modalRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen not supported, ignore
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  useEffect(() => {
    if (!template) return;
    setDevice('desktop');
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.fullscreenElement) onClose();
      if (e.key === 'F11') { e.preventDefault(); handleFullscreen(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [template, onClose, handleFullscreen]);

  useEffect(() => {
    if (previewRef.current) previewRef.current.scrollTop = 0;
  }, [template, device]);

  if (!template) return null;

  const renderDemoContent = () => {
    if (isExternal) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 gap-4">
          <i className="ri-external-link-line text-5xl text-slate-300"></i>
          <p className="text-slate-500 text-sm font-medium">{template.name}</p>
          <a
            href={template.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0F2B5B] text-white text-sm font-semibold px-6 py-3 rounded-xl cursor-pointer hover:bg-[#1a3d7a] transition-colors whitespace-nowrap"
          >
            <i className="ri-external-link-line"></i>
            Mở Website Thật
          </a>
          <p className="text-slate-400 text-xs">{template.demoUrl}</p>
        </div>
      );
    }

    if (isInternalDemo && DemoComponent) {
      if (device === 'desktop') {
        return (
          <div
            ref={previewRef}
            className="w-full h-full overflow-y-auto overflow-x-hidden bg-white"
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className="min-w-[320px]">
              <Suspense fallback={
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                  <div className="w-8 h-8 border-2 border-[#00C2E0] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-500 text-xs">Đang tải demo...</p>
                </div>
              }>
                <DemoComponent />
              </Suspense>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex items-start justify-center py-6 px-4 w-full overflow-y-auto h-full bg-[#E8EAED]">
            <div className="relative flex-shrink-0" style={{ width: '280px' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-20 h-5 bg-slate-800 rounded-b-xl"></div>
              <div className="absolute inset-0 rounded-[2.2rem] border-[6px] border-slate-800 pointer-events-none z-10"></div>
              <div className="overflow-hidden rounded-[1.8rem] bg-white" style={{ height: '560px' }}>
                <div style={{ width: '390px', height: '780px', transform: 'scale(0.7179)', transformOrigin: 'top left', overflow: 'hidden' }}>
                  <div style={{ width: '390px', height: '780px', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
                    <Suspense fallback={
                      <div className="flex items-center justify-center h-40">
                        <div className="w-6 h-6 border-2 border-[#00C2E0] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    }>
                      <DemoComponent />
                    </Suspense>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-600 rounded-full z-20"></div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="w-full h-full overflow-y-auto bg-[#E8EAED]">
        <img src={template.image} alt={template.name} className="w-full object-cover object-top" />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative z-10 bg-white w-full h-full md:h-auto md:max-h-[94vh] md:w-full md:max-w-6xl md:rounded-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-5 py-3 bg-[#0F2B5B] flex-shrink-0">
          {/* Left: Exit button + template info */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-3 py-2 rounded-lg cursor-pointer transition-all whitespace-nowrap flex-shrink-0 border border-white/20"
            >
              <i className="ri-arrow-left-line text-sm"></i>
              <span className="hidden sm:inline">Thoát Demo</span>
              <span className="sm:hidden">Thoát</span>
            </button>

            {template.badge && (
              <span
                className="hidden sm:block text-white text-xs font-bold px-2.5 py-1 rounded-lg flex-shrink-0"
                style={{ backgroundColor: template.badgeColor }}
              >
                {template.badge}
              </span>
            )}
            <div className="min-w-0 hidden md:block">
              <h3 className="text-white font-bold text-sm truncate">{template.name}</h3>
              <p className="text-white/50 text-xs">{template.category}</p>
            </div>
          </div>

          {/* Center: Device Toggle */}
          {isInternalDemo && (
            <div className="flex items-center gap-2">
              <div className="flex bg-white/10 rounded-full p-0.5">
                <button
                  onClick={() => setDevice('desktop')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${device === 'desktop' ? 'bg-white text-[#0F2B5B]' : 'text-white/70 hover:text-white'}`}
                >
                  <i className="ri-computer-line text-sm"></i>
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setDevice('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${device === 'mobile' ? 'bg-white text-[#0F2B5B]' : 'text-white/70 hover:text-white'}`}
                >
                  <i className="ri-smartphone-line text-sm"></i>
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>
            </div>
          )}

          {/* Right: Fullscreen + Order CTA */}
          <div className="flex items-center gap-2">
            {/* Fullscreen button */}
            <button
              onClick={handleFullscreen}
              title={isFullscreen ? 'Thoát toàn màn hình (F11)' : 'Xem toàn màn hình (F11)'}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-3 py-2 rounded-lg cursor-pointer transition-all whitespace-nowrap flex-shrink-0 border border-white/20"
            >
              <i className={`text-sm ${isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'}`}></i>
              <span className="hidden lg:inline">{isFullscreen ? 'Thu Nhỏ' : 'Toàn Màn Hình'}</span>
            </button>

            <a
              href="https://zalo.me/0901234567"
              target="_blank"
              rel="nofollow"
              onClick={() => onOrder(template.name)}
              className="flex items-center gap-1.5 bg-[#00C2E0] hover:bg-[#00A8C8] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors whitespace-nowrap flex-shrink-0"
            >
              <i className="ri-message-2-fill text-sm"></i>
              <span className="hidden sm:inline">Đặt Làm Web Này</span>
              <span className="sm:hidden">Đặt Làm</span>
            </a>
          </div>
        </div>

        {/* Browser Chrome Bar */}
        <div className="bg-[#F1F3F4] border-b border-slate-200 px-4 py-2 flex items-center gap-2 flex-shrink-0">
          <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28CA41]"></div>
          </div>
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-slate-400 font-mono flex items-center gap-2 border border-slate-200 min-w-0">
            <i className="ri-lock-line text-slate-400 text-xs flex-shrink-0"></i>
            <span className="truncate">
              {isExternal ? template.demoUrl : `webprostudio.vn${template.demoUrl}`}
            </span>
          </div>

          {/* Share / Copy Link button */}
          <button
            onClick={handleShare}
            title={copied ? 'Đã sao chép!' : 'Sao chép link demo'}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0F2B5B] hover:text-[#0F2B5B]'
            }`}
          >
            <i className={`text-sm ${copied ? 'ri-check-line' : 'ri-links-line'}`}></i>
            <span className="hidden sm:inline">{copied ? 'Đã Chép!' : 'Sao Chép'}</span>
          </button>

          {isExternal && (
            <a href={template.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[#00C2E0] font-medium whitespace-nowrap cursor-pointer hover:underline flex-shrink-0">
              <i className="ri-external-link-line"></i>
              <span className="hidden sm:inline">Mở thật</span>
            </a>
          )}
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-hidden min-h-0" style={{ height: isFullscreen ? 'calc(100vh - 110px)' : 'calc(94vh - 160px)' }}>
          {renderDemoContent()}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 bg-white border-t border-slate-100 px-4 md:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[#0F2B5B] font-semibold text-sm">{template.name}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {[template.category, 'Responsive', 'SEO Chuẩn', 'Tốc Độ Nhanh'].map((tag) => (
                <span key={tag} className="text-xs bg-[#F0F9FF] text-[#00C2E0] px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 border-2 border-slate-200 text-slate-600 hover:border-[#0F2B5B] hover:text-[#0F2B5B] text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all whitespace-nowrap"
            >
              <i className="ri-arrow-left-line"></i>
              Quay Về Trang Chủ
            </button>

            {/* Fullscreen button in footer */}
            <button
              onClick={handleFullscreen}
              className="flex items-center gap-1.5 border border-slate-200 text-slate-600 hover:border-[#0F2B5B] hover:text-[#0F2B5B] text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all whitespace-nowrap"
            >
              <i className={`${isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'}`}></i>
              <span className="hidden sm:inline">{isFullscreen ? 'Thu Nhỏ' : 'Toàn Màn Hình'}</span>
            </button>

            {/* Share button in footer */}
            <button
              onClick={handleShare}
              className={`flex items-center gap-1.5 border text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 whitespace-nowrap ${
                copied
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
                  : 'border-slate-200 text-slate-600 hover:border-[#0F2B5B] hover:text-[#0F2B5B]'
              }`}
            >
              <i className={`${copied ? 'ri-check-double-line' : 'ri-share-forward-line'}`}></i>
              <span className="hidden sm:inline">{copied ? 'Đã Sao Chép!' : 'Chia Sẻ'}</span>
            </button>

            {isExternal && (
              <a
                href={template.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 border border-slate-200 text-slate-600 text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer hover:border-[#00C2E0] hover:text-[#00C2E0] transition-colors whitespace-nowrap"
              >
                <i className="ri-external-link-line"></i>
                Xem Website Thật
              </a>
            )}
            <a
              href="https://zalo.me/0901234567"
              target="_blank"
              rel="nofollow"
              onClick={() => onOrder(template.name)}
              className="flex items-center gap-1.5 bg-[#00C2E0] hover:bg-[#00A8C8] text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-colors whitespace-nowrap"
            >
              <i className="ri-message-2-fill"></i>
              Đặt Làm Website Này
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
