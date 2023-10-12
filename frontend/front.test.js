// front.test.js
import 'jest-localstorage-mock';
import { render, screen } from '@testing-library/react';
import App from './src/App';
import React from 'react';

describe('Frontend Testing', ()=>{
  it('has a running user-interface', () => {
    render(<App />);
    // const linkElement = screen.getByText(/Welcome to My MERN App/i); // Adjust this to match your actual content
    // expect(linkElement).toBeInTheDocument();
  });

  it.todo('can communicate with the server');
})