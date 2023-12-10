import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Card from './Card';
import '@testing-library/jest-dom/extend-expect';

describe('Item cards', () => {
  const props = {
    item: {
      _id: '1',
      name: 'Sample',
    },
    ImgSrc: 'sample.jpg',
    foodName: 'Sample',
    options:{
      isVeg: 'VegTest',
    }
  };

  test('renders product information correctly', () => {
    render(
        <BrowserRouter>
          <Card {...props}/>
        </BrowserRouter>
    );
    
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', props.ImgSrc);
    expect(imageElement).toHaveAttribute('alt', '...');

  });

  test('renders product name as heading', () => {
    render(
        <BrowserRouter>
          <Card {...props} />
        </BrowserRouter>
    );

    const h5Element = screen.getByRole('heading', { level: 5 });
    expect(h5Element).toHaveTextContent(props.foodName);

    const vegIndicatorElement = screen.getByTestId('veg-indicator');
    expect(vegIndicatorElement).toHaveTextContent(props.options.isVeg);
  });
});