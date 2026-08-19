import React from 'react';
import { Home, Compass, Bookmark, Users } from 'lucide-react';

export default function BottomNav({ currentView, setView }) {
  const tabs = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'library', label: 'المكتبة', icon: Compass },
    { id: 'my-library', label: 'مكتبتي', icon: Bookmark },
    { id: 'communities', label: 'المجتمعات', icon: Users }
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E5DFD5] py-1.5 px-2 safe-area-pb"
      aria-label="التنقل عبر الهاتف"
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentView.name === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setView({ name: tab.id })}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-[#C0703A] font-semibold'
                  : 'text-[#8A8681] hover:text-[#2C2C2A]'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
              <span className="text-[11px] leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
