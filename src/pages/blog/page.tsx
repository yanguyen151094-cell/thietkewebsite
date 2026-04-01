import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import QuickContact from '@/components/feature/QuickContact';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/mocks/blogPosts';

export default function BlogPage() {
  const [category, setCategory] = useState('Tat Ca');
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
    document.title = 'Blog | Kiến Thức Thiết Kế Website & Chạy Quảng Cáo | WebAgency';
  }, []);

  const filtered = BLOG_POSTS.filter((p) => {
    const matchCat = category === 'Tat Ca' || p.category === category;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = BLOG_POSTS[0];
  const rest = filtered.filter((p) => p.id !== featured.id);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <section className="bg-[#0F2B5B] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <span className="text-[#00C2E0] text-xs font-bold uppercase tracking-widest mb-3 block">
            KIẾN THỨC & KINH NGHIỆM
          </span>
          <h1 className="font-heading font-black text-3xl md:text-5xl text-white mb-4">
            Blog WebAgency
            <br />
            <span className="text-[#00C2E0]">Thiết Kế Website & Quảng Cáo Online</span>
          </h1>
          <p className="text-white/70 text-base max-w-xl mx-auto mb-8">
            Cập nhật kiến thức mới nhất về thiết kế website chuẩn SEO, chạy quảng cáo Facebook, Google, TikTok hiệu quả nhất 2025.
          </p>
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="w-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/40 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#00C2E0] pr-12"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
              <i className="ri-search-line text-white/50"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-slate-100 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  category === cat
                    ? 'bg-[#0F2B5B] text-white'
                    : 'bg-[#F0F9FF] text-slate-600 hover:bg-[#E0F4FF]'
                }`}
              >
                {cat === 'Tat Ca' ? 'Tất Cả' : cat.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Featured Post */}
        {category === 'Tat Ca' && !search && (
          <Link
            to={`/blog/${featured.slug}`}
            className={`block group mb-12 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#00C2E0] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                  BÀI VIẾT NỔI BẬT
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center bg-white">
                <span className="text-[#00C2E0] text-xs font-bold uppercase tracking-wider mb-2">
                  {featured.category}
                </span>
                <h2 className="font-heading font-black text-xl md:text-2xl text-[#0F2B5B] mb-4 leading-tight">
                  {featured.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={featured.authorAvatar}
                    alt={featured.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-slate-700 text-sm font-semibold">{featured.author}</p>
                    <p className="text-slate-400 text-xs">
                      {new Date(featured.publishedAt).toLocaleDateString('vi-VN')} · {featured.readTime} phút đọc
                    </p>
                  </div>
                  <span className="ml-auto flex items-center gap-1 text-[#00C2E0] text-sm font-semibold whitespace-nowrap">
                    Đọc ngay
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Posts Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <i className="ri-article-line text-slate-300 text-5xl block mb-3"></i>
            <p className="text-slate-400">Không tìm thấy bài viết phù hợp</p>
          </div>
        ) : (
          <>
            <p className="text-slate-400 text-sm mb-6">{filtered.length} bài viết</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(category === 'Tat Ca' && !search ? rest : filtered).map((post, i) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className={`group block bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0F2B5B]/80 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-[#0F2B5B] text-sm leading-snug mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-slate-600 text-xs font-medium truncate">{post.author}</p>
                        <p className="text-slate-400 text-xs">
                          {new Date(post.publishedAt).toLocaleDateString('vi-VN')} · {post.readTime} phút
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Tags Cloud */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <div className="bg-[#F8FAFF] rounded-2xl p-8">
          <h3 className="font-heading font-bold text-[#0F2B5B] text-lg mb-4">Chủ Đề Phổ Biến</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(BLOG_POSTS.flatMap((p) => p.tags))).map((tag) => (
              <button
                key={tag}
                onClick={() => setSearch(tag)}
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[#00C2E0] hover:text-[#00C2E0] transition-colors cursor-pointer whitespace-nowrap"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0F2B5B] py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-heading font-black text-2xl md:text-4xl text-white mb-4">
            Cần Tư Vấn Miễn Phí?
          </h2>
          <p className="text-white/70 mb-6">
            Đội ngũ chuyên gia WebAgency sẵn sàng hỗ trợ bạn 24/7
          </p>
          <a
            href="https://zalo.me/0901234567"
            target="_blank"
            rel="nofollow"
            className="inline-flex items-center gap-2 bg-[#00C2E0] hover:bg-[#00A8C8] text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-message-2-line"></i>
            Chat Zalo Ngay
          </a>
        </div>
      </section>

      <Footer />
      <QuickContact />
    </div>
  );
}
