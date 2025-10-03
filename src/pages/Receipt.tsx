import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Printer } from "lucide-react";
import { Bill } from "@/types/product";

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bill = location.state?.bill as Bill;

  if (!bill) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No receipt to display</p>
          <Button onClick={() => navigate("/")}>Go to Dashboard</Button>
        </Card>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card print:hidden">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate("/billing")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            New Bill
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print Receipt
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-4 max-w-2xl">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Grocery Store
            </h1>
            <p className="text-sm text-muted-foreground">
              123 Main Street, City, State 12345
            </p>
            <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Receipt No:</span>
              <span className="font-mono font-semibold">{bill.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-semibold">
                {bill.date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4 mb-6">
            {bill.items.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <span className="font-semibold">
                    ${item.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    {item.quantity} × ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">${bill.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%):</span>
              <span className="font-semibold">${bill.tax.toFixed(2)}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-primary">${bill.grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">Thank you for shopping with us!</p>
            <p>Please keep this receipt for your records</p>
          </div>
        </Card>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .container, .container * {
            visibility: visible;
          }
          .container {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Receipt;
