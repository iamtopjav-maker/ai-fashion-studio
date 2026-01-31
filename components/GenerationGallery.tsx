
import React from 'react';
import { GeneratedImage, Language } from '../types';
import { translations } from '../translations';

interface GenerationGalleryProps {
  images: GeneratedImage[];
  isGenerating: boolean;
  language: Language;
}

const GenerationGallery: React.FC<GenerationGalleryProps> = ({ images, isGenerating, language }) => {
  const t = translations[language];

  if (images.length === 0 && !isGenerating) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-30">
        <svg className="w-10 h-10 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-[13px] font-medium tracking-tight">{t.emptyStudio}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 pb-20">
      {isGenerating && (
        <div className="aspect-[9/16] bg-gray-50 rounded-[32px] flex flex-col items-center justify-center border border-gray-100 animate-pulse">
          <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {images.map((image) => (
        <div key={image.id} className="group relative aspect-[9/16] bg-white rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100/50">
          <img 
            src={image.url} 
            alt="AI Visual" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-8 text-center space-y-6">
             <div className="space-y-2">
               <p className="text-white/60 text-[9px] uppercase font-bold tracking-[0.2em]">{t.studioSettings}</p>
               <p className="text-white text-[11px] font-medium leading-relaxed">{image.prompt}</p>
             </div>
             
             <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = image.url;
                  link.download = `fashion-${image.id}.png`;
                  link.click();
                }}
                className="bg-white text-black px-6 py-2.5 rounded-full text-[11px] font-bold shadow-xl hover:scale-105 transition-transform"
             >
                {t.downloadHd}
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GenerationGallery;
