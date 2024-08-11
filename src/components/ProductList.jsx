import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductList = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [activeProductId, setActiveProductId] = useState(null);
  const [message, setMessage] = useState({ text: '', productId: null });
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/products'); // Fetching from json-server
        const productsData = await res.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const toggleDescription = (id) => {
    setActiveProductId(activeProductId === id ? null : id);
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const newItem = { ...product, quantity };
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, newItem]);
    }

    showMessage(`${quantity} item(s) successfully added to cart`, product.id);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    showMessage(`Item removed from cart`, productId);
  };

  const showMessage = (msg, productId) => {
    setMessage({ text: msg, productId });
    setTimeout(() => {
        setMessage({ text: '', productId: null });
    }, 3000); 
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities({
        ...quantities,
        [productId]: quantity
    });
  };

  return (
    <div>
      <div className="products-header">
        <h1>Products</h1>
        <p>Click on pictures for product details</p>
      </div> 
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
          >
            <div className="product-name">
              <h3>{product.name}</h3>
            </div>
            {activeProductId === product.id ? (
              <div className="description-box">
                <p>{product.description}</p>
                {product.video && (
                  <iframe
                    width="100%"
                    height="200"
                    src={product.video}
                    title={`Video for ${product.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
                <button onClick={() => toggleDescription(null)} >
                  Close
                </button>
              </div>
            ) : (
              <img 
                src={product.image}
                alt={product.name} 
                onClick={() => toggleDescription(product.id)}
              />
            )}
            <p>$ {product.price.toFixed(2)}</p>
            <div className="quantity-container">
              <label htmlFor={`quantity-${product.id}`}>Qty: </label>
              <input
                id={`quantity-${product.id}`}
                type="number"
                min="1"
                value={quantities[product.id] || 1}
                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                className="quantity-input"
              />
            </div>
            <div className="button-container">
              <button onClick={() => addToCart(product)} className="add-button">
                Add to Cart
              </button>
              <button onClick={() => removeFromCart(product.id)} className="remove-button">
                X
              </button>
              {message.productId === product.id && (
                <div className="success-message">{message.text}</div>
              )}
            </div>
            <Link to="/cart" className="cart-icon-link">
                <FontAwesomeIcon icon={faShoppingCart} />
            </Link> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
