export interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
}

export class CustomerImpl implements Customer {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public address: string
  ) {}
}
