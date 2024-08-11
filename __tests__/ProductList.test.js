import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from './ProductList';

describe('ProductList Component', () => {
  const mockSetCart = jest.fn();
  const mockCart = [];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders product list and handles toggling description', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        description: 'This is Product 1',
        price: 100,
        image: 'product1.jpg',
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      })
    );

    render(<ProductList cart={mockCart} setCart={mockSetCart} />);

    // Check if product name is rendered
    expect(await screen.findByText('Product 1')).toBeInTheDocument();

    // Click on the product image to toggle description
    fireEvent.click(screen.getByAltText('Product 1'));

    // Check if the description is shown
    expect(screen.getByText('This is Product 1')).toBeInTheDocument();

    // Close the description
    fireEvent.click(screen.getByText('Close'));

    // Check if the description is hidden
    expect(screen.queryByText('This is Product 1')).not.toBeInTheDocument();
  });

  test('handles adding a product to the cart', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        description: 'This is Product 1',
        price: 100,
        image: 'product1.jpg',
      },
    ];

    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      })
    );

    render(<ProductList cart={mockCart} setCart={mockSetCart} />);

    // Wait for the product to appear
    expect(await screen.findByText('Product 1')).toBeInTheDocument();

    // Simulate clicking "Add to Cart" button
    fireEvent.click(screen.getByText(/Add to Cart/i));

    // Check if setCart is called with the correct product
    expect(mockSetCart).toHaveBeenCalledWith([
      { ...mockProducts[0], quantity: 1 },
    ]);

    // Check if the success message is displayed
    expect(screen.getByText(/1 item\(s\) successfully added to cart/i)).toBeInTheDocument();
  });

  test('handles removing a product from the cart', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        description: 'This is Product 1',
        price: 100,
        image: 'product1.jpg',
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      })
    );

    render(<ProductList cart={mockProducts} setCart={mockSetCart} />);

    // Wait for the product to appear
    expect(await screen.findByText('Product 1')).toBeInTheDocument();

    // Simulate clicking "Remove from Cart" button
    fireEvent.click(screen.getByText(/X/i));

    // Check if setCart is called with the product removed
    expect(mockSetCart).toHaveBeenCalledWith([]);
  });

  test('handles quantity change', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        description: 'This is Product 1',
        price: 100,
        image: 'product1.jpg',
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      })
    );

    render(<ProductList cart={mockCart} setCart={mockSetCart} />);

    // Wait for the product to appear
    expect(await screen.findByText('Product 1')).toBeInTheDocument();

    // Simulate changing the quantity
    fireEvent.change(screen.getByLabelText(/Qty:/i), { target: { value: '2' } });

    // Simulate clicking "Add to Cart" button
    fireEvent.click(screen.getByText(/Add to Cart/i));

    // Check if setCart is called with the correct quantity
    expect(mockSetCart).toHaveBeenCalledWith([
      { ...mockProducts[0], quantity: 2 },
    ]);
  });
});
