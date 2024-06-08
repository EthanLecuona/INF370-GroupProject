import { City } from "./city";
import { Street } from "./street";

export interface Suburb {
    suburbId: number;
    cityId: number;
    suburb1: string;
    suburbNavigation: City;
    street: Street;
}