import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShoppingCart from './ShoppingCart';
import { BrowserRouter } from 'react-router-dom';

describe('ShoppingCart Component', () => {
  const mockSetCart = jest.fn();
  const cartItems = [
    { id: 1, name: 'Product 1', price: 50, quantity: 1, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 100, quantity: 2, image: 'product2.jpg' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders cart items correctly', () => {
    render(
      <BrowserRouter>
        <ShoppingCart cart={cartItems} setCart={mockSetCart} />
      </BrowserRouter>
    );
    
    // Check if the product names are rendered
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('increases item quantity', () => {
    render(
      <BrowserRouter>
        <ShoppingCart cart={cartItems} setCart={mockSetCart} />
      </BrowserRouter>
    );

    // Click the + button for the first product
    const increaseButton = screen.getAllByText('+')[0];
    fireEvent.click(increaseButton);

    // Check if setCart is called with the updated quantity
    expect(mockSetCart).toHaveBeenCalledWith([
      { id: 1, name: 'Product 1', price: 50, quantity: 2, image: 'product1.jpg' },
      { id: 2, name: 'Product 2', price: 100, quantity: 2, image: 'product2.jpg' },
    ]);
  });

  test('decreases item quantity', () => {
    render(
      <BrowserRouter>
        <ShoppingCart cart={cartItems} setCart={mockSetCart} />
      </BrowserRouter>
    );

    // Click the - button for the second product
    const decreaseButton = screen.getAllByText('-')[1];
    fireEvent.click(decreaseButton);

    // Check if setCart is called with the updated quantity
    expect(mockSetCart).toHaveBeenCalledWith([
      { id: 1, name: 'Product 1', price: 50, quantity: 1, image: 'product1.jpg' },
      { id: 2, name: 'Product 2', price: 100, quantity: 1, image: 'product2.jpg' },
    ]);
  });

  test('removes item when quantity is 1 and X is clicked', () => {
    render(
      <BrowserRouter>
        <ShoppingCart cart={cartItems} setCart={mockSetCart} />
      </BrowserRouter>
    );

    // Click the X button for the first product
    const removeButton = screen.getAllByText('X')[0];
    fireEvent.click(removeButton);

    // Check if setCart is called with the item removed
    expect(mockSetCart).toHaveBeenCalledWith([
      { id: 2, name: 'Product 2', price: 100, quantity: 2, image: 'product2.jpg' },
    ]);
  });

  test('displays order summary correctly', () => {
    render(
      <BrowserRouter>
        <ShoppingCart cart={cartItems} setCart={mockSetCart} />
      </BrowserRouter>
    );

    // Check if the subtotal, tax, and total owed are displayed correctly
    expect(screen.getByText(/Subtotal: \$300.00/)).toBeInTheDocument();
    expect(screen.getByText(/Tax \(15%\): \$45.00/)).toBeInTheDocument();
    expect(screen.getByText(/Total Owed: \$345.00/)).toBeInTheDocument();
  });

  test('renders "Fill Yer Boots!" link when cart is empty', () => {
    render(
      <BrowserRouter>
        <ShoppingCart cart={[]} setCart={mockSetCart} />
      </BrowserRouter>
    );

    // Check if the empty cart message and "Fill Yer Boots!" link are displayed
    expect(screen.getByText("Your cart has nar 'ting!")).toBeInTheDocument();
    expect(screen.getByText("Fill Yer Boots!")).toBeInTheDocument();
  });
});
