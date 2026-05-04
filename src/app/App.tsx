import { useState } from 'react';
import { PlusCircle, Briefcase, Users, Search, Home as HomeIcon } from 'lucide-react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import LocationFilter from './components/LocationFilter';
import JobCard from './components/JobCard';
import WorkerCard from './components/WorkerCard';
import PostJobForm from './components/PostJobForm';
import HomePage from './components/HomePage';

const translations = {
  rw: {
    tabs: {
      jobs: 'Akazi',
      workers: 'Abakozi',
    },
    search: 'Shakisha...',
    postJob: 'Shyira akazi',
    noResults: 'Nta bisubizo byabonetse',
    ussdInfo: 'Emeza USSD (*182*7#) kugira ngo ubone amakuru mashya',
  },
  en: {
    tabs: {
      jobs: 'Jobs',
      workers: 'Workers',
    },
    search: 'Search...',
    postJob: 'Post Job',
    noResults: 'No results found',
    ussdInfo: 'Enable USSD (*182*7#) to receive instant notifications',
  }
};

// Mock data
const mockJobs = [
  {
    id: '1',
    title: {
      en: 'Experienced Housekeeper Needed',
      rw: 'Dusaba umukozi w\'imuryango ufite uburambe',
    },
    category: 'Housemaid',
    location: 'Kigali, Kimironko',
    salary: '80,000 - 120,000 RWF/ukwezi',
    phone: '+250788123456',
    description: {
      en: 'Looking for reliable housekeeper for family home. Cooking, cleaning, childcare. All genders welcome.',
      rw: 'Turashaka umukozi w\'imuryango wizewe. Guteka, gusukura, kwita ku bana. Abagabo n\'abagore barakirwa.',
    },
    postedDate: '2 days ago',
    urgent: true,
  },
  {
    id: '2',
    title: {
      en: 'Professional Plumber Required',
      rw: 'Dusaba umucukuzi w\'amazi w\'umwuga',
    },
    category: 'Plumber',
    location: 'Musanze, Muhoza',
    salary: '150,000 RWF/umushinga',
    phone: '+250788234567',
    description: {
      en: 'Need plumber for bathroom renovation. Experience with modern fixtures required.',
      rw: 'Dukeneye umucukuzi w\'amazi kugira ngo avugurure ubwiherero. Uburambe mu bikoresho bigezweho ni ngombwa.',
    },
    postedDate: '1 day ago',
    urgent: false,
  },
  {
    id: '3',
    title: {
      en: 'Hairdresser for Salon',
      rw: 'Ukora imisatsi kuri salon',
    },
    category: 'Hairdresser',
    location: 'Kigali, Nyamirambo',
    salary: '100,000 - 150,000 RWF/ukwezi',
    phone: '+250788345678',
    description: {
      en: 'Busy salon seeking skilled hairdresser. Braiding, weaving, styling expertise.',
      rw: 'Salon ikora cyane ishaka ukora imisatsi ufite ubuhanga. Gusunika, gushiraho imisatsi, no kuyirungika.',
    },
    postedDate: '3 hours ago',
    urgent: true,
  },
  {
    id: '4',
    title: {
      en: 'Live-in Housekeeper',
      rw: 'Umukozi w\'imuryango utuye aho akora',
    },
    category: 'Housemaid',
    location: 'Huye, Tumba',
    salary: '90,000 RWF/ukwezi + aho atuye',
    phone: '+250788456789',
    description: {
      en: 'Family of 4 needs live-in help. Private room provided. Good cooking skills essential. Men and women encouraged to apply.',
      rw: 'Umuryango w\'abantu 4 ukeneye umufasha utuye hamwe. Icyumba cyihariye kirahari. Ubushobozi bwo guteka ni ngombwa. Abagabo n\'abagore bashobora gusaba.',
    },
    postedDate: '1 week ago',
    urgent: false,
  },
  {
    id: '5',
    title: {
      en: 'Emergency Plumber',
      rw: 'Umucukuzi w\'amazi w\'byihutirwa',
    },
    category: 'Plumber',
    location: 'Rubavu, Gisenyi',
    salary: '50,000 RWF (byihutirwa)',
    phone: '+250788567890',
    description: {
      en: 'Burst pipe emergency! Need immediate assistance. Available now.',
      rw: 'Umuyoboro w\'amazi watubutse! Dukeneye ubufasha bwihuse. Uraboneka none.',
    },
    postedDate: '30 minutes ago',
    urgent: true,
  },
  {
    id: '6',
    title: {
      en: 'Experienced Electrician Needed',
      rw: 'Dusaba ukora amashanyarazi ufite uburambe',
    },
    category: 'Electrician',
    location: 'Kigali, Kicukiro',
    salary: '120,000 - 180,000 RWF/ukwezi',
    phone: '+250788678901',
    description: {
      en: 'Looking for certified electrician for residential building. Wiring, installation, and maintenance.',
      rw: 'Turashaka ukora amashanyarazi ufite icyemezo ku nyubako z\'abantu. Gushiraho imiyoboro, kwinjiza amashanyarazi, no kubungabunga.',
    },
    postedDate: '1 day ago',
    urgent: false,
  },
  {
    id: '7',
    title: {
      en: 'Professional Cook for Restaurant',
      rw: 'Umutetsi w\'umwuga kuri resitora',
    },
    category: 'Cook',
    location: 'Nyanza, Busasamana',
    salary: '150,000 - 200,000 RWF/ukwezi',
    phone: '+250788789012',
    description: {
      en: 'High-end restaurant seeking experienced cook. Continental and Rwandan cuisine expertise required.',
      rw: 'Resitora nziza ishaka umutetsi ufite uburambe. Ubushobozi mu biryo bya continent no mu biryo by\'u Rwanda ni ngombwa.',
    },
    postedDate: '5 hours ago',
    urgent: true,
  },
  {
    id: '8',
    title: {
      en: 'Electrician for Office Building',
      rw: 'Ukora amashanyarazi ku nyubako y\'ibiro',
    },
    category: 'Electrician',
    location: 'Huye, Ngoma',
    salary: '200,000 RWF/umushinga',
    phone: '+250788890123',
    description: {
      en: 'Need electrician for complete office rewiring project. Must have commercial experience.',
      rw: 'Dukeneye ukora amashanyarazi kugira ngo asubiremo imiyoboro y\'ibiro. Agomba kuba afite uburambe mu bucuruzi.',
    },
    postedDate: '4 days ago',
    urgent: false,
  },
  {
    id: '9',
    title: {
      en: 'Family Cook Needed',
      rw: 'Dusaba umutetsi w\'umuryango',
    },
    category: 'Cook',
    location: 'Musanze, Kinigi',
    salary: '100,000 - 130,000 RWF/ukwezi',
    phone: '+250788901234',
    description: {
      en: 'Family of 6 needs skilled cook. African and international cuisine. Live-in preferred.',
      rw: 'Umuryango w\'abantu 6 ukeneye umutetsi ufite ubuhanga. Ibiryo bya Afurika no mpuzamahanga. Byiza kutuye hamwe.',
    },
    postedDate: '2 days ago',
    urgent: false,
  },
  {
    id: '10',
    title: {
      en: 'Housekeeper for Small Family',
      rw: 'Umukozi w\'imuryango rito',
    },
    category: 'Housemaid',
    location: 'Rubavu, Rubavu',
    salary: '75,000 RWF/ukwezi',
    phone: '+250788012345',
    description: {
      en: 'Couple needs part-time housekeeper. Light cleaning and cooking twice a week. All qualified candidates welcome.',
      rw: 'Abashakanye bakeneye umukozi w\'igihe gito. Gusukura no guteka inshuro ebyiri mu cyumweru. Abantu bose bifuza barakirwa.',
    },
    postedDate: '3 days ago',
    urgent: false,
  },
  {
    id: '11',
    title: {
      en: 'Plumber for Hotel',
      rw: 'Umucukuzi w\'amazi kuri hoteli',
    },
    category: 'Plumber',
    location: 'Nyanza, Mukingo',
    salary: '180,000 RWF/ukwezi',
    phone: '+250788123567',
    description: {
      en: 'Hotel seeking full-time plumber for maintenance. Must be available for emergencies.',
      rw: 'Hoteli ishaka umucukuzi w\'amazi w\'igihe cyose. Agomba kuboneka igihe cy\'ibibazo byihutirwa.',
    },
    postedDate: '1 week ago',
    urgent: false,
  },
  {
    id: '12',
    title: {
      en: 'Salon Hairdresser - Urgent',
      rw: 'Ukora imisatsi kuri salon - Byihutirwa',
    },
    category: 'Hairdresser',
    location: 'Huye, Rusatira',
    salary: '90,000 - 120,000 RWF/ukwezi',
    phone: '+250788234678',
    description: {
      en: 'New salon opening next week. Need experienced hairdresser immediately. Training provided.',
      rw: 'Salon nshya ifungura icyumweru gitaha. Dukeneye ukora imisatsi ufite uburambe ako kanya. Amahuguranya arahari.',
    },
    postedDate: '4 hours ago',
    urgent: true,
  },
];

