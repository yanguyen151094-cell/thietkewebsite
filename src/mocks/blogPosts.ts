export interface BlogSection {
  type: 'heading' | 'paragraph' | 'list' | 'highlight';
  text?: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  sections: BlogSection[];
  category: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: number;
  image: string;
  tags: string[];
  metaDescription: string;
}

export const BLOG_CATEGORIES = [
  'Tat Ca',
  'Thiet Ke Website',
  'Quang Cao Online',
  'SEO & Marketing',
  'Kinh Nghiem Thuc Te',
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'bp1',
    slug: 'thiet-ke-website-ban-hang-chuan-seo',
    title: 'Thiet Ke Website Ban Hang Chuan SEO 2025 - Huong Dan Toan Dien',
    category: 'Thiet Ke Website',
    author: 'Nguyen Minh Khoa',
    authorAvatar: 'https://readdy.ai/api/search-image?query=young%20Vietnamese%20male%20web%20designer%20professional%20portrait%20smiling%20friendly%20office%20background%20clean%20modern%20natural%20lighting%20headshot&width=100&height=100&seq=auth001&orientation=squarish',
    publishedAt: '2025-03-15',
    readTime: 8,
    image: 'https://readdy.ai/api/search-image?query=modern%20ecommerce%20website%20design%20laptop%20screen%20professional%20clean%20minimal%20Vietnamese%20online%20shop%20product%20catalog%20blue%20white%20theme%20high%20quality%20mockup%20workspace&width=1200&height=630&seq=blog001&orientation=landscape',
    tags: ['thiet ke website', 'SEO', 'ban hang online', 'website chuan SEO'],
    metaDescription: 'Huong dan thiet ke website ban hang chuan SEO 2025. 12 yeu to quan trong giup website len top Google, tang traffic va doanh thu cho cua hang online.',
    excerpt: 'Ban muon website ban hang len top Google? Bai viet nay chia se 12 yeu to thiet ke website ban hang chuan SEO giup tang traffic huu co va chuyen doi khach mua hang.',
    sections: [
      { type: 'heading', text: 'Tai Sao Website Ban Hang Can Chuan SEO?' },
      { type: 'paragraph', text: 'Trong thoi dai so hoa, thiet ke website ban hang chuan SEO khong con la lua chon ma la bat buoc neu ban muon ton tai va phat trien tren thi truong online. Theo thong ke, hon 93% trai nghiem online bat dau tu cong cu tim kiem.' },
      { type: 'heading', text: '12 Yeu To Thiet Ke Website Ban Hang Chuan SEO' },
      { type: 'list', items: ['Toc do tai trang (Core Web Vitals) - LCP duoi 2.5 giay', 'Cau truc URL than thien SEO - ngan gon, chua tu khoa', 'Toi uu hinh anh san pham - dung WebP, them alt text', 'Schema Markup cho san pham - rich snippet tren Google', 'Noi dung mo ta san pham doc dao - khong copy', 'Trang danh muc duoc toi uu - H1, mo ta, breadcrumb', 'Internal Linking thong minh - phan phoi link juice', 'Mobile-First Design - 70% mua sam tu dien thoai', 'SSL Certificate (HTTPS) - Google yeu cau bat buoc', 'Danh gia va Review khach hang - tang E-E-A-T', 'Sitemap XML va robots.txt - giup Google index day du', 'Toc do Server va Hosting chat luong - giam latency'] },
      { type: 'highlight', text: 'Thiet ke website ban hang chuan SEO la qua trinh tong the, ket hop ky thuat, noi dung va trai nghiem nguoi dung de dat ket qua toi uu.' },
      { type: 'heading', text: 'Ket Luan' },
      { type: 'paragraph', text: 'Ban muon co website ban hang chuan SEO? Lien he ngay WebAgency de duoc tu van mien phi va nhan bao gia chi tiet. Doi ngu chuyen gia 5 nam kinh nghiem san sang ho tro!' },
    ],
  },
  {
    id: 'bp2',
    slug: 'chay-quang-cao-facebook-hieu-qua-2025',
    title: 'Chay Quang Cao Facebook Hieu Qua 2025 - Tang Don Hang Gap 3',
    category: 'Quang Cao Online',
    author: 'Tran Thi Lan',
    authorAvatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20female%20digital%20marketing%20expert%20professional%20portrait%20confident%20smile%20modern%20office%20clean%20background%20headshot%20natural&width=100&height=100&seq=auth002&orientation=squarish',
    publishedAt: '2025-03-08',
    readTime: 10,
    image: 'https://readdy.ai/api/search-image?query=Facebook%20advertising%20analytics%20dashboard%20campaign%20performance%20charts%20graphs%20modern%20interface%20social%20media%20marketing%20professional%20digital%20blue%20white&width=1200&height=630&seq=blog002&orientation=landscape',
    tags: ['quang cao Facebook', 'Facebook Ads', 'tang doanh thu', 'marketing online'],
    metaDescription: 'Huong dan chay quang cao Facebook hieu qua 2025. Chien luoc target dung khach hang, tao content thu hut va toi uu ngan sach de tang don hang gap 3 lan.',
    excerpt: 'Bi quyet chay quang cao Facebook de tang doanh so ban hang online. Tu chon muc tieu chien dich, tao content thu hut den toi uu ngan sach hieu qua nhat.',
    sections: [
      { type: 'heading', text: 'Facebook Ads Nam 2025 - Van Con Hieu Qua?' },
      { type: 'paragraph', text: 'Voi hon 74 trieu nguoi dung Facebook tai Viet Nam, quang cao Facebook van la kenh marketing online hieu qua nhat cho doanh nghiep vua va nho. Tuy nhien, voi thuat toan ngay cang thay doi, ban can hieu dung va ap dung dung cach.' },
      { type: 'heading', text: 'Cau Truc Chien Dich Facebook Ads Hieu Qua' },
      { type: 'list', items: ['Buoc 1: Chon muc tieu chien dich phu hop (Awareness / Consideration / Conversion)', 'Buoc 2: Target dung tep khach hang (Core / Custom / Lookalike Audience)', 'Buoc 3: Tao content quang cao thu hut theo cong thuc AIDA', 'Buoc 4: Toi uu ngan sach - bat dau 200-500k/ngay, test 3-5 ngay', 'Buoc 5: Theo doi CTR, CPM, CPC, ROAS va toi uu lien tuc'] },
      { type: 'highlight', text: 'Chi so quan trong: CTR > 2%, ROAS toi thieu 3x. Tat ad set khong hieu qua, tang ngan sach cho ad set tot.' },
      { type: 'heading', text: 'Xu Huong Facebook Ads 2025' },
      { type: 'list', items: ['Video ngan (Reels) duoc uu tien hon anh tinh', 'Advantage+ Shopping Campaigns - AI tu dong toi uu target', 'WhatsApp + Messenger Ads tang ty le chuyen doi cao hon', 'User Generated Content (UGC) hieu qua hon quang cao chuyen nghiep'] },
    ],
  },
  {
    id: 'bp3',
    slug: 'google-ads-cho-doanh-nghiep-nho',
    title: 'Google Ads Cho Doanh Nghiep Nho - Tiet Kiem Ngan Sach, Tang Doanh Thu',
    category: 'Quang Cao Online',
    author: 'Le Van Dung',
    authorAvatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20male%20Google%20Ads%20specialist%20professional%20portrait%20confident%20modern%20office%20background%20headshot%20clean%20natural%20lighting&width=100&height=100&seq=auth003&orientation=squarish',
    publishedAt: '2025-02-25',
    readTime: 7,
    image: 'https://readdy.ai/api/search-image?query=Google%20search%20results%20page%20laptop%20screen%20advertising%20keywords%20bidding%20campaign%20analytics%20modern%20clean%20interface%20professional%20marketing%20digital&width=1200&height=630&seq=blog003&orientation=landscape',
    tags: ['Google Ads', 'quang cao Google', 'tu khoa', 'doanh nghiep nho'],
    metaDescription: 'Huong dan chay Google Ads cho doanh nghiep nho 2025. Cach chon tu khoa hieu qua, viet quang cao va toi uu ngan sach de tang doanh thu voi chi phi thap nhat.',
    excerpt: 'Huong dan chi tiet chay Google Ads cho doanh nghiep nho voi ngan sach han che. Cach chon tu khoa, viet quang cao va toi uu chien dich de dat ROI cao nhat.',
    sections: [
      { type: 'heading', text: 'Tai Sao Google Ads Phu Hop Cho Doanh Nghiep Nho?' },
      { type: 'paragraph', text: 'Voi Google Ads, khach hang chu dong tim ban - khong phai ban di tim ho. Day la loi the lon nhat so voi Facebook Ads. Ban chi tra tien khi co nguoi click vao quang cao.' },
      { type: 'heading', text: 'Cac Loai Chien Dich Google Ads' },
      { type: 'list', items: ['Search Ads: Xuat hien khi co nguoi tim kiem tu khoa lien quan', 'Google Maps / Local Ads: Thiet yeu cho cua hang offline, nha hang, spa', 'Display Network: Hien thi banner tren hang trieu website, tot cho remarketing'] },
      { type: 'heading', text: 'Cach Chon Tu Khoa Hieu Qua' },
      { type: 'paragraph', text: 'Doanh nghiep nho nen tap trung vao long-tail keywords va dia ly cu the de tiet kiem ngan sach. Vi du: thay vi chon "thiet ke website" (dat), hay chon "thiet ke website ban hang tai TP.HCM" (re hon, chuyen doi cao hon).' },
      { type: 'highlight', text: 'Quality Score anh huong truc tiep den vi tri va CPC. Cach tang: Landing page phu hop, CTR cao, thoi gian o lai trang lau.' },
    ],
  },
  {
    id: 'bp4',
    slug: 'landing-page-ti-le-chuyen-doi-cao',
    title: 'Thiet Ke Landing Page Ty Le Chuyen Doi Cao - 9 Yeu To Khong The Thieu',
    category: 'Thiet Ke Website',
    author: 'Pham Thu Ha',
    authorAvatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20female%20UX%20designer%20professional%20portrait%20friendly%20smile%20modern%20office%20clean%20background%20headshot%20natural%20lighting&width=100&height=100&seq=auth004&orientation=squarish',
    publishedAt: '2025-02-10',
    readTime: 6,
    image: 'https://readdy.ai/api/search-image?query=landing%20page%20design%20high%20conversion%20rate%20marketing%20funnel%20modern%20clean%20minimal%20professional%20call%20to%20action%20button%20form%20lead%20generation%20digital&width=1200&height=630&seq=blog004&orientation=landscape',
    tags: ['landing page', 'ty le chuyen doi', 'thiet ke web', 'CRO'],
    metaDescription: '9 yeu to thiet ke landing page co ty le chuyen doi cao nhat 2025. Tu headline, hero section den form lead capture va social proof giup toi uu ROI quang cao.',
    excerpt: 'Landing page tot co the tang ty le chuyen doi len 5-10%. Kham pha 9 yeu to thiet ke landing page hieu qua, giup toi da hoa ROI tu ngan sach quang cao.',
    sections: [
      { type: 'heading', text: 'Landing Page - Vu Khi Bi Mat Cua Marketing Online' },
      { type: 'paragraph', text: 'Su khac biet giua landing page tot va te co the la ty le chuyen doi 1% so voi 10%. Nghia la cung ngan sach quang cao, doanh thu cua ban co the tang 10 lan.' },
      { type: 'heading', text: '9 Yeu To Thiet Ke Landing Page Hieu Qua' },
      { type: 'list', items: ['Headline ro rang va compelling - tra loi "Toi duoc gi tu dieu nay?"', 'Hero Section an tuong - hinh anh/video chat luong cao, CTA button noi bat', 'Diem loi ich cu the - Benefits, not Features', 'Social Proof manh - so lieu, testimonial, logo khach hang', 'Urgency & Scarcity - countdown timer, limited offer', 'Form Lead Capture toi uu - cang it truong cang tot', 'Trust Signals - SSL, logo doi tac, chinh sach hoan tien', 'Mobile Optimization - tai trong 3 giay tren 4G', 'Clear Single CTA - mot muc tieu duy nhat'] },
      { type: 'highlight', text: 'A/B Testing sau khi tao landing page: Test headline, button color, hinh hero, vi tri form. Ngay ca thay doi nho cung co the tang conversion 20-30%.' },
    ],
  },
  {
    id: 'bp5',
    slug: 'website-homestay-tang-dat-phong-truc-tiep',
    title: 'Website Homestay 2025 - Bi Quyet Tang 300% Dat Phong Truc Tiep',
    category: 'Kinh Nghiem Thuc Te',
    author: 'Nguyen Thi Mai',
    authorAvatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20businesswoman%20hospitality%20tourism%20professional%20portrait%20friendly%20smile%20modern%20office%20background%20headshot%20natural%20clean&width=100&height=100&seq=auth005&orientation=squarish',
    publishedAt: '2025-01-28',
    readTime: 9,
    image: 'https://readdy.ai/api/search-image?query=beautiful%20homestay%20Dalat%20mountains%20booking%20website%20design%20professional%20modern%20clean%20interface%20room%20gallery%20booking%20calendar%20elegant%20Vietnamese%20tourism&width=1200&height=630&seq=blog005&orientation=landscape',
    tags: ['website homestay', 'dat phong truc tiep', 'Booking.com', 'khach san online'],
    metaDescription: 'Cach xay dung website homestay chuyen nghiep va tang dat phong truc tiep len 300%, giam phu thuoc vao Booking.com. Kinh nghiem thuc te tu chu homestay thanh cong.',
    excerpt: 'Thoat khoi le thuoc vao Booking.com voi hoa hong 15-20%. Xay dung website homestay chuyen nghiep va chien luoc marketing giup tang dat phong truc tiep gap 3.',
    sections: [
      { type: 'heading', text: 'Van De Cua Homestay: Hoa Hong OTA Ngay Cang Cao' },
      { type: 'paragraph', text: 'Neu ban dang kinh doanh homestay va phu thuoc hoan toan vao Booking.com, Airbnb, hay Agoda - ban dang tra 15-20% hoa hong cho moi dat phong. Voi doanh thu 50 trieu/thang, do la 7.5-10 trieu ban dang bieu khong cho nen tang.' },
      { type: 'heading', text: 'Case Study: Homestay Dalat KeyStay' },
      { type: 'paragraph', text: 'Truoc khi co website rieng: 90% dat phong qua OTA, hoa hong 8-10 trieu/thang. Sau 6 thang voi website + quang cao: 60% dat phong truc tiep, tiet kiem 6-8 trieu hoa hong/thang.' },
      { type: 'heading', text: '7 Tinh Nang Khong The Thieu Cua Website Homestay' },
      { type: 'list', items: ['He thong dat phong truc tuyen - Calendar availability real-time', 'Gallery anh phong chuyen nghiep - 15-20 anh moi phong', 'Trang Review va Danh gia - tich hop Google, Booking.com', 'Trang Kham Pha Dia Phuong - tang SEO tu khoa du lich', 'Uu dai dat truc tiep - giam 10% khi dat qua website', 'Chat truc tuyen / Zalo OA - tang chuyen doi 25-30%', 'SEO dia phuong - "homestay Da Lat view dep", "homestay Da Lat gia re"'] },
      { type: 'highlight', text: 'Website homestay + chien luoc marketing dung = thoat khoi le thuoc OTA va tang loi nhuan dang ke. Lien he WebAgency de nhan tu van mien phi!' },
    ],
  },
  {
    id: 'bp6',
    slug: 'tiktok-ads-xu-huong-quang-cao-2025',
    title: 'TikTok Ads 2025 - Xu Huong Quang Cao Viral & Chien Luoc Trien Khai',
    category: 'Quang Cao Online',
    author: 'Dang Minh Tuan',
    authorAvatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20young%20male%20TikTok%20content%20creator%20digital%20marketing%20professional%20portrait%20smiling%20modern%20office%20background%20headshot&width=100&height=100&seq=auth006&orientation=squarish',
    publishedAt: '2025-01-15',
    readTime: 8,
    image: 'https://readdy.ai/api/search-image?query=TikTok%20advertising%20campaign%20phone%20screen%20viral%20video%20content%20creator%20young%20audience%20brand%20promotion%20modern%20digital%20marketing%20social%20media%20strategy&width=1200&height=630&seq=blog006&orientation=landscape',
    tags: ['TikTok Ads', 'quang cao TikTok', 'video marketing', 'xu huong 2025'],
    metaDescription: 'TikTok Ads 2025 - Huong dan trien khai chien luoc quang cao TikTok hieu qua cho doanh nghiep Viet Nam. Chi phi thap hon 40% so voi Facebook, ty le tiep can cao hon.',
    excerpt: 'TikTok khong con chi cho gioi tre. Kham pha cach doanh nghiep Viet dang dung TikTok Ads de tang doanh so bung no voi chi phi thap hon Facebook 40%.',
    sections: [
      { type: 'heading', text: 'TikTok Da Thay Doi Cach Nguoi Viet Mua Sam' },
      { type: 'paragraph', text: 'Voi hon 40 trieu nguoi dung TikTok tai Viet Nam, 49% nguoi dung TikTok da mua san pham ho thay tren TikTok - cao hon dang ke so voi Facebook 36% hay Instagram 43%.' },
      { type: 'heading', text: 'Cac Dinh Dang TikTok Ads Quan Trong' },
      { type: 'list', items: ['In-Feed Ads: Xuat hien trong feed, tu dong phat khi scroll, ho tro CTA button', 'TopView Ads: Quang cao dau tien nguoi dung thay khi mo app, ty le xem cao nhat', 'Branded Hashtag Challenge: Tao trend voi hashtag rieng, khuyen khich UGC', 'Spark Ads: Boost noi dung organic hoac KOL/KOC, natural feel'] },
      { type: 'heading', text: 'Cong Thuc Video TikTok Ads Hieu Qua' },
      { type: 'paragraph', text: '3 giay dau quyet dinh song con. Hook phai gay shock hoac tao curiosity gap. Cau truc video: 0-3s Hook -> 3-10s Problem -> 10-20s Solution -> 20-30s Social Proof + CTA.' },
      { type: 'highlight', text: 'TikTok Shop dang thay doi cach nguoi Viet mua sam voi live shopping, tich hop thanh toan trong app va KOC/Affiliate marketing tu nhien. Day la luc tot nhat de bat dau!' },
    ],
  },
];
