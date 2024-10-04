import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimeResult, AnimeDetails } from '../../lib/types';
import AnimeModal from './AnimeModal';

interface OtherResultsProps {
  results: AnimeResult[];
  details: AnimeDetails[];
}

const OtherResults: React.FC<OtherResultsProps> = ({ results, details }) => {
  const [selectedAnime, setSelectedAnime] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedAnime(index);
  };

  const closeModal = () => {
    setSelectedAnime(null);
  };

  return (
    <div>
      {results.map((result, index) => (
        <Card key={index} className="bg-white/10 border-white/20 mb-4 overflow-hidden transform hover:scale-102 transition-transform duration-300 cursor-pointer" onClick={() => openModal(index)}>
          <CardContent className="flex items-center">
            <div className="flex-grow">
              <h3 className="font-semibold font-serif">{details[index]?.title || 'Unknown Title'}</h3>
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
      {selectedAnime !== null && (
        <AnimeModal
          isOpen={true}
          onClose={closeModal}
          result={results[selectedAnime]}
          details={details[selectedAnime]}
        />
      )}
    </div>
  );
};

export default OtherResults;


