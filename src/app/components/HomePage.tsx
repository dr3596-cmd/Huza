import { Search, Users, Briefcase, Shield, Phone, Mail, ArrowRight, Globe, UserPlus, FileText, CheckCircle, Smartphone } from 'lucide-react';

interface HomePageProps {
  language: 'rw' | 'en';
  setLanguage: (lang: 'rw' | 'en') => void;
  onEnterApp: () => void;
}

const translations = {
  rw: {
    hero: {
      title: 'Murakaza neza kuri HUZA',
      subtitle: 'Urubuga ruhuza abashaka akazi n\'abakozi b\'imyuga',
      description: 'HUZA ni urubuga rwemewe rw\'akazi mu Rwanda ruhuza abakozi b\'imyuga (abakozi b\'imiryango, abacukuzi b\'amazi, abakora imisatsi, abakora amashanyarazi, n\'abatetsi) n\'abakorera. Abagabo n\'abagore bose barakirwa. Shaka abakozi cyangwa ubone akazi vuba na vuba.',
      enterApp: 'Injira muri HUZA',
    },
    features: {
      title: 'Ibyo HUZA itanga',
      verified: {
        title: 'Abakozi bemejwe',
        description: 'Buri mukozi afite ibitekerezo n\'aho yakoze kugira ngo umenyere neza',
      },
      search: {
        title: 'Gushakisha byoroshye',
        description: 'Shakisha abakozi cyangwa akazi hakurikijwe icyiciro, akarere, n\'umurenge',
      },
      ussd: {
        title: 'Ubutumwa bwa USSD',
        description: 'Emeza USSD (*182*7#) kugira ngo ubone amakuru mashya ku akazi',
      },
      reviews: {
        title: 'Ibitekerezo n\'amanota',
        description: 'Soma ibyo abandi bavuze kugira ngo uhitemo neza',
      },
    },
    categories: {
      title: 'Imyuga dufite',
      housemaid: 'Abakozi b\'imiryango',
      plumber: 'Abacukuzi b\'amazi',
      hairdresser: 'Abakora imisatsi',
      electrician: 'Abakora amashanyarazi',
      cook: 'Abatetsi',
    },
    howItWorks: {
      title: 'Uko HUZA ikora',
      forWorkers: {
        title: 'Ku bakozi',
        step1: 'Andika konti yawe hanyuma uzuze amakuru yawe yose',
        step2: 'Erekana ubumenyi bwawe n\'uburambe',
        step3: 'Tegereza abakorera bahamagare',
        step4: 'Saba ibitekerezo ku kazi wakoze',
      },
      forEmployers: {
        title: 'Ku bakorera',
        step1: 'Shakisha abakozi bakwiye akazi kawe',
        step2: 'Reba ibitekerezo n\'amanota yabo',
        step3: 'Hamagara umukozi cyangwa shyira akazi',
        step4: 'Shyiraho igitekerezo nyuma y\'akazi',
      },
    },
    payment: {
      title: 'Kwishyura no kwishyurwa na Mobile Money',
      description: 'HUZA ifasha gufata amafaranga yoroshye n\'umutekano ukoresheje Mobile Money',
      mtn: 'MTN Mobile Money',
      airtel: 'Airtel Money',
      features: {
        instant: 'Kwishyura ako kanya',
        secure: 'Umutekano mwinshi',
        convenient: 'Byoroshye kugenzura',
      },
    },
    support: {
      title: 'Ufite ikibazo? Twandikire',
      description: 'Itsinda ryacu ry\'ubufasha butekiniki rihari gufasha igihe cyose',
      email: 'Imeri',
      phone: 'Telefone',
    },
    footer: {
      copyright: '© 2026 HUZA. Uburenganzira bwose burarinzwe.',
      tagline: 'Guhuza abakozi n\'akazi mu Rwanda',
    },
  },
  en: {
    hero: {
      title: 'Welcome to HUZA',
      subtitle: 'Connecting Job Seekers with Service Workers',
      description: 'HUZA is Rwanda\'s trusted job platform connecting skilled service workers (housekeepers, plumbers, hairdressers, electricians, and cooks) with employers. All genders welcome. Find workers or discover job opportunities quickly and easily.',
      enterApp: 'Enter HUZA',
    },
    features: {
      title: 'What HUZA Offers',
      verified: {
        title: 'Verified Workers',
        description: 'Every worker has reviews and references so you can hire with confidence',
      },
      search: {
        title: 'Easy Search',
        description: 'Find workers or jobs by category, district, and sector',
      },
      ussd: {
        title: 'USSD Notifications',
        description: 'Enable USSD (*182*7#) to receive instant job alerts',
      },
      reviews: {
        title: 'Reviews & Ratings',
        description: 'Read what others say to make informed decisions',
      },
    },
    categories: {
      title: 'Service Categories',
      housemaid: 'Housekeepers',
      plumber: 'Plumbers',
      hairdresser: 'Hairdressers',
      electrician: 'Electricians',
      cook: 'Cooks',
    },
    howItWorks: {
      title: 'How HUZA Works',
      forWorkers: {
        title: 'For Workers',
        step1: 'Create your account and fill in your details',
        step2: 'Showcase your skills and experience',
        step3: 'Wait for employers to contact you',
        step4: 'Request reviews after completing jobs',
      },
      forEmployers: {
        title: 'For Employers',
        step1: 'Search for workers that fit your needs',
        step2: 'Check their reviews and ratings',
        step3: 'Contact a worker or post a job',
        step4: 'Leave a review after the job is done',
      },
    },
    payment: {
      title: 'Pay and Get Paid with Mobile Money',
      description: 'HUZA makes payments easy and secure using Mobile Money',
      mtn: 'MTN Mobile Money',
      airtel: 'Airtel Money',
      features: {
        instant: 'Instant payments',
        secure: 'Secure transactions',
        convenient: 'Easy to track',
      },
    },
    support: {
      title: 'Need Help? Contact Us',
      description: 'Our IT support team is here to assist you anytime',
      email: 'Email',
      phone: 'Phone',
    },
    footer: {
      copyright: '© 2026 HUZA. All rights reserved.',
      tagline: 'Connecting workers and jobs in Rwanda',
    },
  }
};

