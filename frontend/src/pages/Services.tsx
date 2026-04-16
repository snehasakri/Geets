import Layout from "@/components/Layout";
import {
  Sparkles,
  Scissors,
  Droplet,
  Flame,
  Hand,
  Footprints,
  Leaf,
} from "lucide-react";

const Services = () => {
  const serviceCategories = [
    {
      name: "Wax Services",
      icon: Droplet,
      services: [
        { name: "Full Hand Wax", price: "₹100" },
        { name: "1/2 Leg Wax", price: "₹100" },
        { name: "Hair Wash", price: "₹100" },
        { name: "Any Hair Cut", price: "₹100" },
        { name: "Hair Setting", price: "₹100" },
      ],
    },
    {
      name: "D-Tan Services",
      icon: Sparkles,
      services: [
        { name: "Face D-Tan", price: "₹100" },
        { name: "Neck D-Tan", price: "₹100" },
        { name: "1/2 Leg D-Tan", price: "₹100" },
        { name: "1/2 Hand D-Tan", price: "₹100" },
        { name: "Only Foot D-Tan", price: "₹100" },
        { name: "Underarms D-Tan", price: "₹100" },
        { name: "Back D-Tan", price: "₹100" },
      ],
    },
    {
      name: "Bleach Services",
      icon: Flame,
      services: [
        { name: "Face Bleach", price: "₹100" },
        { name: "Neck Bleach", price: "₹100" },
        { name: "1/2 Leg Bleach", price: "₹100" },
        { name: "Full Hand Bleach", price: "₹100" },
        { name: "Only Foot Bleach", price: "₹100" },
      ],
    },
    {
      name: "Massage Services",
      icon: Hand,
      services: [
        { name: "Foot Massage", price: "₹100" },
        { name: "1/2 Leg Massage", price: "₹100" },
        { name: "Full Hand Massage", price: "₹100" },
        { name: "Back Massage", price: "₹100" },
      ],
    },
    {
      name: "Spa Services",
      icon: Droplet,
      services: [
        { name: "Hair Spa (Normal)", price: "₹300" },
        { name: "Hair Spa (With Ampoule)", price: "₹500" },
        { name: "Hair Spa (Anti-Dandruff)", price: "₹800" },
      ],
    },
    {
      name: "Facial Services",
      icon: Leaf,
      services: [
        { name: "Fruits Facial", price: "₹500" },
        { name: "VLCC Facial", price: "₹600" },
        { name: "Rich Feel Facial", price: "₹1200" },
        { name: "Wine Facial", price: "₹1200" },
        { name: "Lotus Facial", price: "₹1200" },
        { name: "Cheryl’s Facial", price: "₹1500" },
        { name: "O3 Facial", price: "₹2000" },
      ],
    },
    {
      name: "Clean Up",
      icon: Sparkles,
      services: [
        { name: "Fruits Clean Up", price: "₹150" },
        { name: "VLCC Clean Up", price: "₹250" },
        { name: "Rich Feel Clean Up", price: "₹300" },
        { name: "Wine Clean Up", price: "₹400" },
        { name: "Lotus Clean Up", price: "₹500" },
        { name: "Cheryl’s Clean Up", price: "₹800" },
        { name: "O3 Clean Up", price: "₹1500" },
      ],
    },
    {
      name: "Additional Services",
      icon: Scissors,
      services: [
        { name: "Head Massage", price: "₹200 onwards" },
        { name: "Body Massage", price: "₹1000" },
        { name: "B Wax", price: "₹800 onwards" },
        { name: "Body Polish", price: "₹1500 onwards" },
        { name: "Pedicure", price: "₹600" },
        { name: "Manicure", price: "₹500" },
        { name: "Hair Colour", price: "₹1500 onwards" },
        { name: "Ironing", price: "₹200 onwards" },
        { name: "Tong", price: "₹250 onwards" },
        { name: "Crimping", price: "₹250 onwards" },
        { name: "Hair Style", price: "₹250 onwards" },
        { name: "Saree Draping", price: "₹250" },
        { name: "Makeup (Basic)", price: "₹1000" },
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container-custom px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Services & Price List
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Clear pricing with separate service categories for your convenience.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategories.map((category) => (
              <div
                key={category.name}
                className="bg-card rounded-2xl p-6 md:p-8 shadow-md"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <category.icon className="text-primary" size={24} />
                  </div>
                  <h2 className="font-display text-2xl font-semibold">
                    {category.name}
                  </h2>
                </div>

                <div className="space-y-3">
                  {category.services.map((service) => (
                    <div
                      key={service.name}
                      className="flex justify-between border-b pb-2 last:border-0"
                    >
                      <span>{service.name}</span>
                      <span className="font-semibold text-primary">
                        {service.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-accent rounded-2xl text-center">
            <p className="text-muted-foreground">
              <strong>Note:</strong> Prices may vary based on hair length and service complexity.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
