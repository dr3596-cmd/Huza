import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { getDistrictNames, getSectorsByDistrict } from '../data/rwandaLocations';

interface LocationFilterProps {
  language: 'rw' | 'en';
  selectedDistrict: string;
  selectedSector: string;
  onDistrictChange: (district: string) => void;
  onSectorChange: (sector: string) => void;
}

const translations = {
  rw: {
    selectDistrict: 'Hitamo akarere',
    selectSector: 'Hitamo umurenge',
    allDistricts: 'Uturere twose',
    allSectors: 'Imirenge yose',
  },
  en: {
    selectDistrict: 'Select District',
    selectSector: 'Select Sector',
    allDistricts: 'All Districts',
    allSectors: 'All Sectors',
  }
};

export default function LocationFilter({
  language,
  selectedDistrict,
  selectedSector,
  onDistrictChange,
  onSectorChange,
}: LocationFilterProps) {
  const t = translations[language];
  const districts = getDistrictNames(language);
  const sectors = selectedDistrict ? getSectorsByDistrict(selectedDistrict, language) : [];

  const handleDistrictChange = (district: string) => {
    onDistrictChange(district);
    onSectorChange(''); // Reset sector when district changes
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <select
          value={selectedDistrict}
          onChange={(e) => handleDistrictChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
        >
          <option value="">{t.allDistricts}</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      <div className="flex-1 relative">
        <select
          value={selectedSector}
          onChange={(e) => onSectorChange(e.target.value)}
          disabled={!selectedDistrict}
          className="w-full px-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">{t.allSectors}</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