export default function HomePage({ language, setLanguage, onEnterApp }: HomePageProps) {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <Globe className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {language === 'en' ? 'Kinyarwanda' : 'English'}
          </span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-5xl">H</span>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
            {t.hero.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
          <button
            onClick={onEnterApp}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            {t.hero.enterApp}
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t.features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {t.features.verified.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {t.features.verified.description}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {t.features.search.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {t.features.search.description}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {t.features.ussd.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {t.features.ussd.description}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {t.features.reviews.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {t.features.reviews.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t.categories.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: Briefcase, label: t.categories.housemaid, color: 'from-blue-500 to-blue-600' },
              { icon: Briefcase, label: t.categories.plumber, color: 'from-cyan-500 to-cyan-600' },
              { icon: Briefcase, label: t.categories.hairdresser, color: 'from-pink-500 to-pink-600' },
              { icon: Briefcase, label: t.categories.electrician, color: 'from-yellow-500 to-yellow-600' },
              { icon: Briefcase, label: t.categories.cook, color: 'from-orange-500 to-orange-600' },
            ].map((cat, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-gray-900 text-sm">{cat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How HUZA Works Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t.howItWorks.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Workers */}
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
                <Users className="w-7 h-7" />
                {t.howItWorks.forWorkers.title}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                  <p className="text-gray-700 pt-1">{t.howItWorks.forWorkers.step1}</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600">2</span>
                  </div>
                  <p className="text-gray-700 pt-1">{t.howItWorks.forWorkers.step2}</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600">3</span>
                  </div>
                  <p className="text-gray-700 pt-1">{t.howItWorks.forWorkers.step3}</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600">4</span>
                  </div>
                  <p className="text-gray-700 pt-1">{t.howItWorks.forWorkers.step4}</p>
                </div>
              </div>
            </div>

            {/* For Employers */}
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
                <Briefcase className="w-7 h-7" />
                {t.howItWorks.forEmployers.title}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-green-600">1</span>
                  </div>
                  <p className="text-gray-700 pt-1">{t.howItWorks.forEmployers.step1}</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-green-600">2</span>
                  </div>
                  <p className="text-gray-700 pt-1">{t.howItWorks.forEmployers.step2}</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-green-600">3</span>
                  </div>
                  <p className="text-gray-700 pt-1">{t.howItWorks.forEmployers.step3}</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-green-600">4</span>
                  </div>
                  <p className="text-gray-700 pt-1">{t.howItWorks.forEmployers.step4}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Money Payment Section */}
      <div className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            {t.payment.title}
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            {t.payment.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-yellow-400">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t.payment.mtn}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Payment:</span> *182#<br/>
                <span className="font-semibold">Notifications:</span> *182*7#
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  <span>{t.payment.features.instant}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  <span>{t.payment.features.secure}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  <span>{t.payment.features.convenient}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-red-400">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t.payment.airtel}</h3>
              </div>
              <p className="text-gray-600 mb-4">*500#</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-red-600" />
                  <span>{t.payment.features.instant}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-red-600" />
                  <span>{t.payment.features.secure}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-red-600" />
                  <span>{t.payment.features.convenient}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            {t.support.title}
          </h2>
          <p className="text-blue-100 text-center mb-8">
            {t.support.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="mailto:raissadushime@gmail.com"
              className="bg-white rounded-lg p-6 hover:shadow-xl transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t.support.email}</p>
                <p className="font-semibold text-gray-900">raissadushime@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:+250788654321"
              className="bg-white rounded-lg p-6 hover:shadow-xl transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t.support.phone}</p>
                <p className="font-semibold text-gray-900">+250 788 654 321</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-2">{t.footer.tagline}</p>
          <p className="text-gray-500 text-sm">{t.footer.copyright}</p>
        </div>
      </div>
    </div>
  );
}
