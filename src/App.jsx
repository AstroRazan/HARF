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

  const showToast = (message = 'بيانات تجريبية — لم يتم الحفظ') => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const handleAuthSuccess = ({ tab, name }) => {
    showToast('بيانات تجريبية — تم بدء الجلسة');
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
    <div className="min-h-screen bg-[#F2EBE0] text-[#2C2C2A] py-0 md:py-6 px-0 md:px-4 lg:px-6 flex flex-col items-center">
      {/* Main Rounded App Container (24px radius on md+, sitting on darker backdrop) */}
      <div className="w-full max-w-5xl bg-[#FAF7F2] md:rounded-[24px] md:border md:border-[#E5DFD5] md:shadow-sm min-h-screen md:min-h-[92vh] flex flex-col overflow-hidden relative pb-16 md:pb-8">
        {/* 1. Dismissible Top Banner */}
        <TopBanner />

        {/* 2. Top Bar & Wordmark */}
        <Navbar
          currentView={view}
          setView={setView}
          onOpenAuth={() => setIsAuthOpen(true)}
          currentUser={currentUser}
        />

        {/* 3. Page Body (One Job Per Page) */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 max-w-5xl mx-auto w-full">
          {view.name === 'home' && (
            <HomePage setView={setView} />
          )}

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
    </div>
  );
}
