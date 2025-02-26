export interface Character {
  url: string;
  name: string;
  gender: string;
  culture: string;
  born: string;
  died: string;
  titles: string[];
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: string[];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
  playedBy: string[];
}

export type CharacterFilter = Partial<{
  name: string;
  gender: string;
  culture: string;
  born: string;
  died: string;
  isAlive: boolean;
}>;
