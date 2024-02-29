import { Company } from "./company.entity";

export class Address {
    id: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    company: Company;
    companyId: string;
}