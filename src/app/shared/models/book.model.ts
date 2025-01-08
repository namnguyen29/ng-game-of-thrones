export interface Book {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
  characters: string[];
  povCharacters: string[];
}

export type BookFilter = Partial<{
  name: string;
  fromReleaseDate: Date;
  toReleaseDate: Date;
}>;
