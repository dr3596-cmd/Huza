import { Phone, MapPin, Star, Award, User, Calendar, Users } from 'lucide-react';
import { useState } from 'react';

interface Review {
  id: string;
  employerName: string;
  employerPhone: string;
  rating: number;
  comment: string;
  date: string;
}

interface Worker {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  category: string;
  location: string;
  phone: string;
  experience: string;
  rating: number;
  verified: boolean;
  skills: string[];
  reviews: Review[];
  totalReviews: number;
}

interface WorkerCardProps {
  worker: Worker;
  language: 'rw' | 'en';
}

const translations = {
  rw: {
    contact: 'Hamagara',
    experience: 'Uburambe',
    verified: 'Byemejwe - 1,000 RWF',
    skills: 'Ubumenyi',
    age: 'Imyaka',
    gender: 'Igitsina',
    male: 'Gabo',
    female: 'Gore',
    reviews: 'Ibitekerezo',
    viewReviews: 'Reba ibitekerezo',
    hideReviews: 'Hisha ibitekerezo',
    reference: 'Aho yakoze',
    contactReference: 'Hamagara',
    getVerified: 'Emeza umwirondoro - 1,000 RWF',
  },
  en: {
    contact: 'Contact',
    experience: 'Experience',
    verified: 'Verified - 1,000 RWF',
    skills: 'Skills',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    reviews: 'Reviews',
    viewReviews: 'View Reviews',
    hideReviews: 'Hide Reviews',
    reference: 'Previous Employer',
    contactReference: 'Contact Reference',
    getVerified: 'Get Verified - 1,000 RWF',
  }
};

export default function WorkerCard({ worker, language }: WorkerCardProps) {
  const t = translations[language];
  const [showReviews, setShowReviews] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {worker.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg text-gray-900">{worker.name}</h3>
            {worker.verified && (
              <div className="relative group">
                <Award className="w-5 h-5 text-blue-600 fill-blue-600 cursor-help" />
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {t.verified}
                </div>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-1">{worker.category}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < worker.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({worker.totalReviews})</span>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">{t.age}</p>
            <p className="font-medium text-gray-900">{worker.age} {language === 'en' ? 'years' : 'imyaka'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">{t.gender}</p>
            <p className="font-medium text-gray-900">
              {worker.gender === 'Female' ? t.female : t.male}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{worker.location}</span>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">{t.experience}:</span> {worker.experience}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">{t.skills}:</p>
        <div className="flex flex-wrap gap-1">
          {worker.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-4">
        <button
          onClick={() => setShowReviews(!showReviews)}
          className="flex items-center justify-between w-full px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <span className="text-sm font-medium text-blue-700">
            {showReviews ? t.hideReviews : t.viewReviews} ({worker.totalReviews})
          </span>
          <Star className="w-4 h-4 text-blue-700" />
        </button>

        {showReviews && (
          <div className="mt-3 space-y-3 max-h-60 overflow-y-auto">
            {worker.reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{review.employerName}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <Users className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500">{t.reference}:</span>
                  <a
                    href={`tel:${review.employerPhone}`}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    {review.employerPhone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!worker.verified && (
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800 mb-2">
            {language === 'en'
              ? 'Stand out with a verified badge! Employers trust verified workers more.'
              : 'Garagara hamwe n\'ikimenyetso cyemejwe! Abakorera bemeranya abakozi bemejwe.'}
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
            {t.getVerified}
          </button>
        </div>
      )}

      <a
        href={`tel:${worker.phone}`}
        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
      >
        <Phone className="w-4 h-4" />
        <span>{t.contact}</span>
      </a>
    </div>
  );
}
