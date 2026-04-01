# WebAgency - Dịch Vụ Thiết Kế Website & Chạy Quảng Cáo

## 1. Mô Tả Dự Án
Một website marketing chuyên nghiệp cho dịch vụ thiết kế website và chạy quảng cáo (Facebook/Google/TikTok). Phong cách hiện đại tech, màu xanh + trắng. Mục tiêu thu hút doanh nghiệp Việt Nam sử dụng dịch vụ.

**Đối tượng:** Doanh nghiệp vừa và nhỏ, cá nhân kinh doanh tại Việt Nam  
**Giá trị cốt lõi:** Chuyên nghiệp, hiệu quả, uy tín

## 2. Cấu Trúc Trang
- `/` - Trang chủ (tổng hợp tất cả sections)
- `/templates` - Kho mẫu website  
- `/admin` - Admin Panel (quản trị nội dung)

## 3. Tính Năng Chính
- [x] Trang chủ: Hero banner, services, pricing, testimonials, form tư vấn
- [x] Kho mẫu website: Library template có filter theo danh mục
- [x] Form đăng ký tư vấn miễn phí
- [x] Nút liên hệ nhanh (Zalo, điện thoại)
- [x] Admin Panel: Chỉnh sửa nội dung website qua giao diện trực quan
- [ ] (Tương lai) Kết nối Supabase để quản lý data thực

## 4. Hệ Thống Admin
- Xác thực bằng password (localStorage)
- Chỉnh sửa: hero text, services, templates, pricing, testimonials, ảnh, contact
- Lưu dữ liệu vào localStorage (không cần backend)
- Giao diện admin đầy đủ chức năng

## 5. Tích Hợp Backend / Third-party
- Supabase: Chưa kết nối (Phase tương lai - để lưu data thực)
- Form: Readdy Form API (https://readdy.ai/api/form/d75qvecbmgf2o8mm6rn0)
- Zalo/Phone: Link trực tiếp

## 6. Kế Hoạch Phát Triển

### Phase 1: Trang Chủ + Core (HIỆN TẠI)
- Mục tiêu: Xây dựng toàn bộ trang chủ + routing
- Deliverable: Homepage đầy đủ, Kho mẫu, Admin Panel cơ bản

### Phase 2 (Tương lai): Kết nối Supabase
- Mục tiêu: Lưu data thực vào database
- Deliverable: Form submissions, quản lý content từ DB

### Phase 3 (Tương lai): Mở rộng
- Trang dịch vụ chi tiết, blog, portfolio
