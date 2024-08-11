import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

describe('Layout Component', () => {
  test('toggles dropdown menu visibility', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </BrowserRouter>
    );

    // Initially, the dropdown menu should not be visible
    expect(screen.queryByText('Home')).not.toBeInTheDocument();

    // Click the menu button to open the dropdown
    fireEvent.click(screen.getByText('Menu'));

    // Check if the dropdown menu items are visible
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();

    // Click the menu button again to close the dropdown
    fireEvent.click(screen.getByText('Menu'));

    // Check if the dropdown menu items are hidden
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  test('enlarges and shrinks images when clicked', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </BrowserRouter>
    );

    const image = screen.getByAltText('Location');

    // Initially, the image should not be enlarged
    expect(image).not.toHaveClass('enlarged-image');

    // Click the image to enlarge it
    fireEvent.click(image);

    // Check if the image is enlarged
    expect(image).toHaveClass('enlarged-image');

    // Click the image again to shrink it
    fireEvent.click(image);

    // Check if the image is not enlarged anymore
    expect(image).not.toHaveClass('enlarged-image');
  });
});
