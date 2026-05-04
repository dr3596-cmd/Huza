import { Briefcase, Wrench, Scissors, Users, Zap, ChefHat } from 'lucide-react';

interface CategoryFilterProps {
  language: 'rw' | 'en';
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const translations = {
  rw: {
    all: 'Byose',
    housemaid: 'Abakozi b\'imiryango',
    plumber: 'Abacukuzi b\'amazi',
    hairdresser: 'Abakora imisatsi',
    electrician: 'Abakora amashanyarazi',
    cook: 'Abatetsi',
  },
  en: {
    all: 'All Categories',
    housemaid: 'Housekeepers',
    plumber: 'Plumbers',
    hairdresser: 'Hairdressers',
    electrician: 'Electricians',
    cook: 'Cooks',
  }
};

export default function CategoryFilter({ language, activeCategory, onCategoryChange }: CategoryFilterProps) {
  const t = translations[language];

  const categories = [
    { id: 'all', label: t.all, icon: Users },
    { id: 'housemaid', label: t.housemaid, icon: Briefcase },
    { id: 'plumber', label: t.plumber, icon: Wrench },
    { id: 'hairdresser', label: t.hairdresser, icon: Scissors },
    { id: 'electrician', label: t.electrician, icon: Zap },
    { id: 'cook', label: t.cook, icon: ChefHat },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onCategoryChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeCategory === id
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
