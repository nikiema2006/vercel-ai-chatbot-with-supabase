import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft } from 'lucide-react';
import { AnimeResult, AnimeDetails } from '../../lib/types';

interface AnimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnimeResult;
  details: AnimeDetails;
}

const AnimeModal: React.FC<AnimeModalProps> = ({ isOpen, onClose, result, details }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] w-full h-full max-h-[90vh] overflow-hidden bg-white dark:bg-gray-800 text-black dark:text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Button variant="ghost" size="sm" onClick={onClose} className="mr-2">
              <ArrowLeft size={20} />
            </Button>
            {details.title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-between mb-4">
            <span>From: {result.from.toFixed(2)}s</span>
            <span>To: {result.to.toFixed(2)}s</span>
          </div>
          <div className="aspect-video bg-black mb-4 rounded-lg overflow-hidden relative">
            <video src={result.video} controls className="w-full h-full" />
            <div className="absolute bottom-2 right-2">
              <Button size="sm" variant="ghost">
                <Heart size={20} className="text-red-500" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center mb-4">
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
                  strokeDashoffset={(2 * Math.PI * 45) * (1 - result.similarity)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                />
              </svg>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
                {(result.similarity * 100).toFixed(2)}%
              </span>
            </div>
            <p className="ml-4 font-semibold">SIMILARITY</p>
          </div>
          <div className="flex">
            <div className="w-1/3 mr-4">
              <img
                src={details.images.jpg.large_image_url}
                alt={details.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="w-2/3">
              <p className="text-sm mb-1"><strong>Synonyms:</strong> {details.title_synonyms.join(', ')}</p>
              <p className="text-sm mb-1"><strong>Episode:</strong> {result.episode || 'N/A'}</p>
              <p className="text-sm mb-1"><strong>Score:</strong> {details.score}</p>
              <p className="text-sm mb-1"><strong>Year:</strong> {details.year}</p>
              <p className="text-sm mb-1"><strong>Producers:</strong> {details.producers.map(p => p.name).join(', ')}</p>
              <p className="text-sm mb-1"><strong>Genres:</strong> {details.genres.map(g => g.name).join(', ')}</p>
              <p className="text-sm"><strong>Synopsis:</strong> {details.synopsis.split(' ').slice(0, 30).join(' ')}...</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnimeModal;