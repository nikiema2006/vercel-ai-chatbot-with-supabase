/* 'use client'

import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, InputBase, Card, CardContent, Box, Container } from '@mui/material';
import { alpha, styled } from '@mui/system';
import { motion } from 'framer-motion';

// Custom styled components
const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
}));

const GlassSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.6),
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.37)}`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
}));

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

//const ImmersiveGlassInterface

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #FFFB6B 30%, #4ECDC4 90%)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          '@keyframes gradient': {
            '0%': {
              backgroundPosition: '0% 50%',
            },
            '50%': {
              backgroundPosition: '100% 50%',
            },
            '100%': {
              backgroundPosition: '0% 50%',
            },
          },
        }}
      >
        <GlassAppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Anime Search
            </Typography>
            <GlassSearch>
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ color: 'inherit', padding: '8px 16px' }}
                value={searchQuery}
                onChange={handleSearch}
              />
            </GlassSearch>
          </Toolbar>
        </GlassAppBar>

        <Container maxWidth="md" sx={{ mt: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Search Results
                </Typography>
                {searchQuery ? (
                  <Typography variant="body1">
                    Showing results for: {searchQuery}
                  </Typography>
                ) : (
                  <Typography variant="body1">
                    Enter a search query to find anime
                  </Typography>
                )}
              </CardContent>
            </GlassCard>
          </motion.div>

          {/* Placeholder for search results 
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item * 0.1 }}
            >
              <GlassCard sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Anime Title {item}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is a placeholder for anime search results.
                  </Typography>
                </CardContent>
              </GlassCard>
            </motion.div>
          ))}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

//export default ImmersiveGlassInterface;
export default Home;

*/

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
import OtherResults from './components/OtherResults';
import AnimeModal from './components/AnimeModal';
import { motion } from 'framer-motion';
import { styled, alpha } from '@mui/system';

// Styled components for glassmorphism effect
const GlassCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.6),
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.37)}`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
}));

const GlassInput = styled(Input)(({ theme }) => ({
//  background: alpha(theme.palette.common.white, 0.15),
  backdropFilter: 'blur(5px)',
  '&:hover': {
//    background: alpha(theme.palette.common.white, 0.25),
  },
}));

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mainResult, setMainResult] = useState<AnimeResult | null>(null);
  const [otherResults, setOtherResults] = useState<AnimeResult[]>([]);
  const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);
  const [otherAnimeDetails, setOtherAnimeDetails] = useState<AnimeDetails[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setOtherResults(results.slice(1, 5));
        const mainDetails = await getAnimeDetails(results[0].anilist.idMal);
        setAnimeDetails(mainDetails);
        
        const otherDetails = await Promise.all(
          results.slice(1, 5).map(result => getAnimeDetails(result.anilist.idMal))
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
        // Process results as in handleSearch
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`min-h-screen bg-gradient-to-b ${darkMode ? 'from-gray-900 to-gray-800' : 'from-blue-100 to-purple-100'} text-gray-900 dark:text-white p-4 transition-colors duration-300 ${isModalOpen ? 'blur-sm' : ''}`}
      >
        <div className="max-w-md mx-auto">
          <motion.header
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-6"
          >
            <h1 className="text-3xl font-bold font-serif">Anime Search</h1>
            <div className="flex items-center">
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              {darkMode ? <Moon className="ml-2" /> : <Sun className="ml-2" />}
            </div>
          </motion.header>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex mb-6 relative"
          >
            <GlassInput
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow mr-2"
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
          </motion.div>

          {mainResult && animeDetails && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="mb-6 overflow-hidden transform hover:scale-102 transition-transform duration-300">
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
              </GlassCard>
            </motion.div>
          )}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-6"
          >
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
{/*            <p className="mt-2 font-semibold">SIMILARITY</p> */}
          </motion.div>

          {/* Ad Space */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/10 border-white/20 p-4 rounded-lg mb-6 text-center"
          >
            <p className="text-lg font-semibold">Advertisement Space</p>
          </motion.div>

          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl font-bold mb-4 font-serif"
          >
            Other Results
          </motion.h2>
          <OtherResults 
            results={otherResults} 
            details={otherAnimeDetails} 
            onModalOpen={() => setIsModalOpen(true)}
            onModalClose={() => setIsModalOpen(false)}
          />
        </div>
      </motion.div>
    </ToastProvider>
  );
};

export default Home;
