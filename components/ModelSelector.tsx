
import React from 'react';
import { MODEL_PERSONAS } from '../constants';
import { Language } from '../types';
import { translations } from '../translations';

interface ModelSelectorProps {
  selectedModelId: string;
  onModelSelect: (id: string) => void;
  language: Language;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModelId, onModelSelect, language }) => {
  const t = translations[language];

  return (
    <div className="space-y-1.5 sm:space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-gray-400 uppercase">{t.modelLock}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {MODEL_PERSONAS.map((model) => (
          <button
            key={model.id}
            onClick={() => onModelSelect(model.id)}
            className={`relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300 ${
              selectedModelId === model.id 
                ? 'border-black ring-1 sm:ring-2 ring-black/5 shadow-md' 
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img 
              src={model.thumbnail} 
              alt={model.name} 
              className="w-full h-full object-cover grayscale-[0.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-1.5 left-1.5 sm:bottom-3 sm:left-3">
              <p className="text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">{model.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;
