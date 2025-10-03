import { useState } from "react";
import { products } from "@/data/products";
import { BillItem } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, ShoppingCart, Trash2, Plus, Minus, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TAX_RATE = 0.08; // 8% tax

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode?.includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToBill = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = billItems.find((item) => item.id === productId);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast.error("Cannot add more items than available in stock");
        return;
      }
      setBillItems(
        billItems.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item
        )
      );
    } else {
      setBillItems([
        ...billItems,
        {
          ...product,
          quantity: 1,
          subtotal: product.price,
        },
      ]);
    }
    toast.success(`${product.name} added to bill`);
  };

  const removeFromBill = (productId: string) => {
    setBillItems(billItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (newQuantity > product.stock) {
      toast.error("Cannot exceed available stock");
      return;
    }

    if (newQuantity <= 0) {
      removeFromBill(productId);
      return;
    }

    setBillItems(
      billItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * item.price,
            }
          : item
      )
    );
  };

  const subtotal = billItems.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const completeSale = () => {
    if (billItems.length === 0) {
      toast.error("Please add items to the bill");
      return;
    }

    const bill = {
      id: `BILL-${Date.now()}`,
      items: billItems,
      total: subtotal,
      tax: tax,
      grandTotal: total,
      date: new Date(),
    };

    navigate("/receipt", { state: { bill } });
    setBillItems([]);
    toast.success("Sale completed successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Grocery Store POS</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Search and List */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search by product name, barcode, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 text-lg h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[calc(100vh-280px)] overflow-y-auto">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="p-4 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => addToBill(product.id)}
                  >
                    <div className="aspect-square bg-muted rounded-md mb-3 flex items-center justify-center">
                      <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {product.category}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Stock: {product.stock}
                    </p>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Current Bill */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <Receipt className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Current Bill</h2>
              </div>

              <div className="space-y-3 mb-6 max-h-[calc(100vh-450px)] overflow-y-auto">
                {billItems.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No items in bill
                  </p>
                ) : (
                  billItems.map((item) => (
                    <Card key={item.id} className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-sm">{item.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromBill(item.id)}
                          className="h-6 w-6 -mt-1 -mr-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-7 w-7"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-7 w-7"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-bold text-primary">
                          ${item.subtotal.toFixed(2)}
                        </p>
                      </div>
                    </Card>
                  ))
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8%):</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={completeSale}
                className="w-full mt-6 h-12 text-lg"
                disabled={billItems.length === 0}
              >
                Complete Sale
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
