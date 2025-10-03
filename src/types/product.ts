export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  barcode?: string;
  stock: number;
  image?: string;
  expiryDate?: Date;
}

export interface BillItem extends Product {
  quantity: number;
  subtotal: number;
  discount: number;
  discountType: 'percentage' | 'fixed';
}

export interface Bill {
  id: string;
  items: BillItem[];
  total: number;
  tax: number;
  grandTotal: number;
  date: Date;
}
