import React from 'react';
import { Spell } from '../types';

interface SpellCardProps {
  spell: Spell;
  similarity: number;
  isQuerySpell?: boolean;
  highlightedAttributes?: (keyof Spell)[];
}

const SpellCard: React.FC<SpellCardProps> = ({ 
  spell, 
  similarity, 
  isQuerySpell = false,
  highlightedAttributes = []
}) => {
  // Function to get color based on school
  const getSchoolColor = (school: string): string => {
    const schoolColors: Record<string, string> = {
      'Abjuration': 'bg-blue-100 text-blue-800',
      'Conjuration': 'bg-amber-100 text-amber-800',
      'Divination': 'bg-indigo-100 text-indigo-800',
      'Enchantment': 'bg-pink-100 text-pink-800',
      'Evocation': 'bg-red-100 text-red-800',
      'Illusion': 'bg-purple-100 text-purple-800',
      'Necromancy': 'bg-gray-100 text-gray-800',
      'Transmutation': 'bg-green-100 text-green-800'
    };
    
    return schoolColors[school] || 'bg-gray-100 text-gray-800';
  };

  // Format property name for display
  const formatPropertyName = (name: string): string => {
    return name.replace(/([A-Z])/g, ' $1').trim();
  };

  // Determine if an attribute should be highlighted
  const shouldHighlight = (attribute: keyof Spell): boolean => {
    return highlightedAttributes.includes(attribute);
  };

  return (
    <div className={`border rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
      isQuerySpell 
        ? 'bg-indigo-50 border-indigo-300' 
        : 'bg-white hover:shadow-lg'
    }`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{spell.Name}</h3>
          
          {!isQuerySpell && (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold">
                  {Math.round(similarity * 100)}%
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`text-xs px-2 py-1 rounded-full ${getSchoolColor(spell.School)}`}>
            {spell.School}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
            Level {spell.Level}
          </span>
          {spell.Ritual && (
            <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
              Ritual
            </span>
          )}
          {spell.Concentration && (
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
              Concentration
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(spell).map(([key, value]) => {
            // Skip certain fields from the detailed list
            if (['Name', 'Description'].includes(key)) return null;
            
            const isHighlighted = shouldHighlight(key as keyof Spell);
            
            return (
              <div 
                key={key} 
                className={`py-1 ${
                  isHighlighted 
                    ? 'bg-yellow-100 px-2 rounded' 
                    : ''
                }`}
              >
                <span className="font-medium text-gray-700">{formatPropertyName(key)}:</span>{' '}
                <span className="text-gray-900">
                  {typeof value === 'boolean' 
                    ? (value ? 'Yes' : 'No')
                    : value === '' ? '-' : value.toString()}
                </span>
              </div>
            );
          })}
        </div>
        
        {spell.Description && (
          <div className="mt-3 border-t pt-3 text-sm text-gray-700">
            <p>{spell.Description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpellCard;