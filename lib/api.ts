// api.ts
import { AnimeResult, AnimeDetails } from '../lib/types';

export const searchAnime = async (input: string | File): Promise<AnimeResult[]> => {
  let url: string;
  let options: RequestInit = {
    method: 'GET',
  };

  if (typeof input === 'string') {
    // Si l'entrée est une URL
    url = `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(input)}`;
  } else {
    // Si l'entrée est un fichier
    url = 'https://api.trace.moe/search';
    const formData = new FormData();
    formData.append('image', input);
    options = {
      method: 'POST',
      body: formData,
    };
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('Failed to search anime');
  }

  const data = await response.json();
  return data.result;
};

export const getAnimeDetails = async (malId: number): Promise<AnimeDetails> => {
  const response = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);

  if (!response.ok) {
    throw new Error('Failed to get anime details');
  }

  const data = await response.json();
  return data.data;
};