export interface Spell {
  Name: string;
  Level: number;
  School: string;
  CastingTime: string;
  Duration: string;
  Range: string;
  Verbal: boolean;
  Somatic: boolean;
  Ritual: boolean;
  Concentration: boolean;
  Attack: string;
  Save: string;
  DamageEffect: string;
  Description?: string;
}

export interface AttributeWeight {
  attribute: keyof Spell;
  weight: number;
  enabled: boolean;
}

export interface AttributeConfig {
  attribute: keyof Spell;
  type: 'categorical' | 'numerical' | 'boolean';
  possibleValues?: string[];
  minValue?: number;
  maxValue?: number;
  weight: number;
  enabled: boolean;
}