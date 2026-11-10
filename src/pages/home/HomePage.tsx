import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    function handleSearch() {
        const searchValue = search.trim();

        if (searchValue !== '') {
            navigate(`/destinations?search=${encodeURIComponent(searchValue)}`);
        } else {
            navigate('/destinations');
        }
    }

    return (
        <main className="home-page">

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <p className="hero-subtitle">YOUR JOURNEY STARTS HERE</p>

                    <h1>
                        Discover the world.
                        <br />
                        Create your story.
                    </h1>

                    <p className="hero-description">
                        Plan your next adventure, explore beautiful
                        destinations and make every journey memorable.
                    </p>

                    <Link to="/destinations" className="hero-button">
                        Explore Destinations
                    </Link>
                </div>
            </section>

            {/* Search Section */}
            <section className="search-section">
                <div className="search-container">
                    <div>
                        <h2>Where do you want to go?</h2>
                        <p>Find your next favourite destination.</p>
                    </div>

                    <input
                        type="text"
                        placeholder="Search destinations..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />

                    <button
                        type="button"
                        className="search-button"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </section>

            {/* Popular Destinations */}
            <section className="popular-section">
                <div className="section-heading">
                    <div>
                        <p className="section-subtitle">EXPLORE THE WORLD</p>
                        <h2>Popular Destinations</h2>
                        <p>Discover places worth adding to your travel list.</p>
                    </div>

                    <Link to="/destinations" className="view-all">
                        View all destinations →
                    </Link>
                </div>

                <div className="destination-grid">

                    {/* Italy */}
                    <div className="destination-card">
                        <img
                            src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963"
                            alt="Cinque Terre"
                        />
                        <div className="destination-info">
                            <h3>Cinque Terre</h3>
                            <p>Italy 🇮🇹</p>
                        </div>
                    </div>

                    {/* Switzerland */}
                    <div className="destination-card">
                        <img
                            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                            alt="Swiss Alps"
                        />
                        <div className="destination-info">
                            <h3>Swiss Alps</h3>
                            <p>Switzerland 🇨🇭</p>
                        </div>
                    </div>

                    {/* Greece */}
                    <div className="destination-card">
                        <img
                            src="https://images.unsplash.com/photo-1533105079780-92b9be482077"
                            alt="Santorini"
                        />
                        <div className="destination-info">
                            <h3>Santorini</h3>
                            <p>Greece 🇬🇷</p>
                        </div>
                    </div>

                    {/* France */}
                    <div className="destination-card">
                        <img
                            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
                            alt="Paris"
                        />
                        <div className="destination-info">
                            <h3>Paris</h3>
                            <p>France 🇫🇷</p>
                        </div>
                    </div>

                    {/* Indonesia */}
                    <div className="destination-card">
                        <img
                            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4"
                            alt="Bali"
                        />
                        <div className="destination-info">
                            <h3>Bali</h3>
                            <p>Indonesia 🇮🇩</p>
                        </div>
                    </div>

                    {/* Japan */}
                    <div className="destination-card">
                        <img
                            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e"
                            alt="Kyoto"
                        />
                        <div className="destination-info">
                            <h3>Kyoto</h3>
                            <p>Japan 🇯🇵</p>
                        </div>
                    </div>

                    {/* Portugal */}
                    <div className="destination-card">
                        <img
                            src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b"
                            alt="Lisbon"
                        />
                        <div className="destination-info">
                            <h3>Lisbon</h3>
                            <p>Portugal 🇵🇹</p>
                        </div>
                    </div>

                    {/* United States */}
                    <div className="destination-card">
                        <img
                            src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25"
                            alt="New York"
                        />
                        <div className="destination-info">
                            <h3>New York</h3>
                            <p>United States 🇺🇸</p>
                        </div>
                    </div>

                    {/* United Arab Emirates */}
                    <div className="destination-card">
                        <img
                            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
                            alt="Dubai"
                        />
                        <div className="destination-info">
                            <h3>Dubai</h3>
                            <p>United Arab Emirates 🇦🇪</p>
                        </div>
                    </div>

                </div>
            </section>

        </main>
    );
}

export default HomePage;