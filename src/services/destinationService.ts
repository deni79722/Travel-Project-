import {
    collection,
    getDocs,
    doc,
    getDoc
} from 'firebase/firestore';

import { db } from '../firebase/firebase';
import type { Destination } from '../models/Destination';

const DESTINATIONS_COLLECTION = 'destinations';


export async function getDestinations(): Promise<Destination[]> {
    console.log('Starting Firestore query...');

    const destinationsRef = collection(db, 'destinations');
    const snapshot = await getDocs(destinationsRef);

    console.log('Firestore documents:', snapshot.size);
    console.log('Firestore data:', snapshot.docs.map(doc => doc.data()));

    return snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data()
    })) as Destination[];
}

// Retrieve one destination by ID
export async function getDestinationById(
    destinationId: string
): Promise<Destination | null> {
    const destinationRef = doc(db, DESTINATIONS_COLLECTION, destinationId);
    const snapshot = await getDoc(destinationRef);

    if (!snapshot.exists()) {
        return null;
    }

    return {
        id: snapshot.id,
        ...snapshot.data()
    } as Destination;
}