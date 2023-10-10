// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './src/App'; // Import your main application component

describe('Frontend Testing', ()=>{
  it('has a running frontend', () => {
    render(<App />);
    // const linkElement = screen.getByText(/Welcome to My MERN App/i); // Adjust this to match your actual content
    // expect(linkElement).toBeInTheDocument();
  });

  it.todo('can use OpenAI compression api');
})