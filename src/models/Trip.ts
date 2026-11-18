export interface Trip {
    id: string;
    ownerId: string;
    name: string;
    destinationId: string;
    destinationName: string;
    startDate: string;
    endDate: string;
    description?: string;
    budget?: number;
    currency: string;
}