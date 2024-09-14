'use client'

import React, { useState, useEffect } from 'react';
import { Search, Upload, Moon, Sun, Filter, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { ToastProvider, useToast } from '@/components/ui/toast';
import { searchAnime, getAnimeDetails } from '../lib/api';
import { AnimeResult, AnimeDetails } from '../lib/types';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mainResult, setMainResult] = useState<AnimeResult | null>(null);
  const [otherResults, setOtherResults] = useState<AnimeResult[]>([]);
  const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);
  const [otherAnimeDetails, setOtherAnimeDetails] = useState<AnimeDetails[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const addToast = (title: string, description: string) => {
    toast({ title, description });
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setMainResult(null);
    setOtherResults([]);
    setAnimeDetails(null);
    setOtherAnimeDetails([]);
    try {
      const results = await searchAnime(searchQuery);
      if (results.length > 0) {
        setMainResult(results[0]);
        setOtherResults(results.slice(1));
        const mainDetails = await getAnimeDetails(results[0].anilist.idMal);
        setAnimeDetails(mainDetails);
        
        const otherDetails = await Promise.all(
          results.slice(1).map(result => getAnimeDetails(result.anilist.idMal))
        );
        setOtherAnimeDetails(otherDetails);
        addToast("Search completed", `Found results for "${searchQuery}"`);
      }
    } catch (error) {
      console.error('Error searching anime:', error);
      addToast("Error", "Failed to search anime");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      addToast("File uploaded", `Uploaded: ${file.name}`);
      setIsLoading(true);
      try {
        const results = await searchAnime(file);
        // Traitement des résultats comme dans handleSearch
        // ...
      } catch (error) {
        console.error('Error searching anime:', error);
        addToast("Error", "Failed to search with uploaded file");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleFavorite = () => {
    addToast("Favorite toggled", "Added to your favorites list");
  };

  return (
    <ToastProvider>
      <div className={`min-h-screen bg-gradient-to-b ${darkMode ? 'from-gray-900 to-gray-800' : 'from-blue-100 to-purple-100'} text-gray-900 dark:text-white p-4 transition-colors duration-300`}>
        <div className="max-w-md mx-auto">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold font-serif">Anime Search</h1>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            {darkMode ? <Moon className="ml-2" /> : <Sun className="ml-2" />}
          </header>
          
          <div className="flex mb-6 relative">
            <Input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow mr-2 bg-white/10 border-white/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <Button onClick={handleSearch} className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300">
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Search size={20} />
              )}
            </Button>
            <label className="ml-2">
              <Input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,video/*"
              />
              <Button as="span" className="bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300">
                <Upload size={20} />
              </Button>
            </label>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-2 bg-gray-500 hover:bg-gray-600 transition-colors duration-300">
                  <Filter size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Advanced Filters</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Year Range</label>
                    <Slider defaultValue={[2000, 2023]} min={1950} max={2023} step={1} />
                  </div>
                  <div>
                    <label className="block mb-2">Genres</label>
                    <div className="flex flex-wrap gap-2">
                      {['Action', 'Romance', 'Comedy', 'Drama'].map(genre => (
                        <Button key={genre} variant="outline" size="sm">{genre}</Button>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {mainResult && animeDetails && (
            <Card className="bg-white/10 border-white/20 mb-6 overflow-hidden transform hover:scale-102 transition-transform duration-300">
              <CardHeader>
                <h2 className="text-xl font-semibold font-serif">Main Result</h2>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <span>From: {mainResult.from.toFixed(2)}s</span>
                  <span>To: {mainResult.to.toFixed(2)}s</span>
                </div>
                <div className="aspect-video bg-black mb-4 rounded-lg overflow-hidden relative">
                  <video src={mainResult.video} controls className="w-full h-full" />
                  <div className="absolute bottom-2 right-2">
                    <Button size="sm" variant="ghost" onClick={toggleFavorite}>
                      <Heart size={20} className="text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/3 mr-4">
                    <img
                      src={animeDetails.images.jpg.large_image_url}
                      alt={animeDetails.title}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="w-2/3">
                    <h3 className="text-lg font-semibold mb-2 font-serif">{animeDetails.title}</h3>
                    <p className="text-sm mb-1"><strong>Synonyms:</strong> {animeDetails.title_synonyms.join(', ')}</p>
                    <p className="text-sm mb-1"><strong>Episode:</strong> {mainResult.episode || 'N/A'}</p>
                    <p className="text-sm mb-1"><strong>Score:</strong> {animeDetails.score}</p>
                    <p className="text-sm mb-1"><strong>Year:</strong> {animeDetails.year}</p>
                    <p className="text-sm mb-1"><strong>Producers:</strong> {animeDetails.producers.map(p => p.name).join(', ')}</p>
                    <p className="text-sm mb-1"><strong>Genres:</strong> {animeDetails.genres.map(g => g.name).join(', ')}</p>
                    <p className="text-sm"><strong>Synopsis:</strong> {animeDetails.synopsis.split(' ').slice(0, 30).join(' ')}...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-center mb-6">
            {mainResult && (
              <div className="inline-block relative">
                <svg className="w-24 h-24 transform transition-transform duration-300 hover:scale-110">
                  <circle
                    className="text-gray-300 dark:text-gray-700"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-purple-600 dark:text-purple-400"
                    strokeWidth="5"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={(2 * Math.PI * 45) * (1 - mainResult.similarity)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
                  {(mainResult.similarity * 100).toFixed(2)}%
                </span>
              </div>
            )}
            <p className="mt-2 font-semibold">SIMILARITY</p>
          </div>

          {/* Ad Space */}
          <div className="bg-white/10 border-white/20 p-4 rounded-lg mb-6 text-center">
            <p className="text-lg font-semibold">Advertisement Space</p>
          </div>

          <h2 className="text-2xl font-bold mb-4 font-serif">Other Results</h2>
          {otherResults.map((result, index) => (
            <Card key={index} className="bg-white/10 border-white/20 mb-4 overflow-hidden transform hover:scale-102 transition-transform duration-300">
              <CardContent className="flex items-center">
                <div className="flex-grow">
                  <h3 className="font-semibold font-serif">{otherAnimeDetails[index]?.title || 'Unknown Title'}</h3>
                  <p className="text-sm">Episode: {result.episode || 'N/A'}</p>
                  <p className="text-sm">Similarity: {(result.similarity * 100).toFixed(2)}%</p>
                  <p className="text-sm">From: {result.from.toFixed(2)}s - To: {result.to.toFixed(2)}s</p>
                </div>
                <div className="w-20 h-20 bg-black rounded-lg ml-4 flex items-center justify-center overflow-hidden">
                  <video src={result.video} autoPlay loop muted className="w-full h-full object-cover" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ToastProvider>
  );
};

export default Home;

