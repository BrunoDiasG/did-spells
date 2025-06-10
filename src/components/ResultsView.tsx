import React from 'react';
import { Spell } from '../types';
import SpellCard from './SpellCard';

interface ResultsViewProps {
  querySpell: Partial<Spell>;
  results: Array<{ spell: Spell; similarity: number }>;
  onBack: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ querySpell, results, onBack }) => {
  // Helper function to determine which attributes should be highlighted
  const getHighlightedAttributes = (spell: Spell): (keyof Spell)[] => {
    const highlightedAttributes: (keyof Spell)[] = [];
    
    Object.keys(querySpell).forEach(key => {
      const typedKey = key as keyof Spell;
      if (
        querySpell[typedKey] !== undefined && 
        querySpell[typedKey] !== '' && 
        spell[typedKey] === querySpell[typedKey]
      ) {
        highlightedAttributes.push(typedKey);
      }
    });
    
    return highlightedAttributes;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">Results</h2>
        <button
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
        >
          ← Back to Search
        </button>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Query</h3>
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
            {Object.entries(querySpell).map(([key, value]) => {
              if (value === undefined || value === '') return null;
              
              return (
                <div key={key} className="bg-white rounded p-2 shadow-sm">
                  <span className="font-medium text-gray-700">{key}:</span>{' '}
                  <span className="text-indigo-700 font-semibold">
                    {typeof value === 'boolean' 
                      ? (value ? 'Yes' : 'No')
                      : value.toString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Spells Sorted by Similarity ({results.length})
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map(({ spell, similarity }) => (
          <SpellCard
            key={spell.Name}
            spell={spell}
            similarity={similarity}
            highlightedAttributes={getHighlightedAttributes(spell)}
          />
        ))}
      </div>
      
      {results.length === 0 && (
        <div className="text-center p-8">
          <p className="text-gray-500">No spells found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsView;