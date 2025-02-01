export interface Choice {
  text: string;
  next: string; // next scene id
}

export interface Line {
  speaker: string;
  text: string;
  choices?: Choice[];
}

export interface Character {
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
