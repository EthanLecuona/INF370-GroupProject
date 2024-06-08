import { Address } from "./address";
import { Client } from "./client";
import { Project } from "./project";

export interface Company {

    companyId: number;
    companyName: string;
    addressId: number;
    companyNavigation: Address;
    client: Client;
    project: Project;
}


