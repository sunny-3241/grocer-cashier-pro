export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  barcode?: string;
  stock: number;
  image?: string;
}

export interface BillItem extends Product {
  quantity: number;
  subtotal: number;
}

export interface Bill {
  id: string;
  items: BillItem[];
  total: number;
  tax: number;
  grandTotal: number;
  date: Date;
}
