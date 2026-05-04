import { useState } from 'react';
import { X, Bell, ChevronDown } from 'lucide-react';
import { getDistrictNames, getSectorsByDistrict } from '../data/rwandaLocations';

interface PostJobFormProps {
  language: 'rw' | 'en';
  onClose: () => void;
  onSubmit: (job: {
    title: { en: string; rw: string };
    category: string;
    location: string;
    salary: string;
    phone: string;
    description: { en: string; rw: string };
    urgent: boolean;
  }) => void;
}

const translations = {
  rw: {
    title: 'Shyira akazi kashya',
    jobTitle: 'Izina ry\'akazi',
    category: 'Icyiciro',
    location: 'Ahantu',
    salary: 'Umushahara',
    description: 'Ibisobanuro',
    phone: 'Telefone',
    ussdNotif: 'Emeza kuri USSD (*182*7#)',
    urgent: 'Byihutirwa',
    submit: 'Ohereza',
    cancel: 'Hagarika',
    selectCategory: 'Hitamo icyiciro',
    housemaid: 'Umukozi w\'imuryango',
    plumber: 'Umucukuzi w\'amazi',
    hairdresser: 'Abakora imisatsi',
    electrician: 'Ukora amashanyarazi',
    cook: 'Umutetsi',
    district: 'Akarere',
    sector: 'Umurenge',
    selectDistrict: 'Hitamo akarere',
    selectSector: 'Hitamo umurenge',
  },
  en: {
    title: 'Post a New Job',
    jobTitle: 'Job Title',
    category: 'Category',
    location: 'Location',
    salary: 'Salary (RWF)',
    description: 'Description',
    phone: 'Phone Number',
    ussdNotif: 'Enable USSD Notifications (*182*7#)',
    urgent: 'Mark as Urgent',
    submit: 'Post Job',
    cancel: 'Cancel',
    selectCategory: 'Select category',
    housemaid: 'Housekeeper',
    plumber: 'Plumber',
    hairdresser: 'Hairdresser',
    electrician: 'Electrician',
    cook: 'Cook',
    district: 'District',
    sector: 'Sector',
    selectDistrict: 'Select district',
    selectSector: 'Select sector',
  }
};

export default function PostJobForm({ language, onClose, onSubmit }: PostJobFormProps) {
  const t = translations[language];
  const [ussdEnabled, setUssdEnabled] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [category, setCategory] = useState('');
  const [salary, setSalary] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const districts = getDistrictNames(language);
  const sectors = selectedDistrict ? getSectorsByDistrict(selectedDistrict, language) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newJob = {
      title: {
        en: jobTitle,
        rw: jobTitle, // In a real app, this would be translated
      },
      category,
      location: `${selectedDistrict}, ${selectedSector}`,
      salary: `${salary} RWF`,
      phone,
      description: {
        en: description,
        rw: description, // In a real app, this would be translated
      },
      urgent,
    };

    onSubmit(newJob);
    alert(language === 'en' ? 'Job posted successfully!' : 'Akazi kashizwe neza!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{t.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.jobTitle}
            </label>
            <input
              type="text"
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder={language === 'en' ? 'e.g. Experienced Housekeeper Needed' : 'Urugero: Umukozi w\'imuryango ufite uburambe'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.category}
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">{t.selectCategory}</option>
              <option value="Housemaid">{t.housemaid}</option>
              <option value="Plumber">{t.plumber}</option>
              <option value="Hairdresser">{t.hairdresser}</option>
              <option value="Electrician">{t.electrician}</option>
              <option value="Cook">{t.cook}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.district}
              </label>
              <div className="relative">
                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedSector('');
                  }}
                  required
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
                >
                  <option value="">{t.selectDistrict}</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.sector}
              </label>
              <div className="relative">
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  disabled={!selectedDistrict}
                  required
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">{t.selectSector}</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.salary}
            </label>
            <input
              type="text"
              required
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="50,000 - 100,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.phone}
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="+250 7XX XXX XXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.description}
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder={language === 'en' ? 'Describe the job requirements...' : 'Sobanura ibisabwa...'}
            />
          </div>

          <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={ussdEnabled}
                onChange={(e) => setUssdEnabled(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">{t.ussdNotif}</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={urgent}
                onChange={(e) => setUrgent(e.target.checked)}
                className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
              />
              <span className="text-sm font-medium text-gray-900">{t.urgent}</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              {t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
