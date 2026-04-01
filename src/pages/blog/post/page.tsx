import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import QuickContact from '@/components/feature/QuickContact';
import { BLOG_POSTS, BlogSection } from '@/mocks/blogPosts';

function renderSection(section: BlogSection, idx: number) {
  if (section.type === 'heading') {
    return (
      <h2 key={idx} className="font-heading font-bold text-xl md:text-2xl text-[#0F2B5B] mt-10 mb-4">
        {section.text}
      </h2>
    );
  }
  if (section.type === 'paragraph') {
    return (
      <p key={idx} className="text-slate-600 leading-relaxed text-base mb-5">
        {section.text}
      </p>
    );
  }
  if (section.type === 'list') {
    return (
      <ul key={idx} className="space-y-2 mb-6">
        {(section.items || []).map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="ri-check-double-line text-[#00C2E0]"></i>
            </div>
            {item}
          </li>
        ))}
      </ul>
    );
  }
  if (section.type === 'highlight') {
    return (
      <div key={idx} className="bg-[#F0FDFB] border-l-4 border-[#00C2E0] rounded-r-xl px-6 py-4 my-6">
        <p className="text-[#0F2B5B] font-semibold text-sm leading-relaxed">{section.text}</p>
      </div>
    );
  }
  return null;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [visible, setVisible] = useState(false);

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post?.id && p.category === post?.category).slice(0, 3);
  const others = BLOG_POSTS.filter((p) => p.id !== post?.id).slice(0, 3);
  const related = relatedPosts.length > 0 ? relatedPosts : others;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | WebAgency Blog`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', post.metaDescription);
    }
    setTimeout(() => setVisible(true), 50);
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 pt-24">
          <i className="ri-article-line text-slate-300 text-6xl"></i>
          <p className="text-slate-500 text-lg">Bài viết không tồn tại</p>
          <Link to="/blog" className="text-[#00C2E0] font-semibold hover:underline cursor-pointer">
            Quay lại Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0F2B5B] pt-24 pb-0">
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-8 pb-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/50 text-xs mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white cursor-pointer">Trang Chủ</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/blog" className="hover:text-white cursor-pointer">Blog</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-white/80 truncate">{post.title}</span>
          </nav>
          <span className="text-[#00C2E0] text-xs font-bold uppercase tracking-widest mb-4 block">
            {post.category}
          </span>
          <h1
            className={`font-heading font-black text-2xl md:text-4xl text-white leading-tight mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-4 pb-8">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-11 h-11 rounded-full object-cover border-2 border-white/20"
            />
            <div>
              <p className="text-white text-sm font-semibold">{post.author}</p>
              <p className="text-white/50 text-xs">
                {new Date(post.publishedAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
                &nbsp;·&nbsp;{post.readTime} phút đọc
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-4">
        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-[#F0F9FF] text-[#00C2E0] px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Excerpt highlight */}
            <p className="text-slate-500 text-base leading-relaxed mb-8 italic border-l-4 border-slate-200 pl-5">
              {post.excerpt}
            </p>

            {/* Sections */}
            <div>
              {post.sections.map((section, idx) => renderSection(section, idx))}
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-r from-[#0F2B5B] to-[#1a3d7c] rounded-2xl p-8 text-center">
              <h3 className="font-heading font-bold text-white text-xl mb-3">
                Bạn Muốn Áp Dụng Ngay?
              </h3>
              <p className="text-white/70 text-sm mb-6">
                Đội ngũ WebAgency sẵn sàng tư vấn miễn phí và triển khai cho doanh nghiệp của bạn
              </p>
              <a
                href="https://zalo.me/0901234567"
                target="_blank"
                rel="nofollow"
                className="inline-flex items-center gap-2 bg-[#00C2E0] hover:bg-[#00A8C8] text-white font-bold text-sm px-8 py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-message-2-line"></i>
                Nhắn Zalo Tư Vấn Ngay
              </a>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Author Card */}
            <div className="bg-[#F8FAFF] rounded-2xl p-6">
              <h4 className="font-heading font-bold text-[#0F2B5B] text-sm mb-4">Tác Giả</h4>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[#0F2B5B] text-sm">{post.author}</p>
                  <p className="text-slate-400 text-xs">Chuyên gia WebAgency</p>
                </div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                Chuyên gia với 5+ năm kinh nghiệm thiết kế website và chạy quảng cáo cho doanh nghiệp Việt Nam.
              </p>
            </div>

            {/* Contact CTA */}
            <div className="bg-[#0F2B5B] rounded-2xl p-6 text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-[#00C2E0]/20 rounded-full mx-auto mb-4">
                <i className="ri-customer-service-2-line text-[#00C2E0] text-2xl"></i>
              </div>
              <h4 className="font-heading font-bold text-white text-sm mb-2">Tư Vấn Miễn Phí</h4>
              <p className="text-white/60 text-xs mb-4">Hỗ trợ 24/7 qua Zalo</p>
              <a
                href="https://zalo.me/0901234567"
                target="_blank"
                rel="nofollow"
                className="w-full flex items-center justify-center gap-2 bg-[#00C2E0] text-white text-xs font-bold py-3 rounded-xl cursor-pointer whitespace-nowrap hover:bg-[#00A8C8] transition-colors"
              >
                <i className="ri-message-2-fill"></i>
                Chat Zalo Ngay
              </a>
            </div>

            {/* Related Posts */}
            <div>
              <h4 className="font-heading font-bold text-[#0F2B5B] text-sm mb-4">Bài Viết Liên Quan</h4>
              <div className="space-y-4">
                {related.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/blog/${rp.slug}`}
                    className="flex gap-3 group cursor-pointer"
                  >
                    <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-700 text-xs font-medium leading-snug line-clamp-2 group-hover:text-[#00C2E0] transition-colors">
                        {rp.title}
                      </p>
                      <p className="text-slate-400 text-xs mt-1">{rp.readTime} phút đọc</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
      <QuickContact />
    </div>
  );
}
