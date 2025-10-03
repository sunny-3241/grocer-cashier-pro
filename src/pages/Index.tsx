import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, BarChart3, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingCart,
      title: "New Sale",
      description: "Start a new billing transaction",
      path: "/billing",
      color: "text-primary",
    },
    {
      icon: Package,
      title: "Products",
      description: "View product catalog",
      path: "/products",
      color: "text-accent",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-primary">Grocery Store POS</h1>
          <p className="text-muted-foreground mt-1">
            Point of Sale & Billing System
          </p>
        </div>
      </header>

      <main className="container mx-auto p-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
                onClick={() => navigate(feature.path)}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`${feature.color} bg-muted rounded-full p-6`}>
                    <Icon className="h-12 w-12" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                  <Button className="w-full">Open</Button>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-8 bg-muted/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <p className="text-muted-foreground">Products Available</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">1,275</div>
              <p className="text-muted-foreground">Total Stock Units</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">8</div>
              <p className="text-muted-foreground">Categories</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;
