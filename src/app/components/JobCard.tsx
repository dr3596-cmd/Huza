import { MapPin, Phone, Clock, DollarSign } from 'lucide-react';

interface Job {
  id: string;
  title: {
    en: string;
    rw: string;
  };
  category: string;
  location: string;
  salary: string;
  phone: string;
  description: {
    en: string;
    rw: string;
  };
  postedDate: string;
  urgent: boolean;
}

interface JobCardProps {
  job: Job;
  language: 'rw' | 'en';
}

const translations = {
  rw: {
    contact: 'Hamagara',
    posted: 'Yashizwe',
    urgent: 'BYIHUTIRWA',
  },
  en: {
    contact: 'Contact',
    posted: 'Posted',
    urgent: 'URGENT',
  }
};

export default function JobCard({ job, language }: JobCardProps) {
  const t = translations[language];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{job.title[language]}</h3>
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
            {job.category}
          </span>
        </div>
        {job.urgent && (
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
            {t.urgent}
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description[language]}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{t.posted} {job.postedDate}</span>
        </div>
      </div>

      <a
        href={`tel:${job.phone}`}
        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
      >
        <Phone className="w-4 h-4" />
        <span>{t.contact}</span>
      </a>
    </div>
  );
}
