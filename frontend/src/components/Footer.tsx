import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12 md:py-16">
      <div className="container-custom px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <h3 className="font-display text-2xl font-bold text-primary">
                GEET'S
              </h3>
              <p className="text-sm text-muted-foreground">
                Beauty Salon & Spa (Women Only)
              </p>
            </Link>

            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              Your trusted destination for premium beauty and wellness services.
              Experience the art of self-care in a comfortable, women-only environment.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/geets_beauty_salon_spa?utm_source=qr&igsh=cWRrNXpuYWNoMnhy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.facebook.com/geetsbeautysalon"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Services & Prices
              </Link>
              <Link
                to="/gallery"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Contact Us
            </h4>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-1 flex-shrink-0" size={18} />
                <p className="text-muted-foreground text-sm">
                  Sudarshan Apartment,<br />
                  Shahid Mitra Mandal Chowk,<br />
                  Karve Nagar, Pune, India
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={18} />
                <a
                  href="tel:+917822991920"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  +9178229 91920
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-primary mt-1 flex-shrink-0" size={18} />
                <div className="text-muted-foreground text-sm">
                  <p>Mon - Sun: 10:00 AM - 9:00 PM</p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} GEET'S Beauty Salon & Spa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
