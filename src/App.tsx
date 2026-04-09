/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  CloudRain, 
  Phone, 
  Mic, 
  Camera, 
  Volume2, 
  WifiOff, 
  ArrowLeft, 
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  MapPin,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type Language = 'English' | 'Pidgin' | 'Hausa' | 'Yoruba' | 'Igbo';
type Crop = 'Maize' | 'Cassava' | 'Rice' | 'Yam' | 'Other';

const translations: Record<Language, any> = {
  English: {
    welcome: "Welcome",
    chooseLang: "Choose Language",
    mainCrop: "Main Crop",
    startNow: "Start Now",
    plantNow: "PLANT NOW",
    rainSoon: "Rain is coming soon",
    seeDetails: "See details",
    cropProblem: "My crop has a problem",
    findHelp: "Find Help",
    askVoice: "Ask Voice",
    checkCrop: "Check Crop",
    pointCamera: "Point camera at the sick leaf",
    takePhoto: "Take Photo",
    selectList: "Select from list",
    diagnosis: "Diagnosis",
    armyworm: "Armyworm",
    armywormDesc: "Small worms are eating your crop. They will destroy the plant if not stopped.",
    listenThis: "Listen to this",
    whatToDo: "What to do:",
    buyNeem: "Buy 'Neem Oil' spray",
    sprayMorning: "Spray early in the morning",
    removeLeaves: "Remove badly sick leaves",
    findMedicine: "Find medicine nearby",
    advice: "Advice",
    bestWeek: "This is the best week for your crop",
    weatherForecast: "Weather Forecast",
    today: "Today",
    tomorrow: "Tomorrow",
    saturday: "Saturday",
    heavyRain: "Heavy Rain",
    lightRain: "Light Rain",
    sunny: "Sunny",
    listenAdvice: "Listen to full farming advice",
    helpNearby: "Help Nearby",
    stores: "Stores",
    officers: "Officers",
    callNow: "Call Now",
    voiceHelp: "Voice Help",
    howHelp: "How can I help?",
    speakIn: "Speak in English",
    response: "Response:",
    voiceResponse: "Wait for 2 days before you spray your maize.",
    offline: "Offline",
    simulateOffline: "Simulate Offline",
    communityAlert: "Community Alert",
    nearbyFarmers: "farmers near you reported"
  },
  Pidgin: {
    welcome: "Welcome",
    chooseLang: "Pick your language",
    mainCrop: "Wetin you dey farm?",
    startNow: "Start now",
    plantNow: "PLANT NOW",
    rainSoon: "Rain go fall soon",
    seeDetails: "See more",
    cropProblem: "My crop get wahala",
    findHelp: "Find help",
    askVoice: "Talk to app",
    checkCrop: "Check crop",
    pointCamera: "Point camera for the leaf",
    takePhoto: "Snap am",
    selectList: "Pick from list",
    diagnosis: "Wetin dey happen",
    armyworm: "Armyworm",
    armywormDesc: "Small small worms dey chop your crop. Dem go finish am if you no stop dem.",
    listenThis: "Listen to this",
    whatToDo: "Wetin you go do:",
    buyNeem: "Buy 'Neem Oil' spray",
    sprayMorning: "Spray am for morning",
    removeLeaves: "Comot the leaves wey don spoil",
    findMedicine: "Find medicine for area",
    advice: "Advice",
    bestWeek: "This week na the best time for your crop",
    weatherForecast: "How rain go fall",
    today: "Today",
    tomorrow: "Tomorrow",
    saturday: "Saturday",
    heavyRain: "Heavy rain",
    lightRain: "Small rain",
    sunny: "Sun go shine",
    listenAdvice: "Listen to full advice",
    helpNearby: "Help for area",
    stores: "Agro stores",
    officers: "Agro officers",
    callNow: "Call dem",
    voiceHelp: "Talk to app",
    howHelp: "Wetin I fit do?",
    speakIn: "Talk for Pidgin",
    response: "Answer:",
    voiceResponse: "Wait for two days before you spray your maize.",
    offline: "No network",
    simulateOffline: "Try no network",
    communityAlert: "Community Wahala",
    nearbyFarmers: "farmers for your area talk say"
  },
  Hausa: {
    welcome: "Barka da zuwa",
    chooseLang: "Zabi yare",
    mainCrop: "Wane amfanin gona kake shuka?",
    startNow: "Fara yanzu",
    plantNow: "SHUKA YANZU",
    rainSoon: "Ruwa yana kusa",
    seeDetails: "Duba daki-daki",
    cropProblem: "Amfanin gona na yana da matsala",
    findHelp: "Nemi taimako",
    askVoice: "Yi magana",
    checkCrop: "Duba amfanin gona",
    pointCamera: "Nuna kyamara ga ganyen",
    takePhoto: "Dauki hoto",
    selectList: "Zaba daga jerin",
    diagnosis: "Bincike",
    armyworm: "Kwarin Armyworm",
    armywormDesc: "Kananan kwayoyi suna cin amfanin gonarka. Za su lalata shukar idan ba a tsayar da su ba.",
    listenThis: "Saurari wannan",
    whatToDo: "Abin da za a yi:",
    buyNeem: "Sayi feshin 'Neem Oil'",
    sprayMorning: "Yi feshi da sassafe",
    removeLeaves: "Cire ganyen da suka lalace",
    findMedicine: "Nemi magani kusa",
    advice: "Shawara",
    bestWeek: "Wannan mako ne mafi kyau ga amfanin gonarka",
    weatherForecast: "Hasashen yanayi",
    today: "Yau",
    tomorrow: "Gobe",
    saturday: "Asabar",
    heavyRain: "Babban ruwa",
    lightRain: "Kananan ruwa",
    sunny: "Rana",
    listenAdvice: "Saurari cikakkiyar shawara",
    helpNearby: "Taimako kusa",
    stores: "Shaguna",
    officers: "Jami'ai",
    callNow: "Kira yanzu",
    voiceHelp: "Taimakon murya",
    howHelp: "Yaya zan iya taimaka?",
    speakIn: "Yi magana da Hausa",
    response: "Amsa:",
    voiceResponse: "Jira kwanaki biyu kafin ka fesa masararka.",
    offline: "Babu intanet",
    simulateOffline: "Gwada babu intanet",
    communityAlert: "Gargaɗin Al'umma",
    nearbyFarmers: "manoma kusa da kai sun ba da rahoton"
  },
  Yoruba: {
    welcome: "E kaabo",
    chooseLang: "Yan ede re",
    mainCrop: "Kini o n gbin?",
    startNow: "Bere nisisiyi",
    plantNow: "GBIN NISISIYI",
    rainSoon: "Ojo fe ro",
    seeDetails: "Wo ekunrere",
    cropProblem: "Oko mi ni isoro",
    findHelp: "Wa iranlowo",
    askVoice: "Soro",
    checkCrop: "Wo oko",
    pointCamera: "Fi kyamara wo ewe to n se",
    takePhoto: "Ya hoto",
    selectList: "Yan ninu akojo",
    diagnosis: "Ayewo",
    armyworm: "Armyworm",
    armywormDesc: "Awon kokoro kekere n je oko re. Won yoo ba oko re je ti o ba duro de won.",
    listenThis: "Gbo eleyi",
    whatToDo: "Ohun ti o ye ki o se:",
    buyNeem: "Ra 'Neem Oil' fun fife",
    sprayMorning: "Fife ni kutukutu owuro",
    removeLeaves: "Yo awon ewe to ti baje kuro",
    findMedicine: "Wa ogun ni agbegbe re",
    advice: "Imoran",
    bestWeek: "Ose yi ni o dara ju fun oko re",
    weatherForecast: "Asotele oju ojo",
    today: "Oni",
    tomorrow: "Ola",
    saturday: "Abameta",
    heavyRain: "Ojo nla",
    lightRain: "Ojo kekere",
    sunny: "Oorun",
    listenAdvice: "Gbo gbogbo imoran",
    helpNearby: "Iranlowo nitosi",
    stores: "Ile itaja",
    officers: "Awon osise",
    callNow: "Pe nisisiyi",
    voiceHelp: "Iranlowo ohun",
    howHelp: "Bawo ni mo se le ran e lowo?",
    speakIn: "Soro ni Yoruba",
    response: "Idahun:",
    voiceResponse: "Duro fun ojo meji ki o to fun agbado re.",
    offline: "Ko si intaneti",
    simulateOffline: "Danyan ko si intaneti",
    communityAlert: "Ikilo Agbegbe",
    nearbyFarmers: "awon agbe nitosi re jabo pe"
  },
  Igbo: {
    welcome: "Nnọọ",
    chooseLang: "Họrọ asụsụ",
    mainCrop: "Gịnị ka ị na-akụ?",
    startNow: "Malite ugbu a",
    plantNow: "KỤỌ UGBU A",
    rainSoon: "Mmiri ga-ezo n'oge na-adịghị anya",
    seeDetails: "Hụ nkọwa",
    cropProblem: "Ihe m kụrụ nwere nsogbu",
    findHelp: "Chọọ enyemaka",
    askVoice: "Kwuokwa okwu",
    checkCrop: "Leba anya n'ihe a kụrụ",
    pointCamera: "Tụọ igwe foto n'akwụkwọ ndụ na-arịa ọrịa",
    takePhoto: "Sere foto",
    selectList: "Họrọ n'ime ndepụta",
    diagnosis: "Nchọpụta",
    armyworm: "Armyworm",
    armywormDesc: "Ụmụ irighiri ihe na-eri ihe ị kụrụ. Ha ga-ebibi ya ma ọ bụrụ na ị kwụsịghị ha.",
    listenThis: "Gee ntị na nke a",
    whatToDo: "Ihe ị ga-eme:",
    buyNeem: "Zụta 'Neem Oil' iji fesa",
    sprayMorning: "Fesa ya n'isi ụtụtụ",
    removeLeaves: "Wepụ akwụkwọ ndụ ndị mebiri emebi",
    findMedicine: "Chọọ ọgwụ n'akụkụ gị",
    advice: "Ndụmọdụ",
    bestWeek: "Izu a kacha mma maka ihe ị kụrụ",
    weatherForecast: "Amụma ihu igwe",
    today: "Taa",
    tomorrow: "Echi",
    saturday: "Satọdee",
    heavyRain: "Nnukwu mmiri ozuzo",
    lightRain: "Obere mmiri ozuzo",
    sunny: "Anwụ na-acha",
    listenAdvice: "Gee ntị na ndụmọdụ niile",
    helpNearby: "Enyemaka dị nso",
    stores: "Ụlọ ahịa",
    officers: "Ndị ọrụ",
    callNow: "Kpọọ ugbu a",
    voiceHelp: "Enyemaka olu",
    howHelp: "Kedu otu m ga-esi nyere gị aka?",
    speakIn: "Kwuo okwu n'Igbo",
    response: "Azịza:",
    voiceResponse: "Chere ụbọchị abụọ tupu ị fesa ọka gị.",
    offline: "Enweghị ịntanetị",
    simulateOffline: "Nwaa enweghị ịntanetị",
    communityAlert: "Ịdọ aka ná ntị obodo",
    nearbyFarmers: "ndị ọrụ ugbo nọ gị nso kọrọ na"
  }
};

