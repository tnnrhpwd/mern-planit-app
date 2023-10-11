// App.test.js
import 'jest-localstorage-mock';
import { render, screen } from '@testing-library/react';
const React = require('react');
const App = require('./src/App'); // Import your main application component

describe('Frontend Testing', ()=>{
  it('has a running frontend', () => {
    render(<App />);
    // const linkElement = screen.getByText(/Welcome to My MERN App/i); // Adjust this to match your actual content
    // expect(linkElement).toBeInTheDocument();
  });

  it.todo('can use OpenAI compression api');
})