const mockWorkers = [
  {
    id: '1',
    name: 'Marie Uwase',
    age: 32,
    gender: 'Female' as const,
    category: 'Housemaid',
    location: 'Kigali, Nyarutarama',
    phone: '+250788111222',
    experience: '5 years',
    rating: 5,
    verified: true,
    skills: ['Cooking', 'Cleaning', 'Childcare', 'Laundry'],
    totalReviews: 12,
    reviews: [
      {
        id: 'r1',
        employerName: 'Mr. Kamanzi',
        employerPhone: '+250788999001',
        rating: 5,
        comment: 'Marie is exceptional! Very reliable, great with kids, and excellent cooking skills. Highly recommend.',
        date: '2 months ago',
      },
      {
        id: 'r2',
        employerName: 'Mrs. Nkusi',
        employerPhone: '+250788999002',
        rating: 5,
        comment: 'Professional and trustworthy. She worked with us for 3 years. Always on time and very clean.',
        date: '4 months ago',
      },
      {
        id: 'r3',
        employerName: 'Dr. Mutesi',
        employerPhone: '+250788999003',
        rating: 5,
        comment: 'Outstanding worker! My children loved her. Very honest and hardworking.',
        date: '6 months ago',
      },
    ],
  },
  {
    id: '2',
    name: 'Jean Claude Mugabo',
    age: 35,
    gender: 'Male' as const,
    category: 'Plumber',
    location: 'Kigali, Kicukiro',
    phone: '+250788222333',
    experience: '8 years',
    rating: 4,
    verified: true,
    skills: ['Pipe Installation', 'Leak Repair', 'Water Heating', 'Drainage'],
    totalReviews: 8,
    reviews: [
      {
        id: 'r4',
        employerName: 'Hotel Serena',
        employerPhone: '+250788999004',
        rating: 5,
        comment: 'Fixed our complex drainage system efficiently. Very knowledgeable and professional.',
        date: '1 month ago',
      },
      {
        id: 'r5',
        employerName: 'Mr. Habimana',
        employerPhone: '+250788999005',
        rating: 4,
        comment: 'Good work on bathroom renovation. Completed on time but slightly over budget.',
        date: '3 months ago',
      },
    ],
  },
  {
    id: '11',
    name: 'Diane Umutoni',
    age: 28,
    gender: 'Female' as const,
    category: 'Plumber',
    location: 'Musanze, Muhoza',
    phone: '+250788112233',
    experience: '5 years',
    rating: 5,
    verified: true,
    skills: ['Plumbing Repairs', 'Installation', 'Water Systems', 'Maintenance'],
    totalReviews: 10,
    reviews: [
      {
        id: 'r22',
        employerName: 'Virunga Lodge',
        employerPhone: '+250788999022',
        rating: 5,
        comment: 'Diane is highly skilled and professional. Fixed all our plumbing issues quickly and efficiently.',
        date: '2 months ago',
      },
      {
        id: 'r23',
        employerName: 'Mr. Nshuti',
        employerPhone: '+250788999023',
        rating: 5,
        comment: 'Excellent plumber! Very knowledgeable and reliable. Highly recommend her services.',
        date: '4 months ago',
      },
    ],
  },
  {
    id: '12',
    name: 'Pierre Ndayisaba',
    age: 30,
    gender: 'Male' as const,
    category: 'Housemaid',
    location: 'Huye, Ngoma',
    phone: '+250788223344',
    experience: '4 years',
    rating: 5,
    verified: true,
    skills: ['Cooking', 'Cleaning', 'Organization', 'Gardening'],
    totalReviews: 9,
    reviews: [
      {
        id: 'r24',
        employerName: 'Mrs. Kayitesi',
        employerPhone: '+250788999024',
        rating: 5,
        comment: 'Pierre is fantastic! Very organized, excellent cook, and great with household management.',
        date: '1 month ago',
      },
      {
        id: 'r25',
        employerName: 'Ambassador Williams',
        employerPhone: '+250788999025',
        rating: 5,
        comment: 'Outstanding household manager. Professional, discreet, and incredibly reliable. Highly recommended!',
        date: '5 months ago',
      },
    ],
  },
  {
    id: '3',
    name: 'Grace Mukamana',
    age: 28,
    gender: 'Female' as const,
    category: 'Hairdresser',
    location: 'Kigali, Kimihurura',
    phone: '+250788333444',
    experience: '6 years',
    rating: 5,
    verified: true,
    skills: ['Braiding', 'Weaving', 'Coloring', 'Styling'],
    totalReviews: 15,
    reviews: [
      {
        id: 'r6',
        employerName: 'Beauty Palace Salon',
        employerPhone: '+250788999006',
        rating: 5,
        comment: 'Grace is an artist! Clients always requested her specifically. Very professional and creative.',
        date: '2 weeks ago',
      },
      {
        id: 'r7',
        employerName: 'Glam Studio',
        employerPhone: '+250788999007',
        rating: 5,
        comment: 'Worked with us for 2 years. Excellent with braiding and natural hair. Highly skilled.',
        date: '5 months ago',
      },
    ],
  },
  {
    id: '4',
    name: 'Alice Ingabire',
    age: 26,
    gender: 'Female' as const,
    category: 'Housemaid',
    location: 'Kigali, Gisozi',
    phone: '+250788444555',
    experience: '3 years',
    rating: 4,
    verified: false,
    skills: ['Cleaning', 'Ironing', 'Basic Cooking'],
    totalReviews: 5,
    reviews: [
      {
        id: 'r8',
        employerName: 'Mrs. Uwera',
        employerPhone: '+250788999008',
        rating: 4,
        comment: 'Good worker, very punctual. Still learning cooking but excellent at cleaning.',
        date: '1 month ago',
      },
      {
        id: 'r9',
        employerName: 'Mr. Ngabo',
        employerPhone: '+250788999009',
        rating: 4,
        comment: 'Reliable and honest. Worked part-time for us for 6 months.',
        date: '3 months ago',
      },
    ],
  },
  {
    id: '5',
    name: 'Patrick Niyonzima',
    age: 42,
    gender: 'Male' as const,
    category: 'Plumber',
    location: 'Kigali, Kabeza',
    phone: '+250788555666',
    experience: '10 years',
    rating: 5,
    verified: true,
    skills: ['Commercial Plumbing', 'Installation', 'Maintenance', 'Emergency Repair'],
    totalReviews: 20,
    reviews: [
      {
        id: 'r10',
        employerName: 'Kigali Heights Complex',
        employerPhone: '+250788999010',
        rating: 5,
        comment: 'Our go-to plumber for all emergencies. Available 24/7 and fixes things right the first time.',
        date: '3 weeks ago',
      },
      {
        id: 'r11',
        employerName: 'Century Real Estate',
        employerPhone: '+250788999011',
        rating: 5,
        comment: 'Handles all our properties. Extremely reliable and knows his work inside out.',
        date: '2 months ago',
      },
    ],
  },
  {
    id: '6',
    name: 'Chantal Murekatete',
    age: 30,
    gender: 'Female' as const,
    category: 'Hairdresser',
    location: 'Kigali, Gaculiro',
    phone: '+250788666777',
    experience: '4 years',
    rating: 4,
    verified: true,
    skills: ['Natural Hair', 'Relaxing', 'Hair Treatment', 'Makeup'],
    totalReviews: 9,
    reviews: [
      {
        id: 'r12',
        employerName: 'Radiant Beauty Salon',
        employerPhone: '+250788999012',
        rating: 4,
        comment: 'Great with natural hair treatments. Very gentle and knowledgeable about hair care.',
        date: '1 month ago',
      },
      {
        id: 'r13',
        employerName: 'Elegance Hair Studio',
        employerPhone: '+250788999013',
        rating: 4,
        comment: 'Good hairdresser with steady hands. Clients appreciated her patience.',
        date: '4 months ago',
      },
    ],
  },
  {
    id: '7',
    name: 'Emmanuel Nkurunziza',
    age: 38,
    gender: 'Male' as const,
    category: 'Electrician',
    location: 'Kigali, Remera',
    phone: '+250788777888',
    experience: '12 years',
    rating: 5,
    verified: true,
    skills: ['Wiring', 'Installation', 'Repairs', 'Solar Systems'],
    totalReviews: 18,
    reviews: [
      {
        id: 'r14',
        employerName: 'Kigali Convention Centre',
        employerPhone: '+250788999014',
        rating: 5,
        comment: 'Handled all our electrical installations. Very professional and safety-conscious. Excellent work!',
        date: '1 month ago',
      },
      {
        id: 'r15',
        employerName: 'Mr. Habimana',
        employerPhone: '+250788999015',
        rating: 5,
        comment: 'Installed solar panels for our home. Expert knowledge and very reliable. Highly recommend!',
        date: '3 months ago',
      },
    ],
  },
  {
    id: '13',
    name: 'Francine Mukeshimana',
    age: 27,
    gender: 'Female' as const,
    category: 'Electrician',
    location: 'Rubavu, Gisenyi',
    phone: '+250788334455',
    experience: '6 years',
    rating: 5,
    verified: true,
    skills: ['Electrical Installation', 'Troubleshooting', 'Panel Upgrades', 'Safety Inspections'],
    totalReviews: 13,
    reviews: [
      {
        id: 'r26',
        employerName: 'Lake Kivu Serena Hotel',
        employerPhone: '+250788999026',
        rating: 5,
        comment: 'Francine is exceptional! Very knowledgeable and solved complex electrical problems with ease.',
        date: '3 weeks ago',
      },
      {
        id: 'r27',
        employerName: 'Construction Co. Rwanda',
        employerPhone: '+250788999027',
        rating: 5,
        comment: 'Top-tier electrician. Completed our commercial project ahead of schedule. Highly professional!',
        date: '2 months ago',
      },
    ],
  },
  {
    id: '14',
    name: 'Samuel Habimana',
    age: 26,
    gender: 'Male' as const,
    category: 'Hairdresser',
    location: 'Kigali, Nyamirambo',
    phone: '+250788445566',
    experience: '5 years',
    rating: 5,
    verified: true,
    skills: ['Cutting', 'Styling', 'Coloring', 'Beard Grooming'],
    totalReviews: 17,
    reviews: [
      {
        id: 'r28',
        employerName: 'Elite Salon & Spa',
        employerPhone: '+250788999028',
        rating: 5,
        comment: 'Samuel is a master stylist! Very creative and professional. Clients love his work.',
        date: '1 month ago',
      },
      {
        id: 'r29',
        employerName: 'Fashion Show Rwanda',
        employerPhone: '+250788999029',
        rating: 5,
        comment: 'Incredible talent! Styled models for our fashion event. Exceptional skills and creativity.',
        date: '3 months ago',
      },
    ],
  },
  {
    id: '8',
    name: 'Claudine Uwimana',
    age: 29,
    gender: 'Female' as const,
    category: 'Cook',
    location: 'Kigali, Nyamirambo',
    phone: '+250788888999',
    experience: '7 years',
    rating: 5,
    verified: true,
    skills: ['Rwandan Cuisine', 'Continental', 'Baking', 'Catering'],
    totalReviews: 14,
    reviews: [
      {
        id: 'r16',
        employerName: 'Heaven Restaurant',
        employerPhone: '+250788999016',
        rating: 5,
        comment: 'Amazing chef! Her Rwandan dishes are authentic and delicious. Customers always ask for her recipes.',
        date: '2 weeks ago',
      },
      {
        id: 'r17',
        employerName: 'Mrs. Mukeshimana',
        employerPhone: '+250788999017',
        rating: 5,
        comment: 'Worked as our family cook for 2 years. Creative, clean, and excellent with both local and international food.',
        date: '5 months ago',
      },
    ],
  },
  {
    id: '9',
    name: 'Eric Mutabazi',
    age: 33,
    gender: 'Male' as const,
    category: 'Electrician',
    location: 'Kigali, Gisozi',
    phone: '+250788990011',
    experience: '9 years',
    rating: 4,
    verified: true,
    skills: ['Home Wiring', 'Commercial', 'Troubleshooting', 'Smart Home'],
    totalReviews: 11,
    reviews: [
      {
        id: 'r18',
        employerName: 'Tech Park Rwanda',
        employerPhone: '+250788999018',
        rating: 4,
        comment: 'Good electrician with solid technical knowledge. Completed our office setup efficiently.',
        date: '6 weeks ago',
      },
      {
        id: 'r19',
        employerName: 'Mr. Nsengimana',
        employerPhone: '+250788999019',
        rating: 4,
        comment: 'Installed smart home system. Professional and knowledgeable about modern technology.',
        date: '4 months ago',
      },
    ],
  },
  {
    id: '10',
    name: 'Joséphine Mukamana',
    age: 35,
    gender: 'Female' as const,
    category: 'Cook',
    location: 'Kigali, Kacyiru',
    phone: '+250788001122',
    experience: '10 years',
    rating: 5,
    verified: true,
    skills: ['French Cuisine', 'Rwandan Dishes', 'Pastry', 'Meal Planning'],
    totalReviews: 16,
    reviews: [
      {
        id: 'r20',
        employerName: 'Ambassador Residence',
        employerPhone: '+250788999020',
        rating: 5,
        comment: 'Outstanding cook! Catered for all our diplomatic events. Professional, creative, and reliable.',
        date: '3 weeks ago',
      },
      {
        id: 'r21',
        employerName: 'Hotel des Mille Collines',
        employerPhone: '+250788999021',
        rating: 5,
        comment: 'Worked as head chef. Excellent French and Rwandan cuisine. Very organized and punctual.',
        date: '7 months ago',
      },
    ],
  },
];

