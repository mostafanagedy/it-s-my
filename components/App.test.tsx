import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock child components to avoid deep rendering and isolate App logic
jest.mock('../components/Navbar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../components/Hero', () => () => <div data-testid="hero">Hero</div>);
jest.mock('../components/About', () => () => <div data-testid="about">About</div>);
jest.mock('../components/TechStack', () => () => <div data-testid="techstack">TechStack</div>);
jest.mock('../components/Projects', () => () => <div data-testid="projects">Projects</div>);
jest.mock('../components/Contact', () => () => <div data-testid="contact">Contact</div>);
jest.mock('../components/Chatbot', () => () => <div data-testid="chatbot">Chatbot</div>);

test('renders App with all main sections', () => {
  render(<App />);
  
  expect(screen.getByTestId('navbar')).toBeInTheDocument();
  expect(screen.getByTestId('hero')).toBeInTheDocument();
  expect(screen.getByTestId('about')).toBeInTheDocument();
  expect(screen.getByTestId('techstack')).toBeInTheDocument();
  expect(screen.getByTestId('projects')).toBeInTheDocument();
  expect(screen.getByTestId('contact')).toBeInTheDocument();
  expect(screen.getByTestId('chatbot')).toBeInTheDocument();
  
  // Check footer content
  expect(screen.getByText(/Mostafa Nagedy/)).toBeInTheDocument();
});