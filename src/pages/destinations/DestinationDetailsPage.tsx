import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Destination } from '../../models/Destination';
import { getDestinationById } from '../../services/destinationService';
import './DestinationDetailsPage.css';

function DestinationDetailsPage() {
    const { destinationId } = useParams();
    const navigate = useNavigate();

    const [destination, setDestination] = useState<Destination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadDestination() {
            if (!destinationId) {
                setError('Destination not found.');
                setLoading(false);
                return;
            }

            try {
                const data = await getDestinationById(destinationId);

                if (!data) {
                    setError('Destination not found.');
                } else {
                    setDestination(data);
                }
            } catch (err) {
                console.error('Error loading destination:', err);
                setError('Could not load destination details.');
            } finally {
                setLoading(false);
            }
        }

        loadDestination();
    }, [destinationId]);

    if (loading) {
        return (
            <main className="destination-details-page">
                <p>Loading destination...</p>
            </main>
        );
    }

    if (error || !destination) {
        return (
            <main className="destination-details-page">
                <p className="no-results">
                    {error || 'Destination not found.'}
                </p>

                <button
                    className="back-destinations-button"
                    onClick={() => navigate('/destinations')}
                >
                    Back to Destinations
                </button>
            </main>
        );
    }

    return (
        <main className="destination-details-page">

            <button
                className="back-destinations-button"
                onClick={() => navigate('/destinations')}
            >
                ← Back to Destinations
            </button>

            <section className="destination-details-card">

                <img
                    className="destination-details-image"
                    src={destination.imageUrl}
                    alt={destination.name}
                />

                <div className="destination-details-info">

                    <p className="section-subtitle">
                        DISCOVER YOUR NEXT ADVENTURE
                    </p>

                    <h1>{destination.name}</h1>

                    <p className="destination-details-country">
                        📍 {destination.country}
                    </p>

                    <p className="destination-details-description">
                        {destination.description}
                    </p>

                    <button
                        className="plan-trip-button"
                        onClick={() => navigate('/trips')}
                    >
                        Plan a Trip
                    </button>

                </div>

            </section>

        </main>
    );
}

export default DestinationDetailsPage;