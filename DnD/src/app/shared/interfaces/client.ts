import { Title } from "./title";
import { Company } from "./company";

export interface Client {
    clientId: number;
    titleId: number;
    clientName: string;
    clientSurname: string;
    clientPhone: string;
    companyId: number;
    client1: Title;
    clientNavigation: Company;
}