type Screen = 
  | 'SPLASH' 
  | 'ONBOARDING' 
  | 'HOME' 
  | 'DIAGNOSIS_CAPTURE' 
  | 'DIAGNOSIS_RESULT' 
  | 'ADVISORY' 
  | 'HELP_NEARBY' 
  | 'VOICE';

// --- Components ---

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  icon: Icon
}: { 
  children: React.ReactNode; 
  onClick: () => void; 
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  className?: string;
  icon?: any;
}) => {
  const variants = {
    primary: 'bg-[#1A4D2E] text-white active:bg-[#143d24]',
    secondary: 'bg-[#FFD93D] text-[#1A4D2E] active:bg-[#e6c337]',
    danger: 'bg-red-600 text-white active:bg-red-700',
    outline: 'border-4 border-[#1A4D2E] text-[#1A4D2E] active:bg-gray-100'
  };

  return (
    <button 
      onClick={onClick}
      className={`w-full py-6 px-6 rounded-3xl font-bold text-2xl flex items-center justify-center gap-4 transition-all shadow-lg ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={32} />}
      {children}
    </button>
  );
};

const AudioButton = () => (
  <button className="p-4 bg-blue-100 text-blue-700 rounded-full active:bg-blue-200 transition-colors">
    <Volume2 size={32} />
  </button>
);

const ScreenWrapper = ({ children, title, onBack, showOffline = false }: { children: React.ReactNode, title?: string, onBack?: () => void, showOffline?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="fixed inset-0 bg-[#F5F7F8] flex flex-col max-w-md mx-auto overflow-hidden"
  >
    {/* Header */}
    <header className="bg-white p-4 flex items-center gap-4 border-b-2 border-gray-100">
      {onBack && (
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft size={32} className="text-[#1A4D2E]" />
        </button>
      )}
      <h1 className="text-2xl font-black text-[#1A4D2E] flex-1 truncate">
        {title || 'Kulima'}
      </h1>
      {showOffline && (
        <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
          <WifiOff size={16} />
          <span>Offline</span>
        </div>
      )}
    </header>

    {/* Content */}
    <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      {children}
    </main>
  </motion.div>
);

// --- App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('SPLASH');
  const [language, setLanguage] = useState<Language>('English');
  const [selectedCrop, setSelectedCrop] = useState<Crop>('Maize');
  const [isOffline, setIsOffline] = useState(false);

  const t = translations[language];

  // Auto-transition from splash
  useEffect(() => {
    if (screen === 'SPLASH') {
      const timer = setTimeout(() => setScreen('ONBOARDING'), 2000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // --- Screen Renderers ---

  const renderSplash = () => (
    <div className="fixed inset-0 bg-[#1A4D2E] flex flex-col items-center justify-center text-white p-8 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Sprout size={120} className="text-[#FFD93D] mb-6" />
        <h1 className="text-6xl font-black mb-2 tracking-tighter">KULIMA</h1>
        <p className="text-xl opacity-80 font-medium">{t.welcome}</p>
      </motion.div>
    </div>
  );

  const renderOnboarding = () => (
    <ScreenWrapper title={t.welcome}>
      <div className="flex-1 flex flex-col gap-8">
        <section>
          <h2 className="text-3xl font-black mb-4">{t.chooseLang}</h2>
          <div className="grid grid-cols-1 gap-3">
            {(['English', 'Pidgin', 'Hausa', 'Yoruba', 'Igbo'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`p-6 rounded-2xl text-left text-xl font-bold border-4 transition-all ${
                  language === lang 
                    ? 'border-[#1A4D2E] bg-[#1A4D2E] text-white' 
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black mb-4">{t.mainCrop}</h2>
          <div className="grid grid-cols-2 gap-3">
            {(['Maize', 'Cassava', 'Rice', 'Yam', 'Other'] as Crop[]).map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                className={`p-4 rounded-2xl text-center text-lg font-bold border-4 transition-all ${
                  selectedCrop === crop 
                    ? 'border-[#1A4D2E] bg-[#1A4D2E] text-white' 
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </section>

        <Button onClick={() => setScreen('HOME')} className="mt-auto">
          {t.startNow}
        </Button>
      </div>
    </ScreenWrapper>
  );

  const renderHome = () => (
    <ScreenWrapper showOffline={isOffline}>
      {/* Verified Source Badge */}
      <div className="flex items-center gap-2 bg-blue-50 border-2 border-blue-100 p-3 rounded-2xl mb-2">
        <CheckCircle2 size={20} className="text-blue-600" />
        <span className="text-sm font-black text-blue-800 uppercase tracking-wider">Verified by IITA & Ministry of Ag</span>
      </div>

      {/* Language Switcher */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {(['English', 'Pidgin', 'Hausa', 'Yoruba', 'Igbo'] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border-2 transition-all ${
              language === lang 
                ? 'bg-[#1A4D2E] text-white border-[#1A4D2E]' 
                : 'bg-white text-gray-500 border-gray-100'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Weather Card */}
      <section 
        onClick={() => setScreen('ADVISORY')}
        className="bg-[#FFD93D] p-6 rounded-3xl shadow-md cursor-pointer active:scale-95 transition-transform"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-4xl font-black text-[#1A4D2E]">{t.plantNow}</h3>
            <p className="text-xl font-bold text-[#1A4D2E] opacity-80">{t.rainSoon}</p>
          </div>
          <CloudRain size={64} className="text-[#1A4D2E]" />
        </div>
        <div className="flex items-center gap-2 text-[#1A4D2E] font-black text-lg">
          <span>{t.seeDetails}</span>
          <ChevronRight size={24} />
        </div>
      </section>

      {/* Community Alert */}
      <section className="bg-red-50 p-6 rounded-3xl border-2 border-red-100 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-red-600 p-2 rounded-lg text-white">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-xl font-black text-red-600 uppercase tracking-tight">
            {t.communityAlert}
          </h3>
        </div>
        <p className="text-lg font-bold text-gray-700 leading-tight">
          <span className="text-red-600">12+</span> {t.nearbyFarmers} <span className="font-black">Armyworm</span>
        </p>
      </section>

      {/* Main Actions */}
      <div className="grid grid-cols-1 gap-4">
        <Button 
          variant="primary" 
          icon={Camera} 
          onClick={() => setScreen('DIAGNOSIS_CAPTURE')}
          className="h-40 flex-col"
        >
          {t.cropProblem}
        </Button>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            icon={Phone} 
            onClick={() => setScreen('HELP_NEARBY')}
            className="flex-col py-8 text-xl"
          >
            {t.findHelp}
          </Button>
          <Button 
            variant="outline" 
            icon={Mic} 
            onClick={() => setScreen('VOICE')}
            className="flex-col py-8 text-xl"
          >
            {t.askVoice}
          </Button>
        </div>
      </div>

      {/* Offline Toggle for Prototype */}
      <div className="mt-auto pt-8 border-t-2 border-gray-200 flex items-center justify-between">
        <span className="text-gray-500 font-bold">{t.simulateOffline}</span>
        <button 
          onClick={() => setIsOffline(!isOffline)}
          className={`w-16 h-8 rounded-full transition-colors relative ${isOffline ? 'bg-orange-500' : 'bg-gray-300'}`}
        >
          <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isOffline ? 'left-9' : 'left-1'}`} />
        </button>
      </div>
    </ScreenWrapper>
  );

  const renderDiagnosisCapture = () => (
    <ScreenWrapper title={t.checkCrop} onBack={() => setScreen('HOME')}>
      <div className="flex-1 flex flex-col gap-6">
        <div className="aspect-square bg-black rounded-3xl flex items-center justify-center overflow-hidden relative">
          <div className="text-white text-center p-8">
            <Camera size={80} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl font-bold">{t.pointCamera}</p>
          </div>
          {/* Mock Camera Viewfinder */}
          <div className="absolute inset-8 border-2 border-white/50 rounded-2xl pointer-events-none" />
        </div>

        <Button onClick={() => setScreen('DIAGNOSIS_RESULT')} icon={Camera}>
          {t.takePhoto}
        </Button>

        <div className="text-center">
          <p className="text-gray-500 font-bold mb-4">OR</p>
          <button 
            onClick={() => setScreen('DIAGNOSIS_RESULT')}
            className="text-[#1A4D2E] text-2xl font-black underline"
          >
            {t.selectList}
          </button>
        </div>
      </div>
    </ScreenWrapper>
  );

  const renderDiagnosisResult = () => (
    <ScreenWrapper title={t.diagnosis} onBack={() => setScreen('DIAGNOSIS_CAPTURE')}>
      <div className="flex flex-col gap-6">
        <div className="bg-white p-6 rounded-3xl border-4 border-red-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <AlertCircle size={48} className="text-red-600" />
            <h2 className="text-3xl font-black text-red-600">{t.armyworm}</h2>
          </div>
          <p className="text-2xl font-bold text-gray-700 leading-tight mb-6">
            {t.armywormDesc.replace('your crop', `your ${selectedCrop}`)}
          </p>
          <div className="flex items-center gap-4">
            <AudioButton />
            <span className="font-bold text-blue-700">{t.listenThis}</span>
          </div>
        </div>

        <div className="bg-[#1A4D2E] p-6 rounded-3xl text-white">
          <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
            <CheckCircle2 size={32} className="text-[#FFD93D]" />
            {t.whatToDo}
          </h3>
          <ul className="text-xl font-bold space-y-4">
            <li>• {t.buyNeem}</li>
            <li>• {t.sprayMorning}</li>
            <li>• {t.removeLeaves}</li>
          </ul>
        </div>

        <Button onClick={() => setScreen('HELP_NEARBY')} variant="secondary">
          {t.findMedicine}
        </Button>
      </div>
    </ScreenWrapper>
  );

  const renderAdvisory = () => (
    <ScreenWrapper title={t.advice} onBack={() => setScreen('HOME')}>
      <div className="flex flex-col gap-6">
        <div className="bg-[#FFD93D] p-8 rounded-3xl text-center">
          <h2 className="text-5xl font-black text-[#1A4D2E] mb-2">{t.plantNow}</h2>
          <p className="text-2xl font-bold text-[#1A4D2E] opacity-80">{t.bestWeek.replace('your crop', `your ${selectedCrop}`)}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <h3 className="text-2xl font-black px-2">{t.weatherForecast}</h3>
          {[
            { day: t.today, icon: CloudRain, temp: '28°C', desc: t.heavyRain },
            { day: t.tomorrow, icon: CloudRain, temp: '27°C', desc: t.lightRain },
            { day: t.saturday, icon: Sprout, temp: '30°C', desc: t.sunny },
          ].map((w, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl flex items-center justify-between shadow-sm border-2 border-gray-100">
              <div className="flex items-center gap-4">
                <w.icon size={40} className="text-[#1A4D2E]" />
                <div>
                  <p className="text-xl font-black">{w.day}</p>
                  <p className="text-lg font-bold text-gray-500">{w.desc}</p>
                </div>
              </div>
              <p className="text-2xl font-black text-[#1A4D2E]">{w.temp}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 flex items-center gap-4">
          <AudioButton />
          <p className="text-lg font-bold text-blue-800">{t.listenAdvice}</p>
        </div>
      </div>
    </ScreenWrapper>
  );

  const renderHelpNearby = () => (
    <ScreenWrapper title={t.helpNearby} onBack={() => setScreen('HOME')}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 mb-2">
          <button className="flex-1 py-3 bg-[#1A4D2E] text-white rounded-xl font-bold">{t.stores}</button>
          <button className="flex-1 py-3 bg-white text-gray-600 rounded-xl font-bold border-2 border-gray-100">{t.officers}</button>
        </div>

        {[
          { name: 'Baba Agro Store', dist: '2.5 km', type: 'Seeds & Medicine' },
          { name: 'Unity Farming Hub', dist: '4.1 km', type: 'General Supplies' },
          { name: 'Green Field Shop', dist: '5.8 km', type: 'Tools & Fertilizer' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border-2 border-gray-100 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black">{item.name}</h3>
                <p className="text-lg font-bold text-gray-500">{item.type}</p>
                <div className="flex items-center gap-1 text-gray-400 mt-1">
                  <MapPin size={18} />
                  <span className="font-bold">{item.dist} away</span>
                </div>
              </div>
            </div>
            <Button variant="secondary" icon={Phone} onClick={() => {}} className="py-4 text-xl">
              {t.callNow}
            </Button>
          </div>
        ))}
      </div>
    </ScreenWrapper>
  );

  const renderVoice = () => (
    <ScreenWrapper title={t.voiceHelp} onBack={() => setScreen('HOME')}>
      <div className="flex-1 flex flex-col items-center justify-center gap-12">
        <div className="text-center">
          <h2 className="text-4xl font-black mb-4">{t.howHelp}</h2>
          <p className="text-xl font-bold text-gray-500">{t.speakIn}</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: ["0px 0px 0px rgba(26, 77, 46, 0)", "0px 0px 40px rgba(26, 77, 46, 0.4)", "0px 0px 0px rgba(26, 77, 46, 0)"]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-48 h-48 bg-[#1A4D2E] rounded-full flex items-center justify-center text-white shadow-2xl"
        >
          <Mic size={80} />
        </motion.button>

        <div className="w-full bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm flex items-center gap-4">
          <div className="flex-1">
            <p className="text-gray-400 font-bold mb-1">{t.response}</p>
            <p className="text-xl font-bold">"{t.voiceResponse}"</p>
          </div>
          <AudioButton />
        </div>
      </div>
    </ScreenWrapper>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-sans">
      {/* Mobile Frame Simulation */}
      <div className="w-full max-w-md h-screen bg-white relative shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {screen === 'SPLASH' && renderSplash()}
          {screen === 'ONBOARDING' && renderOnboarding()}
          {screen === 'HOME' && renderHome()}
          {screen === 'DIAGNOSIS_CAPTURE' && renderDiagnosisCapture()}
          {screen === 'DIAGNOSIS_RESULT' && renderDiagnosisResult()}
          {screen === 'ADVISORY' && renderAdvisory()}
          {screen === 'HELP_NEARBY' && renderHelpNearby()}
          {screen === 'VOICE' && renderVoice()}
        </AnimatePresence>
      </div>
    </div>
  );
}
