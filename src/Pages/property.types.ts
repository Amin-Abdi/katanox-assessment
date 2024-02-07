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
    name: string;
    description: string;
    amount: number;
    chargeType: string;
    reference?: string;
    days?: number;
    hours?: number;
};

export interface PropertyPolicy {
    propertyId: string;
    noShowPolicies: Policy[];
    cancellationPolicies: Policy[];
}

export interface PolicyForm {
    id: string;
    name: string;
    description: string;
    amount: number;
}