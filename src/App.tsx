import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { ContactPage, AboutPage, AdvertisementsPage, GuestColumnsPage, PrivacyPolicyPage, TermsOfUsePage } from './pages/StaticPages';
import LoginPage from './pages/LoginPage';
import ArticleDetail from './pages/ArticleDetail';
import { SearchPage } from './pages/SearchPage';
import { LivePage } from './pages/LivePage';
import ScrollToTop from './components/ScrollToTop';

// Urdu Admin Components
import AdminLayout from './components/admin/AdminLayout';
import UrduAdminDashboard from './pages/admin/UrduAdminDashboard';
import UrduPostEditor from './pages/admin/UrduPostEditor';
import AddNews from './pages/admin/AddNews';
import ManageNews from './pages/admin/ManageNews';
import AdsManagement from './pages/admin/AdsManagement';
import ManageCategories from './pages/admin/ManageCategories';
import { AdminGuard } from './components/auth/AdminGuard';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout><Home /></Layout>} path="/" />

        {/* News Categories */}
        <Route element={<Layout><CategoryPage category="عالمی خبریں" title="عالمی خبریں" /></Layout>} path="/world" />
        <Route element={<Layout><CategoryPage category="قومی خبریں" title="قومی خبریں" /></Layout>} path="/national" />
        <Route element={<Layout><CategoryPage category="حیدرآباد" title="حیدرآباد" /></Layout>} path="/hyderabad" />
        <Route element={<Layout><CategoryPage category="تلنگانہ" title="تلنگانہ" /></Layout>} path="/telangana" />
        <Route element={<Layout><CategoryPage category="آندھرا پردیش" title="آندھرا پردیش" /></Layout>} path="/andhra-pradesh" />
        {/* Legacy deccan route — keep for backward compat */}
        <Route element={<Layout><CategoryPage category="حیدرآباد" title="حیدرآباد" /></Layout>} path="/deccan" />
        <Route element={<Layout><CategoryPage category="تصویریں" title="تصویریں" /></Layout>} path="/photos" />
        <Route element={<Layout><CategoryPage category="ویڈیوز" title="ویڈیوز" /></Layout>} path="/videos" />
        <Route element={<Layout><CategoryPage category="مضامین اور مقالہ جات" title="مضامین اور مقالہ جات" /></Layout>} path="/articles-essays" />
        <Route element={<Layout><CategoryPage category="کھیل اور تفریح" title="کھیل اور تفریح" /></Layout>} path="/sports-entertainment" />
        <Route element={<Layout><CategoryPage category="جرائم اور حادثات" title="جرائم اور حادثات" /></Layout>} path="/crime-accidents" />


        {/* Static Pages */}
        <Route element={<Layout><AdvertisementsPage /></Layout>} path="/advertisements" />
        <Route element={<Layout><ContactPage /></Layout>} path="/contact" />
        <Route element={<Layout><AboutPage /></Layout>} path="/about-us" />
        <Route element={<Layout><GuestColumnsPage /></Layout>} path="/guest-columns" />
        <Route element={<Layout><PrivacyPolicyPage /></Layout>} path="/privacy-policy" />
        <Route element={<Layout><TermsOfUsePage /></Layout>} path="/terms-of-use" />

        {/* Utility Routes */}
        <Route element={<Layout><LoginPage /></Layout>} path="/login" />
        <Route element={<Layout><ArticleDetail /></Layout>} path="/news/:id" />
        <Route element={<Layout><SearchPage /></Layout>} path="/search" />
        <Route element={<Layout><LivePage /></Layout>} path="/live" />

        {/* Dedicated Urdu Admin Section */}
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<UrduAdminDashboard />} />
          <Route path="add-news" element={<AddNews />} />
          <Route path="manage" element={<ManageNews />} />
          <Route path="ads" element={<AdsManagement />} />
          <Route path="editor" element={<UrduPostEditor />} />
          <Route path="editor/:id" element={<UrduPostEditor />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="settings" element={<div className="p-8 text-right font-serif">کنفیگریشن ماڈیول جلد آ رہا ہے...</div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

