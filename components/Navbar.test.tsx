import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

// Mock constants
jest.mock('../constants', () => ({
  NAV_LINKS: [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
  ],
  BRAND_NAME: 'TestBrand',
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    // Reset DOM and localStorage before each test
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });

  test('renders navbar with brand name and links', () => {
    render(<Navbar />);
    expect(screen.getByText('TestBrand')).toBeInTheDocument();
    // Check for desktop links
    const links = screen.getAllByRole('link');
    expect(links.some(link => link.textContent === 'Home')).toBe(true);
    expect(links.some(link => link.textContent === 'About')).toBe(true);
  });

  test('toggles theme correctly', () => {
    render(<Navbar />);
    
    // Find theme toggle buttons (desktop and mobile exist in DOM)
    // We'll use the first one found (desktop)
    const themeButtons = screen.getAllByLabelText(/Toggle Dark Mode/i);
    const themeToggle = themeButtons[0] || screen.getAllByRole('button')[0];

    // Initial state: light (default in test env)
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click to toggle dark
    fireEvent.click(themeToggle);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.theme).toBe('dark');

    // Click to toggle light
    fireEvent.click(themeToggle);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.theme).toBe('light');
  });

  test('initializes theme from document class', () => {
    document.documentElement.classList.add('dark');
    render(<Navbar />);
    // If initialized correctly, clicking toggle should remove dark class
    const themeButtons = screen.getAllByLabelText(/Toggle Dark Mode/i);
    const themeToggle = themeButtons[0] || screen.getAllByRole('button')[0];
    
    fireEvent.click(themeToggle);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('toggles mobile menu', () => {
    render(<Navbar />);
    
    // Mobile menu content should not be visible initially
    // Note: In JSDOM, layout isn't calculated, so we check if the element is in the DOM conditionally
    // The code renders the mobile menu container only when isOpen is true
    expect(screen.queryByText('Resume')).not.toBeInTheDocument(); // Resume button in mobile menu

    // Find mobile menu toggle button (it's the one with the Menu icon)
    // In the component, it's the last button in the mobile div
    const buttons = screen.getAllByRole('button');
    const menuToggle = buttons[buttons.length - 1]; 

    fireEvent.click(menuToggle);
    
    // Now mobile menu items should be present
    // We look for the Resume button specifically in the mobile menu structure
    const mobileResume = screen.getAllByText('Resume').find(el => el.parentElement?.classList.contains('w-full'));
    expect(mobileResume).toBeInTheDocument();
  });
});