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

type Screen = 
  | 'SPLASH' 
  | 'ONBOARDING' 
  | 'HOME' 
  | 'DIAGNOSIS_CAPTURE' 
  | 'DIAGNOSIS_RESULT' 
  | 'ADVISORY' 
  | 'HELP_NEARBY' 
  | 'VOICE';

type Language = 'English' | 'Pidgin' | 'Hausa' | 'Yoruba' | 'Igbo';
type Crop = 'Maize' | 'Cassava' | 'Rice' | 'Yam' | 'Other';

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
        <p className="text-xl opacity-80 font-medium">Farming Support for You</p>
      </motion.div>
    </div>
  );

  const renderOnboarding = () => (
    <ScreenWrapper title="Welcome">
      <div className="flex-1 flex flex-col gap-8">
        <section>
          <h2 className="text-3xl font-black mb-4">Choose Language</h2>
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
          <h2 className="text-3xl font-black mb-4">Main Crop</h2>
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
          Start Now
        </Button>
      </div>
    </ScreenWrapper>
  );

  const renderHome = () => (
    <ScreenWrapper showOffline={isOffline}>
      {/* Weather Card */}
      <section 
        onClick={() => setScreen('ADVISORY')}
        className="bg-[#FFD93D] p-6 rounded-3xl shadow-md cursor-pointer active:scale-95 transition-transform"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-4xl font-black text-[#1A4D2E]">PLANT NOW</h3>
            <p className="text-xl font-bold text-[#1A4D2E] opacity-80">Rain is coming soon</p>
          </div>
          <CloudRain size={64} className="text-[#1A4D2E]" />
        </div>
        <div className="flex items-center gap-2 text-[#1A4D2E] font-black text-lg">
          <span>See details</span>
          <ChevronRight size={24} />
        </div>
      </section>

      {/* Main Actions */}
      <div className="grid grid-cols-1 gap-4">
        <Button 
          variant="primary" 
          icon={Camera} 
          onClick={() => setScreen('DIAGNOSIS_CAPTURE')}
          className="h-40 flex-col"
        >
          My crop has a problem
        </Button>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            icon={Phone} 
            onClick={() => setScreen('HELP_NEARBY')}
            className="flex-col py-8 text-xl"
          >
            Find Help
          </Button>
          <Button 
            variant="outline" 
            icon={Mic} 
            onClick={() => setScreen('VOICE')}
            className="flex-col py-8 text-xl"
          >
            Ask Voice
          </Button>
        </div>
      </div>

      {/* Offline Toggle for Prototype */}
      <div className="mt-auto pt-8 border-t-2 border-gray-200 flex items-center justify-between">
        <span className="text-gray-500 font-bold">Simulate Offline</span>
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
    <ScreenWrapper title="Check Crop" onBack={() => setScreen('HOME')}>
      <div className="flex-1 flex flex-col gap-6">
        <div className="aspect-square bg-black rounded-3xl flex items-center justify-center overflow-hidden relative">
          <div className="text-white text-center p-8">
            <Camera size={80} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl font-bold">Point camera at the sick leaf</p>
          </div>
          {/* Mock Camera Viewfinder */}
          <div className="absolute inset-8 border-2 border-white/50 rounded-2xl pointer-events-none" />
        </div>

        <Button onClick={() => setScreen('DIAGNOSIS_RESULT')} icon={Camera}>
          Take Photo
        </Button>

        <div className="text-center">
          <p className="text-gray-500 font-bold mb-4">OR</p>
          <button 
            onClick={() => setScreen('DIAGNOSIS_RESULT')}
            className="text-[#1A4D2E] text-2xl font-black underline"
          >
            Select from list
          </button>
        </div>
      </div>
    </ScreenWrapper>
  );

  const renderDiagnosisResult = () => (
    <ScreenWrapper title="Diagnosis" onBack={() => setScreen('DIAGNOSIS_CAPTURE')}>
      <div className="flex flex-col gap-6">
        <div className="bg-white p-6 rounded-3xl border-4 border-red-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <AlertCircle size={48} className="text-red-600" />
            <h2 className="text-3xl font-black text-red-600">Armyworm</h2>
          </div>
          <p className="text-2xl font-bold text-gray-700 leading-tight mb-6">
            Small worms are eating your {selectedCrop}. They will destroy the plant if not stopped.
          </p>
          <div className="flex items-center gap-4">
            <AudioButton />
            <span className="font-bold text-blue-700">Listen to this</span>
          </div>
        </div>

        <div className="bg-[#1A4D2E] p-6 rounded-3xl text-white">
          <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
            <CheckCircle2 size={32} className="text-[#FFD93D]" />
            What to do:
          </h3>
          <ul className="text-xl font-bold space-y-4">
            <li>• Buy "Neem Oil" spray</li>
            <li>• Spray early in the morning</li>
            <li>• Remove badly sick leaves</li>
          </ul>
        </div>

        <Button onClick={() => setScreen('HELP_NEARBY')} variant="secondary">
          Find medicine nearby
        </Button>
      </div>
    </ScreenWrapper>
  );

  const renderAdvisory = () => (
    <ScreenWrapper title="Advice" onBack={() => setScreen('HOME')}>
      <div className="flex flex-col gap-6">
        <div className="bg-[#FFD93D] p-8 rounded-3xl text-center">
          <h2 className="text-5xl font-black text-[#1A4D2E] mb-2">PLANT NOW</h2>
          <p className="text-2xl font-bold text-[#1A4D2E] opacity-80">This is the best week for {selectedCrop}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <h3 className="text-2xl font-black px-2">Weather Forecast</h3>
          {[
            { day: 'Today', icon: CloudRain, temp: '28°C', desc: 'Heavy Rain' },
            { day: 'Tomorrow', icon: CloudRain, temp: '27°C', desc: 'Light Rain' },
            { day: 'Saturday', icon: Sprout, temp: '30°C', desc: 'Sunny' },
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
          <p className="text-lg font-bold text-blue-800">Listen to full farming advice for this week</p>
        </div>
      </div>
    </ScreenWrapper>
  );

  const renderHelpNearby = () => (
    <ScreenWrapper title="Help Nearby" onBack={() => setScreen('HOME')}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 mb-2">
          <button className="flex-1 py-3 bg-[#1A4D2E] text-white rounded-xl font-bold">Stores</button>
          <button className="flex-1 py-3 bg-white text-gray-600 rounded-xl font-bold border-2 border-gray-100">Officers</button>
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
              Call Now
            </Button>
          </div>
        ))}
      </div>
    </ScreenWrapper>
  );

  const renderVoice = () => (
    <ScreenWrapper title="Voice Help" onBack={() => setScreen('HOME')}>
      <div className="flex-1 flex flex-col items-center justify-center gap-12">
        <div className="text-center">
          <h2 className="text-4xl font-black mb-4">How can I help?</h2>
          <p className="text-xl font-bold text-gray-500">Speak in {language}</p>
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
            <p className="text-gray-400 font-bold mb-1">Response:</p>
            <p className="text-xl font-bold">"Wait for 2 days before you spray your maize."</p>
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
