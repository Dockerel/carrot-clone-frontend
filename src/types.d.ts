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
    avatar: string;
  };
  photos: IProductPhoto[];
  name: string;
  price: number;
  description: string;
  kind: string;
  is_reported: boolean;
  is_sold: boolean;
  review_exists: boolean;
}

export interface IProductDetail {
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
    avatar: string;
  };
  photos: IProductPhoto[];
  name: string;
  price: number;
  description: string;
  kind: string;
  is_reported: false;
  is_sold: false;
  created_at: string;
}

export interface IUserMe {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  phone_nb: string;
  address: string;
  detailed_address: string;
}

export interface IModifyUserMe {
  first_name: string;
  last_name: string;
  email: string;
  phone_nb: string;
  address: string;
  detailed_address: string;
}

export interface IPublicUserDetail {
  id: number;
  username: string;
  email: string;
  avatar: string;
  rating: number;
  address: string;
}

export interface IUserOnSaleProduct {
  pk: number;
  name: string;
  price: number;
  photos: { file: string }[];
  is_sold: boolean;
}

export interface IReviews {
  user: {
    pk: number;
    username: string;
    address: string;
    avatar: string;
  };
  product: {
    name: string;
    price: number;
  };
  payload: string;
  rating: number;
  created_at: string;
}
