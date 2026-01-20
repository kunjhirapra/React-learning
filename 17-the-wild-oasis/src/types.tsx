export interface CabinType {
  id: number;
  created_at: string;
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: string;
}
export interface newCabinType {
  id: number;
  created_at: string;
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: File;
}
export interface CabinFormData {
  cabin_name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: FileList;
}
