// front.test.js
import 'jest-localstorage-mock';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './src/app/store'; // Import your Redux store
import App from './src/App';
import React from 'react';

describe('Frontend Testing', ()=>{
  it('has a running user-interface', () => {
    render(
        <Provider store={store}>
          <App />
        </Provider> 
      );
    // const linkElement = screen.getByText(/Welcome to My MERN App/i); // Adjust this to match your actual content
    // expect(linkElement).toBeInTheDocument();
  });

  it.todo('can communicate with the server');
})