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

const AD_FEATURES = [
  {
    platform: "Facebook Ads",
    icon: "ri-facebook-circle-fill",
    iconColor: "#1877F2",
    bgColor: "#EBF3FF",
    borderColor: "#1877F2",
    campaigns: [
      { name: "Tăng Đơn Bán Hàng", desc: "Chạy quảng cáo nhắm đúng đối tượng mua hàng, tối ưu ROAS" },
      { name: "Tăng Nhận Diện Thương Hiệu", desc: "Reach rộng, tần suất cao, in đậm thương hiệu vào tâm trí khách" },
      { name: "Thu Hút Khách Hàng Mới", desc: "Lookalike audience, custom audience chất lượng cao" },
      { name: "Remarketing Thông Minh", desc: "Nhắm lại khách đã xem web/app, tỷ lệ chuyển đổi +300%" },
    ],
    image: "https://readdy.ai/api/search-image?query=Facebook%20ads%20manager%20dashboard%20analytics%20campaign%20results%20social%20media%20marketing%20professional%20metrics%20blue%20interface%20charts%20graphs%20modern&width=560&height=380&seq=ads001&orientation=landscape",
  },
  {
    platform: "Google Ads",
    icon: "ri-google-fill",
    iconColor: "#EA4335",
    bgColor: "#FFF0EF",
    borderColor: "#EA4335",
    campaigns: [
      { name: "Tìm Kiếm (Search)", desc: "Xuất hiện đầu trang Google khi khách tìm sản phẩm/dịch vụ của bạn" },
      { name: "Display Network", desc: "Banner quảng cáo hiển thị trên hàng triệu website đối tác Google" },
      { name: "Google Maps Ads", desc: "Nổi bật trên Google Maps, thu hút khách ghé cửa hàng trực tiếp" },
      { name: "Shopping Ads", desc: "Hiển thị sản phẩm trực tiếp với ảnh, giá và đánh giá ngay trang tìm kiếm" },
    ],
    image: "https://readdy.ai/api/search-image?query=Google%20Ads%20search%20results%20campaign%20dashboard%20keyword%20performance%20analytics%20professional%20clean%20interface%20digital%20marketing%20ROI%20metrics&width=560&height=380&seq=ads002&orientation=landscape",
  },
  {
    platform: "TikTok Ads",
    icon: "ri-tiktok-fill",
    iconColor: "#010101",
    bgColor: "#F5F5F5",
    borderColor: "#010101",
    campaigns: [
      { name: "In-feed Video Ads", desc: "Video quảng cáo hiển thị tự nhiên trong FYP của người dùng TikTok" },
      { name: "TopView Ads", desc: "Vị trí quảng cáo đầu tiên khi mở app TikTok, nhận diện tối đa" },
      { name: "Quảng Cáo Sản Phẩm", desc: "Gắn link mua hàng trực tiếp vào video, chuyển đổi siêu nhanh" },
      { name: "Tăng Nhận Diện Brand", desc: "Branded hashtag challenge, viral marketing bùng nổ" },
    ],
    image: "https://readdy.ai/api/search-image?query=TikTok%20ads%20manager%20platform%20viral%20video%20campaign%20analytics%20creative%20content%20marketing%20performance%20dashboard%20modern%20interface%20dark&width=560&height=380&seq=ads003&orientation=landscape",
  },
];

export default function AdServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useIntersection(sectionRef as React.RefObject<Element>);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="ad-services" ref={sectionRef} className="section-padding bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#00C2E0] text-xs font-bold uppercase tracking-widest mb-3 block">DỊCH VỤ QUẢNG CÁO</span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-[#0F2B5B] mb-4">
            Quảng Cáo <span className="text-[#00C2E0]">Đa Nền Tảng</span><br />Hiệu Quả & Đột Phá
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            Đội ngũ chuyên gia 5+ năm kinh nghiệm, tối ưu ngân sách quảng cáo, mang về ROI cao nhất cho mỗi đồng bạn đầu tư.
          </p>
        </div>

        {/* Platform Tabs */}
        <div className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {AD_FEATURES.map((ad, i) => (
            <button
              key={ad.platform}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeTab === i
                  ? 'bg-[#0F2B5B] text-white shadow-lg'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-[#00C2E0]'
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={`${ad.icon}`} style={{ color: activeTab === i ? 'white' : ad.iconColor }}></i>
              </div>
              {ad.platform}
            </button>
          ))}
        </div>

        {/* Active Platform Content */}
        {AD_FEATURES.map((ad, i) => (
          <div
            key={ad.platform}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transition-all duration-500 ${activeTab === i ? 'block' : 'hidden'}`}
          >
            {/* Left - Image */}
            <div className="relative rounded-2xl overflow-hidden h-72 md:h-96">
              <img src={ad.image} alt={ad.platform} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B5B]/50 to-transparent"></div>
              <div
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: ad.iconColor }}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`${ad.icon} text-white`}></i>
                </div>
                {ad.platform}
              </div>
            </div>

            {/* Right - Campaigns */}
            <div>
              <h3 className="font-heading font-black text-2xl text-[#0F2B5B] mb-6">
                Chiến Dịch {ad.platform} Hiệu Quả
              </h3>
              <div className="space-y-4">
                {ad.campaigns.map((camp) => (
                  <div key={camp.name} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-[#00C2E0] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[#F0F9FF] rounded-xl">
                      <i className="ri-checkbox-circle-fill text-[#00C2E0] text-lg"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F2B5B] text-sm mb-1">{camp.name}</p>
                      <p className="text-slate-500 text-xs leading-relaxed">{camp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="https://zalo.me/0901234567"
                target="_blank"
                rel="nofollow"
                className="mt-6 inline-flex items-center gap-2 bg-[#00C2E0] hover:bg-[#00A8C8] text-white font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-message-2-line"></i>
                Tư Vấn Zalo Ngay
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
