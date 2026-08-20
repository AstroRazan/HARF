import React, { useState, useEffect } from 'react';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import LibraryPage from './pages/LibraryPage';
import MyLibraryPage from './pages/MyLibraryPage';
import CommunitiesPage from './pages/CommunitiesPage';
import { getSessionUser } from './data/store';

export default function App() {
  // Navigation view state (no routing library)
  const [view, setView] = useState({ name: 'home' });

  // Auth modal & session state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const user = await getSessionUser();
      setCurrentUser(user);
    }
    loadUser();
  }, []);

  const showToast = (message = 'تم بنجاح') => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const handleAuthSuccess = ({ tab, name }) => {
    showToast('تم تسجيل الدخول بنجاح');
    setCurrentUser((prev) => ({
      ...(prev || {}),
      name: name || 'أحمد يوسف'
    }));
  };

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  return (
    <div className="min-h-screen bg-[#FDF8F0] text-[#2B2B26] flex flex-col w-full">
      {/* 1. Dismissible Top Banner (Full-bleed with max-w-7xl inner container) */}
      <TopBanner />

      {/* 2. Top Bar & Wordmark (Full-bleed with max-w-7xl inner container) */}
      <Navbar
        currentView={view}
        setView={setView}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
      />

      {/* 3. Page Body (Full-bleed container with max-w-7xl centered content) */}
      <main className="flex-1 w-full pb-16 md:pb-8">
        {view.name === 'home' && (
          <HomePage
            setView={setView}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {view.name !== 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {view.name === 'book' && (
              <BookDetailPage
                bookId={view.bookId}
                setView={setView}
                showToast={showToast}
              />
            )}

            {view.name === 'library' && (
              <LibraryPage
                setView={setView}
                showToast={showToast}
              />
            )}

            {view.name === 'my-library' && (
              <MyLibraryPage
                setView={setView}
                showToast={showToast}
              />
            )}

            {view.name === 'communities' && (
              <CommunitiesPage
                setView={setView}
                showToast={showToast}
              />
            )}
          </div>
        )}
      </main>

      {/* 4. Mobile Bottom Navigation Tab Bar */}
      <BottomNav currentView={view} setView={setView} />

      {/* 5. Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* 6. Floating Demo Toast */}
      <Toast
        message={toastMessage}
        visible={toastVisible}
        type="info"
      />
    </div>
  );
}
