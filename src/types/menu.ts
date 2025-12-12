export interface OptionValue {
  id: string;
  value: string;
  name: string;
  price: number;
}

export interface Option {
  id: string;
  key: string;
  name: string;
  allow_multiple: boolean;
  required: boolean;
  values: OptionValue[];
}

export interface Product {
  id: number;
  name: string;
  price: string; // The API returns price as string based on the example "4.00"
  imageSrc: string;
  options: Option[];
}

export interface Category {
  id: number;
  name: string;
  items: Product[];
}

export interface MenuResponse {
  categories: Category[];
}
