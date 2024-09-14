// components/SearchBar.tsx
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SearchContainer = styled(motion.div)`
  display: flex;
  margin-bottom: 20px;
  position: relative;
`;

const SearchInput = styled(motion.input)`
  flex-grow: 1;
  padding: 15px;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  background: ${props => props.theme.inputBackground};
  color: ${props => props.theme.text};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.accent};
  }
`;

const UploadButton = styled(motion.button)`
  padding: 15px 30px;
  font-size: 18px;
  background-color: ${props => props.theme.accent};
  color: ${props => props.theme.buttonText};
  border: none;
  border-radius: 30px;
  cursor: pointer;
  margin-left: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface SearchBarProps {
  onSearch: (input: string | File) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (searchTerm.startsWith('http://') || searchTerm.startsWith('https://')) {
      onSearch(searchTerm);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSearch(file);
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Enter image URL or search anime..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        onKeyPress={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        whileFocus={{ scale: 1.05 }}
      />
      <UploadButton
        onClick={handleSearch}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Search
      </UploadButton>
      <UploadButton
        onClick={handleUpload}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Upload
      </UploadButton>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*,video/*"
      />
    </SearchContainer>
  );
};

export default SearchBar;