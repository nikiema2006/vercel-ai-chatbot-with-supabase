/* // components/Header.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled(motion.header)`
  background: ${props => props.theme.headerBackground};
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.h1)`
  font-size: 24px;
  color: ${props => props.theme.accent};
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled(motion.a)`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
`;

const ThemeToggle = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  font-size: 24px;
`;

interface HeaderProps {
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  return (
    <HeaderContainer
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <Logo
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        AnimeSearch
      </Logo>
      <Nav>
        <NavItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          Home
        </NavItem>
        <NavItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          About
        </NavItem>
        <NavItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          Contact
        </NavItem>
      </Nav>
      <ThemeToggle
        onClick={toggleTheme}
        whileHover={{ rotate: 180 }}
        whileTap={{ scale: 0.9 }}
      >
        🌓
      </ThemeToggle>
    </HeaderContainer>
  );
};

export default Header; */

import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: ${props => props.theme.headerBackground};
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: ${props => props.theme.accent};
  margin: 0;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  font-size: 24px;
`;

interface HeaderProps {
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  return (
    <HeaderContainer>
      <Logo>AnimeSearch</Logo>
      <ThemeToggle onClick={toggleTheme}>🌓</ThemeToggle>
    </HeaderContainer>
  );
};

export default Header;