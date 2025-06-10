import React, { useState } from 'react';
import { Spell, AttributeConfig } from '../types';
import AttributeWeightSlider from './AttributeWeightSlider';

interface SpellInputProps {
  attributeConfigs: AttributeConfig[];
  onWeightChange: (attribute: string, weight: number) => void;
  onAttributeToggle: (attribute: string, enabled: boolean) => void;
  onSubmit: (querySpell: Partial<Spell>) => void;
}

const SpellInput: React.FC<SpellInputProps> = ({
  attributeConfigs,
  onWeightChange,
  onAttributeToggle,
  onSubmit
}) => {
  const [querySpell, setQuerySpell] = useState<Partial<Spell>>({});
  
  const handleInputChange = (attribute: keyof Spell, value: any) => {
    setQuerySpell(prev => ({
      ...prev,
      [attribute]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(querySpell);
  };

  const renderInput = (config: AttributeConfig) => {
    const { attribute, type, possibleValues } = config;
    
    if (type === 'boolean') {
      return (
        <select
          id={`input-${attribute}`}
          value={querySpell[attribute] === undefined ? '' : querySpell[attribute] ? 'true' : 'false'}
          onChange={(e) => handleInputChange(attribute, e.target.value === 'true')}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          disabled={!config.enabled}
        >
          <option value="">-- Select --</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      );
    }
    
    if (type === 'numerical') {
      return (
        <input
          type="number"
          id={`input-${attribute}`}
          min={config.minValue}
          max={config.maxValue}
          value={querySpell[attribute] || ''}
          onChange={(e) => handleInputChange(attribute, e.target.value ? parseInt(e.target.value) : '')}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          disabled={!config.enabled}
        />
      );
    }
    
    if (type === 'categorical' && possibleValues) {
      return (
        <select
          id={`input-${attribute}`}
          value={querySpell[attribute] || ''}
          onChange={(e) => handleInputChange(attribute, e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          disabled={!config.enabled}
        >
          <option value="">-- Select --</option>
          {possibleValues.map(value => (
            <option key={value} value={value}>
              {value || '(None)'}
            </option>
          ))}
        </select>
      );
    }
    
    return null;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-indigo-900 mb-6">Find Similar Spells</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Spell Attributes</h3>
            <div className="space-y-4">
              {attributeConfigs.map(config => (
                <div key={config.attribute} className={!config.enabled ? 'opacity-50' : ''}>
                  <label 
                    htmlFor={`input-${config.attribute}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {config.attribute}
                  </label>
                  {renderInput(config)}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Attribute Weights</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {attributeConfigs.map(config => (
                <AttributeWeightSlider
                  key={config.attribute}
                  config={config}
                  onChange={onWeightChange}
                  onToggle={onAttributeToggle}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Find Similar Spells
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpellInput;