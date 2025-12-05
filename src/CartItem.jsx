import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Parse cost string to number
    const parseCost = (cost) => {
        return typeof cost === 'number'
            ? cost
            : parseFloat(String(cost).replace(/^\$/, ''));
    };

    // Calculate total amount for all products in the cart
    const totalAmount = useMemo(() => {
        return cart.reduce((total, item) => {
            const cost = parseCost(item.cost);
            return total + (cost * item.quantity);
        }, 0);
    }, [cart]);

    // Calculate total cost for a single cart item
    const calculateItemTotal = (item) => {
        const cost = parseCost(item.cost);
        return (cost * item.quantity).toFixed(2);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping(e);
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before checkout.');
            return;
        }
        alert('Checkout functionality coming soon!');
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            quantity: item.quantity + 1
        }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                name: item.name,
                quantity: item.quantity - 1
            }));
        }
    };

    const handleRemove = (item) => {
        if (window.confirm(`Remove ${item.name} from cart?`)) {
            dispatch(removeItem(item.name));
        }
    };

    // Empty cart state
    if (cart.length === 0) {
        return (
            <div className="cart-container">
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <h2 className="empty-cart-title">Your Cart is Empty</h2>
                    <p className="empty-cart-text">
                        Looks like you haven't added any plants yet.
                    </p>
                    <button
                        className="continue-shopping-btn primary"
                        onClick={handleContinueShopping}
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1 className="cart-title">Shopping Cart</h1>
                <span className="cart-item-count">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
            </div>

            <div className="cart-content">
                <div className="cart-items-section">
                    {cart.map(item => (
                        <div className="cart-item" key={item.name}>
                            <div className="cart-item-image-wrapper">
                                <img
                                    className="cart-item-image"
                                    src={item.image}
                                    alt={item.name}
                                    loading="lazy"
                                />
                            </div>

                            <div className="cart-item-details">
                                <div className="cart-item-header">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <button
                                        className="cart-item-remove"
                                        onClick={() => handleRemove(item)}
                                        aria-label={`Remove ${item.name}`}
                                    >
                                        ✕
                                    </button>
                                </div>

                                {item.description && (
                                    <p className="cart-item-description">{item.description}</p>
                                )}

                                <div className="cart-item-footer">
                                    <div className="cart-item-price">
                                        <span className="price-label">Price:</span>
                                        <span className="price-value">{item.cost}</span>
                                    </div>

                                    <div className="cart-item-quantity">
                                        <button
                                            className="quantity-btn decrease"
                                            onClick={() => handleDecrement(item)}
                                            disabled={item.quantity <= 1}
                                            aria-label="Decrease quantity"
                                        >
                                            −
                                        </button>
                                        <span className="quantity-value">{item.quantity}</span>
                                        <button
                                            className="quantity-btn increase"
                                            onClick={() => handleIncrement(item)}
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="cart-item-total">
                                        <span className="total-label">Subtotal:</span>
                                        <span className="total-value">${calculateItemTotal(item)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="summary-card">
                        <h2 className="summary-title">Order Summary</h2>

                        <div className="summary-row">
                            <span className="summary-label">Subtotal ({cart.length} items)</span>
                            <span className="summary-value">${totalAmount.toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span className="summary-label">Shipping</span>
                            <span className="summary-value free">Free</span>
                        </div>

                        <div className="summary-row">
                            <span className="summary-label">Tax (estimated)</span>
                            <span className="summary-value">${(totalAmount * 0.1).toFixed(2)}</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row total">
                            <span className="summary-label">Total</span>
                            <span className="summary-value">${(totalAmount * 1.1).toFixed(2)}</span>
                        </div>

                        <div className="summary-actions">
                            <button
                                className="checkout-btn"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>
                            <button
                                className="continue-shopping-btn"
                                onClick={handleContinueShopping}
                            >
                                Continue Shopping
                            </button>
                        </div>

                        <div className="security-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            <span>Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;