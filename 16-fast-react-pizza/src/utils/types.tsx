export type PizzaDataTypes = {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};

export type OrderDataTypes = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: CartTypes[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
  status: string;
};
export type NewOrderTypes = {
  address?: string;
  customer?: string;
  phone?: string;
  cart?: CartTypes[];
  priority: boolean;
};
export type CartTypes = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};
export type PizzaTypes = {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  ingredients: string[];
};
export type OrderFormData = {
  address: string;
  cart: string;
  customer: string;
  phone: string;
  priority: string;
};
