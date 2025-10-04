import { Product } from "@/types/product";
import applesImg from "@/assets/products/apples.jpg";
import bananasImg from "@/assets/products/bananas.jpg";
import breadImg from "@/assets/products/bread.jpg";
import milkImg from "@/assets/products/milk.jpg";
import cheeseImg from "@/assets/products/cheese.jpg";
import tomatoesImg from "@/assets/products/tomatoes.jpg";
import carrotsImg from "@/assets/products/carrots.jpg";
import orangeJuiceImg from "@/assets/products/orange-juice.jpg";
import chipsImg from "@/assets/products/chips.jpg";
import chickenImg from "@/assets/products/chicken.jpg";
import riceImg from "@/assets/products/rice.jpg";
import eggsImg from "@/assets/products/eggs.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Apples",
    price: 3.99,
    category: "Fruits",
    barcode: "7890123456789",
    stock: 150,
    image: applesImg,
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // expires in 2 days
  },
  {
    id: "2",
    name: "Organic Bananas",
    price: 2.49,
    category: "Fruits",
    barcode: "7890123456790",
    stock: 200,
    image: bananasImg,
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // expires in 5 days
  },
  {
    id: "3",
    name: "Whole Wheat Bread",
    price: 4.29,
    category: "Bakery",
    barcode: "7890123456791",
    stock: 80,
    image: breadImg,
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // expires in 1 day - ALERT!
  },
  {
    id: "4",
    name: "Fresh Milk",
    price: 5.99,
    category: "Dairy",
    barcode: "7890123456792",
    stock: 120,
    image: milkImg,
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // expires in 3 days
  },
  {
    id: "5",
    name: "Cheddar Cheese",
    price: 7.99,
    category: "Dairy",
    barcode: "7890123456793",
    stock: 60,
    image: cheeseImg,
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // expires in 14 days
  },
  {
    id: "6",
    name: "Fresh Tomatoes",
    price: 4.49,
    category: "Vegetables",
    barcode: "7890123456794",
    stock: 100,
    image: tomatoesImg,
    expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // expires in 4 days
  },
  {
    id: "7",
    name: "Organic Carrots",
    price: 3.29,
    category: "Vegetables",
    barcode: "7890123456795",
    stock: 130,
    image: carrotsImg,
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
  },
  {
    id: "8",
    name: "Orange Juice",
    price: 6.49,
    category: "Beverages",
    barcode: "7890123456796",
    stock: 90,
    image: orangeJuiceImg,
    expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // expires in 10 days
  },
  {
    id: "9",
    name: "Potato Chips",
    price: 3.99,
    category: "Snacks",
    barcode: "7890123456797",
    stock: 200,
    image: chipsImg,
    expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // expires in 60 days
  },
  {
    id: "10",
    name: "Chicken Breast",
    price: 12.99,
    category: "Meat",
    barcode: "7890123456798",
    stock: 50,
    image: chickenImg,
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // expires in 2 days
  },
  {
    id: "11",
    name: "Rice 5kg",
    price: 15.99,
    category: "Grains",
    barcode: "7890123456799",
    stock: 75,
    image: riceImg,
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // expires in 365 days
  },
  {
    id: "12",
    name: "Eggs (12 pack)",
    price: 4.99,
    category: "Dairy",
    barcode: "7890123456800",
    stock: 110,
    image: eggsImg,
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
  },
];
