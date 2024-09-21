export interface User {
  _id: string;
  username: string;
  name: string;
  phone: number;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  name: string;
  phone: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface Product {
  _id: string;
  category: string;
  user: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductMutation {
  title: string;
  description: string;
  image: File | null;
  category: string;
  price: string;
}

export interface ProductWitchCategory {
  _id: string;
  category: {
    _id: string;
    title: string;
  };
  user: {
    _id: string;
    name: string;
    phone: number;
  };
  title: string;
  description: string;
  price: number;
  image: string;
}