// components/MainResult.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AnimeResult, AnimeDetails } from '../types';

const ResultContainer = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const TimeRange = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  color: ${props => props.theme.accent};
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #000;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const AnimeImage = styled(motion.img)`
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

const AnimeInfo = styled.div`
  flex-grow: 1;
  min-width: 300px;
`;

const InfoItem = styled.p`
  margin: 10px 0;
  font-size: 16px;
`;

const SimilarityIndicator = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => props.theme.accent};
  color: ${props => props.theme.buttonText};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
`;

interface MainResultProps {
  result: AnimeResult;
  details: AnimeDetails;
}

const MainResult: React.FC<MainResultProps> = ({ result, details }) => {
  return (
    <ResultContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <TimeRange>
        From {result.from.toFixed(2)}s to {result.to.toFixed(2)}s
      </TimeRange>
      <VideoContainer>
        <video src={result.video} controls width="100%" height="100%" />
      </VideoContainer>
      <InfoContainer>
        <AnimeImage
          src={details.images.jpg.large_image_url}
          alt={details.title}
          whileHover={{ scale: 1.05 }}
        />
        <AnimeInfo>
          <InfoItem><strong>Name:</strong> {details.title}</InfoItem>
          <InfoItem><strong>Synonyms:</strong> {details.title_synonyms.join(', ')}</InfoItem>
          <InfoItem><strong>Episode:</strong> {result.episode || 'N/A'}</InfoItem>
          <InfoItem><strong>Score:</strong> {details.score}</InfoItem>
          <InfoItem><strong>Year:</strong> {details.year}</InfoItem>
          <InfoItem><strong>Producers:</strong> {details.producers.map((p: { name: string }) => p.name).join(', ')}</InfoItem>
          <InfoItem><strong>Studios:</strong> {details.studios.map((s: { name: string }) => s.name).join(', ')}</InfoItem>
          <InfoItem><strong>Genres:</strong> {details.genres.map((g: { name: string }) => g.name).join(', ')}</InfoItem>
          <InfoItem><strong>Synopsis:</strong> {details.synopsis.split(' ').slice(0, 100).join(' ')}...</InfoItem>
        </AnimeInfo>
      </InfoContainer>
      <SimilarityIndicator
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        {(result.similarity * 100).toFixed(2)}%
      </SimilarityIndicator>
    </ResultContainer>
  );
};

export default MainResult;