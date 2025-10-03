import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-grocery.jpg";
import billingIcon from "@/assets/billing-icon.jpg";
import productsIcon from "@/assets/products-icon.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingCart,
      title: "New Sale",
      description: "Start a new billing transaction with our intuitive POS system",
      path: "/billing",
      image: billingIcon,
      gradient: "from-primary to-primary/80",
    },
    {
      icon: Package,
      title: "Products",
      description: "Browse and manage your complete product catalog",
      path: "/products",
      image: productsIcon,
      gradient: "from-accent to-accent/80",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Modern grocery store"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/75" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-primary-foreground/30">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm text-primary-foreground font-medium">Modern POS Solution</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Welcome to Your
            <br />
            <span className="bg-gradient-to-r from-accent to-primary-foreground bg-clip-text text-transparent">
              Grocery Store POS
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Streamline your billing, manage inventory, and deliver exceptional customer service with our intuitive point of sale system
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/billing")}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg h-14 px-8 shadow-lg hover:shadow-xl transition-all"
            >
              Start New Sale
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/products")}
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg h-14 px-8"
            >
              View Products
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features at Your Fingertips
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to run your grocery store efficiently and professionally
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(feature.path)}
              >
                {/* Card Image Background */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-80 group-hover:opacity-70 transition-opacity`} />
                  
                  {/* Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary-foreground/20 backdrop-blur-sm p-6 rounded-full group-hover:scale-110 transition-transform">
                      <Icon className="h-16 w-16 text-primary-foreground" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <Card className="p-8 bg-gradient-to-br from-muted/50 to-muted border-2 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                12
              </div>
              <p className="text-muted-foreground font-medium">Products Available</p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4 group-hover:bg-accent/20 transition-colors">
                <ShoppingCart className="h-8 w-8 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                1,275
              </div>
              <p className="text-muted-foreground font-medium">Total Stock Units</p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                8
              </div>
              <p className="text-muted-foreground font-medium">Product Categories</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-hero text-primary-foreground py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Transform your grocery store operations with our modern POS system
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/billing")}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg h-14 px-8 shadow-lg"
          >
            Start Your First Sale
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
