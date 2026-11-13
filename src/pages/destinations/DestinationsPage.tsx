import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Destination } from '../../models/Destination';
import { getDestinations } from '../../services/destinationService';
import './DestinationsPage.css';
import { Link } from 'react-router-dom';


function DestinationsPage() {
    const [searchParams] = useSearchParams();
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [search, setSearch] = useState(
        searchParams.get('search') || ''
    );
    const [selectedCountry, setSelectedCountry] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        async function loadDestinations() {
            try {
                setLoading(true);
                const data = await getDestinations();
                console.log('DESTINATIONS:', data);
                console.log('NUMBER OF DESTINATIONS:', data.length);
                setDestinations(data);
                setError('');
            } catch (err) {
                console.error('Error loading destinations:', err);
                setError('Could not load destinations. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        loadDestinations();
    }, []);
    const countries = [
        'All',
        ...new Set(destinations.map((destination) => destination.country)),
    ];
    const filteredDestinations = destinations.filter((destination) => {
        const searchValue = search.toLowerCase().trim();
        const matchesSearch = (destination.name ?? '').toLowerCase().includes(searchValue) ||
            (destination.country ?? '').toLowerCase().includes(searchValue);
        const matchesCountry =
            selectedCountry === 'All' ||
            destination.country === selectedCountry;
        return matchesSearch && matchesCountry;
    });
    return (
        <main className="destinations-page">
            <header className="destinations-header">
                <p>EXPLORE THE WORLD</p>
                <h1>Discover Destinations</h1>
                <span>Find the perfect place for your next adventure.</span>
            </header>
            <section className="destination-filters">
                <input
                    type="text"
                    placeholder="Search by destination or country..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <select
                    value={selectedCountry}
                    onChange={(event) => setSelectedCountry(event.target.value)}
                >
                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </section>
            <section className="all-destinations">
                {loading && <p>Loading destinations...</p>}
                {error && <p className="no-results">{error}</p>}
                {!loading && !error && (
                    <>
                        <div className="destination-grid">
                            {filteredDestinations.map((destination) => (
                                <Link
                                to={`/destinations/${destination.id}`}
                                className="destination-card-link"
                                key={destination.id}
                            >
                                <article className="destination-card">
                                    <img
                                        src={destination.imageUrl}
                                        alt={destination.name}
                                    />
                                    <div className="destination-info">
                                        <h3>{destination.name}</h3>
                                        <p>{destination.country}</p>
                                    </div>
                                </article>
                            </Link>
                            ))}
                        </div>
                        {filteredDestinations.length === 0 && (
                            <p className="no-results">
                                No destinations found. Try another search.
                            </p>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}
export default DestinationsPage;



//##################################################used it like this before linking it to firebase!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// import { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import './DestinationsPage.css';

// const destinations = [
//     {
//         id: 1,
//         name: 'Cinque Terre',
//         country: 'Italy',
//         image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',
//     },
//     {
//         id: 2,
//         name: 'Swiss Alps',
//         country: 'Switzerland',
//         image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
//     },
//     {
//         id: 3,
//         name: 'Santorini',
//         country: 'Greece',
//         image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077',
//     },
//     {
//         id: 4,
//         name: 'Paris',
//         country: 'France',
//         image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
//     },
//     {
//         id: 5,
//         name: 'Bali',
//         country: 'Indonesia',
//         image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
//     },
//     {
//         id: 6,
//         name: 'Kyoto',
//         country: 'Japan',
//         image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
//     },
//     {
//         id: 7,
//         name: 'Lisbon',
//         country: 'Portugal',
//         image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b',
//     },
//     {
//         id: 8,
//         name: 'New York',
//         country: 'United States',
//         image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25',
//     },
//     {
//         id: 9,
//         name: 'Dubai',
//         country: 'United Arab Emirates',
//         image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
//     },
// ];

// function DestinationsPage() {
//     const [searchParams] = useSearchParams();

//     const [search, setSearch] = useState(
//         searchParams.get('search') || ''
//     );

//     const [selectedCountry, setSelectedCountry] = useState('All');

//     const countries = [
//         'All',
//         ...new Set(destinations.map((destination) => destination.country)),
//     ];

//     const filteredDestinations = destinations.filter((destination) => {
//         const searchValue = search.toLowerCase().trim();

//         const matchesSearch =
//             destination.name.toLowerCase().includes(searchValue) ||
//             destination.country.toLowerCase().includes(searchValue);

//         const matchesCountry =
//             selectedCountry === 'All' ||
//             destination.country === selectedCountry;

//         return matchesSearch && matchesCountry;
//     });

//     return (
//         <main className="destinations-page">
//             <header className="destinations-header">
//                 <p>EXPLORE THE WORLD</p>
//                 <h1>Discover Destinations</h1>
//                 <span>Find the perfect place for your next adventure.</span>
//             </header>

//             <section className="destination-filters">
//                 <input
//                     type="text"
//                     placeholder="Search by destination or country..."
//                     value={search}
//                     onChange={(event) => setSearch(event.target.value)}
//                 />

//                 <select
//                     value={selectedCountry}
//                     onChange={(event) => setSelectedCountry(event.target.value)}
//                 >
//                     {countries.map((country) => (
//                         <option key={country} value={country}>
//                             {country}
//                         </option>
//                     ))}
//                 </select>
//             </section>

//             <section className="all-destinations">
//                 <div className="destination-grid">
//                     {filteredDestinations.map((destination) => (
//                         <article
//                             className="destination-card"
//                             key={destination.id}
//                         >
//                             <img
//                                 src={destination.image}
//                                 alt={destination.name}
//                             />

//                             <div className="destination-info">
//                                 <h3>{destination.name}</h3>
//                                 <p>{destination.country}</p>
//                             </div>
//                         </article>
//                     ))}
//                 </div>

//                 {filteredDestinations.length === 0 && (
//                     <p className="no-results">
//                         No destinations found. Try another search.
//                     </p>
//                 )}
//             </section>
//         </main>
//     );
// }

// export default DestinationsPage;