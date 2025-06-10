import React from 'react';
import { AttributeConfig } from '../types';

interface AttributeWeightSliderProps {
  config: AttributeConfig;
  onChange: (attribute: string, value: number) => void;
  onToggle: (attribute: string, enabled: boolean) => void;
}

const AttributeWeightSlider: React.FC<AttributeWeightSliderProps> = ({ 
  config, 
  onChange, 
  onToggle 
}) => {
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(config.attribute, parseFloat(e.target.value));
  };

  const handleToggle = () => {
    onToggle(config.attribute, !config.enabled);
  };

  return (
    <div className="mb-4 p-3 bg-purple-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id={`toggle-${config.attribute}`}
            checked={config.enabled}
            onChange={handleToggle}
            className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label 
            htmlFor={`toggle-${config.attribute}`}
            className="font-medium text-gray-700"
          >
            {config.attribute}
          </label>
        </div>
        <span className="text-sm font-semibold text-indigo-700">
          {config.weight.toFixed(1)}
        </span>
      </div>
      
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={config.weight}
        onChange={handleWeightChange}
        disabled={!config.enabled}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-50"
      />
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>0</span>
        <span>0.5</span>
        <span>1</span>
      </div>
    </div>
  );
};

export default AttributeWeightSlider;