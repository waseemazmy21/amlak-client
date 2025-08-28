import { Property } from "@/types/property";

export type User = {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    bio?: string;
    properties?: Property[]
};

export enum PropertyType {
    House = 'house',
    Apartment = 'apartment',
    Condo = 'condo',
    Townhouse = 'townhouse',
    Land = 'land',
}

export enum PropertyStatus {
    ForSale = 'for-sale',
    ForRent = 'for-rent',
    Sold = 'sold',
    Rented = 'rented',
}
