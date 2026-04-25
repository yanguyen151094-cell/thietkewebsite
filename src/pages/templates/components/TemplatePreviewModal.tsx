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
  // Detect if user is on a real mobile device
  const isRealMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [device, setDevice] = useState<'desktop' | 'mobile'>(isRealMobile ? 'mobile' : 'desktop');
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previewAreaRef = useRef<HTMLDivElement>(null);
  const [desktopZoom, setDesktopZoom] = useState(1);

  const isExternal = Boolean(template?.demoUrl?.startsWith('http'));
  const isInternalDemo = Boolean(template?.demoUrl?.startsWith('/demo'));
  const DemoComponent = template?.demoUrl ? DEMO_MAP[template.demoUrl] : undefined;

  // Compute zoom so the 1280px-wide demo fits the preview area
  useEffect(() => {
    const compute = () => {
      if (!previewAreaRef.current) return;
      const w = previewAreaRef.current.offsetWidth;
      setDesktopZoom(Math.min(1, w / 1280));
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (previewAreaRef.current) ro.observe(previewAreaRef.current);
    return () => ro.disconnect();
  }, [device, template, isFullscreen]);

  const getShareUrl = () => {
    if (!template) return '';
    return isExternal ? template.demoUrl : `${window.location.origin}${template.demoUrl}`;
  };

  const handleShare = async () => {
    if (!template) return;
    const shareUrl = getShareUrl();
    try {
      if (typeof navigator.share === 'function' && navigator.canShare?.({ url: shareUrl })) {
        await navigator.share({ title: template.name, url: shareUrl });
        return;
      }
    } catch { /* fallback */ }
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
    } catch { /* not supported */ }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  useEffect(() => {
    if (!template) return;
    const isMobile = window.innerWidth < 768;
    setDevice(isMobile ? 'mobile' : 'desktop');
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.fullscreenElement) onClose();
      if (e.key === 'F11') { e.preventDefault(); handleFullscreen(); }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [template, onClose, handleFullscreen]);

  if (!template) return null;

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-64 gap-3 bg-white">
      <div className="w-8 h-8 border-2 border-[#00C2E0] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 text-xs">Đang tải demo...</p>
    </div>
  );

  const renderDesktop = () => (
    <div
      ref={previewAreaRef}
      className="w-full h-full overflow-y-auto overflow-x-hidden bg-white"
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
    >
      {/* Zoom wrapper — CSS zoom affects layout flow so scrolling works naturally */}
      <div style={{ zoom: desktopZoom, width: '1280px' }}>
        <Suspense fallback={<LoadingSpinner />}>
          {DemoComponent && <DemoComponent />}
        </Suspense>
      </div>
    </div>
  );

  const renderMobile = () => {
    // On real mobile: no phone frame, render content directly with zoom to fit screen
    if (isRealMobile) {
      return (
        <div
          ref={previewAreaRef}
          className="w-full h-full overflow-y-auto overflow-x-hidden bg-white"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
        >
          <div style={{ zoom: desktopZoom, width: '1280px' }}>
            <Suspense fallback={<LoadingSpinner />}>
              {DemoComponent && <DemoComponent />}
            </Suspense>
          </div>
        </div>
      );
    }

    // On desktop: show phone frame with zoomed content inside
    const SCREEN_W = 390;
    const RENDER_W = 1280;
    const zoom = SCREEN_W / RENDER_W;
    const PHONE_SCREEN_H = 780;

    return (
      <div
        ref={previewAreaRef}
        className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#E8EAED] flex items-start justify-center py-8"
      >
        <div className="relative flex-shrink-0" style={{ width: `${SCREEN_W + 28}px` }}>
          <div
            className="absolute inset-0 rounded-[2.8rem] pointer-events-none z-20"
            style={{ border: '14px solid #1e293b', boxShadow: '0 0 0 2.5px #475569, 0 32px 80px rgba(0,0,0,0.45)' }}
          />
          <div className="absolute z-30 bg-[#1e293b] rounded-full" style={{ top: '16px', left: '50%', transform: 'translateX(-50%)', width: '108px', height: '28px' }} />
          <div className="absolute z-10 bg-[#334155] rounded-full" style={{ top: '88px', left: '-18px', width: '4px', height: '32px' }} />
          <div className="absolute z-10 bg-[#334155] rounded-full" style={{ top: '132px', left: '-18px', width: '4px', height: '58px' }} />
          <div className="absolute z-10 bg-[#334155] rounded-full" style={{ top: '202px', left: '-18px', width: '4px', height: '58px' }} />
          <div className="absolute z-10 bg-[#334155] rounded-full" style={{ top: '138px', right: '-18px', width: '4px', height: '78px' }} />
          <div className="overflow-hidden bg-white" style={{ borderRadius: '2.3rem', minHeight: `${PHONE_SCREEN_H}px`, width: `${SCREEN_W}px` }}>
            <div className="flex items-center justify-between px-6 bg-white relative z-10" style={{ height: '44px' }}>
              <span className="text-[#111827] text-sm font-bold" style={{ fontFamily: 'system-ui' }}>9:41</span>
              <div className="flex items-center gap-1.5">
                <i className="ri-signal-wifi-fill text-[#111827] text-sm"></i>
                <i className="ri-battery-2-fill text-[#111827] text-sm"></i>
              </div>
            </div>
            <div style={{ overflow: 'hidden', width: `${SCREEN_W}px` }}>
              <div style={{ zoom, width: `${RENDER_W}px` }}>
                <Suspense fallback={
                  <div className="flex items-center justify-center" style={{ height: '400px' }}>
                    <div className="w-7 h-7 border-2 border-[#00C2E0] border-t-transparent rounded-full animate-spin" />
                  </div>
                }>
                  {DemoComponent && <DemoComponent />}
                </Suspense>
              </div>
            </div>
          </div>
          <div className="absolute z-30 bg-[#6b7280] rounded-full" style={{ bottom: '10px', left: '50%', transform: 'translateX(-50%)', width: '96px', height: '5px' }} />
        </div>
      </div>
    );
  };

  const renderExternal = () => (
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
    </div>
  );

  const renderContent = () => {
    if (isExternal) return renderExternal();
    if (isInternalDemo && DemoComponent) {
      return device === 'desktop' ? renderDesktop() : renderMobile();
    }
    return (
      <div className="w-full h-full overflow-y-auto bg-[#E8EAED]">
        <img src={template.image} alt={template.name} className="w-full object-cover object-top" />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-3">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative z-10 bg-white w-full h-full md:h-[97vh] md:w-full md:max-w-7xl md:rounded-2xl overflow-hidden flex flex-col"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-3 md:px-4 py-2.5 bg-[#0F2B5B] flex-shrink-0 gap-2">
          {/* Left: back + name */}
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-all whitespace-nowrap flex-shrink-0 border border-white/20"
            >
              <i className="ri-arrow-left-line"></i>
              <span className="hidden sm:inline">Thoát</span>
            </button>
            {template.badge && (
              <span
                className="hidden sm:block text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex-shrink-0"
                style={{ backgroundColor: template.badgeColor }}
              >
                {template.badge}
              </span>
            )}
            <div className="min-w-0 hidden lg:block">
              <p className="text-white font-bold text-sm truncate leading-tight">{template.name}</p>
              <p className="text-white/40 text-[10px]">{template.category}</p>
            </div>
          </div>

          {/* Center: Device toggle — hidden on real mobile devices */}
          {isInternalDemo && !isRealMobile && (
            <div className="flex bg-white/10 rounded-full p-0.5 flex-shrink-0">
              <button
                onClick={() => setDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${device === 'desktop' ? 'bg-white text-[#0F2B5B] shadow' : 'text-white/60 hover:text-white'}`}
              >
                <i className="ri-computer-line text-sm"></i>
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${device === 'mobile' ? 'bg-white text-[#0F2B5B] shadow' : 'text-white/60 hover:text-white'}`}
              >
                <i className="ri-smartphone-line text-sm"></i>
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          )}

          {/* Right: actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {!isRealMobile && (
              <button
                onClick={handleFullscreen}
                title={isFullscreen ? 'Thu nhỏ (F11)' : 'Toàn màn hình (F11)'}
                className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg cursor-pointer transition-all whitespace-nowrap border border-white/20"
              >
                <i className={`text-sm ${isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'}`}></i>
                <span className="hidden xl:inline">{isFullscreen ? 'Thu Nhỏ' : 'Toàn Màn Hình'}</span>
              </button>
            )}
            <a
              href="https://zalo.me/0901234567"
              target="_blank"
              rel="nofollow"
              onClick={() => onOrder(template.name)}
              className="flex items-center gap-1.5 bg-[#00C2E0] hover:bg-[#00AAC8] text-white text-xs font-bold px-4 py-1.5 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
            >
              <i className="ri-message-2-fill text-sm"></i>
              <span className="hidden sm:inline">Đặt Làm Web Này</span>
              <span className="sm:hidden">Đặt</span>
            </a>
          </div>
        </div>

        {/* ── Browser chrome bar — hidden on real mobile ── */}
        <div className={`bg-[#F1F3F4] border-b border-slate-200 px-3 md:px-4 py-2 flex items-center gap-2 flex-shrink-0 ${isRealMobile ? 'hidden' : ''}`}>
          <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
          </div>
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-slate-400 font-mono flex items-center gap-1.5 border border-slate-200 min-w-0">
            <i className="ri-lock-line text-slate-400 text-xs flex-shrink-0"></i>
            <span className="truncate">
              {isExternal ? template.demoUrl : `webprostudio.vn${template.demoUrl}`}
            </span>
          </div>
          <button
            onClick={handleShare}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg cursor-pointer transition-all whitespace-nowrap flex-shrink-0 ${
              copied ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0F2B5B] hover:text-[#0F2B5B]'
            }`}
          >
            <i className={`text-sm ${copied ? 'ri-check-line' : 'ri-links-line'}`}></i>
            <span className="hidden sm:inline">{copied ? 'Đã Chép!' : 'Sao Chép Link'}</span>
          </button>
        </div>

        {/* ── Preview area ── */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {renderContent()}
        </div>

        {/* ── Footer ── */}
        <div className="flex-shrink-0 bg-white border-t border-slate-100 px-3 md:px-5 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[#0F2B5B] font-semibold text-sm">{template.name}</p>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {[template.category, 'Responsive', 'SEO Chuẩn', 'Tốc Độ Nhanh'].map((tag) => (
                <span key={tag} className="text-[10px] bg-[#F0F9FF] text-[#00C2E0] px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0 flex-wrap">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 border border-slate-200 text-slate-600 hover:border-[#0F2B5B] hover:text-[#0F2B5B] text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer transition-all whitespace-nowrap"
            >
              <i className="ri-arrow-left-line"></i>
              Quay Về
            </button>
            {!isRealMobile && (
              <button
                onClick={handleFullscreen}
                className="flex items-center gap-1.5 border border-slate-200 text-slate-600 hover:border-[#0F2B5B] hover:text-[#0F2B5B] text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer transition-all whitespace-nowrap"
              >
                <i className={isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'}></i>
                <span className="hidden sm:inline">{isFullscreen ? 'Thu Nhỏ' : 'Toàn Màn Hình'}</span>
              </button>
            )}
            <a
              href="https://zalo.me/0901234567"
              target="_blank"
              rel="nofollow"
              onClick={() => onOrder(template.name)}
              className="flex items-center gap-1.5 bg-[#00C2E0] hover:bg-[#00AAC8] text-white text-xs font-bold px-5 py-2 rounded-xl cursor-pointer transition-colors whitespace-nowrap"
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
