import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { ContactPage, AboutPage, AdvertisementsPage } from './pages/StaticPages';
import { AdminGuard } from './components/auth/AdminGuard';
import LoginPage from './pages/LoginPage';
import ArticleDetail from './pages/ArticleDetail';
import ScrollToTop from './components/ScrollToTop';

// Urdu Admin Components
import AdminLayout from './components/admin/AdminLayout';
import UrduAdminDashboard from './pages/admin/UrduAdminDashboard';
import UrduPostEditor from './pages/admin/UrduPostEditor';
import AddNews from './pages/admin/AddNews';
import ManageNews from './pages/admin/ManageNews';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout><Home /></Layout>} path="/" />

        {/* News Categories */}
        <Route element={<Layout><CategoryPage category="World News" title="عالمی خبریں" /></Layout>} path="/world" />
        <Route element={<Layout><CategoryPage category="National News" title="قومی خبریں" /></Layout>} path="/national" />
        <Route element={<Layout><CategoryPage category="Deccan News" title="دکن نیوز" /></Layout>} path="/deccan" />
        <Route element={<Layout><CategoryPage category="Articles & Essays" title="مضامین اور مقالہ جات" /></Layout>} path="/articles-essays" />
        <Route element={<Layout><CategoryPage category="Sports & Entertainment" title="کھیل اور تفریح" /></Layout>} path="/sports-entertainment" />
        <Route element={<Layout><CategoryPage category="Crime & Accidents" title="جرائم اور حادثات" /></Layout>} path="/crime-accidents" />

        {/* Static Pages */}
        <Route element={<Layout><AdvertisementsPage /></Layout>} path="/advertisements" />
        <Route element={<Layout><ContactPage /></Layout>} path="/contact" />
        <Route element={<Layout><AboutPage /></Layout>} path="/about-us" />

        {/* Utility Routes */}
        <Route element={<Layout><LoginPage /></Layout>} path="/login" />
        <Route element={<Layout><ArticleDetail /></Layout>} path="/news/:id" />

        {/* Dedicated Urdu Admin Section */}
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<ManageNews />} />
          <Route path="add-news" element={<AddNews />} />
          <Route path="manage" element={<ManageNews />} />
          <Route path="dashboard" element={<UrduAdminDashboard />} />
          <Route path="editor" element={<UrduPostEditor />} />
          <Route path="editor/:id" element={<UrduPostEditor />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

