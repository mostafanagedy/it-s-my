import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chatbot from '../Chatbot';
import { GoogleGenAI } from "@google/genai";

// Mock constants
jest.mock('../constants', () => ({
  CHAT_SYSTEM_INSTRUCTION: 'You are a bot.',
  BRAND_NAME: 'TestBrand',
}));

// Mock GoogleGenAI
jest.mock('@google/genai', () => ({
  GoogleGenAI: jest.fn(),
}));

describe('Chatbot Component', () => {
  const mockSendMessageStream = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup the mock implementation for the GoogleGenAI class
    (GoogleGenAI as jest.Mock).mockImplementation(() => ({
      chats: {
        create: jest.fn().mockReturnValue({
          sendMessageStream: mockSendMessageStream,
        }),
      },
    }));
    
    // Mock scrollIntoView since it's not implemented in JSDOM
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  test('renders chatbot toggle button initially', () => {
    render(<Chatbot />);
    // The toggle button is always visible
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });

  test('opens chat window and focuses input', async () => {
    render(<Chatbot />);
    const toggleButton = screen.getAllByRole('button').pop()!; // Last button is the main toggle
    
    fireEvent.click(toggleButton);
    
    const input = screen.getByPlaceholderText('Type a command or question...');
    expect(input).toBeInTheDocument();
    
    // Check focus (might need a small timeout as per component logic)
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
  });

  test('sends message and displays streamed response', async () => {
    // Mock the stream response
    mockSendMessageStream.mockImplementation(async function* () {
      yield { text: 'Hello ' };
      yield { text: 'World' };
    });

    render(<Chatbot />);
    
    // Open chat
    const toggleButton = screen.getAllByRole('button').pop()!;
    fireEvent.click(toggleButton);
    
    const input = screen.getByPlaceholderText('Type a command or question...');
    const form = input.closest('form')!;
    
    // Type and submit
    fireEvent.change(input, { target: { value: 'Hi bot' } });
    fireEvent.submit(form);
    
    // Input should clear
    expect(input).toHaveValue('');
    
    // User message should appear
    expect(screen.getByText('Hi bot')).toBeInTheDocument();
    
    // Wait for AI response
    await waitFor(() => {
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    mockSendMessageStream.mockRejectedValue(new Error('API Error'));
    render(<Chatbot />);
    
    const toggleButton = screen.getAllByRole('button').pop()!;
    fireEvent.click(toggleButton);
    
    const input = screen.getByPlaceholderText('Type a command or question...');
    fireEvent.change(input, { target: { value: 'Crash me' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText(/Connection error/i)).toBeInTheDocument();
    });
  });
});