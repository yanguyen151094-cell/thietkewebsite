import { useState } from 'react';

const services = [
  { icon: 'ri-building-2-line', title: 'Thiết Kế Kiến Trúc', desc: 'Thiết kế không gian hiện đại, sang trọng — từ biệt thự đến tòa nhà thương mại.' },
  { icon: 'ri-paint-brush-line', title: 'Thiết Kế Nội Thất', desc: 'Phong cách Bắc Âu, Nhật Bản, tân cổ điển — đáp ứng mọi sở thích gia chủ.' },
  { icon: 'ri-tools-line', title: 'Thi Công & Hoàn Thiện', desc: 'Đội ngũ thi công chuyên nghiệp, tiến độ đảm bảo, chất lượng cam kết.' },
  { icon: 'ri-home-4-line', title: 'Cải Tạo & Sửa Chữa', desc: 'Cải tạo không gian cũ thành mới — nâng cấp toàn diện với chi phí tối ưu.' },
];

const projects = [
  { name: 'Biệt Thự Vinhomes Ocean Park', type: 'Nhà Ở', year: 2024, image: 'https://readdy.ai/api/search-image?query=luxury%20villa%20modern%20architecture%20exterior%20beautiful%20Vietnamese%20real%20estate%20high-end%20residential%20design%20pool%20garden%20landscape%20daylight%20professional%20photography&width=600&height=400&seq=ct001&orientation=landscape' },
  { name: 'Văn Phòng Tech Hub Saigon', type: 'Thương Mại', year: 2024, image: 'https://readdy.ai/api/search-image?query=modern%20office%20interior%20design%20open%20workspace%20tech%20startup%20Vietnamese%20architecture%20professional%20clean%20minimal%20elegant%20contemporary%20photography&width=600&height=400&seq=ct002&orientation=landscape' },
  { name: 'Nhà Hàng Phong Cách Nhật', type: 'F&B', year: 2023, image: 'https://readdy.ai/api/search-image?query=Japanese%20style%20restaurant%20interior%20design%20Vietnam%20elegant%20wooden%20minimal%20zen%20aesthetic%20modern%20hospitality%20space%20professional%20photography&width=600&height=400&seq=ct003&orientation=landscape' },
  { name: 'Penthouse 3 Tầng Quận 1', type: 'Nhà Ở', year: 2023, image: 'https://readdy.ai/api/search-image?query=luxury%20penthouse%20interior%20design%20Ho%20Chi%20Minh%20City%20Vietnam%20modern%20elegant%20living%20room%20high-end%20residential%20photography%20daylight&width=600&height=400&seq=ct004&orientation=landscape' },
  { name: 'Showroom BMW Hà Nội', type: 'Thương Mại', year: 2024, image: 'https://readdy.ai/api/search-image?query=luxury%20car%20showroom%20interior%20design%20modern%20clean%20white%20bright%20automotive%20retail%20space%20Vietnam%20professional%20architecture%20photography&width=600&height=400&seq=ct005&orientation=landscape' },
  { name: 'Resort Boutique Đà Nẵng', type: 'Du Lịch', year: 2023, image: 'https://readdy.ai/api/search-image?query=boutique%20resort%20beachfront%20Da%20Nang%20Vietnam%20luxury%20tropical%20design%20poolside%20garden%20architecture%20photography%20professional&width=600&height=400&seq=ct006&orientation=landscape' },
];

const team = [
  { name: 'Nguyễn Hoàng Anh', role: 'Kiến Trúc Sư Trưởng', exp: '12 năm', img: 'https://readdy.ai/api/search-image?query=professional%20Vietnamese%20male%20architect%20portrait%20confident%20elegant%20smart%20business%20suit%20clean%20background%20studio%20photography&width=300&height=300&seq=team1&orientation=squarish' },
  { name: 'Trần Thị Minh Châu', role: 'Trưởng Phòng Nội Thất', exp: '9 năm', img: 'https://readdy.ai/api/search-image?query=professional%20Vietnamese%20female%20interior%20designer%20portrait%20confident%20elegant%20smart%20business%20clean%20background%20studio%20photography&width=300&height=300&seq=team2&orientation=squarish' },
  { name: 'Lê Quốc Bảo', role: 'Giám Đốc Thi Công', exp: '15 năm', img: 'https://readdy.ai/api/search-image?query=professional%20Vietnamese%20male%20construction%20director%20portrait%20confident%20business%20suit%20clean%20background%20studio%20photography&width=300&height=300&seq=team3&orientation=squarish' },
];

