export interface Property {
    addressLine1: string
    addressLine2: any
    checkInTime: string
    checkOutTime: string
    city: string
    country: string
    currency: string
    description: string
    domain: string
    email: string
    id: string
    name: string
    phoneNumber: string
    policies: PropertyPolicy
    postcode: string
    starRating: number
}

export interface Policy {
    id: string;
    propertyId: string;
    name: string;
    description: string;
    amount: number;
    chargeType: string;
};

export interface PropertyPolicy {
    noShowPolicies: Policy[];
    cancellationPolicies: Policy[];
}