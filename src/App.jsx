import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';

function App() {
    const [showLanding, setShowLanding] = useState(true);

    const handleGetStartedClick = () => {
        setShowLanding(false);
    };

    const handleHomeClick = () => {
        setShowLanding(true);
    };

    return (
        <div className="app-container">
            {showLanding ? (
                <div className="landing-page">
                    <div className="background-image"></div>
                    <div className="landing-content">
                        <div className="hero-box">
                            <div className="logo-container">
                                <img
                                    src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
                                    alt="Paradise Nursery Logo"
                                    className="landing-logo"
                                />
                            </div>
                            <h1 className="landing-title">Welcome To Paradise Nursery</h1>
                            <div className="divider"></div>
                            <p className="landing-subtitle">Where Green Meets Serenity</p>
                            <p className="landing-description">
                                Discover our collection of beautiful plants to transform your space
                                into a green paradise. From air-purifying plants to aromatic varieties,
                                find the perfect companion for your home.
                            </p>
                            <button className="get-started-button" onClick={handleGetStartedClick}>
                                Explore Our Collection
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <ProductList onHomeClick={handleHomeClick} />
            )}
        </div>
    );
}

export default App;