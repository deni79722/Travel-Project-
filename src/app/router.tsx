import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import HomePage from '../pages/home/HomePage';
import DestinationsPage from '../pages/destinations/DestinationsPage';
import TripsPage from '../pages/trips/TripsPage';
import CalendarPage from '../pages/calendar/CalendarPage';
import DestinationDetailsPage from '../pages/destinations/DestinationDetailsPage';

export function AppRouter() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/destinations" element={<DestinationsPage />} />

                <Route
                    path="/destinations/:destinationId"
                    element={<DestinationDetailsPage />}
                />

                <Route path="/trips" element={<TripsPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}