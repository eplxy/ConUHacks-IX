export interface Choice {
  text: string;
  next: string; // next scene id
  traitChanges?: TraitChange[]; // ids of the traits that get positively impacted
}

export enum Trait {
  Agreeableness = 1,
  Extroversion = 2,
  Openness = 3,
  Neuroticism = 4,
  Conscientiousness = 5,
}

export interface TraitTracker {
  Agreeableness: number;
  Extroversion: number;
  Openness: number;
  Neuroticism: number;
  Conscientiousness: number;
}

export interface TraitChange {
  trait: Trait;
  change: number; // typically just 1 or -1
}

export interface Line {
  speaker: string;
  text: string;
  choices?: Choice[];
}

export interface Character {
  id: number;
  name: string;
  sprite?: string;
  position?: string;
}

export interface Scene {
  id: string;
  background?: string;
  characters: Character[];
  dialogue: Line[];
}
