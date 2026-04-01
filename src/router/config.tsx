import { RouteObject } from 'react-router-dom';
import HomePage from '@/pages/home/page';
import TemplatesPage from '@/pages/templates/page';
import AdminPage from '@/pages/admin/page';
import BlogPage from '@/pages/blog/page';
import BlogPostPage from '@/pages/blog/post/page';
import DemoBanHang from '@/pages/demo/ban-hang/page';
import DemoKhachSan from '@/pages/demo/khach-san/page';
import DemoNhaHang from '@/pages/demo/nha-hang/page';
import DemoCongTy from '@/pages/demo/cong-ty/page';
import DemoLandingPage from '@/pages/demo/landing-page/page';
import DemoSpa from '@/pages/demo/spa/page';
import DemoCafe from '@/pages/demo/cafe/page';
import DemoDienTu from '@/pages/demo/dien-tu/page';
import DemoPhongKham from '@/pages/demo/phong-kham/page';
import DemoGym from '@/pages/demo/gym/page';
import DemoGiaoDuc from '@/pages/demo/giao-duc/page';
import DemoHaiSan from '@/pages/demo/hai-san/page';
import NotFound from '@/pages/NotFound';

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/templates', element: <TemplatesPage /> },
  { path: '/admin', element: <AdminPage /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/blog/:slug', element: <BlogPostPage /> },
  { path: '/demo/ban-hang', element: <DemoBanHang /> },
  { path: '/demo/khach-san', element: <DemoKhachSan /> },
  { path: '/demo/nha-hang', element: <DemoNhaHang /> },
  { path: '/demo/cong-ty', element: <DemoCongTy /> },
  { path: '/demo/landing-page', element: <DemoLandingPage /> },
  { path: '/demo/spa', element: <DemoSpa /> },
  { path: '/demo/cafe', element: <DemoCafe /> },
  { path: '/demo/dien-tu', element: <DemoDienTu /> },
  { path: '/demo/phong-kham', element: <DemoPhongKham /> },
  { path: '/demo/gym', element: <DemoGym /> },
  { path: '/demo/giao-duc', element: <DemoGiaoDuc /> },
  { path: '/demo/hai-san', element: <DemoHaiSan /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
