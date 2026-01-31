
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface ApiKeyInputProps {
  value: string;
  onChange: (val: string) => void;
  language: Language;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ value, onChange, language }) => {
  const t = translations[language];

  return (
    <div className="flex flex-col items-end space-y-0.5">
      <label className="text-[7px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-widest px-1">
        {t.apiKeyLabel}
      </label>
      <div className="relative group">
        <input
          type="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="bg-white border border-gray-100 rounded-md sm:rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-[11px] w-24 sm:w-48 focus:w-32 sm:focus:w-64 transition-all duration-300 outline-none focus:border-black focus:ring-2 sm:focus:ring-4 focus:ring-black/5 placeholder-gray-200 shadow-sm"
        />
        {value && (
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default ApiKeyInput;
