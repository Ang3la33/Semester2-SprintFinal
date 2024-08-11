import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ShoppingCart = ({ cart, setCart }) => {
  const taxRate = 0.15; // 15% tax rate

   // Function to handle increasing the quantity
   const increaseQuantity = (productId) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  // Function to handle decreasing the quantity
  const decreaseQuantity = (productId) => {
    setCart(cart.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

   // Function to handle removing an item from the cart
   const removeItem = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Calculate subtotal, total tax, and total amount owed
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalTax = subtotal * taxRate;
  const totalOwed = subtotal + totalTax;

  return (
    <div>
      <div className="products-header">
        <h1>Your Shopping Cart</h1>
      </div>
      <div className="cart-list">
        {cart.length === 0 ? (
          <div>
          <p className="empty-cart-message">Your cart has nar 'ting!</p>
          <Link to="/ProductList" className='fill-your-boots-link'>
            <div className="fill-your-boots-button">
              <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
              <p>Fill Yer Boots!</p>
            </div>
          </Link>
        </div>
        ) : (
          cart.map((item) => {
            const taxAmount = item.price * taxRate;
            const subtotal = item.price * item.quantity;
            const totalWithTax = subtotal + taxAmount * item.quantity;

            return (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="product-name">{item.name}</h3>
                  <div className="quantity-controls">
                    {item.quantity > 1 ? (
                      <button onClick={() => decreaseQuantity(item.id)} className="quantity-button">-</button>
                    ) : (
                      <button onClick={() => removeItem(item.id)} className="quantity-button remove-button">X</button>
                    )}
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="quantity-button">+</button>
                  </div>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: $ {item.price.toFixed(2)}</p>
                  <p>Tax (15%): $ {taxAmount.toFixed(2)}</p>
                  <p>Subtotal: $ {subtotal.toFixed(2)}</p>
                  <p>Total: $ {totalWithTax.toFixed(2)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary Section */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <p>Subtotal: $ {subtotal.toFixed(2)}</p>
          <p>Tax (15%): $ {totalTax.toFixed(2)}</p>
          <p><strong>Total Owed: $ {totalOwed.toFixed(2)}</strong></p>

            {/* Continue Shopping Button */}
          <Link to="/ProductList">
            <button className="continue-shopping-button">Continue Shopping</button>
          </Link>

          {/* Checkout Button */}
          <Link to="/checkout">
            <button className="continue-shopping-button">Go to Checkout</button>
          </Link>
        
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;





