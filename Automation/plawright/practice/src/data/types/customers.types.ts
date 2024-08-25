import { IResponseFields } from "./api.types";

export enum COUNTRIES {
  USA = "USA",
  CANADA = "Canada",
  BELARUS = "Belarus",
  UKRAINE = "Ukraine",
  GERMANY = "Germany",
  FRANCE = "France",
  GREAT_BRITAIN = "Great Britain",
  RUSSIA = "Russia",
}

export interface ICustomer {
  email: string;
  name: string;
  country: COUNTRIES;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes?: string;
}

export interface ICustomerFromResponse extends ICustomer {
  _id: string;
  createdOn: string;
}

export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}

export interface ICustomersResponse extends IResponseFields {
  Customers: ICustomerFromResponse[];
}
