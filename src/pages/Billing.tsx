import { useState } from "react";
import { products } from "@/data/products";
import { BillItem } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, ShoppingCart, Trash2, Plus, Minus, Receipt, AlertTriangle, Wallet, CreditCard, Smartphone, Banknote, DollarSign, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const TAX_RATE = 0.08; // 8% tax

const getExpiryStatus = (expiryDate?: Date) => {
  if (!expiryDate) return null;
  const now = new Date();
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry < 0) return { status: 'expired', days: daysUntilExpiry, color: 'text-destructive' };
  if (daysUntilExpiry <= 3) return { status: 'critical', days: daysUntilExpiry, color: 'text-destructive' };
  if (daysUntilExpiry <= 7) return { status: 'warning', days: daysUntilExpiry, color: 'text-orange-500' };
  return null;
};

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [budgetMode, setBudgetMode] = useState(false);
  const [budget, setBudget] = useState<number>(0);
  const [overallDiscount, setOverallDiscount] = useState(0);
  const [overallDiscountType, setOverallDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [paymentMethod, setPaymentMethod] = useState<string>("");
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

    const expiryStatus = getExpiryStatus(product.expiryDate);
    if (expiryStatus?.status === 'expired') {
      toast.error(`${product.name} has expired and cannot be sold`);
      return;
    }
    if (expiryStatus?.status === 'critical') {
      toast.warning(`${product.name} expires in ${expiryStatus.days} day(s)!`);
    }

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
          discount: 0,
          discountType: 'percentage',
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

  const updateDiscount = (productId: string, discount: number, discountType: 'percentage' | 'fixed') => {
    setBillItems(
      billItems.map((item) =>
        item.id === productId
          ? { ...item, discount, discountType }
          : item
      )
    );
  };

  const calculateItemTotal = (item: BillItem) => {
    const baseTotal = item.quantity * item.price;
    const itemDiscount = item.discountType === 'percentage' 
      ? baseTotal * (item.discount / 100)
      : item.discount * item.quantity;
    return baseTotal - itemDiscount;
  };

  const subtotal = billItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const overallDiscountAmount = overallDiscountType === 'percentage' 
    ? subtotal * (overallDiscount / 100)
    : overallDiscount;
  const subtotalAfterDiscount = subtotal - overallDiscountAmount;
  const tax = subtotalAfterDiscount * TAX_RATE;
  const total = subtotalAfterDiscount + tax;
  
  const budgetExceeded = budgetMode && budget > 0 && total > budget;
  const budgetRemaining = budgetMode && budget > 0 ? budget - total : 0;

  const completeSale = () => {
    if (billItems.length === 0) {
      toast.error("Please add items to the bill");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (budgetExceeded) {
      toast.error("Total exceeds budget limit!");
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

    navigate("/receipt", { state: { bill, paymentMethod } });
    setBillItems([]);
    setPaymentMethod("");
    setOverallDiscount(0);
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
                {filteredProducts.map((product) => {
                  const expiryStatus = getExpiryStatus(product.expiryDate);
                  return (
                    <Card
                      key={product.id}
                      className={`p-4 cursor-pointer hover:border-primary transition-colors relative ${
                        expiryStatus?.status === 'expired' ? 'opacity-50 cursor-not-allowed' : ''
                      } ${expiryStatus?.status === 'critical' ? 'border-destructive' : ''} ${
                        expiryStatus?.status === 'warning' ? 'border-orange-500' : ''
                      }`}
                      onClick={() => addToBill(product.id)}
                    >
                      {expiryStatus && (
                        <div className={`absolute top-2 right-2 ${expiryStatus.color}`}>
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                      )}
                      <div className="aspect-square bg-muted rounded-md mb-3 flex items-center justify-center">
                        <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {product.category}
                      </p>
                      {expiryStatus && (
                        <p className={`text-xs ${expiryStatus.color} mb-1 font-semibold`}>
                          {expiryStatus.status === 'expired' 
                            ? 'EXPIRED' 
                            : `Expires in ${expiryStatus.days}d`}
                        </p>
                      )}
                      <p className="text-lg font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Stock: {product.stock}
                      </p>
                    </Card>
                  );
                })}
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

              {/* Budget Mode */}
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="budget-mode" className="font-semibold">Budget Mode</Label>
                  <Switch
                    id="budget-mode"
                    checked={budgetMode}
                    onCheckedChange={setBudgetMode}
                  />
                </div>
                {budgetMode && (
                  <div className="space-y-2">
                    <Input
                      type="number"
                      placeholder="Enter budget limit"
                      value={budget || ''}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="h-9"
                    />
                    {budget > 0 && (
                      <div className={`text-sm font-semibold ${budgetExceeded ? 'text-destructive' : 'text-primary'}`}>
                        {budgetExceeded ? (
                          <span>⚠️ Over budget by ${(total - budget).toFixed(2)}</span>
                        ) : (
                          <span>💰 Remaining: ${budgetRemaining.toFixed(2)}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6 max-h-[calc(100vh-450px)] overflow-y-auto">
                {billItems.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No items in bill
                  </p>
                ) : (
                  billItems.map((item) => {
                    const expiryStatus = getExpiryStatus(item.expiryDate);
                    return (
                      <Card key={item.id} className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">{item.name}</h3>
                            {expiryStatus && (
                              <p className={`text-xs ${expiryStatus.color}`}>
                                Expires in {expiryStatus.days}d
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromBill(item.id)}
                            className="h-6 w-6 -mt-1 -mr-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mb-2">
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
                          <p className="text-xs text-muted-foreground">
                            ${item.price.toFixed(2)} ea.
                          </p>
                        </div>
                        {/* Item Discount */}
                        <div className="flex items-center gap-2 mb-2">
                          <Input
                            type="number"
                            placeholder="Discount"
                            value={item.discount || ''}
                            onChange={(e) => updateDiscount(item.id, Number(e.target.value), item.discountType)}
                            className="h-7 text-xs flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateDiscount(item.id, item.discount, item.discountType === 'percentage' ? 'fixed' : 'percentage')}
                            className="h-7 px-2"
                          >
                            {item.discountType === 'percentage' ? <Percent className="h-3 w-3" /> : <DollarSign className="h-3 w-3" />}
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.discount > 0 && `(-$${(item.discountType === 'percentage' ? (item.quantity * item.price * item.discount / 100) : item.discount * item.quantity).toFixed(2)})`}
                          </span>
                          <p className="font-bold text-primary">
                            ${calculateItemTotal(item).toFixed(2)}
                          </p>
                        </div>
                      </Card>
                    );
                  })
                )}
              </div>

              <div className="border-t pt-4 space-y-3">
                {/* Overall Discount */}
                <div className="p-3 bg-muted rounded-lg">
                  <Label className="text-xs font-semibold mb-2 block">Overall Discount</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Discount"
                      value={overallDiscount || ''}
                      onChange={(e) => setOverallDiscount(Number(e.target.value))}
                      className="h-8 text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOverallDiscountType(overallDiscountType === 'percentage' ? 'fixed' : 'percentage')}
                      className="h-8"
                    >
                      {overallDiscountType === 'percentage' ? <Percent className="h-3 w-3" /> : <DollarSign className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {overallDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Overall Discount:</span>
                    <span className="font-semibold">-${overallDiscountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Tax (8%):</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className={budgetExceeded ? "text-destructive" : "text-primary"}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-4">
                <Label className="text-sm font-semibold mb-2 block">Payment Method</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('cash')}
                    className="h-10"
                  >
                    <Banknote className="h-4 w-4 mr-2" />
                    Cash
                  </Button>
                  <Button
                    variant={paymentMethod === 'card' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('card')}
                    className="h-10"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Card
                  </Button>
                  <Button
                    variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('upi')}
                    className="h-10"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    UPI
                  </Button>
                  <Button
                    variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('wallet')}
                    className="h-10"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Wallet
                  </Button>
                </div>
              </div>

              <Button
                onClick={completeSale}
                className="w-full mt-6 h-12 text-lg"
                disabled={billItems.length === 0 || !paymentMethod || budgetExceeded}
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
