// components/OtherResults.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AnimeResult, AnimeDetails } from '../types';

const ResultsContainer = styled(motion.div)`
  margin-top: 20px;
`;

const ResultCard = styled(motion.div)`
  display: flex;
  background: ${props => props.theme.cardBackground};
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InfoContainer = styled.div`
  flex-grow: 1;
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  color: ${props => props.theme.accent};
`;

const InfoItem = styled.p`
  margin: 5px 0;
  font-size: 14px;
`;

const VideoContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
`;

interface OtherResultsProps {
  results: AnimeResult[];
  details: AnimeDetails[];
}

const OtherResults: React.FC<OtherResultsProps> = ({ results, details }) => {
  return (
    <ResultsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h2>Other results:</h2>
      {results.map((result, index) => {
        const detail = details[index];
        return (
          <ResultCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
          >
            <InfoContainer>
              <Title>{detail?.title || 'Unknown Title'}</Title>
              <InfoItem><strong>Episode:</strong> {result.episode || 'N/A'}</InfoItem>
              <InfoItem><strong>Similarity:</strong> {(result.similarity * 100).toFixed(2)}%</InfoItem>
              <InfoItem><strong>From - to:</strong> {result.from.toFixed(2)}s - {result.to.toFixed(2)}s</InfoItem>
              {detail && (
                <>
                  <InfoItem><strong>Score:</strong> {detail.score}</InfoItem>
                  <InfoItem><strong>Year:</strong> {detail.year || 'N/A'}</InfoItem>
                  <InfoItem><strong>Type:</strong> {detail.type}</InfoItem>
                </>
              )}
            </InfoContainer>
            <VideoContainer>
              <video src={result.video} autoPlay loop muted width="100%" height="100%" />
            </VideoContainer>
          </ResultCard>
        );
      })}
    </ResultsContainer>
  );
};

export default OtherResults;


