import { AttributeConfig } from '../types';

// Configuration for all spell attributes
export const attributeConfig: AttributeConfig[] = [
  {
    attribute: 'Level',
    type: 'numerical',
    minValue: 0,
    maxValue: 9,
    weight: 1,
    enabled: true
  },
  {
    attribute: 'School',
    type: 'categorical',
    possibleValues: ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'],
    weight: 1,
    enabled: true
  },
  {
    attribute: 'CastingTime',
    type: 'categorical',
    possibleValues: ['1 Action', '1 Bonus Action', '1 Minute', '1 Reaction', '1 Hour', '10 Minutes', 'Special', '8 Hours', '24 Hours', '12 Hours'],
    weight: 0.7,
    enabled: true
  },
  {
    attribute: 'Duration',
    type: 'categorical',
    possibleValues: ['Instantaneous', '1 Round', '1 Minute', '8 Hours', '1 Hour', '10 Minutes', '24 Hours', '10 Days', 'Until Dispelled', 'Until Dispelled or Triggered', '7 Days', 'Special', '30 Days', '1 Day', '2 Hours', '6 Rounds'],
    weight: 0.7,
    enabled: true
  },
  {
    attribute: 'Range',
    type: 'categorical',
    possibleValues: ['60 ft', 'Self', 'Self (5 ft)', '120 ft', '30 ft', 'Touch', 'Self (15 ft)', '10 ft', '5 ft', '90 ft', 'Self (30 ft)', '300 ft', 'Sight', '150 ft', '1 mile', 'Unlimited', '500 ft', '120 ft (20 ft )', 'Self (60 ft )', '20 ft', '100 ft', '500 miles', 'Touch (60 ft )', '150 ft (60 ft )', '1,000 ft'],
    weight: 0.6,
    enabled: true
  },
  {
    attribute: 'Verbal',
    type: 'boolean',
    weight: 0.3,
    enabled: true
  },
  {
    attribute: 'Somatic',
    type: 'boolean',
    weight: 0.3,
    enabled: true
  },
  {
    attribute: 'Ritual',
    type: 'boolean',
    weight: 0.5,
    enabled: true
  },
  {
    attribute: 'Concentration',
    type: 'boolean',
    weight: 0.5,
    enabled: true
  },
  {
    attribute: 'Attack',
    type: 'categorical',
    possibleValues: ['Melee', 'Ranged', ''],
    weight: 0.8,
    enabled: true
  },
  {
    attribute: 'Save',
    type: 'categorical',
    possibleValues: ['CON Save', 'STR Save', 'CHA Save', 'WIS Save', 'DEX Save', 'INT Save', ''],
    weight: 0.8,
    enabled: true
  },
  {
    attribute: 'DamageEffect',
    type: 'categorical',
    possibleValues: ['Acid', 'Combat', 'Thunder', 'Necrotic', 'Control', 'Fire', 'Utility', 'Force', 'Creation', 'Buff', 'Cold', 'Poison', 'Lightning', 'Bludgeoning', 'Communication', 'Psychic', 'Radiant', 'Healing', 'Piercing', 'Foreknowledge', 'Detection', 'Charmed', 'Debuff', 'Frightened', 'Blinded', 'Prone', 'Social', 'Shapechanging', ''],
    weight: 0.9,
    enabled: true
  }
];