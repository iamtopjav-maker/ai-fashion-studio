
import React, { useState, useRef, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import ModelSelector from './components/ModelSelector';
import GenerationGallery from './components/GenerationGallery';
import ApiKeyInput from './components/ApiKeyInput';
import { AppStatus, GeneratedImage, Language } from './types';
import { MODEL_PERSONAS, CAMERA_ANGLES, STUDIO_PROPS, LIGHTING_STYLES, POSES } from './constants';
import { generateFashionImage } from './services/geminiService';
import { translations } from './translations';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string>(MODEL_PERSONAS[0].id);
  const [cameraAngle, setCameraAngle] = useState<string>(CAMERA_ANGLES[0]);
  const [studioProp, setStudioProp] = useState<string>(STUDIO_PROPS[0]);
  const [lightingStyle, setLightingStyle] = useState<string>(LIGHTING_STYLES[0]);
  const [isAutoRandom, setIsAutoRandom] = useState<boolean>(true);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('VN');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [userApiKey, setUserApiKey] = useState<string>('');
  const settingsRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGenerate = async () => {
    if (!clothingImage) {
      setError(t.uploadError);
      return;
    }

    setStatus(AppStatus.GENERATING);
    setError(null);

    const modelPersona = MODEL_PERSONAS.find(m => m.id === selectedModelId);
    if (!modelPersona) return;

    let finalCameraAngle = cameraAngle;
    let finalStudioProp = studioProp;
    let finalLightingStyle = lightingStyle;
    let finalPose = POSES[0];

    if (isAutoRandom) {
      finalCameraAngle = CAMERA_ANGLES[Math.floor(Math.random() * CAMERA_ANGLES.length)];
      finalStudioProp = STUDIO_PROPS[Math.floor(Math.random() * STUDIO_PROPS.length)];
      finalLightingStyle = LIGHTING_STYLES[Math.floor(Math.random() * LIGHTING_STYLES.length)];
      finalPose = POSES[Math.floor(Math.random() * POSES.length)];
      setCameraAngle(finalCameraAngle);
      setStudioProp(finalStudioProp);
      setLightingStyle(finalLightingStyle);
    } else {
      finalPose = POSES[Math.floor(Math.random() * POSES.length)];
    }

    try {
      const imageUrl = await generateFashionImage(
        clothingImage,
        modelPersona.description,
        finalCameraAngle,
        finalStudioProp,
        finalLightingStyle,
        finalPose,
        userApiKey.trim()
      );

      const newImage: GeneratedImage = {
        id: Math.random().toString(36).substr(2, 9),
        url: imageUrl,
        prompt: `${finalCameraAngle} • ${finalLightingStyle}`,
        timestamp: Date.now()
      };

      setHistory(prev => [newImage, ...prev]);
      setStatus(AppStatus.IDLE);
    } catch (err) {
      setError(t.genericError);
      setStatus(AppStatus.ERROR);
    }
  };

  const renderOption = (label: string, options: string[], value: string, setter: (v: string) => void, disabled: boolean) => (
    <div className={`space-y-1.5 sm:space-y-2 transition-all ${disabled ? 'opacity-30 pointer-events-none' : ''}`}>
      <span className="text-[7px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      <div className="flex flex-wrap gap-1 sm:gap-1.5">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => setter(opt)}
            className={`px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-lg text-[8px] sm:text-[10px] font-semibold border transition-all ${
              value === opt ? 'bg-black border-black text-white' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
            }`}
          >
            {opt.split(' (')[0]}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#fcfcfc]">
      {/* Universal Unified Header - Tightened for Mobile */}
      <header className="glass h-12 sm:h-16 border-b border-gray-100 px-4 sm:px-8 flex items-center justify-between z-50 shrink-0 flex-nowrap">
        {/* Left: Branding */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-lg sm:rounded-xl flex items-center justify-center">
            <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-white/40 -rotate-12 translate-x-0.5" />
            <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-white -rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold tracking-tight leading-none">{t.title}</span>
            <span className="text-[6px] sm:text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 sm:mt-1">{t.subtitle}</span>
          </div>
        </div>

        {/* Right: Unified Status & Config Bar - Single Row */}
        <div className="flex items-center space-x-3 sm:space-x-6 flex-nowrap shrink-0">
          <div className="flex items-center space-x-1.5 sm:space-x-3 border-r border-gray-100 pr-3 sm:pr-6 shrink-0">
             <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full animate-pulse" />
             <span className="text-[7px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">{t.engineReady}</span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-6 flex-nowrap shrink-0">
            <div className="shrink-0">
              <ApiKeyInput value={userApiKey} onChange={setUserApiKey} language={language} />
            </div>

            <div className="relative shrink-0" ref={settingsRef}>
              <button 
                onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
                className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-colors ${isSettingsOpen ? 'bg-gray-100 text-black' : 'text-gray-400 hover:bg-gray-50 hover:text-black'}`}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </button>
              {isSettingsOpen && (
                <div className="absolute right-0 mt-2 sm:mt-3 w-32 sm:w-40 bg-white border border-gray-100 rounded-xl sm:rounded-2xl shadow-2xl p-1 sm:p-1.5 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-2 sm:px-3 py-1 mb-0.5 sm:mb-1">
                    <span className="text-[7px] sm:text-[8px] font-bold text-gray-400 uppercase tracking-widest">Lang</span>
                  </div>
                  <button onClick={() => { setLanguage('VN'); setIsSettingsOpen(false); }} className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-bold uppercase rounded-lg sm:rounded-xl transition-colors ${language === 'VN' ? 'bg-gray-900 text-white' : 'hover:bg-gray-50'}`}>VN</button>
                  <button onClick={() => { setLanguage('EN'); setIsSettingsOpen(false); }} className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-bold uppercase rounded-lg sm:rounded-xl transition-colors mt-0.5 ${language === 'EN' ? 'bg-gray-900 text-white' : 'hover:bg-gray-50'}`}>EN</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Body - Horizontal Row Maintained */}
      <div className="flex flex-row flex-1 overflow-hidden flex-nowrap">
        {/* Left Sidebar: Smaller Width on Mobile */}
        <aside className="w-[180px] sm:w-[360px] border-r border-gray-100 bg-white p-4 sm:p-8 flex flex-col space-y-6 sm:space-y-10 overflow-y-auto custom-scrollbar shrink-0">
          <ImageUploader onImageSelect={setClothingImage} selectedImage={clothingImage} language={language} />
          <ModelSelector selectedModelId={selectedModelId} onModelSelect={setSelectedModelId} language={language} />

          <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-[8px] sm:text-[10px] font-bold text-gray-900 uppercase tracking-widest">{t.studioConfig}</span>
              <button 
                onClick={() => setIsAutoRandom(!isAutoRandom)}
                className={`p-1 px-2 sm:p-1.5 sm:px-3 rounded-md sm:rounded-lg border transition-all flex items-center space-x-1 sm:space-x-2 ${isAutoRandom ? 'bg-black border-black text-white' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
              >
                <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-widest">{t.random}</span>
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {renderOption(t.cameraAngle, CAMERA_ANGLES, cameraAngle, setCameraAngle, isAutoRandom)}
              {renderOption(t.props, STUDIO_PROPS, studioProp, setStudioProp, isAutoRandom)}
              {renderOption(t.lighting, LIGHTING_STYLES, lightingStyle, setLightingStyle, isAutoRandom)}
            </div>
          </div>

          <div className="pt-4 sm:pt-8 mt-auto shrink-0">
            {error && <p className="text-[9px] sm:text-[10px] text-red-500 font-medium mb-2 sm:mb-3">{error}</p>}
            <button
              onClick={handleGenerate}
              disabled={status === AppStatus.GENERATING}
              className={`w-full py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-[9px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-all shadow-lg sm:shadow-xl ${
                status === AppStatus.GENERATING ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:scale-[1.02] active:scale-95 shadow-black/10'
              }`}
            >
              {status === AppStatus.GENERATING ? t.processing : t.generateBtn}
            </button>
          </div>
        </aside>

        {/* Right Content: Optimized Gallery Spacing */}
        <main className="flex-1 bg-[#fcfcfc] overflow-y-auto custom-scrollbar px-6 py-8 sm:px-16 sm:py-12 shrink-0">
          <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
            <div className="space-y-0.5 sm:space-y-1 border-b border-gray-100 pb-4 sm:pb-8">
              <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">{t.gallery}</h1>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide">{t.galleryDesc}</p>
            </div>
            
            <GenerationGallery images={history} isGenerating={status === AppStatus.GENERATING} language={language} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
