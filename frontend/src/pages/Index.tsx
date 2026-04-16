import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles, Heart, MapPin, Phone, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import heroBg from "@/assets/hero-bg.jpg";
import serviceSkin from "@/assets/service-skin.jpg";
import serviceHair from "@/assets/service-hair.jpg";
import serviceMakeup from "@/assets/service-makeup.jpg";
import serviceNails from "@/assets/service-nails.jpg";

const Index = () => {
  const services = [
    {
      title: "Skin Care",
      description: "Facials, clean-ups & advanced skin treatments",
      image: serviceSkin,
    },
    {
      title: "Hair Care",
      description: "Cuts, styling, spa & coloring services",
      image: serviceHair,
    },
    {
      title: "Makeup",
      description: "Bridal, party & everyday makeup looks",
      image: serviceMakeup,
    },
    {
      title: "Nail Art",
      description: "Manicure, pedicure & creative nail designs",
      image: serviceNails,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        
        <div className="relative z-10 container-custom px-4 text-center py-20">
          <div className="max-w-3xl mx-auto animate-fade-up">
            <span className="inline-block px-4 py-2 bg-accent rounded-full text-accent-foreground text-sm font-medium mb-6">
              ✨ Women Only Salon
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Welcome to{" "}
              <span className="text-gradient">GEET'S</span>
              <br />
              Beauty Salon & Spa
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              Discover the art of beauty in a comfortable, private environment designed exclusively for women.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="btn-rose rounded-full px-8 text-lg"
              >
                <a
                  href="https://wa.me/917822991920?text=Hi, I'd like to book an appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom px-4">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Our Services
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
              Premium Beauty Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From skincare to hair styling, we offer a complete range of beauty services 
              tailored to enhance your natural beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                {...service}
                delay={index * 100}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/services" className="inline-flex items-center gap-2">
                View All Services & Prices
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
              A Safe Space for Your Beauty Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-accent/50 card-hover animate-fade-up">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="text-primary" size={32} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Women Only</h3>
              <p className="text-muted-foreground">
                A private, comfortable space designed exclusively for women to relax and rejuvenate.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-accent/50 card-hover animate-fade-up delay-100">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="text-primary" size={32} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Expert Stylists</h3>
              <p className="text-muted-foreground">
                Trained professionals with years of experience in the latest beauty techniques.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-accent/50 card-hover animate-fade-up delay-200">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="text-primary" size={32} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Premium Products</h3>
              <p className="text-muted-foreground">
                We use only high-quality, trusted beauty products for the best results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Preview */}
      <section className="section-padding bg-secondary">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="text-primary font-medium text-sm tracking-wider uppercase">
                Visit Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6">
                Find Us in Karve Nagar
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Our Location</h4>
                    <p className="text-muted-foreground">
                      Sudarshan Apartment, Shahid Mitra Mandal Chowk,<br />
                      Karve Nagar, Pune, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Call Us</h4>
                    <a href="tel:+917822991920" className="text-primary hover:underline">
                      +9178229 91920
                    </a>
                  </div>
                </div>
              </div>
              <Button
                asChild
                className="btn-rose rounded-full px-8"
              >
                <Link to="/contact">Get Directions</Link>
              </Button>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl animate-fade-up delay-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.7159559694!2d73.81739!3d18.4970!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfb0c8a9a1d1%3A0x8a3c2f2e2e2e2e2e!2sKarve%20Nagar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GEET'S Beauty Salon Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Glow?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Book your appointment today and let our experts pamper you with the best beauty treatments.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-full px-8 text-lg shadow-lg"
          >
            <a
              href="https://wa.me/917822991920?text=Hi, I'd like to book an appointment"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book on WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
