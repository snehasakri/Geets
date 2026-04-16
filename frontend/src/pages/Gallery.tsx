import { useState } from "react";
import Layout from "@/components/Layout";

import serviceSkin from "@/assets/service-skin.jpg";
import serviceHair from "@/assets/service-hair.jpg";
import serviceMakeup from "@/assets/service-makeup.jpg";
import serviceNails from "@/assets/service-nails.jpg";
import heroBg from "@/assets/hero-bg.jpg";

// Add your extra photos here
import photo1 from "@/assets/photo1.jpg";
import photo2 from "@/assets/photo2.jpg";
import photo3 from "@/assets/photo3.jpg";
import photo4 from "@/assets/photo4.jpg";
import photo5 from "@/assets/photo5.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    { src: serviceSkin, alt: "Facial Treatment", category: "Skin Care" },
    { src: serviceHair, alt: "Hair Styling", category: "Hair" },
    { src: serviceMakeup, alt: "Bridal Makeup", category: "Makeup" },
    { src: serviceNails, alt: "Nail Art", category: "Nails" },
    { src: heroBg, alt: "Salon Interior", category: "Salon" },

    { src: photo1, alt: "Salon Interior", category: "Salon" },
    { src: photo2, alt: "Salon Interiort", category: "Salon" },
    { src: photo3, alt: "Salon Interior", category: "Salon" },
    { src: photo4, alt: "Salon Interior", category: "Salon" },
    { src: photo5, alt: "Salon Interior", category: "Salon" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container-custom px-4 text-center">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Our Work
          </span>

          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
            Beauty Gallery
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our collection of beautiful transformations and work
            done by our expert stylists.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="container-custom px-4">

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                onClick={() => setSelectedImage(image.src)}
              >

                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">

                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs rounded-full mb-2">
                    {image.category}
                  </span>

                  <p className="text-white font-medium">{image.alt}</p>

                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >

          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-4xl"
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-[80vh] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

        </div>
      )}

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="container-custom px-4 text-center">

          <h2 className="font-display text-3xl font-bold mb-4">
            Want to Look This Beautiful?
          </h2>

          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Book your appointment today and let our experts create your perfect look.
          </p>

          <a
            href="https://wa.me/917822991920?text=Hi, I saw your gallery and I'd like to book an appointment"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition shadow-lg"
          >
            Book Your Appointment
          </a>

        </div>
      </section>

    </Layout>
  );
};

export default Gallery;