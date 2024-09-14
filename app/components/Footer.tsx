// components/Footer.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: ${props => props.theme.headerBackground};
  padding: 20px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const LegalInfo = styled.p`
  font-size: 14px;
  color: ${props => props.theme.text};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialIcon = styled(motion.a)`
  color: ${props => props.theme.text};
  font-size: 24px;
  text-decoration: none;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LegalInfo>© 2024 AnimeSearch. All rights reserved.</LegalInfo>
        <SocialLinks>
          <SocialIcon
            href="#"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            📘
          </SocialIcon>
          <SocialIcon
            href="#"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            📸
          </SocialIcon>
          <SocialIcon
            href="#"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            🐦
          </SocialIcon>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;