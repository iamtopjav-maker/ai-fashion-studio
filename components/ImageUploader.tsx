
import React, { useRef } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
  selectedImage: string | null;
  language: Language;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, selectedImage, language }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[language];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-1.5 sm:space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-gray-400 uppercase">{t.design}</span>
        {selectedImage && (
          <button 
            onClick={() => onImageSelect('')}
            className="text-[8px] sm:text-[10px] font-bold text-gray-400 hover:text-black transition-colors uppercase"
          >
            {t.change}
          </button>
        )}
      </div>
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`group relative aspect-[4/3] rounded-xl sm:rounded-2xl border transition-all duration-300 flex items-center justify-center cursor-pointer overflow-hidden ${
          selectedImage ? 'bg-white border-gray-100' : 'bg-gray-50 border-gray-100 hover:border-gray-300 hover:bg-white'
        }`}
      >
        {selectedImage ? (
          <img 
            src={selectedImage} 
            alt="Reference" 
            className="w-full h-full object-contain p-1 sm:p-2"
          />
        ) : (
          <div className="text-center space-y-1 sm:space-y-2 opacity-40 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            <p className="text-[9px] sm:text-[11px] font-medium text-gray-900">{t.addProduct}</p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
      </div>
    </div>
  );
};

export default ImageUploader;