export default function App() {
  const [language, setLanguage] = useState<'rw' | 'en'>('en');
  const [showHomePage, setShowHomePage] = useState(true);
  const [activeTab, setActiveTab] = useState<'jobs' | 'workers'>('jobs');
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostJob, setShowPostJob] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [jobs, setJobs] = useState(mockJobs);

  const t = translations[language];

  const handleJobSubmit = (jobData: {
    title: { en: string; rw: string };
    category: string;
    location: string;
    salary: string;
    phone: string;
    description: { en: string; rw: string };
    urgent: boolean;
  }) => {
    const newJob = {
      id: `job-${Date.now()}`,
      ...jobData,
      postedDate: 'Just now',
    };
    setJobs([newJob, ...jobs]);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = category === 'all' || job.category.toLowerCase() === category;
    const matchesSearch = job.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.title.rw.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.rw.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = !selectedDistrict || job.location.includes(selectedDistrict);
    const matchesSector = !selectedSector || job.location.includes(selectedSector);
    return matchesCategory && matchesSearch && matchesDistrict && matchesSector;
  });

  const filteredWorkers = mockWorkers.filter(worker => {
    const matchesCategory = category === 'all' || worker.category.toLowerCase() === category;
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDistrict = !selectedDistrict || worker.location.includes(selectedDistrict);
    const matchesSector = !selectedSector || worker.location.includes(selectedSector);
    return matchesCategory && matchesSearch && matchesDistrict && matchesSector;
  });

  if (showHomePage) {
    return (
      <HomePage
        language={language}
        setLanguage={setLanguage}
        onEnterApp={() => setShowHomePage(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} setLanguage={setLanguage} />

      {/* Home Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <button
            onClick={() => setShowHomePage(true)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <HomeIcon className="w-4 h-4" />
            <span>{language === 'en' ? 'Back to Home' : 'Subira Ahabanza'}</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* USSD Info Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 mb-6 flex items-center justify-between">
          <p className="text-sm">{t.ussdInfo}</p>
          <span className="font-mono font-bold">*182*7#</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'jobs'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span>{t.tabs.jobs}</span>
          </button>
          <button
            onClick={() => setActiveTab('workers')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'workers'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>{t.tabs.workers}</span>
          </button>
        </div>

        {/* Search and Post Job */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          {activeTab === 'jobs' && (
            <button
              onClick={() => setShowPostJob(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span>{t.postJob}</span>
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <CategoryFilter
            language={language}
            activeCategory={category}
            onCategoryChange={setCategory}
          />
        </div>

        {/* Location Filter */}
        <div className="mb-6">
          <LocationFilter
            language={language}
            selectedDistrict={selectedDistrict}
            selectedSector={selectedSector}
            onDistrictChange={setSelectedDistrict}
            onSectorChange={setSelectedSector}
          />
        </div>

        {/* Content Grid */}
        {activeTab === 'jobs' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} language={language} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                {t.noResults}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredWorkers.length > 0 ? (
              filteredWorkers.map(worker => (
                <WorkerCard key={worker.id} worker={worker} language={language} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                {t.noResults}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Post Job Modal */}
      {showPostJob && (
        <PostJobForm
          language={language}
          onClose={() => setShowPostJob(false)}
          onSubmit={handleJobSubmit}
        />
      )}
    </div>
  );
}