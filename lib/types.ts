// types.ts
export interface AnimeResult {
    anilist: {
      id: number;
      idMal: number;
      title: {
        native: string;
        romaji: string;
        english: string | null;
      };
      synonyms: string[];
      isAdult: boolean;
    };
    filename: string;
    episode: number | null;
    from: number;
    to: number;
    similarity: number;
    video: string;
    image: string;
  }
  
  export interface AnimeDetails {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    title: string;
    title_english: string | null;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: {
      from: string;
      to: string;
      prop: {
        from: { day: number; month: number; year: number };
        to: { day: number; month: number; year: number };
      };
      string: string;
    };
    duration: string;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: string;
    year: number;
    broadcast: {
      day: string | null;
      time: string | null;
      timezone: string | null;
      string: string;
    };
    producers: Array<{ mal_id: number; type: string; name: string; url: string }>;
    licensors: Array<{ mal_id: number; type: string; name: string; url: string }>;
    studios: Array<{ mal_id: number; type: string; name: string; url: string }>;
    genres: Array<{ mal_id: number; type: string; name: string; url: string }>;
    explicit_genres: Array<{ mal_id: number; type: string; name: string; url: string }>;
    themes: Array<{ mal_id: number; type: string; name: string; url: string }>;
    demographics: Array<{ mal_id: number; type: string; name: string; url: string }>;
  }