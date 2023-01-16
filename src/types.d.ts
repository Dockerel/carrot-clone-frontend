interface IProductPhoto {
  file: string;
}

export interface IProductList {
  id: number;
  is_owner: boolean;
  buyer: {
    pk: number;
    username: string;
    phone_nb: string;
    address: string | null;
  } | null;
  owner: {
    pk: number;
    username: string;
    phone_nb: string;
    address: string;
  };
  photos: IProductPhoto[];
  name: string;
  price: number;
  description: string;
  kind: string;
  is_reported: false;
  is_sold: false;
}
