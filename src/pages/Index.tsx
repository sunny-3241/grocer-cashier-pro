import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/freshmart-hero.jpg";
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
        {/* Background with Mesh Gradient */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="FreshMart grocery store"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(72,187,120,0.4),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(163,230,53,0.3),transparent_50%)]" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "0.5s" }} />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-md px-5 py-2.5 rounded-full mb-6 border border-primary-foreground/20 shadow-lg">
            <Sparkles className="h-4 w-4 text-primary-foreground animate-pulse" />
            <span className="text-sm text-primary-foreground font-semibold tracking-wide">Next-Gen POS Solution</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight drop-shadow-2xl">
            Welcome to
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary-foreground via-accent-foreground to-primary-foreground bg-clip-text text-transparent font-black tracking-tight">
                FreshMart Express
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary-foreground via-accent-foreground to-primary-foreground opacity-60 blur-sm"></span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Streamline your billing, manage inventory, and deliver exceptional customer service with our intuitive point of sale system
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/billing")}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:scale-105 text-lg h-14 px-8 shadow-2xl hover:shadow-primary-foreground/20 transition-all duration-300 font-semibold"
            >
              Start New Sale
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/products")}
              className="bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:border-primary-foreground/50 hover:scale-105 text-lg h-14 px-8 transition-all duration-300 font-semibold"
            >
              View Products
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              About FreshMart Express
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-50"></div>
          </h2>
          <div className="text-muted-foreground text-lg max-w-3xl mx-auto space-y-4">
            <p className="leading-relaxed">
              Welcome to our modern grocery store, where quality meets convenience. We pride ourselves on offering fresh, high-quality products at competitive prices while delivering exceptional customer service.
            </p>
            <p className="leading-relaxed">
              Our advanced POS system ensures quick checkouts, accurate inventory management, and seamless shopping experiences. With features like budget tracking, expiry alerts, and flexible payment options, we're committed to making your shopping experience effortless.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(139,92,246,0.3)] cursor-pointer animate-slide-up backdrop-blur-sm bg-card/95"
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
        <Card className="p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-muted border-2 border-primary/20 shadow-elegant animate-fade-in backdrop-blur-sm">
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