const process = [
  { step: '01', title: 'Tư Vấn Miễn Phí', desc: 'Gặp gỡ, lắng nghe nhu cầu, khảo sát mặt bằng — hoàn toàn miễn phí.' },
  { step: '02', title: 'Thiết Kế Concept', desc: 'Đề xuất 3 phương án thiết kế kèm phối cảnh 3D, điều chỉnh theo ý khách.' },
  { step: '03', title: 'Duyệt & Ký Hợp Đồng', desc: 'Chốt phương án, lập bản vẽ kỹ thuật chi tiết, ký hợp đồng minh bạch.' },
  { step: '04', title: 'Thi Công & Bàn Giao', desc: 'Thi công đúng tiến độ, giám sát chặt chẽ, bàn giao đúng hẹn.' },
];

export default function DemoCongTy() {
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1E293B] rounded-xl flex items-center justify-center">
              <i className="ri-building-line text-white text-base"></i>
            </div>
            <div>
              <div className="font-extrabold text-[#1E293B] text-base">ARCHIVN STUDIO</div>
              <div className="text-slate-400 text-[10px] font-medium tracking-wider">KIẾN TRÚC & NỘI THẤT · 9 NĂM KINH NGHIỆM</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-slate-600">
            {['Dịch Vụ', 'Dự Án', 'Đội Ngũ', 'Quy Trình', 'Liên Hệ'].map((item) => (
              <button key={item} className="cursor-pointer hover:text-[#1E293B] font-medium transition-colors">{item}</button>
            ))}
          </nav>
          <a href="tel:0901234567" className="hidden md:flex items-center gap-1.5 bg-[#1E293B] text-white text-xs font-bold px-5 py-2.5 rounded-full cursor-pointer whitespace-nowrap hover:bg-slate-700 transition-colors">
            <i className="ri-phone-line text-xs"></i>Tư Vấn Miễn Phí
          </a>
          <button className="md:hidden text-slate-700"><i className="ri-menu-line text-2xl"></i></button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src="https://readdy.ai/api/search-image?query=modern%20Vietnamese%20architecture%20firm%20luxury%20villa%20exterior%20beautiful%20design%20pool%20tropical%20garden%20architectural%20masterpiece%20professional%20photography&width=1400&height=800&seq=cthero&orientation=landscape" alt="ArchiVN Studio" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5 tracking-widest">THÀNH LẬP 2015 · HÀ NỘI & TP.HCM</span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5 max-w-xl">
              Kiến Tạo<br /><span className="text-yellow-400">Không Gian</span><br />Đẳng Cấp
            </h1>
            <p className="text-white/70 text-base max-w-md mb-8">200+ dự án hoàn thành, đối tác của các chủ đầu tư lớn. Chúng tôi biến ý tưởng thành kiệt tác.</p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <button className="bg-yellow-400 text-black px-8 py-3.5 rounded-full font-extrabold cursor-pointer hover:bg-yellow-300 transition-colors whitespace-nowrap text-sm">
                <i className="ri-image-line mr-1.5"></i>Xem Portfolio
              </button>
              <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="border border-white/40 text-white px-8 py-3.5 rounded-full font-bold cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap text-sm">
                <i className="ri-message-2-fill mr-1.5"></i>Nhận Báo Giá
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#1E293B] py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['200+', 'Dự Án Hoàn Thành'], ['9 Năm', 'Kinh Nghiệm'], ['50+', 'Chuyên Gia Thiết Kế'], ['98%', 'Khách Hàng Hài Lòng']].map(([num, label]) => (
            <div key={label}>
              <div className="text-2xl md:text-3xl font-black text-yellow-400 mb-1">{num}</div>
              <div className="text-white/60 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14">
        <div className="text-center mb-10">
          <span className="text-yellow-500 text-xs font-bold tracking-widest">DỊCH VỤ CỦA CHÚNG TÔI</span>
          <h2 className="text-2xl md:text-4xl font-black text-[#1E293B] mt-2">Giải Pháp Thiết Kế Toàn Diện</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {services.map((s) => (
            <div key={s.title} className="border border-slate-100 rounded-2xl p-6 hover:border-yellow-300 hover:-translate-y-1 transition-all group cursor-pointer">
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-50 rounded-xl mb-4 group-hover:bg-yellow-100 transition-colors">
                <i className={`${s.icon} text-2xl text-yellow-500`}></i>
              </div>
              <h3 className="font-bold text-[#1E293B] mb-2 text-sm">{s.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="bg-slate-50 py-14">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-yellow-500 text-xs font-bold tracking-widest">PORTFOLIO</span>
              <h2 className="text-2xl md:text-4xl font-black text-[#1E293B] mt-2">Dự Án Nổi Bật</h2>
            </div>
            <button className="text-sm font-semibold text-[#1E293B] hover:text-yellow-600 cursor-pointer whitespace-nowrap">Xem Tất Cả →</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div key={project.name} onClick={() => setActiveProject(project)} className="group rounded-2xl overflow-hidden cursor-pointer relative">
                <img src={project.image} alt={project.name} className="w-full h-56 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/80 transition-all"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 inline-block">{project.type}</span>
                  <h3 className="text-white font-bold text-sm">{project.name}</h3>
                  <p className="text-white/60 text-xs">{project.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14">
        <div className="text-center mb-10">
          <span className="text-yellow-500 text-xs font-bold tracking-widest">ĐỘI NGŨ</span>
          <h2 className="text-2xl md:text-4xl font-black text-[#1E293B] mt-2">Những Chuyên Gia Hàng Đầu</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="font-bold text-[#1E293B] text-base">{member.name}</h3>
              <p className="text-yellow-600 text-sm font-medium">{member.role}</p>
              <p className="text-slate-400 text-xs mt-1">Kinh nghiệm: {member.exp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="bg-[#1E293B] py-14">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="text-yellow-400 text-xs font-bold tracking-widest">QUY TRÌNH LÀM VIỆC</span>
            <h2 className="text-2xl md:text-4xl font-black text-white mt-2">Rõ Ràng · Minh Bạch · Hiệu Quả</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {process.map((p) => (
              <div key={p.step} className="relative">
                <div className="text-5xl font-black text-yellow-400/20 mb-3">{p.step}</div>
                <h3 className="font-bold text-white text-sm mb-2">{p.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-14 text-center">
        <h2 className="text-2xl md:text-4xl font-black text-[#1E293B] mb-4">Sẵn Sàng Bắt Đầu Dự Án?</h2>
        <p className="text-slate-500 text-base mb-8">Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết trong 24 giờ.</p>
        <div className="flex gap-3 justify-center flex-col sm:flex-row">
          <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#1E293B] text-white px-8 py-3.5 rounded-full font-bold cursor-pointer hover:bg-slate-700 transition-colors whitespace-nowrap">
            <i className="ri-message-2-fill"></i>Chat Zalo Ngay
          </a>
          <a href="tel:0901234567" className="flex items-center justify-center gap-2 border-2 border-[#1E293B] text-[#1E293B] px-8 py-3.5 rounded-full font-bold cursor-pointer hover:bg-slate-50 transition-colors whitespace-nowrap">
            <i className="ri-phone-line"></i>0901 234 567
          </a>
        </div>
      </div>

      {/* Project Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setActiveProject(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img src={activeProject.image} alt={activeProject.name} className="w-full h-64 object-cover object-top" />
            <div className="p-6">
              <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2.5 py-1 rounded-full">{activeProject.type} · {activeProject.year}</span>
              <h3 className="text-xl font-black text-[#1E293B] mt-3 mb-2">{activeProject.name}</h3>
              <p className="text-slate-500 text-sm">Dự án thiết kế và thi công bởi ArchiVN Studio — kết hợp hài hòa giữa thẩm mỹ hiện đại và yếu tố văn hóa bản địa. Hoàn thiện đúng tiến độ, vượt kỳ vọng của gia chủ.</p>
              <div className="flex gap-3 mt-5">
                <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#1E293B] text-white text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-700 transition-colors">
                  <i className="ri-message-2-fill"></i>Tư Vấn Dự Án Tương Tự
                </a>
                <button onClick={() => setActiveProject(null)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-slate-500 cursor-pointer hover:bg-slate-50 text-sm">Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#0F172A] text-white py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-extrabold text-xl mb-2">ARCHIVN STUDIO</div>
            <p className="text-white/40 text-sm">Kiến trúc & Nội thất cao cấp — Hà Nội và TP. Hồ Chí Minh.</p>
          </div>
          <div>
            <div className="font-bold text-sm mb-3 text-white/60">Dịch Vụ</div>
            <ul className="space-y-1.5 text-white/40 text-sm">
              {['Thiết kế kiến trúc', 'Nội thất', 'Thi công', 'Cải tạo nhà'].map((s) => <li key={s} className="cursor-pointer hover:text-white transition-colors">{s}</li>)}
            </ul>
          </div>
          <div>
            <div className="font-bold text-sm mb-3 text-white/60">Liên Hệ</div>
            <div className="space-y-1.5 text-white/40 text-sm">
              <div>123 Nguyễn Hữu Thọ, Q.7, TP.HCM</div>
              <div>0901 234 567</div>
              <div>info@archivn.vn</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 mt-8 pt-6 text-center text-white/20 text-xs">
          © 2025 ArchiVN Studio · Thiết kế bởi <span className="text-[#00C2E0] font-semibold">WebPro Studio</span>
        </div>
      </footer>
    </div>
  );
}
