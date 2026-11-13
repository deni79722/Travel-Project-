import { useState, useEffect, type FormEvent } from 'react';
import type { Trip } from '../../models/Trip';
import type { Destination } from '../../models/Destination';
import { getDestinations } from '../../services/destinationService';
import './TripsPage.css';

function TripsPage() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [destinationId, setDestinationId] = useState('');
    const [loadingDestinations, setLoadingDestinations] = useState(true);
    const [destinationError, setDestinationError] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

    const [tripName, setTripName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    // Load destinations from Firestore.
    useEffect(() => {
        async function loadDestinations() {
            try {
                const data = await getDestinations();
                setDestinations(data);
            } catch (error) {
                console.error('Error loading destinations:', error);
                setDestinationError('Could not load destinations.');
            } finally {
                setLoadingDestinations(false);
            }
        }

        loadDestinations();
    }, []);

    // Clear the form.
    function resetForm() {
        setTripName('');
        setDestinationId('');
        setStartDate('');
        setEndDate('');
        setDescription('');
        setEditingTrip(null);
        setShowForm(false);
    }

    // Open the form to create a trip.
    function openCreateForm() {
        resetForm();
        setShowForm(true);
    }

    // Open the form with an existing trip's information.
    function handleEditTrip(trip: Trip) {
        setEditingTrip(trip);

        setTripName(trip.name);
        setDestinationId(trip.destinationId);
        setStartDate(trip.startDate);
        setEndDate(trip.endDate);
        setDescription(trip.description ?? '');

        setShowForm(true);
    }

    // Create or update a trip.
    function handleSubmitTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (endDate < startDate) {
            alert('The end date cannot be before the start date.');
            return;
        }

        const selectedDestination = destinations.find(
            (destination) => destination.id === destinationId
        );

        if (!selectedDestination) {
            alert('Please select a valid destination.');
            return;
        }

        if (editingTrip) {
            // Update an existing trip.
            setTrips((previousTrips) =>
                previousTrips.map((trip) =>
                    trip.id === editingTrip.id
                        ? {
                            ...trip,
                            name: tripName,
                            destinationId: selectedDestination.id,
                            destinationName: selectedDestination.name,
                            startDate,
                            endDate,
                            description,
                        }
                        : trip
                )
            );
        } else {
            // Create a new trip.
            const newTrip: Trip = {
                id: crypto.randomUUID(),
                ownerId: 'temporary-user',
                name: tripName,
                destinationId: selectedDestination.id,
                destinationName: selectedDestination.name,
                startDate,
                endDate,
                description,
                currency: 'EUR',
            };

            setTrips((previousTrips) => [...previousTrips, newTrip]);
        }

        resetForm();
    }

    // Delete a trip after confirmation.
    function handleDeleteTrip(tripId: string) {
        const confirmed = window.confirm(
            'Are you sure you want to delete this trip?'
        );

        if (!confirmed) return;

        setTrips((previousTrips) =>
            previousTrips.filter((trip) => trip.id !== tripId)
        );
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
                    onClick={openCreateForm}
                >
                    + Create New Trip
                </button>
            </header>

            {showForm && (
                <section className="trip-form">

                    <h2>
                        {editingTrip ? 'Edit Trip' : 'Create a New Trip'}
                    </h2>

                    <form onSubmit={handleSubmitTrip}>

                        <label>
                            Trip Name
                            <input
                                type="text"
                                placeholder="e.g. Summer in Italy"
                                value={tripName}
                                onChange={(event) =>
                                    setTripName(event.target.value)
                                }
                                required
                            />
                        </label>

                        <label>
                            Destination

                            <select
                                value={destinationId}
                                onChange={(event) =>
                                    setDestinationId(event.target.value)
                                }
                                required
                                disabled={
                                    loadingDestinations ||
                                    destinations.length === 0
                                }
                            >
                                <option value="">
                                    {loadingDestinations
                                        ? 'Loading destinations...'
                                        : 'Select a destination'}
                                </option>

                                {destinations.map((destination) => (
                                    <option
                                        key={destination.id}
                                        value={destination.id}
                                    >
                                        {destination.name}, {destination.country}
                                    </option>
                                ))}
                            </select>

                            {destinationError && (
                                <p className="error-message">
                                    {destinationError}
                                </p>
                            )}
                        </label>

                        <div className="date-fields">

                            <label>
                                Start Date
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(event) =>
                                        setStartDate(event.target.value)
                                    }
                                    required
                                />
                            </label>

                            <label>
                                End Date
                                <input
                                    type="date"
                                    value={endDate}
                                    min={startDate}
                                    onChange={(event) =>
                                        setEndDate(event.target.value)
                                    }
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
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                        </label>

                        <div className="form-buttons">

                            <button
                                type="submit"
                                className="save-trip-button"
                            >
                                {editingTrip ? 'Save Changes' : 'Create Trip'}
                            </button>

                            <button
                                type="button"
                                className="cancel-trip-button"
                                onClick={resetForm}
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

                        <div className="trip-image-placeholder">
                            <span>✈️</span>
                        </div>

                        <div className="trip-info">

                            <h2>{trip.name}</h2>

                            <p className="trip-destination">
                                📍 {trip.destinationName}
                            </p>

                            <p className="trip-dates">
                                {trip.startDate} — {trip.endDate}
                            </p>

                            {trip.description && (
                                <p className="trip-description">
                                    {trip.description}
                                </p>
                            )}

                            <div className="trip-actions">

                                <button
                                    className="view-trip-button"
                                    onClick={() => handleEditTrip(trip)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-trip-button"
                                    onClick={() => handleDeleteTrip(trip.id)}
                                >
                                    Delete
                                </button>

                            </div>

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