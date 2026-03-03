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

        {/* Dynamic News Categories */}
        <Route element={<Layout><CategoryPage /></Layout>} path="/category/:categoryName" />
        <Route element={<Layout><CategoryPage /></Layout>} path="/category/:categoryName/:subCategory" />

        {/* Legacy redirects for old URLs */}
        <Route element={<Navigate to="/category/عالمی خبریں" replace />} path="/world" />
        <Route element={<Navigate to="/category/قومی خبریں" replace />} path="/national" />
        <Route element={<Navigate to="/category/حیدرآباد" replace />} path="/hyderabad" />
        <Route element={<Navigate to="/category/تلنگانہ" replace />} path="/telangana" />
        <Route element={<Navigate to="/category/آندھرا پردیش" replace />} path="/andhra-pradesh" />
        <Route element={<Navigate to="/category/حیدرآباد" replace />} path="/deccan" />
        <Route element={<Navigate to="/category/تصویریں" replace />} path="/photos" />
        <Route element={<Navigate to="/category/ویڈیوز" replace />} path="/videos" />
        <Route element={<Navigate to="/category/مضامین اور مقالہ جات" replace />} path="/articles-essays" />
        <Route element={<Navigate to="/category/کھیل اور تفریح" replace />} path="/sports-entertainment" />
        <Route element={<Navigate to="/category/جرائم اور حادثات" replace />} path="/crime-accidents" />



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

