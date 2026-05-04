import { useState } from 'react';
import { Search, Globe, Menu } from 'lucide-react';

interface HeaderProps {
  language: 'rw' | 'en';
  setLanguage: (lang: 'rw' | 'en') => void;
}

const translations = {
  rw: {
    title: 'HUZA',
    search: 'Shakisha akazi...',
    postJob: 'Shyira akazi',
    findWorkers: 'Shakisha abakozi',
  },
  en: {
    title: 'HUZA',
    search: 'Search for jobs...',
    postJob: 'Post Job',
    findWorkers: 'Find Workers',
  }
};

export default function Header({ language, setLanguage }: HeaderProps) {
  const t = translations[language];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {language === 'en' ? 'Kinyarwanda' : 'English'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
