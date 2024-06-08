import { Suburb } from "./suburb";
import { Address } from "./address";

export interface Street {
    streetId: number;
    streetName: string;
    suburbId: number;
    streetNumber: number;
    streetNavigation: Suburb;
    address: Address;
}