import { Street } from "./street";
import { Company } from "./company";

export interface Address {
    addressId: number;
    streetId: number;
    postalCode: number;
    addressNavigation: Street;
    company: Company;
}