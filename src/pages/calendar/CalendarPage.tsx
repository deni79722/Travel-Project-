import { useState } from 'react';
import './CalendarPage.css';

interface CalendarTrip {
    id: string;
    name: string;
    destinationName: string;
    startDate: string;
    endDate: string;
}

// Temporary test data added earlier.
// These are examples, not trips created by the user.
// They will be replaced with actual Firestore trips later.
const sampleTrips: CalendarTrip[] = [
    {
        id: '1',
        name: 'Weekend in Italy',
        destinationName: 'Cinque Terre',
        startDate: '2026-11-14',
        endDate: '2026-11-17',
    },
    {
        id: '2',
        name: 'Paris Adventure',
        destinationName: 'Paris',
        startDate: '2026-11-20',
        endDate: '2026-11-24',
    },
];

const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedTrip, setSelectedTrip] =
        useState<CalendarTrip | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Convert Sunday-based indexing to Monday-based indexing.
    const startingDay = (firstDay.getDay() + 6) % 7;

    // Calculate how many calendar weeks are needed.
    const numberOfWeeks = Math.ceil(
        (startingDay + daysInMonth) / 7
    );

    // Generate the days for each week.
    const weeks = Array.from({ length: numberOfWeeks }, (_, weekIndex) => {
        return Array.from({ length: 7 }, (_, weekdayIndex) => {
            const day = weekIndex * 7 + weekdayIndex - startingDay + 1;

            return day >= 1 && day <= daysInMonth ? day : null;
        });
    });

    function goToPreviousMonth() {
        setCurrentDate(new Date(year, month - 1, 1));
    }

    function goToNextMonth() {
        setCurrentDate(new Date(year, month + 1, 1));
    }

    function goToToday() {
        setCurrentDate(new Date());
    }

    function isToday(day: number): boolean {
        return formatDate(new Date(year, month, day)) ===
            formatDate(new Date());
    }

    // Find trips that overlap with a particular calendar week.
    function getTripsForWeek(weekIndex: number) {
        const weekStart = new Date(
            year,
            month,
            weekIndex * 7 - startingDay + 1
        );

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        return sampleTrips
            .filter((trip) => {
                const tripStart = new Date(`${trip.startDate}T00:00:00`);
                const tripEnd = new Date(`${trip.endDate}T00:00:00`);

                return tripStart <= weekEnd && tripEnd >= weekStart;
            })
            .map((trip) => {
                const tripStart = new Date(`${trip.startDate}T00:00:00`);
                const tripEnd = new Date(`${trip.endDate}T00:00:00`);

                const visibleStart =
                    tripStart < weekStart ? weekStart : tripStart;

                const visibleEnd =
                    tripEnd > weekEnd ? weekEnd : tripEnd;

                const startColumn =
                    Math.round(
                        (visibleStart.getTime() - weekStart.getTime()) /
                        (1000 * 60 * 60 * 24)
                    );

                const endColumn =
                    Math.round(
                        (visibleEnd.getTime() - weekStart.getTime()) /
                        (1000 * 60 * 60 * 24)
                    );

                return {
                    ...trip,
                    startColumn,
                    endColumn,
                };
            });
    }

    return (
        <main className="calendar-page">

            <header className="calendar-header">
                <div>
                    <p className="section-subtitle">YOUR TRAVEL SCHEDULE</p>
                    <h1>Trip Calendar</h1>
                    <p>Keep track of all your upcoming adventures.</p>
                </div>

                <div className="calendar-navigation">
                    <button onClick={goToPreviousMonth}>
                        ←
                    </button>

                    <button onClick={goToToday}>
                        Today
                    </button>

                    <button onClick={goToNextMonth}>
                        →
                    </button>
                </div>
            </header>

            <section className="calendar-container">

                <h2>
                    {currentDate.toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                    })}
                </h2>

                {/* Weekday headings */}
                <div className="calendar-weekdays">
                    {weekdays.map((weekday) => (
                        <div className="calendar-weekday" key={weekday}>
                            {weekday}
                        </div>
                    ))}
                </div>

                {/* Calendar weeks */}
                <div className="calendar-weeks">

                    {weeks.map((week, weekIndex) => (
                        <div className="calendar-week-row" key={weekIndex}>

                            {/* Days */}
                            <div className="calendar-week-grid">
                                {week.map((day, weekdayIndex) => (
                                    <div
                                        key={weekdayIndex}
                                        className={`calendar-day ${
                                            day && isToday(day) ? 'today' : ''
                                        } ${day === null ? 'empty-day' : ''}`}
                                    >
                                        {day && (
                                            <span className="day-number">
                                                {day}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Continuous trip bars */}
                            <div className="calendar-week-events">
                                {getTripsForWeek(weekIndex).map((trip) => (
                                    <button
                                        type="button"
                                        className="calendar-trip"
                                        key={trip.id}
                                        style={{
                                            gridColumn: `${trip.startColumn + 1} / ${trip.endColumn + 2}`,
                                        }}
                                        title={`${trip.name} - ${trip.destinationName}`}
                                        onClick={() => setSelectedTrip(trip)}
                                    >
                                        {trip.name}
                                    </button>
                                ))}
                            </div>

                        </div>
                    ))}

                </div>
            </section>

            {/* Trip details popup */}
            {selectedTrip && (
                <div
                    className="trip-modal-overlay"
                    onClick={() => setSelectedTrip(null)}
                >
                    <div
                        className="trip-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="close-modal-button"
                            onClick={() => setSelectedTrip(null)}
                            aria-label="Close trip details"
                        >
                            ×
                        </button>

                        <p className="section-subtitle">TRIP DETAILS</p>

                        <h2>{selectedTrip.name}</h2>

                        <p className="modal-destination">
                            📍 {selectedTrip.destinationName}
                        </p>

                        <div className="modal-dates">
                            <div>
                                <span>Start date</span>
                                <strong>{selectedTrip.startDate}</strong>
                            </div>

                            <div>
                                <span>End date</span>
                                <strong>{selectedTrip.endDate}</strong>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="modal-close-action"
                            onClick={() => setSelectedTrip(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </main>
    );
}

export default CalendarPage;















//#################################------------------>version when each day had its own cell<---------------------------------------
// import { useState } from 'react';
// import './CalendarPage.css';

// interface CalendarTrip {
//     id: string;
//     name: string;
//     destinationName: string;
//     startDate: string;
//     endDate: string;
// }

// // Temporary example trips.
// // Later, these will come from Firestore.########################################!!!!!!!!!!!!!!!!!!SAMPLE NOT ADDED BY ME
// const sampleTrips: CalendarTrip[] = [
//     {
//         id: '1',
//         name: 'Weekend in Italy',
//         destinationName: 'Cinque Terre',
//         startDate: '2026-11-14',
//         endDate: '2026-11-17',
//     },
//     {
//         id: '2',
//         name: 'Paris Adventure',
//         destinationName: 'Paris',
//         startDate: '2026-11-20',
//         endDate: '2026-11-24',
//     },
// ];

// const weekdays = [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday',
// ];

// function CalendarPage() {
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [selectedTrip, setSelectedTrip] = useState<CalendarTrip | null>(null);

//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();

//     const firstDay = new Date(year, month, 1);
//     const daysInMonth = new Date(year, month + 1, 0).getDate();

//     // Convert Sunday-based indexing to Monday-based indexing.
//     const startingDay = (firstDay.getDay() + 6) % 7;

//     function goToPreviousMonth() {
//         setCurrentDate(new Date(year, month - 1, 1));
//     }

//     function goToNextMonth() {
//         setCurrentDate(new Date(year, month + 1, 1));
//     }

//     function goToToday() {
//         setCurrentDate(new Date());
//     }

//     // Format a date as YYYY-MM-DD.
//     function formatDate(date: Date): string {
//         const formattedYear = date.getFullYear();
//         const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
//         const formattedDay = String(date.getDate()).padStart(2, '0');

//         return `${formattedYear}-${formattedMonth}-${formattedDay}`;
//     }

//     // Get all trips that include a particular day.
//     function getTripsForDay(day: number): CalendarTrip[] {
//         const date = formatDate(new Date(year, month, day));

//         return sampleTrips.filter((trip) => {
//             return date >= trip.startDate && date <= trip.endDate;
//         });
//     }

//     // Check whether a day is today.
//     function isToday(day: number): boolean {
//         return formatDate(new Date(year, month, day)) === formatDate(new Date());
//     }

//     return (
//         <main className="calendar-page">

//             <header className="calendar-header">
//                 <div>
//                     <p className="section-subtitle">YOUR TRAVEL SCHEDULE</p>
//                     <h1>Trip Calendar</h1>
//                     <p>Keep track of all your upcoming adventures.</p>
//                 </div>

//                 <div className="calendar-navigation">
//                     <button onClick={goToPreviousMonth} aria-label="Previous month">
//                         ←
//                     </button>

//                     <button onClick={goToToday}>
//                         Today
//                     </button>

//                     <button onClick={goToNextMonth} aria-label="Next month">
//                         →
//                     </button>
//                 </div>
//             </header>

//             <section className="calendar-container">

//                 <h2>
//                     {currentDate.toLocaleDateString('en-US', {
//                         month: 'long',
//                         year: 'numeric',
//                     })}
//                 </h2>

//                 <div className="calendar-grid">

//                     {weekdays.map((weekday) => (
//                         <div className="calendar-weekday" key={weekday}>
//                             {weekday}
//                         </div>
//                     ))}

//                     {/* Empty cells before the first day */}
//                     {Array.from({ length: startingDay }).map((_, index) => (
//                         <div
//                             className="calendar-day empty-day"
//                             key={`empty-${index}`}
//                         />
//                     ))}

//                     {/* Days of the selected month */}
//                     {Array.from({ length: daysInMonth }).map((_, index) => {
//                         const day = index + 1;
//                         const tripsForDay = getTripsForDay(day);

//                         return (
//                             <div
//                                 className={`calendar-day ${isToday(day) ? 'today' : ''}`}
//                                 key={day}
//                             >
//                                 <span className="day-number">
//                                     {day}
//                                 </span>

//                                 <div className="calendar-trips">
//                                     {tripsForDay.map((trip) => (
//                                         <button
//                                             type="button"
//                                             className="calendar-trip"
//                                             key={trip.id}
//                                             title={`${trip.name} - ${trip.destinationName}`}
//                                             onClick={() => setSelectedTrip(trip)}
//                                         >
//                                             {trip.name}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         );
//                     })}

//                 </div>
//             </section>

//             {/* Trip details popup */}
//             {selectedTrip && (
//                 <div
//                     className="trip-modal-overlay"
//                     onClick={() => setSelectedTrip(null)}
//                 >
//                     <div
//                         className="trip-modal"
//                         onClick={(event) => event.stopPropagation()}
//                     >
//                         <button
//                             type="button"
//                             className="close-modal-button"
//                             onClick={() => setSelectedTrip(null)}
//                             aria-label="Close trip details"
//                         >
//                             ×
//                         </button>

//                         <p className="section-subtitle">TRIP DETAILS</p>

//                         <h2>{selectedTrip.name}</h2>

//                         <p className="modal-destination">
//                             📍 {selectedTrip.destinationName}
//                         </p>

//                         <div className="modal-dates">
//                             <div>
//                                 <span>Start date</span>
//                                 <strong>{selectedTrip.startDate}</strong>
//                             </div>

//                             <div>
//                                 <span>End date</span>
//                                 <strong>{selectedTrip.endDate}</strong>
//                             </div>
//                         </div>

//                         <button
//                             type="button"
//                             className="modal-close-action"
//                             onClick={() => setSelectedTrip(null)}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}

//         </main>
//     );
// }

// export default CalendarPage;


