import { Spell } from '../types';
import { attributeConfig } from '../config/attributeConfig';

// Calculate similarity between two boolean values
export function booleanSimilarity(value1: boolean, value2: boolean): number {
  return value1 === value2 ? 1 : 0;
}

// Calculate similarity between two numerical values
export function numericalSimilarity(value1: number, value2: number, min: number, max: number): number {
  if (min === max) return 1;
  return 1 - Math.abs(value1 - value2) / (max - min);
}

// Calculate similarity between two categorical values
export function categoricalSimilarity(value1: string, value2: string): number {
  return value1 === value2 ? 1 : 0;
}

// Calculate overall similarity between two spells based on weights
export function calculateSimilarity(targetSpell: Partial<Spell>, compareSpell: Spell, weights: Record<keyof Spell, number>): number {
  let totalSimilarity = 0;
  let totalWeight = 0;

  for (const config of attributeConfig) {
    const { attribute, type, minValue, maxValue } = config;
    
    // Skip attributes that don't exist in the target spell (user didn't specify them)
    if (targetSpell[attribute] === undefined || targetSpell[attribute] === null || targetSpell[attribute] === '') {
      continue;
    }

    const weight = weights[attribute] || 0;
    if (weight <= 0) continue;

    let similarity = 0;
    const targetValue = targetSpell[attribute];
    const compareValue = compareSpell[attribute];

    if (type === 'boolean') {
      similarity = booleanSimilarity(targetValue as boolean, compareValue as boolean);
    } else if (type === 'numerical') {
      similarity = numericalSimilarity(
        targetValue as number, 
        compareValue as number, 
        minValue || 0, 
        maxValue || 0
      );
    } else if (type === 'categorical') {
      similarity = categoricalSimilarity(targetValue as string, compareValue as string);
    }

    totalSimilarity += similarity * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? (totalSimilarity / totalWeight) : 0;
}