import { useState, type FormEvent } from 'react';
import './TripsPage.css';

interface Trip {
    id: number;
    name: string;
    destination: string;
    country: string;
    startDate: string;
    endDate: string;
    image: string;
}

function TripsPage() {
    const [trips, setTrips] = useState<Trip[]>([
        {
            id: 1,
            name: 'Summer in Italy',
            destination: 'Cinque Terre',
            country: 'Italy',
            startDate: '2027-07-10',
            endDate: '2027-07-17',
            image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',
        },
        {
            id: 2,
            name: 'Greek Getaway',
            destination: 'Santorini',
            country: 'Greece',
            startDate: '2027-08-05',
            endDate: '2027-08-12',
            image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077',
        },
    ]);

    const [showForm, setShowForm] = useState(false);

    const [tripName, setTripName] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    function handleCreateTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (endDate < startDate) {
            alert('The end date cannot be before the start date.');
            return;
        }

        const newTrip: Trip = {
            id: Date.now(),
            name: tripName,
            destination: destination,
            country: '',
            startDate: startDate,
            endDate: endDate,
            image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
        };

        setTrips((previousTrips) => [...previousTrips, newTrip]);

        setTripName('');
        setDestination('');
        setStartDate('');
        setEndDate('');
        setDescription('');
        setShowForm(false);
    }

    return (
        <main className="trips-page">
            <header className="trips-header">
                <div>
                    <p className="section-subtitle">YOUR ADVENTURES</p>
                    <h1>My Trips</h1>
                    <p>Keep all your travel plans in one place.</p>
                </div>

                <button
                    className="create-trip-button"
                    onClick={() => setShowForm(true)}
                >
                    + Create New Trip
                </button>
            </header>

            {showForm && (
                <section className="trip-form">
                    <h2>Create a New Trip</h2>

                    <form onSubmit={handleCreateTrip}>
                        <label>
                            Trip Name
                            <input
                                type="text"
                                placeholder="e.g. Summer in Italy"
                                value={tripName}
                                onChange={(event) => setTripName(event.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Destination
                            <input
                                type="text"
                                placeholder="e.g. Rome, Italy"
                                value={destination}
                                onChange={(event) => setDestination(event.target.value)}
                                required
                            />
                        </label>

                        <div className="date-fields">
                            <label>
                                Start Date
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(event) => setStartDate(event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                End Date
                                <input
                                    type="date"
                                    value={endDate}
                                    min={startDate}
                                    onChange={(event) => setEndDate(event.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        <label>
                            Description
                            <textarea
                                placeholder="Tell us about your trip..."
                                rows={4}
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </label>

                        <div className="form-buttons">
                            <button type="submit" className="save-trip-button">
                                Create Trip
                            </button>

                            <button
                                type="button"
                                className="cancel-trip-button"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </section>
            )}

            <section className="trips-grid">
                {trips.map((trip) => (
                    <article className="trip-card" key={trip.id}>
                        <img src={trip.image} alt={trip.destination} />

                        <div className="trip-info">
                            <h2>{trip.name}</h2>

                            <p className="trip-destination">
                                📍 {trip.destination}
                                {trip.country && `, ${trip.country}`}
                            </p>

                            <p className="trip-dates">
                                {trip.startDate} — {trip.endDate}
                            </p>

                            <button className="view-trip-button">
                                View Trip
                            </button>
                        </div>
                    </article>
                ))}
            </section>

            {trips.length === 0 && (
                <div className="empty-trips">
                    <h2>No trips planned yet!</h2>
                    <p>Start planning your next adventure.</p>
                </div>
            )}
        </main>
    );
}

export default TripsPage;