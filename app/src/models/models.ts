export type Character {
  name: string;
  sprite: string;
  position: string;
}

export type Choice {
  text: string;
  next: string;
}

export type Dialogue {
  speaker: string;
  text: string;
  choices?: Choice[];
}

export type Scene {
  id: string;
  background: string;
  characters: Character[];
  dialogue: Dialogue[];
}