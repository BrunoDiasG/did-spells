import React, { useState, useEffect } from 'react';
import { Spell, AttributeConfig } from './types';
import { attributeConfig as defaultAttributeConfig } from './config/attributeConfig';
import { calculateSimilarity } from './utils/similarityMetrics';
import { loadSpellsFromCSV, dummySpells } from './utils/csvParser';
import SpellInput from './components/SpellInput';
import ResultsView from './components/ResultsView';
import { WandIcon as MagicWandIcon } from 'lucide-react';

function App() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attributeConfigs, setAttributeConfigs] = useState<AttributeConfig[]>(defaultAttributeConfig);
  const [querySpell, setQuerySpell] = useState<Partial<Spell>>({});
  const [results, setResults] = useState<Array<{ spell: Spell; similarity: number }>>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // For development, we'll use the dummy data
    // In a real app, we would load from the CSV file
    const fetchData = async () => {
      try {
        // Use dummy data for now - in a real implementation, replace with:
        // const loadedSpells = await loadSpellsFromCSV('/path/to/spells.csv');
        setSpells(dummySpells);
        setLoading(false);
      } catch (err) {
        setError('Failed to load spell data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleWeightChange = (attribute: string, weight: number) => {
    setAttributeConfigs(prev => 
      prev.map(config => 
        config.attribute === attribute 
          ? { ...config, weight } 
          : config
      )
    );
  };

  const handleAttributeToggle = (attribute: string, enabled: boolean) => {
    setAttributeConfigs(prev => 
      prev.map(config => 
        config.attribute === attribute 
          ? { ...config, enabled } 
          : config
      )
    );
  };

  const handleSubmit = (newQuerySpell: Partial<Spell>) => {
    setQuerySpell(newQuerySpell);
    
    // Calculate similarities
    const weights = attributeConfigs.reduce((acc, config) => {
      acc[config.attribute] = config.enabled ? config.weight : 0;
      return acc;
    }, {} as Record<keyof Spell, number>);
    
    const calculatedResults = spells.map(spell => ({
      spell,
      similarity: calculateSimilarity(newQuerySpell, spell, weights)
    }))
    .sort((a, b) => b.similarity - a.similarity);
    
    setResults(calculatedResults);
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-lg text-gray-700">Loading spell database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <MagicWandIcon className="h-10 w-10 text-amber-400 mr-2" />
            <h1 className="text-4xl font-bold text-white">D&D Spell Finder</h1>
          </div>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            Case-Based Reasoning system to find D&D spells similar to your criteria.
            Adjust weights to prioritize specific attributes in the similarity calculation.
          </p>
        </header>
        
        <main className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {!showResults ? (
            <SpellInput 
              attributeConfigs={attributeConfigs}
              onWeightChange={handleWeightChange}
              onAttributeToggle={handleAttributeToggle}
              onSubmit={handleSubmit}
            />
          ) : (
            <ResultsView 
              querySpell={querySpell}
              results={results}
              onBack={handleBack}
            />
          )}
        </main>
        
        <footer className="mt-8 text-center text-indigo-200 text-sm">
          <p>D&D Spell Finder - Case-Based Reasoning Prototype</p>
        </footer>
      </div>
    </div>
  );
}

export default App;