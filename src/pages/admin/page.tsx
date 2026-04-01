import { useState, useCallback, useEffect } from 'react';
import { DEFAULT_SITE_CONTENT } from '@/mocks/defaultContent';
import { updateGlobalContent } from '@/hooks/useSiteContent';

const ADMIN_AUTH_KEY = 'webagency_admin_auth';

function checkAuth(): boolean {
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'authenticated';
}

function setAuth(ok: boolean) {
  if (ok) localStorage.setItem(ADMIN_AUTH_KEY, 'authenticated');
  else localStorage.removeItem(ADMIN_AUTH_KEY);
}

/* ---------- Login Screen ---------- */
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const content = DEFAULT_SITE_CONTENT;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === content.settings.adminPassword) {
      setAuth(true);
      onLogin();
    } else {
      setError('Mật khẩu không đúng. Vui lòng thử lại!');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F2B5B] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <img src={content.settings.logoUrl} alt="Logo" className="h-14 mx-auto mb-4 object-contain" />
          <h1 className="font-heading font-bold text-[#0F2B5B] text-2xl">Quản Trị Viên</h1>
          <p className="text-slate-400 text-sm mt-1">Đăng nhập để quản lý website</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-600 text-sm font-medium mb-1.5">Mật khẩu</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(''); }}
              placeholder="Nhập mật khẩu admin..."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-[#0F2B5B] hover:bg-[#00C2E0] text-white font-bold py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap">
            Đăng Nhập
          </button>
        </form>
        <p className="text-center text-slate-400 text-xs mt-4">Mật khẩu mặc định: admin@2024</p>
      </div>
    </div>
  );
}

/* ---------- Admin Tabs ---------- */
const TABS = [
  { id: 'hero', label: 'Hero Banner', icon: 'ri-image-line' },
  { id: 'services', label: 'Dịch Vụ', icon: 'ri-service-line' },
  { id: 'templates', label: 'Kho Mẫu', icon: 'ri-layout-2-line' },
  { id: 'pricing', label: 'Bảng Giá', icon: 'ri-price-tag-3-line' },
  { id: 'testimonials', label: 'Khách Hàng', icon: 'ri-star-line' },
  { id: 'contact', label: 'Liên Hệ', icon: 'ri-contacts-line' },
  { id: 'settings', label: 'Cài Đặt', icon: 'ri-settings-3-line' },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(checkAuth);
  const [activeTab, setActiveTab] = useState('hero');
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = useCallback(() => setAuthed(true), []);
  const handleLogout = () => { setAuth(false); setAuthed(false); };

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!authed) return <AdminLogin onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static top-0 left-0 h-full z-50 bg-[#0F2B5B] w-60 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-white/10">
          <img src={DEFAULT_SITE_CONTENT.settings.logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
          <p className="text-white/50 text-xs mt-2">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#00C2E0] text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={`${tab.icon} text-base`}></i>
              </div>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <a href="/" target="_blank" className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-2 cursor-pointer">
            <i className="ri-external-link-line"></i>Xem Website
          </a>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/60 hover:text-red-400 text-sm cursor-pointer whitespace-nowrap">
            <i className="ri-logout-box-line"></i>Đăng Xuất
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => setSidebarOpen(true)}>
              <i className="ri-menu-line text-slate-600"></i>
            </button>
            <h2 className="font-semibold text-[#0F2B5B] text-sm md:text-base">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>
          {saved && (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">
              <i className="ri-check-line"></i>Đã lưu!
            </div>
          )}
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <AdminTabContent activeTab={activeTab} onSave={showSaved} />
        </main>
      </div>
    </div>
  );
}

/* ---------- Tab Routing ---------- */
function AdminTabContent({ activeTab, onSave }: { activeTab: string; onSave: () => void }) {
  switch (activeTab) {
    case 'hero': return <HeroTab onSave={onSave} />;
    case 'services': return <ServicesTab onSave={onSave} />;
    case 'templates': return <TemplatesAdminTab onSave={onSave} />;
    case 'pricing': return <PricingTab onSave={onSave} />;
    case 'testimonials': return <TestimonialsTab onSave={onSave} />;
    case 'contact': return <ContactTab onSave={onSave} />;
    case 'settings': return <SettingsTab onSave={onSave} />;
    default: return null;
  }
}

/* ========================== HERO TAB ========================== */
function HeroTab({ onSave }: { onSave: () => void }) {
  const [data, setData] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('webagency_content') || '{}');
      return { ...DEFAULT_SITE_CONTENT.hero, ...(stored.hero || {}) };
    } catch { return DEFAULT_SITE_CONTENT.hero; }
  });

  const save = () => {
    updateGlobalContent((prev) => ({ ...prev, hero: data }));
    onSave();
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-100">
        <h3 className="font-semibold text-[#0F2B5B] mb-4">Nội dung Hero Banner</h3>
        <div className="space-y-4">
          <Field label="Badge text" value={data.badge} onChange={(v) => setData({ ...data, badge: v })} />
          <Field label="Tiêu đề dòng 1" value={data.title1} onChange={(v) => setData({ ...data, title1: v })} />
          <Field label="Tiêu đề dòng 2 (màu cyan)" value={data.title2} onChange={(v) => setData({ ...data, title2: v })} />
          <Field label="Tiêu đề dòng 3" value={data.title3} onChange={(v) => setData({ ...data, title3: v })} />
          <Field label="Mô tả phụ" value={data.subtitle} onChange={(v) => setData({ ...data, subtitle: v })} textarea />
          <Field label="CTA Chính" value={data.ctaPrimary} onChange={(v) => setData({ ...data, ctaPrimary: v })} />
          <Field label="CTA Phụ" value={data.ctaSecondary} onChange={(v) => setData({ ...data, ctaSecondary: v })} />
          <Field label="Ảnh nền (URL)" value={data.backgroundImage} onChange={(v) => setData({ ...data, backgroundImage: v })} />
          {data.backgroundImage && (
            <img src={data.backgroundImage} className="rounded-xl w-full h-32 object-cover object-top border border-slate-200" alt="preview" />
          )}
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-slate-100">
        <h3 className="font-semibold text-[#0F2B5B] mb-4">Thống kê (Stats)</h3>
        {data.stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 mb-3">
            <Field label={`Giá trị ${i + 1}`} value={stat.value} onChange={(v) => { const s = [...data.stats]; s[i] = { ...s[i], value: v }; setData({ ...data, stats: s }); }} />
            <Field label={`Nhãn ${i + 1}`} value={stat.label} onChange={(v) => { const s = [...data.stats]; s[i] = { ...s[i], label: v }; setData({ ...data, stats: s }); }} />
          </div>
        ))}
      </div>
      <SaveBtn onSave={save} />
    </div>
  );
}

/* ========================== SERVICES TAB ========================== */
function ServicesTab({ onSave }: { onSave: () => void }) {
  const [services, setServices] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('webagency_content') || '{}');
      return stored.webServices || DEFAULT_SITE_CONTENT.webServices;
    } catch { return DEFAULT_SITE_CONTENT.webServices; }
  });

  const save = () => {
    updateGlobalContent((prev) => ({ ...prev, webServices: services }));
    onSave();
  };

  return (
    <div className="max-w-3xl space-y-4">
      {services.map((svc: typeof services[0], i: number) => (
        <div key={svc.id} className="bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F2B5B]">{svc.title}</h3>
            <span className="text-xs text-slate-400">Dịch vụ {i + 1}</span>
          </div>
          <div className="space-y-3">
            <Field label="Tiêu đề" value={svc.title} onChange={(v) => { const s = [...services]; s[i] = { ...s[i], title: v }; setServices(s); }} />
            <Field label="Mô tả" value={svc.description} onChange={(v) => { const s = [...services]; s[i] = { ...s[i], description: v }; setServices(s); }} textarea />
            <Field label="Ảnh (URL)" value={svc.image} onChange={(v) => { const s = [...services]; s[i] = { ...s[i], image: v }; setServices(s); }} />
            {svc.image && <img src={svc.image} className="rounded-xl w-full h-28 object-cover object-top border" alt="preview" />}
          </div>
        </div>
      ))}
      <SaveBtn onSave={save} />
    </div>
  );
}

/* ========================== TEMPLATES TAB ========================== */
import { WEB_TEMPLATES, WebTemplate, TEMPLATE_CATEGORIES } from '@/mocks/templates';

function TemplatesAdminTab({ onSave }: { onSave: () => void }) {
  const [templates, setTemplates] = useState<WebTemplate[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('webagency_templates') || 'null');
      return stored || WEB_TEMPLATES;
    } catch { return WEB_TEMPLATES; }
  });
  const [editing, setEditing] = useState<string | null>(null);

  const save = () => {
    localStorage.setItem('webagency_templates', JSON.stringify(templates));
    onSave();
  };

  const addTemplate = () => {
    const newTpl: WebTemplate = {
      id: `tpl_${Date.now()}`,
      name: 'Mẫu Website Mới',
      category: 'Khác',
      image: '',
      demoUrl: '#',
      badge: 'MỚI',
      badgeColor: '#00C2E0',
      description: 'Mô tả mẫu website',
    };
    setTemplates([...templates, newTpl]);
    setEditing(newTpl.id);
  };

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
    if (editing === id) setEditing(null);
  };

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-slate-500 text-sm">{templates.length} mẫu website</p>
        <button onClick={addTemplate} className="flex items-center gap-2 bg-[#0F2B5B] hover:bg-[#00C2E0] text-white text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer whitespace-nowrap transition-colors">
          <i className="ri-add-line"></i>Thêm Mẫu Mới
        </button>
      </div>

      {templates.map((tpl, i) => (
        <div key={tpl.id} className={`bg-white rounded-2xl border overflow-hidden transition-all ${editing === tpl.id ? 'border-[#00C2E0]' : 'border-slate-100'}`}>
          {/* Row header */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {tpl.image
                ? <img src={tpl.image} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" alt={tpl.name} />
                : <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0"><i className="ri-image-line text-slate-400 text-xl"></i></div>
              }
              <div className="min-w-0">
                <p className="font-semibold text-[#0F2B5B] text-sm truncate">{tpl.name}</p>
                <p className="text-slate-400 text-xs">{tpl.category}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* EDIT BUTTON - prominent */}
              <button
                onClick={() => setEditing(editing === tpl.id ? null : tpl.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg cursor-pointer transition-all whitespace-nowrap ${
                  editing === tpl.id
                    ? 'bg-[#00C2E0] text-white'
                    : 'bg-[#F0F9FF] text-[#00C2E0] hover:bg-[#00C2E0] hover:text-white'
                }`}
              >
                <i className={`${editing === tpl.id ? 'ri-check-line' : 'ri-pencil-line'} text-sm`}></i>
                {editing === tpl.id ? 'Đang Sửa' : 'Chỉnh Sửa'}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); deleteTemplate(tpl.id); }}
                className="w-8 h-8 flex items-center justify-center text-red-400 hover:bg-red-50 rounded-lg cursor-pointer"
                title="Xóa mẫu này"
              >
                <i className="ri-delete-bin-line text-sm"></i>
              </button>
            </div>
          </div>

          {/* Editable fields - visible when editing */}
          {editing === tpl.id && (
            <div className="px-5 pb-5 space-y-3 border-t border-[#00C2E0]/20 bg-[#F0FDFF]/40">
              <div className="pt-4">
                <p className="text-xs font-bold text-[#00C2E0] mb-3 flex items-center gap-1.5">
                  <i className="ri-edit-box-line"></i>
                  Đang chỉnh sửa: {tpl.name}
                </p>
              </div>
              <div className="space-y-3">
                <Field label="Tên mẫu" value={tpl.name} onChange={(v) => { const s = [...templates]; s[i] = { ...s[i], name: v }; setTemplates(s); }} />
                <div>
                  <label className="block text-slate-600 text-xs font-medium mb-1.5">Danh mục</label>
                  <select
                    value={tpl.category}
                    onChange={(e) => { const s = [...templates]; s[i] = { ...s[i], category: e.target.value }; setTemplates(s); }}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00C2E0] bg-white"
                  >
                    {TEMPLATE_CATEGORIES.filter((c) => c !== 'Tất Cả').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <Field label="Mô tả" value={tpl.description} onChange={(v) => { const s = [...templates]; s[i] = { ...s[i], description: v }; setTemplates(s); }} textarea />
                <Field label="Ảnh preview (URL)" value={tpl.image} onChange={(v) => { const s = [...templates]; s[i] = { ...s[i], image: v }; setTemplates(s); }} />
                {tpl.image && <img src={tpl.image} className="rounded-xl w-full h-28 object-cover object-top border" alt="preview" />}
                <Field label="Link Demo (URL)" value={tpl.demoUrl} onChange={(v) => { const s = [...templates]; s[i] = { ...s[i], demoUrl: v }; setTemplates(s); }} />
                <Field label="Nhãn badge (vd: BÁN HÀNG)" value={tpl.badge || ''} onChange={(v) => { const s = [...templates]; s[i] = { ...s[i], badge: v }; setTemplates(s); }} />
              </div>
              <div className="pt-2">
                <button
                  onClick={() => { save(); setEditing(null); }}
                  className="flex items-center gap-2 bg-[#0F2B5B] hover:bg-[#00C2E0] text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-colors whitespace-nowrap"
                >
                  <i className="ri-save-line"></i>Lưu Mẫu Này
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <SaveBtn onSave={save} />
    </div>
  );
}

/* ========================== PRICING TAB ========================== */
function PricingTab({ onSave }: { onSave: () => void }) {
  const [pricing, setPricing] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('webagency_content') || '{}');
      return stored.pricing || DEFAULT_SITE_CONTENT.pricing;
    } catch { return DEFAULT_SITE_CONTENT.pricing; }
  });
  const [tab, setTab] = useState<'web' | 'ads'>('web');
  const plans = tab === 'web' ? pricing.web : pricing.ads;

  const save = () => {
    updateGlobalContent((prev) => ({ ...prev, pricing }));
    onSave();
  };

  const updatePlan = (idx: number, field: string, value: string) => {
    const key = tab;
    const updated = [...pricing[key]];
    updated[idx] = { ...updated[idx], [field]: value };
    setPricing({ ...pricing, [key]: updated });
  };

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex gap-2 mb-2">
        {(['web', 'ads'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap transition-colors ${tab === t ? 'bg-[#0F2B5B] text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
            {t === 'web' ? 'Website' : 'Quảng Cáo'}
          </button>
        ))}
      </div>
      {plans.map((plan: typeof plans[0], i: number) => (
        <div key={plan.id} className="bg-white rounded-2xl p-6 border border-slate-100 space-y-3">
          <h3 className="font-semibold text-[#0F2B5B] mb-2">{plan.name}</h3>
          <Field label="Tên gói" value={plan.name} onChange={(v) => updatePlan(i, 'name', v)} />
          <Field label="Giá (chỉ số, vd: 3.900.000)" value={plan.price} onChange={(v) => updatePlan(i, 'price', v)} />
          <Field label="Nút CTA" value={plan.cta} onChange={(v) => updatePlan(i, 'cta', v)} />
        </div>
      ))}
      <SaveBtn onSave={save} />
    </div>
  );
}

/* ========================== TESTIMONIALS TAB ========================== */
function TestimonialsTab({ onSave }: { onSave: () => void }) {
  const [list, setList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('webagency_content') || '{}');
      return stored.testimonials || DEFAULT_SITE_CONTENT.testimonials;
    } catch { return DEFAULT_SITE_CONTENT.testimonials; }
  });
  const [editing, setEditing] = useState<string | null>(null);

  const save = () => {
    updateGlobalContent((prev) => ({ ...prev, testimonials: list }));
    onSave();
  };

  const addTestimonial = () => {
    const newT = {
      id: `t_${Date.now()}`,
      name: 'Tên Khách Hàng',
      company: 'Công ty',
      text: 'Nhận xét của khách hàng...',
      avatar: '',
      rating: 5,
    };
    setList([...list, newT]);
    setEditing(newT.id);
  };

  const deleteItem = (id: string) => {
    setList(list.filter((t: typeof list[0]) => t.id !== id));
    if (editing === id) setEditing(null);
  };

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex justify-end mb-2">
        <button onClick={addTestimonial} className="flex items-center gap-2 bg-[#0F2B5B] hover:bg-[#00C2E0] text-white text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer whitespace-nowrap transition-colors">
          <i className="ri-add-line"></i>Thêm Đánh Giá
        </button>
      </div>

      {list.map((t: typeof list[0], i: number) => (
        <div key={t.id} className={`bg-white rounded-2xl border overflow-hidden transition-all ${editing === t.id ? 'border-[#00C2E0]' : 'border-slate-100'}`}>
          {/* Row header */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {t.avatar
                ? <img src={t.avatar} className="w-10 h-10 rounded-full object-cover flex-shrink-0" alt={t.name} />
                : <div className="w-10 h-10 bg-[#F0F9FF] rounded-full flex items-center justify-center font-bold text-[#00C2E0] text-sm flex-shrink-0">{t.name ? t.name[0] : '?'}</div>
              }
              <div className="min-w-0">
                <p className="font-semibold text-[#0F2B5B] text-sm truncate">{t.name}</p>
                <p className="text-slate-400 text-xs truncate">{t.company}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* EDIT BUTTON - prominent */}
              <button
                onClick={() => setEditing(editing === t.id ? null : t.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg cursor-pointer transition-all whitespace-nowrap ${
                  editing === t.id
                    ? 'bg-[#00C2E0] text-white'
                    : 'bg-[#F0F9FF] text-[#00C2E0] hover:bg-[#00C2E0] hover:text-white'
                }`}
              >
                <i className={`${editing === t.id ? 'ri-check-line' : 'ri-pencil-line'} text-sm`}></i>
                {editing === t.id ? 'Đang Sửa' : 'Chỉnh Sửa'}
              </button>
              <button
                onClick={() => deleteItem(t.id)}
                className="w-8 h-8 flex items-center justify-center text-red-400 hover:bg-red-50 rounded-lg cursor-pointer"
                title="Xóa đánh giá này"
              >
                <i className="ri-delete-bin-line text-sm"></i>
              </button>
            </div>
          </div>

          {/* Editable fields */}
          {editing === t.id && (
            <div className="px-5 pb-5 border-t border-[#00C2E0]/20 bg-[#F0FDFF]/40">
              <p className="text-xs font-bold text-[#00C2E0] my-3 flex items-center gap-1.5">
                <i className="ri-edit-box-line"></i>
                Đang chỉnh sửa: {t.name}
              </p>
              <div className="space-y-3">
                <Field label="Tên" value={t.name} onChange={(v) => { const s = [...list]; s[i] = { ...s[i], name: v }; setList(s); }} />
                <Field label="Công ty / Chức vụ" value={t.company} onChange={(v) => { const s = [...list]; s[i] = { ...s[i], company: v }; setList(s); }} />
                <Field label="Nội dung đánh giá" value={t.text} onChange={(v) => { const s = [...list]; s[i] = { ...s[i], text: v }; setList(s); }} textarea />
                <Field label="Ảnh đại diện (URL)" value={t.avatar} onChange={(v) => { const s = [...list]; s[i] = { ...s[i], avatar: v }; setList(s); }} />
                {t.avatar && <img src={t.avatar} className="w-16 h-16 rounded-full object-cover border" alt="preview" />}
              </div>
              <div className="pt-3">
                <button
                  onClick={() => { save(); setEditing(null); }}
                  className="flex items-center gap-2 bg-[#0F2B5B] hover:bg-[#00C2E0] text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-colors whitespace-nowrap"
                >
                  <i className="ri-save-line"></i>Lưu Đánh Giá Này
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <SaveBtn onSave={save} />
    </div>
  );
}

/* ========================== CONTACT TAB ========================== */
function ContactTab({ onSave }: { onSave: () => void }) {
  const [contact, setContact] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('webagency_content') || '{}');
      return { ...DEFAULT_SITE_CONTENT.contact, ...(stored.contact || {}) };
    } catch { return DEFAULT_SITE_CONTENT.contact; }
  });

  const save = () => {
    updateGlobalContent((prev) => ({ ...prev, contact }));
    onSave();
  };

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-4">
        <h3 className="font-semibold text-[#0F2B5B] mb-2">Thông Tin Liên Hệ</h3>
        <Field label="Số điện thoại / Hotline" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
        <Field label="Số Zalo" value={contact.zalo} onChange={(v) => setContact({ ...contact, zalo: v })} />
        <Field label="Email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
        <Field label="Link Facebook" value={contact.facebook} onChange={(v) => setContact({ ...contact, facebook: v })} />
        <Field label="Địa chỉ" value={contact.address} onChange={(v) => setContact({ ...contact, address: v })} />
      </div>
      <div className="mt-4">
        <SaveBtn onSave={save} />
      </div>
    </div>
  );
}

