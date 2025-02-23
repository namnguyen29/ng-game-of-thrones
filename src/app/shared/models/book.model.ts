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
  name: string | null;
  fromReleaseDate: Date | null | string;
  toReleaseDate: Date | null | string;
}>;
