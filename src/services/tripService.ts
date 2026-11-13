import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    onSnapshot
} from 'firebase/firestore';

import { db } from '../firebase/firebase';
import type { Trip } from '../models/Trip';

const TRIPS_COLLECTION = 'trips';

// Get all trips belonging to a specific user
export async function getUserTrips(userId: string): Promise<Trip[]> {
    const tripsRef = collection(db, TRIPS_COLLECTION);

    const tripsQuery = query(
        tripsRef,
        where('ownerId', '==', userId)
    );

    const snapshot = await getDocs(tripsQuery);

    return snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data()
    })) as Trip[];
}


// Create a new trip
export async function createTrip(
    input: Omit<Trip, 'id'>
): Promise<string> {
    const tripsRef = collection(db, TRIPS_COLLECTION);

    const docRef = await addDoc(tripsRef, input);

    return docRef.id;
}


// Update an existing trip
export async function updateTrip(
    tripId: string,
    changes: Partial<Omit<Trip, 'id' | 'ownerId'>>
): Promise<void> {
    const tripRef = doc(db, TRIPS_COLLECTION, tripId);

    await updateDoc(tripRef, changes);
}


// Delete a trip
export async function deleteTrip(tripId: string): Promise<void> {
    const tripRef = doc(db, TRIPS_COLLECTION, tripId);

    await deleteDoc(tripRef);
}


// Listen for real-time changes to a user's trips
export function subscribeToUserTrips(
    userId: string,
    callback: (trips: Trip[]) => void
): () => void {

    const tripsRef = collection(db, TRIPS_COLLECTION);

    const tripsQuery = query(
        tripsRef,
        where('ownerId', '==', userId)
    );

    return onSnapshot(tripsQuery, (snapshot) => {
        const trips = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data()
        })) as Trip[];

        callback(trips);
    });
}