/* ========================== SETTINGS TAB ========================== */
function SettingsTab({ onSave }: { onSave: () => void }) {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('webagency_content') || '{}');
      return { ...DEFAULT_SITE_CONTENT.settings, ...(stored.settings || {}) };
    } catch { return DEFAULT_SITE_CONTENT.settings; }
  });

  const save = () => {
    updateGlobalContent((prev) => ({ ...prev, settings }));
    onSave();
  };

  const resetAll = () => {
    if (window.confirm('Bạn có chắc muốn reset về nội dung mặc định? Thao tác này không thể hoàn tác!')) {
      localStorage.removeItem('webagency_content');
      localStorage.removeItem('webagency_templates');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl space-y-4">
      <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-4">
        <h3 className="font-semibold text-[#0F2B5B] mb-2">Cài Đặt Website</h3>
        <Field label="Tên thương hiệu" value={settings.siteName} onChange={(v) => setSettings({ ...settings, siteName: v })} />
        <Field label="Logo URL" value={settings.logoUrl} onChange={(v) => setSettings({ ...settings, logoUrl: v })} />
        {settings.logoUrl && <img src={settings.logoUrl} className="h-14 w-auto object-contain border rounded-xl p-2" alt="logo preview" />}
        <Field label="Mật khẩu Admin" value={settings.adminPassword} onChange={(v) => setSettings({ ...settings, adminPassword: v })} />
      </div>
      <SaveBtn onSave={save} />
      <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
        <h3 className="font-semibold text-red-600 mb-2">Vùng Nguy Hiểm</h3>
        <p className="text-slate-500 text-sm mb-4">Reset toàn bộ nội dung về mặc định ban đầu.</p>
        <button onClick={resetAll} className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl cursor-pointer whitespace-nowrap transition-colors">
          Reset Tất Cả Nội Dung
        </button>
      </div>
    </div>
  );
}

/* ========================== SHARED COMPONENTS ========================== */
function Field({
  label, value, onChange, textarea
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="block text-slate-600 text-xs font-medium mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20"
        />
      )}
    </div>
  );
}

function SaveBtn({ onSave }: { onSave: () => void }) {
  return (
    <button
      onClick={onSave}
      className="flex items-center gap-2 bg-[#0F2B5B] hover:bg-[#00C2E0] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap"
    >
      <i className="ri-save-line"></i>
      Lưu Thay Đổi
    </button>
  );
}
